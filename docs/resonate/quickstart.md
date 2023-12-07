---
sidebar_position: 1
---

# Quickstart

## Downloads

Use the links below to download the latest release of the Resonate server. If you do not see an applicable download you can [build from source](https://github.com/resonatehq/resonate). Please note that Resonate is currently a work in progress and the server is provided as-is.

| OS | Architecture | Download |
| -- | ------------ | :------: |
| MacOS | x86_64    | <a href="https://storage.googleapis.com/resonate-release/darwin-x86_64/resonate"><i class="bx bx-xs bx-download"></i></a> |
| MacOS | aarch64   | <a href="https://storage.googleapis.com/resonate-release/darwin-aarch64/resonate"><i class="bx bx-xs bx-download"></i></a> |
| Linux | x86_64    | <a href="https://storage.googleapis.com/resonate-release/linux-x86_64/resonate"><i class="bx bx-xs bx-download"></i></a> |
| Linux | aarch64   | <a href="https://storage.googleapis.com/resonate-release/linux-aarch64/resonate"><i class="bx bx-xs bx-download"></i></a> |

## Start

The following command starts the Resonate server with default configuration.

```bash
chmod +x resonate
./resonate serve
```

## Configuration

Optionally, you can start Resonate with a configuration file.
```bash
./resonate serve --config resonate.yml
```

The following example file lists all default settings.

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
