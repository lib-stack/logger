export type LogLevel = 'all' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'off'

export type LogType = Exclude<LogLevel, 'off' | 'all'>

type LevelMap = {
  [key in LogLevel]: LogType[];
}

export const LOG_MAP: { [key in LogType]: Extract<LogLevel, 'debug' | 'info' | 'warn' | 'error'> | 'log' } = {
  trace: 'log',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
  fatal: 'error',
}

export const LEVEL_MAP: LevelMap = {
  all: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
  trace: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
  debug: ['debug', 'info', 'warn', 'error', 'fatal'],
  info: ['info', 'warn', 'error', 'fatal'],
  warn: ['warn', 'error', 'fatal'],
  error: ['error', 'fatal'],
  fatal: ['fatal'],
  off: [],
}
