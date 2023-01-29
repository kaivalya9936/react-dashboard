from django.db.models import Count, Sum, Case, When, IntegerField, Value,F, FloatField
from itertools import groupby
from django.db.models.functions import Cast
from django.shortcuts import render
from .models import Matches,Deliveries
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

def match_count_by_year(request):
    # sql equivalent of select season, count(*) from ipl_matches group by season;
    match_count = list(Matches.objects.values('season', ).annotate(count=Count('season')))
    return JsonResponse(match_count, safe=False)

def matches_won_by_year(request):
    team_names = Matches.objects.exclude(winner='').values('winner').distinct().order_by('winner')

    # Create a dictionary with the seasons as keys and all the teams as values with count as 0
    season_data = {str(season): {team['winner']: 0 for team in team_names} for season in range(2008, 2018)}
    
    # Get the count of wins for each team for each season
    winners_data = Matches.objects.exclude(winner='').values('season', 'winner').annotate(winner_count=Count('winner'))
    
    # Update the count of wins in the dictionary
    for data in winners_data:
        season_data[str(data['season'])][data['winner']] = data['winner_count']
    
    final_data = [{'season': season, 'count':[count for team, count in teams.items()]} for season, teams in season_data.items()]
    final_data.append({'team_names': [team['winner'] for team in team_names]})
    return JsonResponse(final_data, safe=False)

@csrf_exempt
def extra_runs_by_year(request):
    received_json_data=json.loads(request.body)
    year = received_json_data['year']
    extra_runs = list(Deliveries.objects.filter(match__season=year).values('bowling_team').annotate(total_extra_runs=Sum('extra_runs')))
    return JsonResponse(extra_runs,safe=False)

@csrf_exempt
def won_vs_played(request):
    received_json_data=json.loads(request.body)
    year = received_json_data['year']
    team1_wins = Matches.objects.filter(season=year, winner=F('team1'))\
    .values('team1').annotate(team=F('team1'))\
    .annotate(matches_won=Count('match_id')).values('team','matches_won')

    team2_wins = Matches.objects.filter(season=year, winner=F('team2'))\
    .values('team2').annotate(team=F('team2'))\
    .annotate(matches_won=Count('match_id')).values('team','matches_won')

    team1_wins_list = list(team1_wins)
    team2_wins_list = list(team2_wins)

    teams_list = team1_wins_list + team2_wins_list

    teams_list = sorted(teams_list, key=lambda x: x['team'])
    teams_grouped = {team: sum(item['matches_won'] for item in items) for team, items in groupby(teams_list, key=lambda x: x['team'])}


    team1_total = list(Matches.objects.filter(season=year).values('team1')\
    .annotate(team=F('team1')).annotate(matches_played=Count('match_id')).values('team','matches_played'))
    
    team2_total = list(Matches.objects.filter(season=year).values('team2')\
    .annotate(team=F('team2')).annotate(matches_played=Count('match_id')).values('team','matches_played'))

    team1_played_list = list(team1_total)
    team2_played_list = list(team2_total)

    teams_played_list = team1_played_list + team2_played_list

    teams_played_list = sorted(teams_played_list, key=lambda x: x['team'])
    teams_played_grouped = {team: sum(item['matches_played'] for item in items) for team, items in groupby(teams_played_list, key=lambda x: x['team'])}
    
    combined = [{'team': team, 'matches_won': teams_grouped[team], 'matches_played': teams_played_grouped[team]}\
    for team in teams_grouped.keys() & teams_played_grouped.keys()]
    combined  = sorted(combined, key= lambda x: x['team'])
    
    return JsonResponse(combined,safe=False)


@csrf_exempt
def top_bowlers(request):
    received_json_data=json.loads(request.body)
    year = received_json_data['year']
    top_economical_bowlers = Deliveries.objects.filter(match__season=year).values("bowler")\
    .annotate(overs=Count("over", distinct=True),runs=Sum("total_runs"))\
    .annotate(economy=Cast(F("runs"),FloatField()) / Cast(F("overs"), FloatField())).order_by("economy")[:10]
    print(top_economical_bowlers)

    return JsonResponse(list(top_economical_bowlers),safe= False)
