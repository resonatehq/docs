---
sidebar_position: 2
---

# Typescript SDK

Resonate offers a Typescript SDK to author Durable Promises using Typescript. 

## Installation 

The Typescript SDK can be install via npm:
```bash 
npm install @resonate/sdk
```

## Features

### How to create a durable promise

Durable promises can be created like so: 

```tsx title="src/resilient-promises.tsx"
import { Resonate } from '@resonate/sdk';

// Initialize Resonate.
const resonate = new Resonate();

// Use Resonate's features in your application.
const result = await resonate.run("foo", "fooUID", 5);
console.log(result);

// Progress saved in memory. 
export async function foo(c: Context, n: number): Promise<number> {
    return await c.run(bar, n); 
}

export async function bar(c: context, n: number) Promise<number> {
     // do work...
}
```

## Observability 
The SDK provides observability via:

- Metrics using OpenTelemetry
- Logging using default logger
- Tracing using OpenTelemetry

This allows monitoring the runtime behavior and performance of promises.

## Testing

The SDK enables easy local testing of promises without needing to connect to a live Resonate server. Promises can be executed in-memory for fast feedback during development.

There is no need to mock services or dependencies. The in-memory execution acts as a sandboxed environment.

## Debugging

The SDK provides clear error reporting to debug promise failures. Errors include coded classifications to easily identify common problems.

See the error code reference for details.

## Security 

The SDK package is signed and verified to ensure it originates from Resonate.

Follow these steps to verify the authenticity of the package:

Fetch the package signature from the npm registry
Verify the signature against the package contents
Check that the signature chains back to a trusted Resonate key

This prevents supply chain attacks through a compromised npm account