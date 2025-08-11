FROM python:3.11-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apk update && apk add gcc python3-dev musl-dev tzdata \
    && apk add --virtual build-deps \
    && apk add --no-cache mariadb-dev

ENV TZ=America/Sao_Paulo
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime

WORKDIR /home/app/django

RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Adicione estas linhas para instalar dependências do Celery
RUN apk add --no-cache libffi-dev openssl-dev
RUN pip install celery[redis] django-celery-beat

COPY . .