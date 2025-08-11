from rest_framework import viewsets, filters # type: ignore
from rest_framework.permissions import IsAuthenticated, BasePermission # type: ignore
from django_filters.rest_framework import DjangoFilterBackend # type: ignore
from .models import Task
from .serializers import TaskSerializer

class IsAdminOrOwner(BasePermission):
    def has_object_permission(self, request, obj):
        # Admin can do anything
        if request.user.is_staff:
            return True
        # Regular users can only manage their own tasks
        return obj.user == request.user

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['completed', 'priority']
    ordering_fields = ['due_date', 'user', 'created_at', 'priority']

    def get_queryset(self):
        if self.request.user.is_staff:
            return Task.objects.all()
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
