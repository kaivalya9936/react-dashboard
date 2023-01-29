from django.db import models

class Matches(models.Model):
    match_id = models.IntegerField(("match_id"),primary_key=True, db_index=True)
    season = models.IntegerField(("season"))
    city = models.CharField(("city"),max_length=255)
    date = models.DateField(("date"),max_length=10)
    team1 = models.CharField(("team1"),max_length=255)
    team2 = models.CharField(("team2"),max_length=255)
    toss_winner = models.CharField(("toss_winner"),max_length=255)
    toss_decision = models.CharField(("toss_decision"),max_length=10)
    result = models.CharField(("result"), max_length=10)
    dl_applied = models.IntegerField(("dl_applied"))
    winner = models.CharField(("winner"),max_length=255)
    win_by_runs = models.IntegerField(("win_by_runs"))
    win_by_wickets = models.IntegerField(("win_by_wickets"))
    player_of_match = models.CharField(("player_of_match"), max_length=255)
    venue = models.CharField(("venue"),max_length=255)
    umpire1 = models.CharField(("umpire1"),max_length=255)
    umpire2 = models.CharField(("umpire2"),max_length=255)
    umpire3 = models.CharField(("umpire3"),max_length=255,blank=True, null=True)

    def __str__(self):
        return str(self.match_id)

class Deliveries(models.Model): 
    id = models.IntegerField(("id"),db_index=True, primary_key=True)
    match = models.ForeignKey(Matches,on_delete=models.CASCADE, null=True)
    inning = models.IntegerField(("inning"))
    batting_team = models.CharField(("batting_team"),max_length=255)
    bowling_team = models.CharField(("bowling_team"),max_length=255)
    over = models.IntegerField(("over"))
    ball = models.IntegerField(("ball"))
    batsman = models.CharField(("batsman"),max_length=255)
    non_striker = models.CharField(("non_striker"),max_length=255)
    bowler = models.CharField(("bowler"),max_length=255)
    is_super_over = models.IntegerField(("is_super_over"))
    wide_runs = models.IntegerField(("wide_runs"))
    bye_runs = models.IntegerField(("bye_runs"))
    legbye_runs = models.IntegerField(("legbuy_runs"))
    noball_runs = models.IntegerField(("noball_runs"))
    penalty_runs = models.IntegerField(("penalty_runs"))
    batsman_runs = models.IntegerField(("batsman_runs"))
    extra_runs = models.IntegerField(("extra_runs"),default=0)
    total_runs = models.IntegerField(("total_runs"))
    player_dismissed = models.CharField(("player_dismissed"),max_length=255, blank=True, null=True)
    dismissal_kind = models.CharField(("dismissal_kind"), max_length=255, blank=True, null=True)
    fielder = models.CharField(("fielder"), max_length=255, blank=True, null=True)

    def __str__(self):
        return str(self.id)




