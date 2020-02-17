from django.urls import path
from blog import views
app_name = "[blog]"
urlpatterns = [
    path('<str:joy_theme>/',views.index_theme),
]
