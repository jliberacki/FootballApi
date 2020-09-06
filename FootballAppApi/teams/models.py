from django.db import models


class Team(models.Model):
    name = models.CharField("Name", max_length=240)
    points = models.CharField("Points", max_length=3)
    league = models.CharField("League", max_length=240)
    position = models.CharField("Position", max_length=3)
    record = models.CharField("Record", max_length=240)

    def __init__(self, name, points, league, position, record):
        self.name = name
        self.points = points
        self.league = league
        self.position = position
        self.record = record

    def __str__(self):
        return self.name
