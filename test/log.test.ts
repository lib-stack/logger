import { describe, expect, it } from 'vitest'
import { defaultLogApi } from '../src/log'

describe('defaultLogApi', () => {
  it('should contain all log methods', () => {
    expect(defaultLogApi.trace).toBeTypeOf('function')
    expect(defaultLogApi.debug).toBeTypeOf('function')
    expect(defaultLogApi.info).toBeTypeOf('function')
    expect(defaultLogApi.warn).toBeTypeOf('function')
    expect(defaultLogApi.error).toBeTypeOf('function')
    expect(defaultLogApi.fatal).toBeTypeOf('function')
  })
})
