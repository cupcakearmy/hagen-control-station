FROM node:16-alpine 

WORKDIR /app

RUN npm -g i pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY src tsconfig.json ./
RUN pnpm run build

CMD [ "node", "." ]
