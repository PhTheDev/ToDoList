# 1. Estágio de Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package*.json ./

# Usa --legacy-peer-deps se houver problemas de dependências
RUN npm install --legacy-peer-deps

# Copia o restante do projeto
COPY . .

# Define variável de ambiente (boa prática, mesmo se o NGINX tratar)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Compila o projeto Next.js
RUN npm run build

# 2. Estágio de Produção
FROM node:18-alpine
WORKDIR /app

# Copia arquivos necessários
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Exponha a porta padrão
EXPOSE 3000

# Inicia o servidor Next.js
CMD ["npm", "start"]