from rest_framework.authtoken import serializers


class AuthTokenSerializer(serializers.AuthTokenSerializer):

    def validate(self, attrs):
        attrs['username'] = attrs.get('username', '').lower()
        return super().validate(attrs)
