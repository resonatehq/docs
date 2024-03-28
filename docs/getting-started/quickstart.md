---
sidebar_position: 2
---

import pipeline from '../../static/img/pipeline.png';

# Quickstart

Welcome to the Resonate SDK quickstart! This quickstart is designed to give you a rapid introduction to the core concepts and syntax of the Resonate SDK. By the end, you'll have a basic understanding of how to register functions, run them with unique identifiers, and integrate Resonate with a web server.

## Prerequisites

- NodeJS
- npm

## Setup

Create project folder.

```bash
mkdir resonate-quickstart && cd resonate-quickstart
```

Install ts-node.

```bash
npm init -y && npm install typescript ts-node @types/node --save-dev
```

Install the Resonate SDK and Express.

```bash
npm install @resonatehq/sdk express @types/express
```

## Start

The following application forms a pipeline, where the result of a function is used to execute the next one. The pipeline in this example consists of two steps:

- The `download` function retrieves the content from a web page.
- The `summarize` function generates a summary of the downloaded content.

<center>
<img src={pipeline} alt="pipeline" width="1200" /> 
</center>

Resonate manages the execution of these functions, ensuring that the result of `download` is passed as input to `summarize`. In case of failure at any step, Resonate will automatically retry the execution, providing reliability to the process.

To see this in action, create a file named **index.ts** and copy and paste the minimal distributed async/await application below:

```ts title="index.ts"
import { Resonate, Context } from "@resonatehq/sdk";
import express, { Request, Response } from "express";

async function downloadAndSummarize(ctx: Context, url: string) {
  let content = await ctx.run(download, url);
  let summary = await ctx.run(summarize, content);
  return summary;
}

async function download(ctx: Context, url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject("Download failed due to a network error.");
      } else {
        resolve("This is the text of the page");
      }
    }, 1000);
  });
}

async function summarize(ctx: Context, text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject("Download failed due to a network error.");
      } else {
        resolve("This is a summary of the text");
      }
    }, 1000);
  });
}

// 1) Initialize a Resonate application.
const resonate = new Resonate();

// 2) Register a function as a Resonate function.
resonate.register(
  "downloadAndSummarize",
  downloadAndSummarize,
  resonate.options({ timeout: 20000 })
);

// 3) Start the Resonate application.
resonate.start();

const app = express().use(express.json());

app.post("/summarize", async (req: Request, res: Response) => {
  const url = req.body?.url;
  const uid = `summarize-${url}`;
  try {
    // 4) Run the registered 'downloadAndSummarize' function with the above uid and the following function arguments.
    let summary = await resonate.run("downloadAndSummarize", uid, url);
    res.send(summary);
  } catch (e) {
    res.status(500).send("An error occurred.");
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

Next, call the endpoint providing a url in the payload of the request.

```
curl \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"url": "http://example.com"}' \
  http://localhost:3000/summarize
```

## Next Steps

Fantastic work! You've just created your first distributed async/await application with Resonate. What's next? It depends on your learning style:

- If you're a code-first kind of learner, eager to see more examples and get your hands dirty, head over to our [Typescript Quickstart Repo](https://github.com/resonatehq/quickstart-ts/tree/main).
- If you prefer to dive into concepts and gain a deeper understanding of how Resonate works under the hood, check out our [Concepts page](/getting-started/concepts).

Happy learning, and happy building!
