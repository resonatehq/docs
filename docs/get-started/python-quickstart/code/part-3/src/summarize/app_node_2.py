from resonate.scheduler import Scheduler
from resonate.storage import RemoteServer
import random
import time

def download(_, url):
    print(f"Downloading data from {url}")
    time.sleep(2.5)
    # Simulate a failure to download data 50% of the time
    if random.randint(0, 100) > 50:
        print("Download failed")
        raise Exception("Failed to download data")
    print("Download successful")
    return "This is the text of the page that was downloaded"
    
def summarize(_, content):
    print("Summarizing content...")
    time.sleep(2.5)
    if random.randint(0, 100) > 50:
        print("Summarization failed")
        raise Exception("Failed to summarize content")
    print("Summarization successful")
    return "This is the summary of the page that was downloaded"

# Create a Resonate Scheduler   
resonate = Scheduler(durable_promise_storage=RemoteServer(url="http://localhost:8001"))
# Register the downloadAndSummarize function with the Resonate scheduler
resonate.register("download", download)
resonate.register("summarize", summarize)

# Define a main function to start the Flask app
def main():
    print("Running")
