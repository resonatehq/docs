---
sidebar_position: 2
---

# Quickstart

## Prerequisites

- NodeJS

## Steps

Install ts-node.
```
npm install -g ts-node
```

Install the Resonate SDK and Express.
```bash
npm install @resonatehq/sdk
npm install express @types/express
```

Create a file named **app.ts** and write a simple Resonate application combining durable async await with an express web server. This application simulates charging a user for a song.

```tsx title="app.ts"
import { Resonate, Context } from "@resonatehq/sdk";
import express, { Request, Response } from "express";

type User = {
  id: number;
};

type Song = {
  id: number;
  price: number;
};

type Status = {
  charged: boolean;
  granted: boolean;
};

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

// Initialize Resonate app
const resonate = new Resonate();
resonate.register("purchase", purchase);

// Initialize Express app
const app = express();
app.use(express.json())

app.post("/purchase", async (req: Request, res: Response) => {
  const user = { id: req.body?.user ?? 1 };
  const song = { id: req.body?.song ?? 1, price: 1.99 };

  // id uniquely identifies the purchase
  const id = `purchase-${user.id}-${song.id}`;

  try {
    res.send(await resonate.run("purchase", id, user, song));
  } catch (err) {
    res.status(500).send("Could not purchase song");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
```

Now we can start the application.
```bash
ts-node app.ts
```

Next, call the endpoint providing a user and song id in the payload of the request.

```
curl \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"user": 1, "song": 1}' \
  http://localhost:3000/purchase
```

Play around with providing different values for both the user and song id. Notice that multiple requests with the same ids will not result in duplicated charges. This is because the identity of a purchase is defined by the value provided to `run` that, in contrast to a regular function call, outlives a single execution.

By default, Resonate uses a volatile promise store that stores promises in memory. See [durable mode](/sdks/typescript#durable-mode) for details on how to connect to the Resonate server.
