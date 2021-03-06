# 微服务库 jm-ms

micro service lib, light and fast

## features

- 路由式编程模式 基于 jm-route

- 支持多协议 http、ws

- 支持服务器 server

- 支持客户端 client

- 支持代理转发 proxy

## 安装

```bash
npm i jm-ms
```

## 使用

```javascript
const MS = require('jm-ms')
const ms = new MS()
```

## 构造函数 MS

参数 opts

- logging [false] 是否打印日志

- benchmark [false] 是否计算耗时

- disable_client [false] 禁用client模块

- disable_server [false] 禁用server模块

## 路由器 router

负责管理路由 route

### 工序函数

- 有且只有一个参数 opts (json 对象)

### 异常抛出

抛出异常需要按以下格式

```javascript
const e = new Error('这里填错误信息')
e.code = 1000 // 错误编码，可选
e.status = 500 // 对应的标准 HTTP 错误状态码，可选
e.data = {
    err: 1000, // 错误编码
    msg: '这里填错误信息',
    status: 500, // 对应的标准 HTTP 错误状态码，可选
    data: {}, // 附加数据，可选
    ... // 其他自定义错误内容
}
throw e
```

### 异常抛出 jm-err

采用 jm-err 简化异常生成

```javascript
const error = require('jm-err')
// jm-err 的 Err 中定义了常见错误
const doc = error.Err.FA_NOAUTH
throw error.err(doc)

// 也可以自定义 doc 对象
const doc1 = {
    status: 401,
    err: 401,
    msg: 'Unauthorized'
}
throw error.err(doc1)
```

### 创建 router

```javascript
const router = ms.router()
```

### 添加路由 router.add

- add({uri:uri, type:type, fn:fn})
- add({uri:uri, type:type, fn:[fn1, fn2, ..., fnn]})

--

### 简便写法

- add(uri, type, fn)
- add(uri, type, fn1, fn2, ..., fnn)
- add(uri, type, [fn1, fn2, ..,fnn])
- add(uri, fn)
- add(uri, fn1, fn2, ..., fnn)
- add(uri, [fn1, fn2, ..,fnn])

```javascript
router.add('/', 'get', fn1, fn2)
```

### 添加路由 router.use

- use({uri:uri, fn:fn})
- use({uri:uri, fn:[fn1, fn2, ..., fnn]})
- use({uri:uri, fn:router})
- use({uri:uri, fn:obj}) obj必须实现了request或者execute之一

### 简便写法

- use(uri, fn)
- use(uri, fn1, fn2, ..., fnn)
- use(uri, [fn1, fn2, ..,fnn])
- use(uri, router)
- use(uri, obj)
- use(router)
- use(obj) 
- use(fn1, fn2, ..., fnn)
- use([fn1, fn2, ..,fnn])

```javascript
router.use(fn1, fn2)
```

### 清除路由 router.clear

```javascript
router.clear()
```

### 请求 router.request

```javascript
const doc = await router.request({
    uri:'/', // 请求 uri
    type:'get', // 请求类型
    headers:{}, // 请求头
    data:{}, // 请求数据
    params:{}, // 请求参数 
    timeout: 0, // 请求超时时间，单位ms
    ...
})
```

### 简便写法

- request(uri, type, data, opts)
- request(uri, type, data)
- request(uri, type)
- request(uri)

```javascript
const doc = await router.request('/', 'get', {id: 1})
```

### 简便写法

- post(uri, data, opts)
- put(uri, data, opts)
- get(uri, data)
- delete(uri)

```javascript
const doc = await router.get('/')
```

### 完整例子

```javascript
const MS = require('jm-ms')
const ms = new MS()
const router = ms.router()
router.add('/', 'get', opts => { return opts})
const doc = await router.get('/')
```

## 服务器 server

```javascript
const MS = require('jm-ms')
const ms = new MS()
const router = ms.router()
router.add('/', 'get', opts => { return opts})

// http 服务器
await ms.server(router, {type: 'http', port: 3000})

// websocket 服务器
await ms.server(router, {type: 'ws', port: 3001})
```

## 客户端 client

```javascript
const MS = require('jm-ms')
const ms = new MS()

// http
const client = await ms.client('http://api.test.jamma.cn')
const doc = await client.get('/')
doc = await client.post('/users', {name: '鱼哥'})
```

```javascript
// ws
const client = await ms.client('ws://api.test.jamma.cn')
const doc = await client.get('/')
doc = await client.post('/users', {name: '鱼哥'})
```
