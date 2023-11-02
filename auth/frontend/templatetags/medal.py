from django import template
from backend.models import PodokName
register = template.Library()

@register.inclusion_tag('html/tags/medal.html')
def podok_name (pk:None):
    podok=PodokName.objects.get(pk=pk)
    return {'podok':podok}