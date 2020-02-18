from django.urls import path
from blog import views
from . import MyDate
app_name = "[blog]"
urlpatterns = [
    path('article_list/',views.index_article_list),
    path('<str:joy_theme>/',views.index_theme),
    path('<yy:year>/<mm:month>/',views.index_article),
]
