---
sidebar_position: 1
---

# Typescript

Welcome to Resonate's guide to the Resonate TypeScript SDK! This SDK makes it easy to write distributed async/await applications with TypeScript. In this guide, we will explore the minimal yet powerful API surface area the SDK offers.

## Installation

To get started, simply install the SDK using npm:

```bash
npm install @resonatehq/sdk
```

## Initializing Resonate

Begin by creating a top-level Resonate object:

```ts
import { Resonate } from "@resonatehq/sdk";

const resonate = new Resonate();
```

### Registering and Running Functions

To leverage Resonate's capabilities, first register your function with the Resonate object using `resonate.register()`. Provide a unique function ID and a function pointer to your local function. Once registered, you can invoke the registered function using `resonate.run()` by passing the function's ID, a unique identifier (UID) for the specific execution, and any required arguments.

```ts
import { Resonate, Context } from "@resonatehq/sdk";

const resonate = new Resonate();

resonate.register("purchase", purchase);

resonate.run("purchase", uid, user, song);

resonate.start();
```

`resonate.run()` ensures your code executes to completion, even in the presence of hardware or software failures. Remember to start the Resonate application by calling `resonate.start()`!

### Execution Modes

Resonate offers two execution modes: Default and Durable.

#### Default Mode

In the default mode, Resonate utilizes a volatile in-memory promise store. This mode provides out-of-the-box features like transparent retries, tracing, and logging without requiring `any` additional infrastructure.

```ts
import { Resonate } from "@resonatehq/sdk";

const resonate = new Resonate();
```

#### Durable Mode

For advanced use cases requiring recoverability, stateful reminders, and a distributed task framework, configure Resonate to use a durable promise store. To enable durable mode, run the Resonate Server locally (refer to the [Resonate Server docs](/resonate/quickstart) for setup instructions) and pass the server's address when initializing Resonate:

```ts
import { Resonate } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
});
```

## Resonate Context

Interactions with the runtime occur through the `Resonate Context`, which provides methods like `ctx.run()`. These methods offer transparent retries, recoverability, task distribution, and more. All top-level functions (invoked by `resonate.run()`) and intermediary functions (invoked by `ctx.run()`) must accept a Resonate context as their first argument.

```ts
async function purchase(ctx: Context, user: User, song: Song): Promise<Status> {
  const charged = await ctx.run(charge, user, song);
  const granted = await ctx.run(access, user, song);
  return { charged, granted };
}

async function charge(ctx: Context, user: User, song: Song): Promise<boolean> {
  console.log(`Charged user:${user.id} $${song.price}.`);
  return true;
}

async function access(ctx: Context, user: User, song: Song): Promise<boolean> {
  console.log(`Granted user:${user.id} access to song:${song.id}.`);
  return true;
}
```

### In-Process

In-process execution enables durable execution of functions within the same process by passing a function pointer to a local function followed by its arguments.

```ts
ctx.run(download, arg1, arg2, ...);
```

### Out-Process

Out-process execution allows offloading tasks to dedicated workers by passing a URL to an available worker followed by its arguments.

:::note
Out-process execution requires the Resonate server and proper configuration to route tasks to workers. Refer to the [Resonate Server docs](/resonate/quickstart) for more information.
:::

```ts
ctx.run(`/gpu/summarize/${url}`, arg);
```

## Configurations

Resonate offers various configuration options to customize its behavior. If options are not provided, sensible defaults are used.

### Global Configuration

Configure the SDK globally via the top-level Resonate object:

```ts
const resonate = new Resonate({
  url: "https://my-remote-store.com", // The remote promise store URL. If not provided, an in-memory promise store will be used.
  retry: myRetry, // A retry instance. Defaults to exponential backoff.
  timeout: 5000, // The default promise timeout in ms, used for every function executed by calling run. Defaults to 1000.
  tags: Record<string, string>, // Tags to add to all durable promises.
});
```

### Function-specific Configuration

When registering functions with `resonate.register()`, provide function-specific options:

```ts
resonate.register(
  "downloadAndSummarize",
  downloadAndSummarize,
  resonate.options({
    timeout: Number.MAX_SAFE_INTEGER, // Overrides the default timeout.
    retry: IRetry, // Overrides the default retry policy.
    tags: Record<string, string>, // Additional tags to add to the durable promise.
  })
);
```

Additionally, override functions in `ctx.run()`:

:::note
The options, such as timeout, cannot exceed the parent function. If it does, the minimum will take precedence.
:::

```ts
ctx.run(download, arg1, arg2, resonate.options({}));
```

## Next Steps

We hope this guide has provided you with a solid foundation for working with the Resonate Typescript SDK. If you have any questions or need further assistance, don't hesitate to reach out to us. For next steps, consider the following:

- Refer to our [API reference](https://resonatehq.github.io/resonate-sdk-ts/index.html) for a complete list of available methods and options.
- Refer to our [TypeScript Quickstart Repo](https://github.com/resonatehq/quickstart-ts/tree/main) for in-depth code examples of the TypeScript SDK.
