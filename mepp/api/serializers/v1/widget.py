# coding: utf-8
from datetime import timedelta

from django.db.models import Count
from django.utils.timezone import now
from rest_framework import serializers

from mepp.api.enums.status import StatusEnum
from mepp.api.models.user import User


class DashboardWidgetSerializer(serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField()
    completed = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'full_name',
            'completed',
        ]

    def create(self, validated_data):
        raise NotImplementedError

    def get_completed(self, user):
        raise NotImplementedError

    def get_full_name(self, user):
        return user.get_full_name()

    def update(self, validated_data):
        raise NotImplementedError

    def _get_filters(self, status):

        week_range = self.context['week_range']
        filters = {
            'status': status
        }

        if week_range != 'all':
            if week_range == 'one_week':
                bound = now() - timedelta(days=7)

            if week_range == 'two_weeks':
                bound = now() - timedelta(days=14)

            if week_range == 'one_month':
                bound = now() - timedelta(days=30)

            filters['created_at__gte'] = bound.replace(
                hour=0, minute=0, second=0
            )
        return filters


class DailyRepeatWidgetSerializer(DashboardWidgetSerializer):

    def get_completed(self, user):
        if not user.active_treatment_plan:
            return 0

        return (
            user.active_treatment_plan.sessions.extra(
                select={'day': 'date( created_at )'}
            )
            .values('day')
            .filter(**self._get_filters(StatusEnum.COMPLETED.value))
            .order_by('created_at__date')
            .annotate(completed=Count('created_at__date'))
            .filter(completed__gte=user.active_treatment_plan.daily_repeat)
        ).count()


class SessionsWidgetSerializer(DashboardWidgetSerializer):

    uncompleted = serializers.SerializerMethodField()

    class Meta(DashboardWidgetSerializer.Meta):
        fields = [
            'full_name',
            'completed',
            'uncompleted'
        ]

    def get_completed(self, user):
        if not user.active_treatment_plan:
            return 0

        return (
            user.active_treatment_plan.sessions
            .filter(**self._get_filters(StatusEnum.COMPLETED.value))
        ).count()

    def get_uncompleted(self, user):
        if not user.active_treatment_plan:
            return 0

        return (
            user.active_treatment_plan.sessions
            .filter(**self._get_filters(StatusEnum.UNCOMPLETED.value))
        ).count()


# class AllUserCompletedSessionsWidgetSerializer(serializers.ModelSerializer):
#
#     full_name = serializers.SerializerMethodField()
#     completed = serializers.SerializerMethodField()
#     uncompleted = serializers.SerializerMethodField()
#
#     class Meta:
#         model = User
#         fields = [
#             'full_name',
#             'completed',
#             'uncompleted'
#         ]
#
#     def create(self, validated_data):
#         raise NotImplementedError
#
#     def get_completed(self, user):
#         return user.active_treatment_plan.sessions.filter(
#             status=StatusEnum.COMPLETED.value
#         ).count()
#
#     def get_daily_repeat(self, user):
#         return user.active_treatment_plan.daily_repeat
#
#     def get_full_name(self, user):
#         return user.get_full_name()
#
#     def get_uncompleted(self, user):
#         # Change date() to to_char(created_at, 'YYYY-MM-DD') if using Postgres
#         Session.objects.extra(select={'day': 'date( created_at )'}) \
#             .values('day') \
#             .order_by('created_at__date') \
#             .annotate(available=Count('created_at__date'))
#
#         return user.active_treatment_plan.sessions.filter(
#             status=StatusEnum.UNCOMPLETED.value
#         ).count()
#
#     def update(self, validated_data):
#         raise NotImplementedError
