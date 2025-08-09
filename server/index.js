import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

app.post("/api/plan",async(req, res) => {
    try{
        
        const {goal} = req.body;

        

    }
})
