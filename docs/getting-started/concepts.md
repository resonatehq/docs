---
sidebar_position: 3
---

import local from '../../static/img/local.png';

import remote from '../../static/img/remote.png';

# Concepts

Welcome to the Concepts section of our documentation! Here, we'll dive into the 3 fundamental concepts that underpin our system, enabling you to build reliable and coordinated distributed systems with ease. Let's get started!

## 🌐 Durable Promises

Durable promises are a powerful concept that form the foundation of our system and all the features we offer. They are like regular promises which happen to maintain progress in durable storage. With this approach, function executions have a unique identity that persists beyond the execution of the underlying function. By storing promises in a database, your application becomes resilient to unexpected failures and can recover gracefully.

### 🎯 Durable Promise Schema

A durable promise is represented as a REST resource with the following schema:

```yaml title="durable-promise-schema.yaml"
type: object
required:
- id
- state
- timeout
- param
- value
- tags
properties:
id:
    type: string
state:
    $ref: "#/components/schemas/PromiseState"
param:
    $ref: "#/components/schemas/PromiseValue"
value:
    $ref: "#/components/schemas/PromiseValue"
timeout:
    type: integer
    format: int64
idempotencyKeyForCreate:
    type: string
    readOnly: true
idempotencyKeyForComplete:
    type: string
    readOnly: true
tags:
    type: object
    additionalProperties:
    type: string
createdOn:
    type: integer
    readOnly: true
completedOn:
    type: integer
    readOnly: true
```

They are similar to JavaScript promises but with added features and reliability guarantees. The key difference is that durable promises are stored in a database. By doing this, if something goes wrong (like a power outage or network hiccup), the application can look back at the saved results, quickly skip to where it left off, and keep going as if nothing ever happened. It's like having a super-reliable safety net for your application, ensuring that your system remains resilient and can recover gracefully from unexpected failures.

### 🧩 Usage Patterns

There are two common usage patterns for durable promises: local and remote.

#### 🏠 Local

<center>
<img src={local} alt="local" width="500" /> 
</center>

The local usage pattern involves a durable promise that is both created and completed by the same process. The primary focus is reliability, forming the bedrock for several powerful features:

- 🔁 **Retries**: If a process fails while executing a durable promise due to a transient issue, such as network connectivity problems, it can be transparently retried, minimizing the impact of temporary failures.

- 🔄 **Recoverability**: If a process crashes while executing a durable promise, it can recover and continue from where it left off, ensuring your application remains resilient.

- 📅 **Schedules**: Durable promises can be used to schedule statefule reminders using a simple HTTP/gRPC call.

#### 🌍 Remote

<center>
<img src={remote} alt="remote" width="500" /> 
</center>

The remote usage pattern involves a durable promise that is created by one process and completed by another distinct process. The primary purpose is to facilitate coordination between different processes or services, serving as the foundation for features like:

- 🧩 **Task Framework**: Durable promises allow you to fan out tasks across multiple processes or machines, enabling parallel execution and load balancing, making your application more scalable.

- 🔔 **Notifications**: When a durable promise is created or completed, it can trigger notifications to other processes or services that are interested in the result, enabling efficient communication and coordination.

- 👥 **Human in the loop**: Durable promises can seamlessly integrate human input into your automated workflows, allowing for manual intervention or approval steps when needed.

The local and remote usage patterns showcase the versatility of durable promises in addressing various application requirements. By leveraging the power of durable promises, you have the abstraction you need for building `reliable` and `coordinated` distributed systems.

## 🆔 Identity Naming Scheme for Durable Promises

:::info WORK IN PROGRESS
This section is a work in progress. We have chosen to build in public, which means that some sections may be incomplete and information may change at any time.
:::

In our system, durable promises are assigned a unique identifier (ID) that serves a crucial purpose. This ID is used to store the computational progress and final result of the execution, allowing it to resume seamlessly from where it left off if interrupted. Durable Promise IDs idiomatically follow the following structure:

