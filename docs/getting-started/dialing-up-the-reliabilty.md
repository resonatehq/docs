---
sidebar_position: 2
---

# Quickstart

## Prerequisite

- Latest stable version of NodeJS >= v18.17.1
- npm CLI >= 9.6.7

## Adding Resiliency with the Resonate Library

To elevate your code to the next level of reliability, embrace the Resonate library. With a slight modification to your async functions, allowing them to accept a Context object, you can leverage Resonate's run method. This transforms promises into resilient entities, capturing progress in-memory. Even after encountering failures, operations seamlessly resume from the last checkpoint. Yes. You can use this sdk WITHOUT an external server dependency!

Download Resonate SDK:

```bash
npm install https://github.com/resonatehq/resonate-sdk-ts
```

Add resiliency to your application:

```tsx title="src/resilient-promises.tsx"
import { Resonate, Context } from "resonate-sdk-ts";

const resonate = new Resonate();

// Use Resonate to run your async function reliably.
const result = await resonate.run("foo", "fooUID", 5);

// Progress saved in memory.
async function foo(c: Context, n: number): Promise<number> {
  return await c.run(bar, n);
}

async function bar(c: Context, n: number): Promise<number> {
  return 2 * n;
}
```

## Adding Durability with the Resonate Engine

Connecting Resonate to a durable server provides the ultimate level of reliability. Even in the face of application crashes and restarts, operation can resume from the last checkpoint. The only change from the resilient mode is including a URL to your resonate engine.

Download nightly build with install script and run Resonate engine:

|  OS   | Architecture |                                                                               Link |
| :---: | :----------: | ---------------------------------------------------------------------------------: |
| MacOS |    x86_64    |  [Install](https://storage.googleapis.com/resonate-release/darwin-x86_64/resonate) |
| MacOS |   aarch64    | [Install](https://storage.googleapis.com/resonate-release/darwin-aarch64/resonate) |
| Linux |    x86_64    |   [Install](https://storage.googleapis.com/resonate-release/linux-x86_64/resonate) |
| Linux |   aarch64    |  [Install](https://storage.googleapis.com/resonate-release/linux-aarch64/resonate) |

Once you added resonate to your path, start resonate:

```bash
resonate serve
```

Point Resonate library to the Resonate engine:

```tsx title="src/durable-promises.tsx"
// Point to resonate engine.
const resonate = new Resonate("http://localhost:8001");
```

## Next steps

Let's go learn more about how the SDK works.
