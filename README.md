# Logger

[中文](./README_zh-CN.md) | [English](./README.md)

A lightweight log management tool that supports different log levels and modular management.

## Features

- Support setting log names for modular log management
- Support multiple log levels: trace, debug, info, warn, error, fatal
- Lightweight design with zero dependencies
- Complete TypeScript type support

## Installation

Install using npm:

```bash
npm install @lib-stack/logger
```

## Basic Usage

### Using the Default Exported logger Instance

```typescript
import { logger } from '@lib-stack/logger'

// Set log level
logger.setLevel('info')
// Print logs of different levels
logger.debug('This is a debug log') // Will not be output because level is lower than info
logger.error('This is an error log')
```

### Managing Multiple Log Instances with get Method

```typescript
import { logger } from '@lib-stack/logger'

// Get or create named log instances
const apiLogger = logger.get('api')
const dbLogger = logger.get('database')
```

### Creating Custom Log Instances

```typescript
import { createLogger } from '@lib-stack/logger'

// Create default log instance
const logger = createLogger()
```

## API Reference

### `createLogger(options?: LoggerOptions): Logger`

Creates a new log instance.

#### Parameters

- `options`: Optional configuration object
  - `name`: Log name, used to identify different log instances

#### Return Value

- Returns a log object with the following methods:
  - `trace(...args: unknown[])`: Print trace logs
  - `debug(...args: unknown[])`: Print debug logs
  - `info(...args: unknown[])`: Print info logs
  - `warn(...args: unknown[])`: Print warning logs
  - `error(...args: unknown[])`: Print error logs
  - `fatal(...args: unknown[])`: Print fatal error logs
  - `setLevel(level: LogLevel)`: Set log level
  - `getLevel(): LogLevel`: Get current log level
  - `get(name?: string, options?: Extract<LoggerOptions, 'name'>): Logger`: Get or create named log instances
  - `getAll(): Logger[]`: Get all created log instances

### Log Levels

Available log levels (from lowest to highest severity):

- `trace`: Most detailed logs, usually for development debugging
- `debug`: Debug information logs
- `info`: General information logs
- `warn`: Warning information that doesn't affect program operation
- `error`: Error information that may affect some functions
- `fatal`: Fatal error information, program may not continue running
- `off`: Turn off all log output

## Advanced Usage

### Modular Log Management

```typescript
// File: src/api.ts
import { logger } from '@lib-stack/logger'

const apiLogger = logger.get('api')
apiLogger.info('API request started')
```

```typescript
// File: src/database.ts
import { logger } from '@lib-stack/logger'

const dbLogger = logger.get('database')
dbLogger.debug('Executing SQL query')
```

### Configuring Different Log Levels for Different Environments

```typescript
import { logger } from '@lib-stack/logger'

if (process.env.NODE_ENV === 'development') {
  logger.setLevel('debug')
}
else {
  logger.setLevel('error')
}
```

## License

This project is licensed under the MIT License. For details, see the [LICENSE](LICENSE) file.
