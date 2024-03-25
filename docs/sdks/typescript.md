---
sidebar_position: 1
---

# Typescript

Welcome to Resonate's guide to the Resonate Typescript SDK! This SDK makes it easy to write distributed async/await applications with elegance and simplicity. Let's dive in and explore how you can leverage this powerful tool.

## Installation

To get started, simply install the SDK using npm:

```bash
npm install @resonatehq/sdk
```

## Getting Started

It all starts with a top-level object creation:

```ts
import { Resonate } from "@resonatehq/sdk";

const resonate = new Resonate();
```

## Registering Functions

To fully leverage the potential of Resonate, you must first register your function. Once registered, you can invoke it using `resonate.run`, passing the registered function's ID, a UID for the execution, and the function's arguments. `resonate.run` will execute your code until completion, even in the presence of hardware or software failure.

```ts
import { Resonate, Context } from "@resonatehq/sdk";

resonate.register("purchase", purchase);

resonate.run("purchase", id, user, song);
```

## Resonate Context

All interactions with the runtime occur through the Resonate context, which provides methods like `ctx.run()`. These methods offer transparent retries, recoverability, task distribution, and more. Therefore, all top-level functions and intermediary steps must accept a Resonate context as their first argument.

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

## Configurations

Resonate provides a range of configuration options to customize its behavior. If options are not provided, sensible defaults are used.

### Global Configuration

You can configure the SDK globally via the top-level Resonate object:

```ts
const resonate = new Resonate({
  // The remote promise store URL. If not provided, an in-memory promise store will be used.
  url: "https://my-remote-store.com",
  // A logger instance. If not provided, a default logger will be used.
  logger: myLogger,
  // A retry instance. Defaults to exponential backoff.
  retry: myRetry,
  // The default promise timeout in ms, used for every function executed by calling run. Defaults to 1000.
  timeout: 5000,
  // Tags to add to all durable promises.
  tags: Record<string, string>,
});
```

### Function-specific Configuration

When registering functions with `resonate.register()`, you can provide function-specific options:

```ts
resonate.register(
  "downloadAndSummarize",
  downloadAndSummarize,
  resonate.options({
    // Overrides the default timeout.
    timeout: Number.MAX_SAFE_INTEGER,
    // Overrides the default retry policy.
    retry: IRetry,
    // Additional tags to add to the durable promise.
    tags: Record<string, string>,
  })
);
```

## Testing

While you can run your tests without utilizing the server, as the SDK can operate separately, we also recommend using [Test Containers](https://testcontainers.com/):

```ts
import { GenericContainer } from "testcontainers";

describe("Resonate Integration Test", () => {
  let resonateContainer: GenericContainer;

  beforeAll(async () => {
    // Start a Resonate test container.
    resonateContainer = await new GenericContainer("resonate:1.0.0")
      .withExposedPorts(8001)
      .start();
  });

  afterAll(async () => {
    // Stop the Resonate test container.
    await resonateContainer.stop();
  });

  it("test", async () => {
    // ...
  });
});
```

## Next Steps

We hope this guide has provided you with a solid foundation for working with the Resonate Typescript SDK. If you have any questions or need further assistance, don't hesitate to reach out to our support team. For next steps, consider the following:

- Refer to our [API reference](https://resonatehq.github.io/resonate-sdk-ts/index.html) for a complete list of available methods and options.
- Refer to our [TypeScript Quickstart Repo](https://github.com/resonatehq/quickstart-ts/tree/main) for in-depth code examples of the TypeScript SDK.
