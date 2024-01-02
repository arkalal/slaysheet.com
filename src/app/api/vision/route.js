import { NextResponse } from "next/server";
import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt, images } = await req.json();

    if (!prompt) {
      return NextResponse.json({ message: "prompt required" }, { status: 401 });
    }

    const response = await openAi.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content:
            "Dont give them answers on the images more than 50 words and keep your description short, precise and simple.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: images,
            },
          ],
        },
      ],
      max_tokens: 900,
    });

    return NextResponse.json(response.choices[0].message.content);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
