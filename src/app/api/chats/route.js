import { NextResponse } from "next/server";
import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt, conversationHistory } = await req.json();

    if (!prompt) {
      return NextResponse.json({ message: "prompt required" }, { status: 401 });
    }

    const messages = conversationHistory.map((item) => ({
      role: item.role, // 'user' or 'system'
      content: item.content,
    }));

    messages.push({ role: "user", content: prompt });

    const response = await openAi.chat.completions.create({
      messages: messages,
      model: "gpt-4",
      temperature: 1,
      response_format: { type: "text" },
    });

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
