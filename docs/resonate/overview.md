---
sidebar_position: 1
---

# Overview

Welcome to the Overview section for the Resonate server! The Resonate server consists of a single binary that contains everything the SDKs needs for [durable mode](/sdks/typescript#durable-mode) to perform features such as recoverability, distributed locking, stateful reminders, fan-out/fan-in pattern, and more.

## Install the Latest Release

### MacOS

```shell
brew install --build-from-source resonate-hq/resonate/installation/brew/Formula/resonate.rb
```

### Linux

```shell
curl -fsSL https://github.com/resonatehq/resonate/blob/main/installation/linux/install.sh | sh
```

## Start

The following command starts the Resonate server with default configuration.

```bash
resonate serve
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
        kind: sqlite # also: postgres
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
