import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';


import { connectDB } from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

app.use(cors()); // middleware to let the interaction between front and backend

app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes); // /api means it's an API endpoint(not a normal website page), /post means the route for posts
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
})


const startServer = async () => {
    try {
        app.listen(process.env.PORT, async () =>{
            connectDB();
            console.log(`server started at http://localhost:${process.env.PORT}`)
        })
    } catch (error) {
        console.log(`error : ${error.message}`)
    }
}

startServer()
