---
sidebar_position: 2
---

# Typescript

Resonate offers a Typescript SDK for writing simple and elegant distributed async await applications.

## Install

```bash
npm install @resonatehq/sdk
```

## Default mode

By default, Resonate uses a volatile promise store that stores promises in memory.

```ts
import { Resonate, Context } from "@resonatehq/sdk";
const resonate = new Resonate();
```

## Durable mode

Resonate can be configured to use a durable promise store. See the [Resonate Server docs](/resonate/quickstart) for details on how to run the durable promise store locally.

```ts
import { Resonate, Context } from "@resonatehq/sdk";
const resonate = new Resonate({ url: "http://localhost:8001" });
```
