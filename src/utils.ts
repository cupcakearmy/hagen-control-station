import dayjs from 'dayjs'
import type { Cleaning, Feeding } from './db.js'
import { HCSContext } from './index.js'

export function format(timestamp: number): string {
  const d = dayjs(timestamp)
  return d.format('DD MMM') + ' at ' + d.format('HH:mm')
}

export function getLatest<T extends Cleaning | Feeding>(data: T[]): T | null {
  return data.sort((a, b) => b.timestamp - a.timestamp)[0] || null
}

export async function disappearingMessage(ctx: HCSContext, msg: string, timeout = 2000) {
  const message = await ctx.reply(msg)
  setTimeout(() => {
    ctx.deleteMessage(message.message_id)
  }, timeout)
}
