from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from sportsreference.fb import squad_ids
import string

from .serializers import TeamSerializer
from .models import Team as TeamModel
from sportsreference.fb.team import Team


@api_view(['GET'])
def teams_list(request):
    if request.method == 'GET':
        data = squad_ids.SQUAD_IDS.keys()
        return Response(data)


@api_view(['GET'])
def teams_detail(request, team_name):
    team_name = team_name.replace('_', ' ')
    try:
        team = Team(team_name)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    data = TeamModel(name=string.capwords(team_name), points=team.points, league=team.league, position=team.position, record=team.record)
    serializer = TeamSerializer(data)
    return Response(serializer.data)
