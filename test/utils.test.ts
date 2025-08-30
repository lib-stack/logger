import { describe, expect, it } from 'vitest'
import { formatDate } from '../src/utils'

describe('formatDate', () => {
  it('should format date in yyyy-mm-dd HH:mm:ss format', () => {
    const date = new Date('2023-01-01T12:34:56.789Z')
    const formattedDate = formatDate(date)

    expect(formattedDate).toBe('2023-01-01 20:34:56')
  })

  it('should format date in yyyy-mm-dd HH:mm:ss format with default date', () => {
    const formattedDate = formatDate()

    expect(formattedDate).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
  })
})
