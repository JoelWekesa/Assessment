FROM --platform=linux/amd64 node:20-slim as base

ARG PORT=3001

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ENV BUILD_STANDALONE=true



FROM base AS deps

WORKDIR /frontend

RUN rm -rf node_modules
RUN rm -rf yarn.lock


COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --frozen-lockfile



FROM base AS builder
WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .



RUN pnpm build


FROM base AS runner
WORKDIR /frontend

ENV NODE_ENV=production


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /frontend/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next


COPY --from=builder --chown=nextjs:nodejs /frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /frontend/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

ENV PORT=$PORT


CMD ["node", "server.js"]
