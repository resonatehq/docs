---
sidebar_position: 2
---

# Typescript

Welcome to Resonate's guide to the Resonate Typescript SDK! This SDK makes it easy to write distributed async/await applications with elegance and simplicity. Let's dive in and explore how you can leverage this powerful tool.

## Installation

To get started, simply install the SDK using npm:

```bash
npm install @resonatehq/sdk
```

## Modes of Operation

The Resonate SDK offers two modes of operation: Default and Durable. Choose the mode that best suits your application's requirements.

### Default Mode

In the default mode, Resonate uses a volatile in-memory promise store. This mode provides out-of-the-box features such as transparent retries, tracing, and logging. Here's an example of how to use the default mode:

```ts
import { Resonate, Context } from "@resonatehq/sdk";

const resonate = new Resonate();

// In resonate durable functions, all interaction with the runtime occurs through the Resonate context. This context provides a set of methods that allow you to perform actions such as running durable stepr, or calling workers.
async function purchase(ctx: Context, user: User, song: Song): Promise<Status> {
  const charged = await ctx.run(charge, user, song);
  const granted = await ctx.run(access, user, song);
  return { charged, granted };
}

// resonate.register() register a durable function (start with resonate.Context as first argument) and unique key.
resonate.register("purchase", purchase);

// resonate.run() will transparently retry against transient failures like network issues.
const val = await resonate.run("purchase", id, user, song);

// Starts the Resonate application.
resonate.start();
```

You can also schedule reminders as durable promises in-memory:

```ts
resonate.schedule("everyHour", "0 * * * *", (ctx: Context) => {
  console.log("every hour", Date.now());
});
```

### Durable Mode

For advanced use cases that require recoverability, stateful reminders, and a distributed task framework, Resonate can be configured to use a durable promise store. To use durable mode, you'll need to first run the Resonate Server locally. Refer to the [Resonate Server docs](/resonate/quickstart) for detailed setup instructions.

The only difference to initialize Resonate in durable mode is passing the address of the Resonate Server:

```ts
import { Resonate, Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
});
```

## Configurations

:::info
Timeouts are a specially important configuration to be aware of. Durable promises are attempted to be resolved and retried up until the configured promise timeout. Additionally, ensure that the operations performed by your durable functions are idempotent to prevent side effects.
:::

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

While you may run your tests without using the server, since the SDK can run separately. We also recommend using [Test Containers](https://testcontainers.com/):

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
