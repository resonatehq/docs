---
slug: /
sidebar_position: 1
---

# Why Resonate?

Resonate offers a cloud computing model that allows you to build resilient applications using an intuitive programming interface you already know — **async • await**. 

```tsx title="src/aha.tsx"
import { Resonate } from '@resonate/sdk';

const resonate = new Resonate();

const result = await resonate.run("foo", "fooUID", 5);

async function foo(c: Context, n: number): Promise<number> {
    return await c.run(bar, n); 
}

async function bar(c: context, n: number) Promise<number> {
     return 2 * n;
}
```

## Dead Simple Coordination

With a familiar async • await interface, you can create and coordinate distributed services without learning complex failure handling techniques or vendor-specific concepts. On day one, use your existing async • await programming knowledge to build systems that recover gracefully. 


## Various Degrees of Reliability

The Resonate library offers two reliability modes to meet your needs:
- *Resilient* mode provides medium failsafe protection with progress stored in-memory, for less critical applications or testing. 
- *Durable* mode offers the highest reliability with complete fault-tolerance across application restarts, using the Resonate engine.

You can tune between these two modes like a slider, depending on your reliability requirements.

## Next Step

Let's go learn how to dial up the reliability of your application. 