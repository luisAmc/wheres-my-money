FROM node:16 AS base

FROM base AS deps
WORKDIR /deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
ARG DATABASE_URL
ARG COOKIE_SECRET
WORKDIR /builder
COPY --from=deps /deps/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV production
ENV PORT 3000

COPY --from=builder /builder/next.config.js ./
COPY --from=builder /builder/public ./public
COPY --from=builder /builder/.next ./.next
COPY --from=builder /builder/node_modules ./node_modules
COPY --from=builder /builder/package.json ./package.json

EXPOSE ${PORT}
CMD [ "npm", "start" ]