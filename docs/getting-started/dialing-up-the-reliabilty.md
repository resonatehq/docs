---
sidebar_position: 2
---

# Dialing Up The Reliability 

Asynchronous programming enables non-blocking code for better performance, but also brings challenges in handling failures gracefully. The Resonate library tackles these issues by baking reliability into asynchronous operations. It offers two reliability modes - `Resilient` and `Durable` - to fit your specific needs, helping you write asynchronous code that stands resilient against failures.

## Prerequisite

- Latest stable version of NodeJS >= v18.17.1 
- npm CLI >= 9.6.7
- cURL

## The Fragile Foundation of Async • Await
> At the most basic level, we often rely on `volatile` async • await to create a simple abstraction for asynchronous code. However, the Achilles' heel lies in their vulnerability to failures. Consider the following example:

> Reliability Meter: VOLATILE


```tsx title="src/volatile-promises.tsx"

// If bar fails, foo will reject and all progress is lost.
export async function foo(n: number): Promise<number> {
    return await bar(n); 
}

export async function bar(n: number) Promise<number> {
     // do work...
}
```

## Adding Resiliency with the Resonate Library
> To elevate your code to the next level of reliability, embrace the Resonate library. With a slight modification to your async functions, allowing them to accept a Context object, you can leverage Resonate's run method. This transforms promises into resilient entities, capturing progress in-memory. Even after encountering failures, operations seamlessly resume from the last checkpoint. Yes. You can use this sdk WITHOUT an external server dependency!

> Reliability Meter: RESILIENT

```bash 
# download resonate sdk
npm install @resonate/sdk
```

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

## Adding Durability with the Resonate Engine
> Connecting Resonate to a durable server provides the ultimate level of reliability. Even in the face of application crashes and restarts, operation can resume from the last checkpoint. The only change from the resilient mode is including a URL to your resonate engine.

> Reliability Meter: DURABLE 

```bash 
# download nightly build with install script (recommended)
curl -fsSL https://resonatehq.sh/install | bash

# run resonate server 
resonate serve
```

```tsx title="src/durable-promises.tsx"
// point to resonate server
const url = 'http://localhost:8001';
const resonate = new Resonate(url); 
```

## Next steps

The Resonate library infuses reliability into asynchronous code. With two modes - volatile and durable - it caters to specific resilience needs.

