# 1. Build Stage
FROM node:22.20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Production Stage 
FROM node:22.20-alpine AS runner

WORKDIR /app

# Copy only the required output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "server.js"]