`Durable Promise ID` = `SERVER_DOMAIN`/`BUSINESS ID`

This is conventient because the Durable Promise ID maps to the actual network address of the REST resource. For example:

```ts title="purchase.ts"
const domain = "http://example.com/promise";
const business_id = `purchase/user/${user.id}/song/${song.id}`;

// id uniquely identifies the purchase
const id = `${domain}/${business_id}`;

const val = await resonate.run("purchase", id, user, song);
```

### 🎨 Naming Scheme Considerations

When designing the naming scheme for your durable execution IDs, keep the following considerations in mind:

1. **Uniqueness**: The naming scheme should guarantee uniqueness to avoid conflicts between executions. If an ID is accidentally reused for a different execution, it will result in retrieving the stored result of the previous execution instead of starting a new one. This behavior differs from regular executions and can lead to confusion if not handled properly.
2. **Readability**: Choose a naming scheme that is easy to understand and interpret, making it easier to debug and manage executions.
3. **Relevance**: Incorporate relevant information into the naming scheme, such as the purpose or context of the execution.

### 🌳 Common Naming Approaches

#### 📁 Hierarchical Naming Scheme

You can use a hierarchical naming scheme similar to file system paths to represent the identity of a durable execution. The naming scheme can include information such as the environment, service, and specific execution details. For example:

```
http://example.com/staging/analytics/monthly-report/2023-05
```

In these examples, the durable execution ID includes the environment (`prod` or `staging`), the service or functionality (`data-processing` or `analytics`), and the specific execution details (`daily-summary` or `monthly-report`) along with the relevant date.

#### 🚀 Platform-Specific Naming Scheme

If your durable executions are running on a specific platform or orchestrator, you can incorporate the platform's identity concepts into the naming scheme. For example, if you are using Kubernetes, you can include the namespace, pod, and other relevant information:

```
http://example.com/k8s/prod/namespace/data-processing/pod/daily-summary-2023-06-01
```

or,

```
http://example.com/k8s/staging/namespace/analytics/gpu/h100/monthly-report-2023-05
```

This naming scheme allows you to map the durable execution ID to the specific platform's identity, making it easier to understand and manage the executions within the context of the platform.

#### 🔐 Opaque Naming Scheme with Metadata

In this case, the durable execution ID is a randomly generated unique identifier, and you would store the associated metadata (such as environment, service, execution details) in a separate database that can be queried using the ID.

If you prefer to keep the durable execution ID opaque and store the associated metadata separately, you can use a unique identifier as the ID and maintain a secondary database to store the metadata. For example:

```
http://example.com/executions/a7b89c3d-f012-4e78-9a7d-89a3f6b2e1c7
```

### 📅 Date-Based Naming Scheme

One very common approach is to use the date as part of the naming scheme. This is particularly useful when the frequency of execution is based on time intervals. For example:

- **Daily News Feed**: If you have a durable execution that fetches and aggregates news articles on a daily basis, you could include the date in the ID format, such as `news_feed_YYYY-MM-DD`.
- **Monthly Data Summarization**: For a durable execution that generates a summary of data every month, you could use a naming scheme like `data_summary_YYYY-MM`.

By incorporating the date into the naming scheme, you ensure uniqueness and provide a clear indication of when the execution occurred.

Remember to choose a naming scheme that aligns with your specific use case and requirements, taking into account factors such as uniqueness, readability, and relevance to the purpose of the durable execution.

## 🔐 Versioning your Functions

:::info WORK IN PROGRESS
This section is a work in progress. We have chosen to build in public, which means that some sections may be incomplete and information may change at any time.
:::

---

We hope this overview of the key concepts in our system has been insightful and engaging. By understanding local and remote promises, as well as the importance of a well-designed identity naming scheme for durable executions, you're well on your way to building robust and reliable applications. Happy coding! 🚀
