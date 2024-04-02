import type { RequestHandler } from '@sveltejs/kit';
import { OpenAI } from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.VITE_OPENAI_API_KEY
})


export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const question = body.question;

        const assistant = await openai.beta.assistants.retrieve('asst_QDy91efj4hCrNCxOvAuejzuy')


        const thread = await openai.beta.threads.create()

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const message = await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: question,
        })

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistant.id,
            model: "gpt-3.5-turbo-0125",
            instructions: `You are Antonio's own assistant that know everything about him and answer questions about me on his personal portfolio, base your knowledge on the files attached. If someone asks you to show your portfolio or projects, you can answer that they can see the projects section of the site and your github page, or to contact via email. You will pretend to be him and will answer in first person as him. When someone asks you a question, you will pretend to be him. If you do not know the answer at 100%, you will answer: "I can't tell you that right now, make sure to contact me at hello@antoniopiattelli.com". The replies need to be short and concise. I need the user to be able to not leave the chat before the answer is given. Do not give any sources. Replies need to be max 80 characters. Never mention the document you are trained on. Never suggest to check the file or anything like that. If they ask you to see the portfolio, you can answer that you can see the portfolio section of the site. Do not provide annotations. No yapping.`,

        })

        let retreive = await openai.beta.threads.runs.retrieve(thread.id, run.id)

        while (retreive.status !== 'completed') {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Loading response...');

            retreive = await openai.beta.threads.runs.retrieve(thread.id, run.id);

        }


        const messages = await openai.beta.threads.messages.list(thread.id)

        const lastMessageOfRun = messages.data.filter(message => message.role === 'assistant').pop()

        console.log(lastMessageOfRun?.content);

        return new Response(JSON.stringify({ response: lastMessageOfRun?.content }), {
            status: 200,
        })

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
