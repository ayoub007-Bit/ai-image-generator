import express from 'express';
import *as dotenv from 'dotenv';
import OpenAI from "openai"; //



dotenv.config(); 

const router = express.Router(); // .Router() lets us create modular, mountable route handlers. A router instance is a complete middleware and routing

//intialize OpenAI client 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

//simple get route to test
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E'})
})


//POST route to generate image
router.post('/', async (req, res) => {

    try {
        const { prompt } = req.body;

        //call the new openai images api
        const aiResponse = await openai.images.generate({
            model: 'gpt-image-1',   //new image generation model
            prompt: prompt,
            size:'1024x1024',
        }) /* response = {
                            "object": "list",
                            "data": [
                                {
                                "id": "image-xxxxxxx",
                                "object": "image",
                                "b64_json": "iVBORw0KGgoAAAANSUhEUgAA..."  // Base64-encoded image
                                }
                            ]
                          } */


        const image = aiResponse.data[0].b64_json; // this line extracts the first generated image from the API response as a Base64
        console.log(aiResponse);
        res.status(200).json({ photo: image }) // it sends a successful HTTP response as a JSON object


    } catch (error) {
        console.error(error);
        res.status(500).send(error && error.message ? error.message : 'Something went wrong')
    }
});



export default router; // router is the Express Router that contains my GET and POST routes for DALL-E
