---
sidebar_position: 2
---

# Resonate Error Codes

This document enumerates the various error codes that may be returned by our API.

## Handling Errors

When encountering an error, follow these general steps:

1. **Identify the Error Code:**
   - Check the error code in the response or logs to understand the nature of the issue.

2. **Refer to Documentation:**
   - Consult this document to find the description and recommended actions for the specific error code.

3. **Troubleshoot:**
   - Follow the provided recommendations to troubleshoot and resolve the issue.

4. **Contact Support:**
   - If the issue persists, open a GitHub issue with details, including the error code and steps to reproduce.

## Error Response Schema

When an error occurs, the API response body will contain details about the failure using the following JSON schema:

```json 
{
    "error": {
        "code": 5002,
        "message": "failed to update promise",
        "details": [
            {
                "@type": "ServerError",
                "message": "attempt to write a readonly database",
                "domain": "server",
                "metadata": {
                    "url": "https://docs.resonatehq.io/reference/error-codes#5002"
                }
            }
        ]
    }
}
```

The `code` field can be used to programmatically identify the error. The message and details provide a human-readable description of what went wrong.

The error `details` provide structured diagnostic data like the failing subsystem and links to documentation, which can assist in debugging and troubleshooting.

## Request Errors (4000-4999)

Request errors represent problems with the request, like requesting to delete a promise that does not exist. Retrying the same request will fail repeatedly unless changed.

### 4000
There was a validation failure on one or more fields.

### 4030
The promise has already been resolved. Once a promise is resolved, it reaches a completed state and can no longer be modified.

### 4031
The promise has already been rejected. Once a promise is rejected, it reaches a completed state and can no longer be modified.

### 4032
The promise has already been canceled. Once a promise is canceled, it reaches a completed state and can no longer be modified.

### 4033
The promise has already timed out. Once a promise is timed out, it reaches a completed state and can no longer be modified.

### 4040
The specified promise could not be found.

### 4041
The specified subscription could not be found.

### 4090
A promise with the given identifier already exists. This will automatically be deduplicated if both create requests include the same idempotency key. 


## Server Errors (5000-5999)

These errors represent transient or systemic problems that prevent the request from being completed successfully. The client may retry after a delay in some cases.

### 5000
An unknown internal server error occurred. Please open a GitHub issue with details to report this.

### 5001
There was a failure connecting to the AIO network subsystem.

### 5002
There was a failure accessing the system's storage.

### 5003
There was a failure serializing data from the system's storage.

### 5030
The system is shutting down.

### 5031
The API submission queue is full.

### 5032
The AIO system submission queue is full.

