from celery import shared_task
from django.utils import timezone
from .models import Task

@shared_task
def clean_completed_tasks():
    # Remove tarefas completadas com mais de 30 dias
    thirty_days_ago = timezone.now() - timezone.timedelta(days=30)
    Task.objects.filter(
        completed=True,
        created_at__lt=thirty_days_ago
    ).delete()

@shared_task
def mark_overdue_tasks():
    # Marca tarefas vencidas como completadas
    Task.objects.filter(
        completed=False,
        due_date__lt=timezone.now()
    ).update(completed=True)
