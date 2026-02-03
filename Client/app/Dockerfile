# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Accept build-time variables
ARG VITE_API_BASE_URL
ARG VITE_LOGGER_BASE_URL

# Make them available to Vite
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_LOGGER_BASE_URL=$VITE_LOGGER_BASE_URL

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
