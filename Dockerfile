# Stage 1: Build the application
FROM node:20-alpine AS build
WORKDIR /app

# Define the build argument for the API Key
# This ensures the key is passed during the build but not stored in the final image
ARG VITE_GEMINI_API_KEY
# Set it as an environment variable so Vite can pick it up
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
# Vite will bundle the VITE_GEMINI_API_KEY into the static files
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output to nginx's serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Create a custom nginx configuration to handle SPA routing
RUN printf "server {\n\
    listen 8080;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files \$uri \$uri/ /index.html;\n\
    }\n\
}\n" > /etc/nginx/conf.d/default.conf

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
