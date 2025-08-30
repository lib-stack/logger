import { describe, expect, it } from 'vitest'
import { createLogger } from '../src/main'

describe('main exports', () => {
  it('should export createLogger function', () => {
    const logger = createLogger()

    expect(typeof logger.trace).toBe('function')
    expect(typeof logger.debug).toBe('function')
    expect(typeof logger.info).toBe('function')
    expect(typeof logger.warn).toBe('function')
    expect(typeof logger.error).toBe('function')
    expect(typeof logger.fatal).toBe('function')
    expect(typeof logger.setLevel).toBe('function')
    expect(typeof logger.getLevel).toBe('function')
  })
})
