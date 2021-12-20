import pino from 'pino'
import pp from 'pino-pretty'

export const Logger = pino(pp({ ignore: 'pid,hostname' }))
