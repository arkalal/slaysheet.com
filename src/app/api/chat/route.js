import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

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
      stream: true,
      temperature: 1,
      messages: messages,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);

    // return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log(error);
  }
}
