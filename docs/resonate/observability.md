---
sidebar_position: 4
---

# Observability

Welcome to the Resonate Observability guide! Let's explore the big 3 of observability for the Resonate server:

## Logs

The Resonate log level can be specified by with the `--log-level` flag. The available levels are:

- DEBUG
- INFO
- WARN
- ERROR

## Metrics

Resonate comes configured by default with a metrics server that emits the following Prometheus metrics:

| Metric Name                 | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `aio_total_submissions`     | The total number of AIO submissions.             |
| `aio_in_flight_submissions` | The current number of in flight AIO submissions. |
| `api_total_requests`        | The total number of API requests.                |
| `api_in_flight_requests`    | The current number of in flight API requests.    |
| `coroutines_total`          | The total number of coroutines.                  |
| `coroutines_in_flight`      | The current number of in flight coroutines.      |

## Traces

:::info WORK IN PROGRESS
This guide is a work in progress. We have chosen to build in public, which means that some sections may be incomplete and information may change at any time.
:::
