---
sidebar_position: 2
---

# Dialing Up The Reliability 

Asynchronous programming empowers developers to craft non-blocking code, ushering in enhanced performance and responsiveness. Nevertheless, the realm of asynchronous code is not without its own set of challenges, especially when it comes to gracefully handling failures.

Enter the Resonate library – your key to conquering these challenges by infusing reliability into your asynchronous code. Resonate doesn't just enable asynchronous operations; it empowers you to make them resilient. Offering two distinct reliability modes – `Volatile` and `Durable` – Resonate caters to your specific needs, ensuring your code stands strong against the unpredictable winds of failure.

## Prerequisite

-- node stuff -- typescript version

## The Fragile Foundation of Vanilla Promises
> mode: volatile

import myLow from '../static/img/rel_low.png';

<img src={myLow} alt="Example banner" width="200" />

1) no -- vanilla -> volatile 
2) no promises -> say async await -- functions and promises only then is it programming model... 

At the most basic level, we often rely on vanilla promises to create a simple abstraction for asynchronous code. However, the Achilles' heel lies in their vulnerability to failures. Consider the following example:

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
> mode: resilient

import myMid from '../static/img/rel_mid.png';

<img src={myMid} alt="Example banner" width="200" />

REMIND: no volatile store in sdk -- 
ResilientStore

```bash 
# download resonate sdk
npm install @resonate/sdk
```

To elevate your code to the next level of reliability, embrace the Resonate library. With a slight modification to your async functions, allowing them to accept a Context object, you can leverage Resonate's run method. This transforms promises into resilient entities, capturing progress in-memory. Even after encountering failures, operations seamlessly resume from the last checkpoint.


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

## Adding Durability with the Resonate Server
> mode: durable 

import myHigh from '../static/img/rel_high.png';

<img src={myHigh} alt="Example banner" width="200" /> 

```bash 
# download nightly build with install script (recommended)
curl -fsSL https://resonatehq.sh/install | bash
```

Connecting Resonate to a durable server provides enduring capabilities. Progress persists across application restarts. The only change is including URL. 

For the epitome of resilience, connect Resonate to a durable server. This transforms promises into entities with enduring capabilities. Even in the face of application crashes and restarts, progress persists. By seamlessly integrating Resonate with a durable server, operations can resume from the last checkpoint, irrespective of the tumultuous journey.


```tsx title="src/durable-promises.tsx"
const url = 'http://localhost:8001';
const resonate = new Resonate(url); 
```

## Next steps

The Resonate library infuses reliability into asynchronous code. With two modes - volatile and durable - it caters to specific resilience needs.

