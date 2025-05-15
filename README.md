# TRANSCRIPT SUMMARIZER MICROSERVICE

Provides an endpoint to which a lecture transcript can be passed and summarized into a minute long transcript

### Prerequisites
- llama3.2 from Ollama https://ollama.com/
- Node.js v18+
- `.env` configuration file with specified PORT

### API Endpoints
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /summarize | Pass a transcript to Ollama |

### Example Request
send a POST request to http://localhost:PORT/summarize, where PORT matches the port you're running the microservice on from .env
```
const response = await fetch('http://localhost:3000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ transcript: originalTranscript })
        });
```

### Example Receive
```
{
  summary: 'Science as we know it today did not emerge overnight, but rather is the result of...Understanding its history and philosophy can help us appreciate its strengths, confront its limitations, and use it responsibly to pursue knowledge and better society.'
}
```

### UML Sequence Diagram

