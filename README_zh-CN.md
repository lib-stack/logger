# Logger

[中文](./README_zh-CN.md) | [English](./README.md)

一个轻量的日志打印管理工具，支持不同日志级别和分模块管理。

## 特性

- 支持设置日志名称实现分模块管理日志
- 支持多个日志级别：trace、debug、info、warn、error、fatal
- 轻量级设计，零依赖
- 完整的 TypeScript 类型支持

## 安装

使用 npm 安装：

```bash
npm install @lib-stack/logger
```

## 基本使用

### 使用默认导出的 logger 实例

```typescript
import { logger } from '@lib-stack/logger'

// 设置日志级别
logger.setLevel('info')
// 打印不同级别的日志
logger.debug('这是一条调试日志') // 不会输出，因为级别低于 info
logger.error('这是一条错误日志')
```

### 使用 get 方法管理多个日志实例

```typescript
import { logger } from '@lib-stack/logger'

// 获取或创建命名日志实例
const apiLogger = logger.get('api')
const dbLogger = logger.get('database')
```

### 创建自定义日志实例

```typescript
import { createLogger } from '@lib-stack/logger'

// 创建默认日志实例
const logger = createLogger()
```

## API参考

### `createLogger(options?: LoggerOptions): Logger`

创建一个新的日志实例。

#### 参数

- `options`: 可选配置对象
  - `name`: 日志名称，用于标识不同的日志实例

#### 返回值

- 返回一个具有以下方法的日志对象：
  - `trace(...args: unknown[])`: 打印跟踪日志
  - `debug(...args: unknown[])`: 打印调试日志
  - `info(...args: unknown[])`: 打印信息日志
  - `warn(...args: unknown[])`: 打印警告日志
  - `error(...args: unknown[])`: 打印错误日志
  - `fatal(...args: unknown[])`: 打印致命错误日志
  - `setLevel(level: LogLevel)`: 设置日志级别
  - `getLevel(): LogLevel`: 获取当前日志级别
  - `get(name?: string, options?: Extract<LoggerOptions, 'name'>): Logger`: 获取或创建命名日志实例
  - `getAll(): Logger[]`: 获取所有已创建的日志实例

### 日志级别

可用的日志级别（按严重性从低到高）：

- `trace`: 最详细的日志，通常用于开发调试
- `debug`: 调试信息日志
- `info`: 一般信息日志
- `warn`: 警告信息，但不影响程序运行
- `error`: 错误信息，可能影响部分功能
- `fatal`: 致命错误信息，程序可能无法继续运行
- `off`: 关闭所有日志输出

## 高级用法

### 分模块管理日志

```typescript
// 文件: src/api.ts
import { logger } from '@lib-stack/logger'

const apiLogger = logger.get('api')
apiLogger.info('API 请求开始')
```

```typescript
// 文件: src/database.ts
import { logger } from '@lib-stack/logger'

const dbLogger = logger.get('database')
dbLogger.debug('执行 SQL 查询')
```

### 为不同环境配置不同日志级别

```typescript
import { logger } from '@lib-stack/logger'

if (process.env.NODE_ENV === 'development') {
  logger.setLevel('debug')
}
else {
  logger.setLevel('error')
}
```

## 许可证

本项目采用MIT许可证。详情请见 [LICENSE](LICENSE) 文件。
