import type { LogType } from '@/level'

export type LogApi = {
  [key in LogType]: (...args: any[]) => void;
}

export const defaultLogApi: LogApi = {
  /* eslint-disable no-console */
  trace: console.log.bind(console),
  debug: console.debug.bind(console),
  info: console.info.bind(console),
  /* eslint-enable no-console */
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  fatal: console.error.bind(console),
}
