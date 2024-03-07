import fetch from 'node-fetch';
import type { OpenAIChatCompletionResponse } from '../../../types/types';
import type { RequestHandler } from '@sveltejs/kit';
import { OpenAI } from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY
})

console.log(openai.beta.assistants);

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const question = body.question;

        const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant designed to output JSON.",
                    },
                    { role: "user", content: question },
                ],
                model: "gpt-3.5-turbo-0125",
                response_format: { type: "json_object" },
            }),
        });

        const openAIResponseData: OpenAIChatCompletionResponse = await openAIResponse.json() as OpenAIChatCompletionResponse;
        console.log(JSON.stringify(openAIResponseData.choices[0].message.content));


        return new Response(JSON.stringify(openAIResponseData.choices[0].message.content), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'There was an error processing your request.' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
