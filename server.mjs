import express from 'express';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(`Transcript summarizing service running on port ${PORT}`)
});

/**
 * Summarizes a lecture transcript into approximately one minute of content
 * 
 * @param {string} transcript - Full text of the lecture transcript to summarize
 * @returns  {Promise<string>} - Promise that resuloves to the summarized transcript
 */
async function passTranscript(transcript) {
    const prompt = 'Take the following lecture transcript and summarize it down to one minute worth of content if the transcript were read aloud. Do not add information that is not present in the provided transcript, and make sure to include every main point in the transcript. Do not add an introductory statement to the response, such as "Here\'s a summary...": \n\n' + transcript;
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama3.2',
            prompt: prompt,
            stream: false
        })
    });
    const data = await response.json();
    return data.response || data;
}

app.post('/summarize', asyncHandler(async (req, res) => {
    const { transcript } = req.body;

    if (!transcript) {
        res.status(400).json({ Error: 'No transcript provided' });
    } else {
        const summary = await passTranscript(transcript);
        res.status(200).json({ summary });
    }
}));
