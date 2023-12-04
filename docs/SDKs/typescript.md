---
sidebar_position: 2
---

# Typescript SDK

Resonate offers a Typescript SDK for authoring durable promises using Typescript.

## Installation

The Typescript SDK can be installed via npm:

```bash
npm install @resonatehq/sdk
```

## Features

### How to Add Durability to your Async • Await Code

Durable promises can be created like so:

```tsx title="src/resilient-promises.tsx"
import { Resonate, Context } from "@resonatehq/sdk";

const resonate = new Resonate();

const result = await resonate.run("foo", "fooUID", 5);

// Progress saved in memory.
async function foo(c: Context, n: number): Promise<number> {
  return await c.run(bar, n);
}

async function bar(c: Context, n: number): Promise<number> {
  return 2 * n;
}
```

## Observability

The SDK provides:

- Metrics (using OpenTelemetry)
- Logging
- Tracing (using OpenTelemetry)

This allows monitoring runtime behavior, performance and debugging.

## Testing and Local Development

The Resonate SDK simplifies local development and testing by allowing you to run in-memory, eliminating the need to connect to a live Resonate engine. This provides fast feedback without mocking services or dependencies, streamlining the development process.

## Debugging

The SDK provides clear error reporting to debug promise failures. Errors include coded classifications to easily identify common problems.

See the [error code reference](../reference/error-codes.md) for more details.

<!-- ## Security

The NPM package is cryptographically signed to ensure it originates from Resonate. Follow these steps to verify the integrity of provenance attestations for resonate dependencies:

```bash
npm audit signatures
``` -->
