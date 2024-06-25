import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const openai = new OpenAI({
        apiKey: "OpenAI-API KEY"
    });

    const params = await request.json();
    const text = params.lecture

    const system_content = `You are assitant that helps students to study. You will be given a text, and you must use infromation from it to answer students questions. If you use infromation outside from the provided text, note that in the response. The text is: "${text}"`

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: system_content
            },
            {
                role: "user",
                content: params.prompt
            }
        ]
    })

    return NextResponse.json(response)
}