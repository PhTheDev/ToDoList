# Usando a imagem oficial do Python
FROM python:3.11

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando os arquivos do projeto para dentro do contêiner
COPY . .

# Instalando as dependências do projeto
RUN pip install --no-cache-dir -r requirements.txt

# Expondo a porta padrão do Django
EXPOSE 8000

# Comando para rodar o servidor do Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
