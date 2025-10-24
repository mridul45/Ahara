# Stage 1 – install dependencies (cached separately)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2 – build the production bundle
FROM deps AS build
COPY . .
RUN npm run build

# Stage 3 – serve the static assets with a tiny runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Install a small static file server
RUN npm install -g serve

# Copy the compiled assets from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173", "--no-clipboard"]
