---
sidebar_position: 2
---

# Configuration

Resonate is designed to run out of the box with smart defaults, minimizing the need for complex configuration. Simply run the following command to start with the default settings:

```bash
resonate serve
```

Of course, configuration options are still available if needed to customize for your specific needs. Resonate uses Viper for configuration management. Viper allows specifying configuration options via config files and flags.

## Configure Resonate with YAML File

A config yaml file can be provided to specify configuration options. This file should be in YAML format. For example:

```yaml
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
      config:
        kind: sqlite # swap to postgres to utilize the postgres config
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
      subsystem:
        size: 100
        workers: 1
        batchSize: 100
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

To start the server with this config file, run:

```bash
./server --config config.yml
```

Viper will read in this config file and populate the server configuration from it. Any configuration options specified in this file will override defaults.

## Configure Resonate with Flags

All configuration options are also exposed as flags and the documentation for it can be seen with:

```bash
resonate serve --help
```
