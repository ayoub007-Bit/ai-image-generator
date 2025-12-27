import express from 'express';
import *as dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';



dotenv.config();

const router = express.Router(); // .Router() lets us create modular, mountable route handlers. A router instance is a complete middleware and routing

//intialize gemini api

const ai = new GoogleGenAI({
    vertexai: true,
    project: process.env.GOOGLE_PROJECT_ID, 
    location: 'us-central1',
    apiKey: process.env.GEMINI_API_KEY // Store your key in an environment variable
});

//simple get route to test
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E' })
})


//POST route to generate image
router.post('/', async (req, res) => {

    try {
        const { prompt } = req.body;

        //call the new openai images api
        const aiResponse = await ai.models.generateImages({
            model: 'imagen-3.0-fast-generate-001', // Google's best current model
            prompt: `digital art style, creative, highly detailed, expressive, not photorealistic. Render the following: ${prompt}`,
            config: {
                numberOfImages: 1,
                aspectRatio: '1:1',  // Replaces "size: 1024x1024"
                includeRaiReason: true // Optional: Helps debug if safety filters block the image
            }
        }) /* response = {
                            "object": "list",
                            "daa": [
                                {
                                "id": "image-xxxxxxx",
                                "object": "image",
                                "b64_json": "iVBORw0KGgoAAAANSUhEUgAA..."  // Base64-encoded image
                                }
                            ]
                          } */


        const image = aiResponse.generatedImages[0].image.imageBytes; // this line extracts the first generated image from the API response as a Base64
        console.log(aiResponse);
        res.status(200).json({ photo: image }) // it sends a successful HTTP response as a JSON object


    } catch (error) {
        console.error(error);
        res.status(500).send(error && error.message ? error.message : 'Something went wrong')
    }
});



export default router; // router is the Express Router that contains my GET and POST routes for DALL-E
