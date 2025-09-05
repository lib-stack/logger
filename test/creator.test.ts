import { describe, expect, it, vi } from 'vitest'
import { createLogger, logger } from '../src/creator'
import { defaultLogApi } from '../src/log'

describe('createLogger', () => {
  it('should get default logger', () => {
    const defaultLogger = logger.get()

    expect(defaultLogger).toBe(logger)
  })

  it('should create a logger with custom name', () => {
    // the default logger
    logger.setLevel('info')

    const info = vi.spyOn(defaultLogApi, 'info')

    logger.info('some message')
    expect(info.mock.calls[0].includes('[default]')).toBeTruthy()

    // Use the `get` method to obtain the logger
    const moduleLogger = logger.get('module')
    const moduleInfo = vi.spyOn(defaultLogApi, 'info')

    moduleLogger.setLevel('info')
    moduleLogger.info('some message')
    expect(moduleInfo.mock.calls[0].includes('[module]')).toBeTruthy()

    // Use the `createLogger` method to obtain the logger
    const customLogger = createLogger({ name: 'create' })
    const customInfo = vi.spyOn(defaultLogApi, 'info')

    customLogger.setLevel('info')
    customLogger.info('some message')
    expect(customInfo.mock.calls[0].includes('[create]')).toBeTruthy()
  })

  it('should get same logger by same name', () => {
    const logger1 = logger.get('same')
    const logger2 = logger.get('same')

    expect(logger1).toBe(logger2)
  })

  it('should get different logger by same name', () => {
    const logger1 = createLogger({ name: 'same' })
    const logger2 = createLogger({ name: 'same' })

    expect(logger1).not.toBe(logger2)
  })

  it('should set and get log level', () => {
    const logger = createLogger()

    logger.setLevel('debug')
    expect(logger.getLevel()).toBe('debug')
  })

  it('should not print logs below the specified level', () => {
    const logger = createLogger()

    logger.setLevel('warn')

    const infoSpy = vi.spyOn(defaultLogApi, 'info')
    const debugSpy = vi.spyOn(defaultLogApi, 'debug')

    logger.info('some message')
    expect(infoSpy).not.toBeCalled()
    logger.debug('another message')
    expect(debugSpy).not.toBeCalled()
  })

  it('should print logs above or equal to the specified level', () => {
    const logger = createLogger()

    logger.setLevel('warn')

    const warnSpy = vi.spyOn(defaultLogApi, 'warn')
    const errorSpy = vi.spyOn(defaultLogApi, 'error')

    logger.warn('warning message1')
    expect(warnSpy).toBeCalledTimes(1)
    logger.error('error message2')
    expect(errorSpy).toBeCalledTimes(1)
  })

  it('should print correct content', () => {
    const logger = createLogger()

    logger.setLevel('warn')

    const warnSpy = vi.spyOn(defaultLogApi, 'warn')
    const errorSpy = vi.spyOn(defaultLogApi, 'error')

    logger.warn('warning message')
    expect(warnSpy.mock.calls[0].join(' ')).toMatch(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\] \[WARN\] \[\w+\] - warning message/)
    logger.error('error message')
    expect(errorSpy.mock.calls[0].join(' ')).toMatch(/\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\] \[ERROR\] \[\w+\] - error message/)
  })

  it('should get all loggers', () => {
    const logger = createLogger({ name: 'logger1' })

    logger.get('logger2')
    expect(logger.getAll().length).toBe(2)
  })
})
