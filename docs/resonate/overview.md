---
sidebar_position: 1
---

# Overview

Welcome to the Overview section for the Resonate server! The Resonate server consists of a single binary that contains everything the SDKs needs for [durable mode](/sdks/typescript#durable-mode) to perform features such as recoverability, distributed locking, stateful reminders, fan-out/fan-in pattern, and more.

## Installation

To get started, simply install the Resonate CLI using either of the following options:

### MacOS

```shell
brew install --build-from-source resonate-hq/resonate/installation/brew/Formula/resonate.rb
```

### Linux

```shell
curl -fsSL https://github.com/resonatehq/resonate/blob/main/installation/linux/install.sh | sh
```

## Starting the Server

The following command starts the Resonate server with default configuration.

```bash
resonate serve
```

## Resonate API

This is an overview of the Resonate API surface area.

### Promises API

[OpenAPI Specification](https://github.com/resonatehq/resonate/blob/main/api/promises-openapi.yml)

The Promise API is the core of the Resonate server. It allows us to store computational progress in a database. By doing this, we can offer `recoverability` to processes using our SDK even after a process crash due to hardware or software failures. Currently, we support two databases:

1. SQLite (default)
2. PostgreSQL

If you don't see the database you are looking for, we are highly composable and eagerly accept contributions!

### Tasks API

[OpenAPI Specification](https://github.com/resonatehq/resonate/blob/main/api/tasks-openapi.yml)

The Tasks API allows users to route durable promises to a set of workers. This is very useful for implementing the `Fan-out/Fan-in pattern`. Unlike the other APIs, this requires a small amount of server configuration to set up the routing rules.

### Schedules API

[OpenAPI Specification](https://github.com/resonatehq/resonate/blob/main/api/schedules-openapi.yml)

The Schedules API allows users to schedule the creation of durable promises with a cron expression. This is useful for creating `stateful reminders`, also known as cron jobs. Applications can either poll for the created stateful reminders, which will persist beyond crashes, or pair it with the distributed tasks framework. When paired, the creation of a durable promise automatically gets routed and triggers a process at certain intervals.

### Distributed Locks API

[OpenAPI Specification](https://github.com/resonatehq/resonate/blob/main/api/locks-openapi.yml)

The Distributed Locks API is used to provide `mutually exclusive access` to a resource. This is primarily used as an internal API for the SDKs and Workers, but can also be used as a standalone API by the user.

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
