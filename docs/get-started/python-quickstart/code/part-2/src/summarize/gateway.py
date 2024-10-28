# @@@SNIPSTART python-quisckstart-part2-gateway-py
from resonate.scheduler import Scheduler
from resonate.storage import RemotePromiseStore
from fastapi import FastAPI
from pydantic import BaseModel
from summarize.app import downloadAndSummarize
import uvicorn

app = FastAPI()

class SummarizeRequest(BaseModel):
    url: str

class SummarizeResponse(BaseModel):
    summary: str
    error: str = None

# Define a route handler for the /summarize endpoint
@app.post('/summarize')
def summarize_route_handler(request: SummarizeRequest) -> SummarizeResponse:
    try:
        # Extract the URL from the request
        url = request.url
        # Summarize the text
        promise =  resonate.run(f"summarize-{url}", downloadAndSummarize, url=url)
        return {'summary': promise.result()}
    except Exception as e:
        return {'error': str(e)}

# Create a Resonate Scheduler   
resonate = Scheduler(durable_promise_storage=RemotePromiseStore(url="http://localhost:8001"))
# Register the downloadAndSummarize function with the Resonate scheduler
resonate.register(downloadAndSummarize)

# Define a main function to start the FastAPI app
def main():
    uvicorn.run(app, host="127.0.0.1", port=5000)
    print("Serving HTTP on port 5000...")

# Run the main function when the script is executed
if __name__ == '__main__':
    main()
# @@@SNIPEND
