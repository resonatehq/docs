---
sidebar_position: 2
---

# Typescript

Resonate offers a Typescript SDK for writing simple and elegant durable async await applications.

## Install

```bash
npm install @resonatehq/sdk
```

## Initialize with default store

By default, Resonate uses a volatile promise store that will persist promises in memory.

```ts
import { Resonate, Context } from "@resonatehq/sdk";
const resonate = new Resonate();
```

## Initialize with durable store

Resonate can be configured to use a durable promise store. See the Resonate Server docs for details on how to run the durable promise store locally.

```ts
import { Resonate, Context } from "@resonatehq/sdk";
const resonate = new Resonate("https://localhost:8001");
```
