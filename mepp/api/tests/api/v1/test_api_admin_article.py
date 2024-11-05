# MEPP - A web application to guide patients and clinicians in the process of
# facial palsy rehabilitation, with the help of the mirror effect and principles
# of motor learning
# Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
#
# This file is part of MEPP.
#
# MEPP is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# MEPP is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
from django.conf import settings
from rest_framework import status

from mepp.api.enums.language import LanguageEnum
from mepp.api.models.article import Article, ArticleI18n

from . import BaseV1TestCase


class AdminArticleListAPITestCase(BaseV1TestCase):

    def test_list_articles_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        articles_count = Article.objects.all().count()
        response = self.client.get(
            self.reverse('article-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], articles_count)

    def test_list_articles_as_clinician(self):
        url = self.reverse('article-list')
        token = self.login(self.helen.username, self.common_password)
        articles_count = Article.objects.filter().count()
        response = self.client.get(
            url,
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], articles_count)
        self.assertEqual(response.data['count'], 0)

        # Create one article
        article = Article.objects.create()
        ArticleI18n.objects.create(
            description='Lorem ipsum', parent=article, language='fr'
        )
        ArticleI18n.objects.create(
            description='Lorem ipsum', parent=article, language='en'
        )
        response = self.client.get(
            url,
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], articles_count + 1)

    def test_list_articles_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.get(
            self.reverse('article-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class AdminArticleCreateAPITestCase(BaseV1TestCase):

    def test_create_article_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.post(
            self.reverse('article-list'),
            data=self._get_article_dict(),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_cannot_create_article_as_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        response = self.client.post(
            self.reverse('article-list'),
            data=self._get_article_dict(),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_create_article_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.post(
            self.reverse('article-list'),
            data=self._get_article_dict(),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_create_not_valid_article(self):
        article = self._get_article_dict()
        del article['i18n']
        token = self.login(self.admin.username, self.common_password)
        response = self.client.post(
            self.reverse('article-list'),
            data=article,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def _get_article_dict():
        article_dict = {
            'i18n': {
                'title': {},
                'description': {},
                'external_url': {},
            },
        }
        for code, _ in list(LanguageEnum.choices()):
            article_dict['i18n']['title'][code] = f'Title: Lorem ipsum {code}'
            article_dict['i18n']['description'][code] = f'Description: Lorem ipsum {code}'
            article_dict['i18n']['external_url'][code] = f'http://example.com/{code}/'

        return article_dict


class AdminArticleUpdateAPITestCase(BaseV1TestCase):

    def setUp(self):
        super().setUp()
        self.article = Article.objects.create()
        for code, _ in list(LanguageEnum.choices()):
            ArticleI18n.objects.create(
                description='Lorem ipsum', parent=self.article, language=code
            )

    def test_update_article_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('article-detail', args=(self.article.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cannot_update_article_as_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        response = self.client.patch(
            self.reverse('article-detail', args=(self.article.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_article_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.patch(
            self.reverse('article-detail', args=(self.article.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_update_not_valid_article(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('article-detail', args=(self.article.uid,)),
            data={'i18n': {}},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AdminArticleDeleteAPITestCase(BaseV1TestCase):

    def setUp(self):
        super().setUp()
        self.article = Article.objects.create()
        for code, _ in list(LanguageEnum.choices()):
            ArticleI18n.objects.create(
                description='Lorem ipsum', parent=self.article, language=code
            )

    def test_delete_article_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.delete(
            self.reverse('article-detail', args=(self.article.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_cannot_delete_article_as_clinician(self):
        token = self.login(self.john.username, self.common_password)
        response = self.client.delete(
            self.reverse('article-detail', args=(self.article.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_article_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.delete(
            self.reverse('article-detail', args=(self.article.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
