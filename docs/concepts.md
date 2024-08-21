---
pagination_next: null
pagination_prev: null
---

import local from '/img/local.png';

import remote from '/img/remote.png';

# Concepts

Welcome to the Concepts section! Let's explore the `4 fundamental concepts` that enable you to build reliable and coordinated distributed async/await applications.

````

## 3️⃣ Timeouts and Idempotency

Durable promises are attempted to be resolved and retried up until the specified timeout. It's crucial to ensure that the operations performed by your durable functions are [idempotent](https://blog.bitsrc.io/design-an-idempotent-api-in-2024-d4a3cf8d8bf2) to prevent undefined behavior.

```ts
const resonate = new Resonate({
  // Configures the default durable promise
  // timeout in ms, used for every function
  // executed by calling resonate.run.
  // Defaults to 1000.
  timeout: 5000,
});
````

## 4️⃣ Versioning your Functions

Function versioning is essential for creating durable promises. Idempotent functions can be safely retried without causing unintended side effects, enabling retry mechanisms to recover from transient issues. However, during retries, the function code must remain immutable to prevent versioning conflicts.

```ts
// Register `payments` function with a version number of 2,
// a function pointer to a local function,
// and other optionals configurations.
resonate.register(
  "payments",
  payments,
  resonate.options({
    version: 2,
    timeout: Number.MAX_SAFE_INTEGER,
  })
);
```

## The End

We hope this overview of the key concepts in our programming model has been insightful and engaging. By understanding Durable promises, the importance of a well-designed identity naming scheme, and how function versioning works, you're well on your way to building robust and reliable applications. Happy coding! 🚀
