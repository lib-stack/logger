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
    args.unshift(`[${new Date().toLocaleString().replace(/\//g, '-')}]`)

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
  const logByType = factory(options)
  let localLevel: LogLevel = 'off'

  function setLevel(level: LogLevel) {
    localLevel = level
  }

  function getLevel(): LogLevel {
    return localLevel
  }

  return {
    trace: (...args) => logByType('trace', localLevel, ...args),
    debug: (...args) => logByType('debug', localLevel, ...args),
    info: (...args) => logByType('info', localLevel, ...args),
    warn: (...args) => logByType('warn', localLevel, ...args),
    error: (...args) => logByType('error', localLevel, ...args),
    fatal: (...args) => logByType('fatal', localLevel, ...args),
    setLevel,
    getLevel,
  }
}

export default createLogger
