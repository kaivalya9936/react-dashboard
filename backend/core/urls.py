"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ipl import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("landing-graph-1/",views.match_count_by_year, name='graph-1'),
    path("landing-graph-2/",views.matches_won_by_year, name='graph-2'),
    path("extra-runs-per-team/",views.extra_runs_by_year, name = 'graph-3'),
    path("won-vs-played/",views.won_vs_played, name = 'graph-4'),
    path("top-bowlers/",views.top_bowlers,name = 'graph-5')
]
