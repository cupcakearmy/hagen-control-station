import dayjs from 'dayjs'
import cron from 'node-cron'
import { DB } from './db.js'
import { bot } from './index.js'
import { getLatests } from './routes/status.js'

async function fn() {
  const now = dayjs()
  for (const user of DB.data?.users ?? []) {
    const { fed, clean } = getLatests()
    if (!fed || dayjs(fed.timestamp).isBefore(now.subtract(12, 'hours'))) {
      await bot.telegram.sendMessage(user.id, '🥜 You have not fed me in the last 12 hours!')
    }

    if (!clean || dayjs(clean.timestamp).isBefore(now.subtract(7, 'days'))) {
      await bot.telegram.sendMessage(user.id, '🛁 You have not cleaned me in the last 7 days!')
    }
  }
}

export function init() {
  cron.schedule('0 22 * * *', fn)
  // cron.schedule('*/10 * * * * *', fn)
}
