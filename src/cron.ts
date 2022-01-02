import dayjs from 'dayjs'
import cron from 'node-cron'
import { DB } from './db.js'
import { bot } from './index.js'
import { getLatests } from './routes/status.js'

async function fn() {
  const now = dayjs()
  const { fed, clean } = getLatests()
  const needsFeeding = !fed || dayjs(fed.timestamp).isBefore(now.subtract(12, 'hours'))
  const needsCleaning = !clean || dayjs(clean.timestamp).isBefore(now.subtract(7, 'days'))

  for (const user of DB.data?.users ?? []) {
    if (needsFeeding) {
      await bot.telegram.sendMessage(user.id, '🥜 You have not fed me in the last 12 hours!')
    }
    if (needsCleaning) {
      await bot.telegram.sendMessage(user.id, '🛁 You have not cleaned me in the last 7 days!')
    }
  }
}

export function init() {
  const timezone = 'Europe/Berlin'
  cron.schedule('0 22 * * *', fn, { timezone })
  // cron.schedule('*/10 * * * * *', fn, {timezone})
}
