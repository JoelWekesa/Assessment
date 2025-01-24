ARG NODE_VERSION=20.11.1

FROM --platform=linux/amd64 node:20-slim as base

RUN apt-get update -y && \
    apt-get install -y openssl ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json prisma ./

RUN pnpm install --frozen-lockfile

RUN pnpm prisma generate

RUN pnpm build

COPY . .


CMD ["pnpm", "start:migrate:prod"]