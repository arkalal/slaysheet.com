import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.ORGANIZATION_ID,
});

const openAi = new OpenAIApi(configuration);

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return new NextResponse("Messages required", { status: 401 });
    }

    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.89,
      max_tokens: 149,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: messages,
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log(error);
  }
}
