import { describe, expect, it, vi } from 'vitest'
import createLogger from '../src/creator'

describe('createLogger', () => {
  it('should create a logger with custom name', () => {
    const logger = createLogger({ name: 'test' })
    const info = vi.spyOn(console, 'info')

    logger.setLevel('info')
    logger.info('some message')
    expect(info.mock.calls[0].includes('[test]')).toBeTruthy()
  })

  it('should set and get log level', () => {
    const logger = createLogger()

    logger.setLevel('debug')
    expect(logger.getLevel()).toBe('debug')
  })

  it('should not print logs below the specified level', () => {
    const logger = createLogger()

    logger.setLevel('warn')

    const infoSpy = vi.spyOn(console, 'info')
    const debugSpy = vi.spyOn(console, 'debug')

    logger.info('some message')
    expect(infoSpy).not.toBeCalled()
    logger.debug('another message')
    expect(debugSpy).not.toBeCalled()
  })

  it('should print logs above or equal to the specified level', () => {
    const logger = createLogger()

    logger.setLevel('warn')

    const warnSpy = vi.spyOn(console, 'warn')
    const errorSpy = vi.spyOn(console, 'error')

    logger.warn('warning message1')
    expect(warnSpy).toBeCalledTimes(1)
    logger.error('error message2')
    expect(errorSpy).toBeCalledTimes(1)
  })

  it('should print correct content', () => {
    const logger = createLogger()

    logger.setLevel('warn')

    const warnSpy = vi.spyOn(console, 'warn')
    const errorSpy = vi.spyOn(console, 'error')

    logger.warn('warning message')
    expect(warnSpy.mock.calls[0].join(' ')).toMatch(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\] \[WARN\] \[\w+\] - warning message/)
    logger.error('error message')
    expect(errorSpy.mock.calls[0].join(' ')).toMatch(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\] \[ERROR\] \[\w+\] - error message/)
  })
})
