---
sidebar_position: 3
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

All requests may include a `request-id` header that can be used to trace a request through the system.
