# lictool

> 授权码生成与验证工具

## 安装

```bash
bun link
```

## 使用方法

### 生成授权码

```bash
lictool generate '<payload>'
```

**示例：**

```bash
lictool generate '{"user":"test","exp":"2025-12-31"}'
```

### 验证授权码

```bash
lictool verify '<license>'
```

**示例：**

```bash
lictool verify "eyJ1c2VyIjoidGVzdCIsImV4cCI6IjIwMjUtMTItMzEifQ==.MEUCIQD..."
```

## 其他运行方式

**直接运行：**

```bash
bun ./cli.ts generate '<payload>'
```

**添加到 PATH：**

```bash
# 添加到 ~/.zshrc
export PATH="<项目目录>:$PATH"

# 使生效
source ~/.zshrc
```
