---
sidebar_position: 2
---

# Dialing Up The Reliability 

Asynchronous programming enables non-blocking code for better performance, but also brings challenges in handling failures gracefully. The Resonate library tackles these issues by baking reliability into asynchronous operations. It offers two reliability modes - **Resilient** and **Durable** - to fit your specific needs, helping you write asynchronous code that stands resilient against failures.

## Prerequisite

- Latest stable version of NodeJS >= v18.17.1 
- npm CLI >= 9.6.7
- cURL

## The Fragile Foundation of Async • Await

At the most basic level, we often rely on volatile async • await to create a simple abstraction for asynchronous code. However, the Achilles' heel lies in their vulnerability to failures. Consider the following example:

```tsx title="src/volatile-promises.tsx"
// If bar fails, foo will reject and all progress is lost.
async function foo(n: number): Promise<number> {
  return await bar(n)
}

async function bar(n: number): Promise<number> {
  return 2 * n
}
```

## Adding Resiliency with the Resonate Library

To elevate your code to the next level of reliability, embrace the Resonate library. With a slight modification to your async functions, allowing them to accept a Context object, you can leverage Resonate's run method. This transforms promises into resilient entities, capturing progress in-memory. Even after encountering failures, operations seamlessly resume from the last checkpoint. Yes. You can use this sdk WITHOUT an external server dependency!

Download Resonate SDK:
```bash 
npm install @resonate/sdk
```

Add resiliency to your application:
```tsx title="src/resilient-promises.tsx"
import { Resonate } from '@resonate/sdk';

const resonate = new Resonate();

// Use Resonate to run your async function reliably. 
const result = await resonate.run("foo", "fooUID", 5);

// Progress saved in memory. 
async function foo(c: Context, n: number): Promise<number> {
  return await c.run(bar, n)
}

async function bar(c: Context, n: number): Promise<number> {
  return 2 * n
}
```

## Adding Durability with the Resonate Engine

Connecting Resonate to a durable server provides the ultimate level of reliability. Even in the face of application crashes and restarts, operation can resume from the last checkpoint. The only change from the resilient mode is including a URL to your resonate engine.

Download nightly build with install script and run Resonate engine: 

```bash 
curl -fsSL https://resonatehq.sh/install | bash # for macOS and Linux
resonate serve
```

Point Resonate library to the Resonate engine:
```tsx title="src/durable-promises.tsx"
// Point to resonate engine. 
const url = 'http://localhost:8001';
const resonate = new Resonate(url); 
```

## Next steps

The Resonate library infuses reliability into asynchronous code. With two modes - resilient and durable - it caters to specific resilience needs.

