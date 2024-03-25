---
slug: /
title: Welcome
sidebar_position: 1
---

import echo from '../../static/img/echo.png';

<center>
<img src={echo} alt="echo" width="250" /> 
</center>

# Why Resonate?

- `Intuitive Programming Model`: Resonate offers a programming model that enables you to build fault-tolerant distributed applications using an intuitive paradigm you already know — async await.

- `Single Binary`: Resonate simplifies your deployment and operations with a single binary.

- `Incremental Adoption and No Vendor Lock-In`: Resonate was designed to allow for incremental adoption without vendor lock-in ever.

- `Built on an Open Standard`: Resonate's programming model is built on top of [durable promises](/reference/durable-promises.md), an open standard with an intentionally minimal API surface area.

# Distributed async await

Resonate introduces istributed async await, a powerful feature that allows functions and promises to maintain progress in durable storage. With this approach, function executions have an unique identity that persists beyond the execution of the underlying function. This simple yet effective concept enables developers to coordinate processes, implement transaction semantics, and handle failures gracefully across distributed systems all with a very familiar feeling programming model.
