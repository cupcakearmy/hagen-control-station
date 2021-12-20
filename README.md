# Hagen Control Center

## Docs

[Telegram Bot API](https://core.telegram.org/bots/api)
[Telegraf](https://telegraf.js.org/)

## Deployment

```yaml
# docker-compose.yaml
version: '3.8'

services:
  app:
    image: ghcr.io/cupcakearmy/hcs
    restart: unless-stopped
    env_file: .env
    volumes:
      - ./data:/app/data
```

```bash
# .env
BOT_TOKEN=<telegram bot token>
HCS_PASSWORD=<password for users>
```
