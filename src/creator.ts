import { formatDate } from '@/utils'
import type { LogLevel, LogType } from '@/level'
import { LEVEL_MAP, LOG_MAP } from '@/level'

interface LoggerOptions {
  name?: string
}

export interface Logger {
  trace: Console['log']
  debug: Console['debug']
  info: Console['info']
  warn: Console['warn']
  error: Console['error']
  fatal: Console['error']
  setLevel: (level: LogLevel) => void
  getLevel: () => LogLevel
  get(name?: string, options?: Extract<LoggerOptions, "name">): Logger
  getAll(): Logger[]
}

function factory(
  options: LoggerOptions = {},
) {
  return function logger(type: LogType, level: LogLevel, ...args: unknown[]) {
    const { name = 'default' } = options
    // eslint-disable-next-line no-console
    const fn = console[LOG_MAP[type]]
    const levelList = LEVEL_MAP[level]

    // Exit if the specified method does not exist or the current log level is not allowed
    if (!fn || !levelList.includes(type)) {
      return
    }

    args.unshift('-')

    if (name) {
      args.unshift(`[${name}]`)
    }

    args.unshift(`[${type.toUpperCase()}]`)
    args.unshift(`[${formatDate()}]`)

    fn.call(console, ...args)
  }
}

/**
 * Create a logger that supports setting the log level
 *
 * @param {LoggerOptions} [options] configuration Object
 * @returns {Logger} a logger that supports setting the log level
 */
function createLogger(
  options: LoggerOptions = {},
): Logger {
  const loggerMap = new Map<string, Logger>()
  const logByType = factory(options)
  let localLevel: LogLevel = 'off'

  function setLevel(level: LogLevel) {
    localLevel = level
  }

  function getLevel(): LogLevel {
    return localLevel
  }

  const defaultLogger = {
    trace: (...args: unknown[]) => logByType('trace', localLevel, ...args),
    debug: (...args: unknown[]) => logByType('debug', localLevel, ...args),
    info: (...args: unknown[]) => logByType('info', localLevel, ...args),
    warn: (...args: unknown[]) => logByType('warn', localLevel, ...args),
    error: (...args: unknown[]) => logByType('error', localLevel, ...args),
    fatal: (...args: unknown[]) => logByType('fatal', localLevel, ...args),
    setLevel,
    getLevel,
    get(name = 'default', options?: Extract<LoggerOptions, 'name'>) {
      if (loggerMap.has(name)) {
        return loggerMap.get(name)!
      }

      const logger = createLogger({ name, ...(options || {}) })

      loggerMap.set(name, logger)

      return logger
    },
    getAll() {
      return Array.from(loggerMap.values())
    },
  }

  loggerMap.set('default', defaultLogger)

  return defaultLogger
}

const logger = createLogger()

export { logger, createLogger }
