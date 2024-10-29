from flask import Flask, request, jsonify
from resonate.scheduler import Scheduler
from resonate.storage import RemoteServer
import time

app = Flask(__name__)

def downloadAndSummarize(ctx, url):
    print("Downloading and summarizing content from", url)
    # Download the content from the provided URL
    content = yield ctx.rfc("download", url)

    # highlight-start
    # Add a delay so you have time to simulate a failure
    time.sleep(10)
    #highlight-end

    # Summarize the downloaded content
    summary = yield ctx.rfc("summarize", content)
    # Return the summary
    return summary

# Create a Resonate Scheduler   
resonate = Scheduler(durable_promise_storage=RemoteServer(url="http://localhost:8001"))
# Register the downloadAndSummarize function with the Resonate scheduler
resonate.register(downloadAndSummarize)

# Define a route handler for the /summarize endpoint
@app.route('/summarize', methods=['POST'])
def summarize_route_handler():
    try:
        # Extract JSON data from the request
        data = request.get_json()
        if 'url' not in data:
            return jsonify({'error': 'URL not provided'}), 400

        # Extract the URL from the request
        url = data['url']
        
        # Run the summarize function asynchronously
        promise = resonate.run(f"summarize-{url}", downloadAndSummarize, url=url)
        
        # Return the result as JSON
        return jsonify({'summary': promise.result()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Define a main function to start the Flask app
def main():
    app.run(host="127.0.0.1", port=5000)
    print("Serving HTTP on port 5000...")

# Run the main function when the script is executed
if __name__ == '__main__':
    main()
