---
sidebar_position: 3
---

import local from '../../static/img/local.png';

import remote from '../../static/img/remote.png';

# Concepts

Welcome to the Concepts section! Let's explore the `4 fundamental concepts` that enable you to build reliable and coordinated distributed async/await applications.

## 1️⃣ Durable Promises

Durable promises are like regular promises but maintain progress in durable storage as a REST resource. They have a unique identity that persists beyond the execution of the underlying function. By doing this, if something goes wrong (like a power outage or network hiccup), the application can look back at the saved results, quickly skip to where it left off, and keeps going as if nothing ever happened, making your application resilient to unexpected failures and can recover gracefully.

### Key Use Cases

There are two common use cases for durable promises: local and remote.

#### Local

<center>
<img src={local} alt="local" width="500" /> 
</center>

The local use case involves a durable promise that is both created and completed by the same process. The primary focus is reliability, forming the bedrock for several powerful features:

- `Retries`: If a process fails while executing a durable promise due to a transient issue, such as network connectivity problems, it can be transparently retried, minimizing the impact of temporary failures.

- `Recoverability`: If a process crashes while executing a durable promise, it can recover and continue from where it left off, ensuring your application remains resilient.

- `Schedules`: Durable promises can be used to schedule statefule reminders using a simple HTTP/gRPC call.

#### Remote

<center>
<img src={remote} alt="remote" width="500" /> 
</center>

The remote use case involves a durable promise that is created by one process and completed by another distinct process. The primary purpose is to facilitate coordination between different processes or services, serving as the foundation for features like:

- `Task Framework`: Durable promises allow you to fan out tasks across multiple processes or machines, enabling parallel execution and load balancing, making your application more scalable.

- `Notifications`: When a durable promise is created or completed, it can trigger notifications to other processes or services that are interested in the result, enabling efficient communication and coordination.

- `Human in the Loop`: Durable promises can seamlessly integrate human input into your automated workflows, allowing for manual intervention or approval steps when needed.

## 2️⃣ Identity Naming Scheme for Durable Promises

In distributed async/await applications, durable promises are assigned a unique identifier (ID). This ID is used to store the computational progress and final result of the execution, allowing it to resume seamlessly from where it left off if interrupted.

```ts title="purchase.ts"
// UID uniquely identifies the purchase.
const uid = `purchase/user/${user.id}/song/${song.id}`;

// Run the registered 'purchase' function with the above uid and the following function arguments.
const val = await resonate.run("purchase", uid, user, song);
```

When designing the naming scheme for your durable promise IDs, keep the following considerations in mind:

:::note
If an ID is accidentally reused for a different execution, it will result in retrieving the stored result of the previous execution instead of starting a new one. This behavior differs from regular executions and can lead to confusion if not handled properly.
:::

1. `Uniqueness`: The naming scheme should guarantee uniqueness to avoid conflicts between executions.
2. `Readability`: Choose a naming scheme that is easy to understand and interpret, making it easier to debug and manage executions.
3. `Relevance`: Incorporate relevant information into the naming scheme, such as the purpose or context of the execution.

### Common Naming Approaches

#### Date-Based Naming Scheme

One very common approach is to use the date as part of the naming scheme to. For example, if you have a durable promise that fetches and aggregates news articles on a daily basis, you could include the date in the ID format to ensure uniqueness and provide clear indication of when the execution occurred.

```
news_feed_YYYY-MM-DD
```

#### Hierarchical Naming Scheme

You can use a hierarchical naming scheme similar to file system paths to represent the identity of a durable promise. The naming scheme can include information such as the environment, service, and specific execution details. For example:

```
staging/analytics/monthly-report/2023-05
```

#### Platform-Specific Naming Scheme

If your durable promises are running on a specific platform or orchestrator, you can incorporate the platform's identity concepts into the naming scheme. For example, if you are using Kubernetes, you can include the namespace, pod, and other relevant information:

```
k8s/staging/namespace/analytics/gpu/h100/monthly-report-2023-05
```

#### Opaque Naming Scheme with Metadata

In this case, the durable promise ID is a randomly generated unique identifier, and you would store the associated metadata (such as environment, service, execution details) in a separate database that can be queried using the ID.

```
executions/a7b89c3d-f012-4e78-9a7d-89a3f6b2e1c7
```

## 3️⃣ Timeouts and Idempotency

Durable promises are attempted to be resolved and retried up until the specified timeout. It's crucial to ensure that the operations performed by your durable functions are idempotent to prevent undefined behavior.

## 4️⃣ Versioning your Functions

Function versioning is essential for creating durable promises. Idempotent functions can be safely retried without causing unintended side effects, enabling retry mechanisms to recover from transient issues. However, during retries, the function code must remain immutable to prevent versioning conflicts.

## The End

We hope this overview of the key concepts in our programming model has been insightful and engaging. By understanding Durable promises, the importance of a well-designed identity naming scheme, and how function versioning works, you're well on your way to building robust and reliable applications. Happy coding! 🚀
