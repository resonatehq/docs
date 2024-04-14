---
sidebar_position: 2
---

# Deployment

This page describes how to deploy Resonate on Kubernetes.

## Deploying Resonate on Kubernetes

The recommended Kubernetes deployment strategy is a deployment. The easiest way to do this is with the yaml manifest below:

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: resonate
spec:
  selector:
    app: resonate
  ports:
    - port: 8001
      name: api
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: resonate
spec:
  replicas: 1
  selector:
    matchLabels:
      app: resonate
  template:
    metadata:
      labels:
        app: resonate
    spec:
      containers:
        - name: resonate
          image: ghcr.io/resonatehq/resonate:v0.5.0
          args:
            - "serve"
            - "--aio-store-postgres-host=HOST"
            - "--aio-store-postgres-port=PORT"
            - "--aio-store-postgres-username=USERNAME"
            - "--aio-store-postgres-password=SECRET"
          ports:
            - name: api
              containerPort: 8001
```

Create a file named resonate.yml and apply the above YAML manifest.

```console
kubectl apply -f resonate.yml
```
