import { describe, expect, it } from 'vitest'
import { LEVEL_MAP, LOG_MAP } from '../src/level'

describe('level constants', () => {
  it('lOG_MAP should map log types to console methods', () => {
    expect(LOG_MAP.trace).toBe('log')
    expect(LOG_MAP.debug).toBe('debug')
    expect(LOG_MAP.info).toBe('info')
    expect(LOG_MAP.warn).toBe('warn')
    expect(LOG_MAP.error).toBe('error')
    expect(LOG_MAP.fatal).toBe('error')
  })

  it('lEVEL_MAP should contain correct log level mappings', () => {
    expect(LEVEL_MAP.all).toEqual(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    expect(LEVEL_MAP.trace).toEqual(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    expect(LEVEL_MAP.debug).toEqual(['debug', 'info', 'warn', 'error', 'fatal'])
    expect(LEVEL_MAP.info).toEqual(['info', 'warn', 'error', 'fatal'])
    expect(LEVEL_MAP.warn).toEqual(['warn', 'error', 'fatal'])
    expect(LEVEL_MAP.error).toEqual(['error', 'fatal'])
    expect(LEVEL_MAP.fatal).toEqual(['fatal'])
    expect(LEVEL_MAP.off).toEqual([])
  })
})
