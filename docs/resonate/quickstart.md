---
sidebar_position: 1
---

# Quickstart

## Download

Use the links below to download the latest release of the Resonate server. If you do not see an applicable download you can [build from source](https://github.com/resonatehq/resonate). Please note that Resonate is currently a work in progress and the server is provided as-is.

| OS    | Architecture | Link                                                                                |
| ----- | ------------ | ----------------------------------------------------------------------------------- |
| MacOS | x86_64       | [Download](https://storage.googleapis.com/resonate-release/darwin-x86_64/resonate)  |
| MacOS | aarch64      | [Download](https://storage.googleapis.com/resonate-release/darwin-aarch64/resonate) |
| Linux | x86_64       | [Download](https://storage.googleapis.com/resonate-release/linux-x86_64/resonate)   |
| Linux | aarch64      | [Download](https://storage.googleapis.com/resonate-release/linux-aarch64/resonate)  |

# Start the server

```bash
./resonate serve
```

## Default configuration

Optionally, you can start Resonate with a configuration file.
```bash
./resonate serve --config resonate.yml
```

```yaml title="resonate.yml"
api:
  size: 100
  subsystems:
    http:
      addr: "0.0.0.0:8001"
      timeout: 10s
    grpc:
      addr: "0.0.0.0:50051"

aio:
  size: 100
  subsystems:
    store:
      subsystem:
        size: 100
        workers: 1
        batchSize: 100
      config:
        kind: sqlite  # also: postgres
        sqlite:
          path: resonate.db
          txTimeout: 250ms
        postgres:
          host: localhost
          port: 5432
          username: ""
          password: ""
          database: resonate
          txTimeout: 250ms
    network:
      subsystem:
        size: 100
        workers: 3
        batchSize: 100
      config:
        timeout: 10s

system:
  notificationCacheSize: 100
  submissionBatchSize: 100
  completionBatchSize: 100

metrics:
  port: 9090
```

Additionally, all configuration options can be specified as command line flags.
```bash
./resonate serve --help
```
