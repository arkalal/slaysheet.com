import { NextResponse } from "next/server";
import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const assistant = await openAi.beta.assistants.retrieve(
      "asst_MAYMcdhJZMmrr1NgvTuEoJwW"
    );

    const thread = await openAi.beta.threads.create();
    await openAi.beta.threads.messages.create(thread.id, {
      role: "user",
      content: prompt,
    });

    // run the assistant
    const run = await openAi.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
      //   instructions: "Please address the user as arka.",
    });

    let completedRun;

    // Polling to check the run status
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
      completedRun = await openAi.beta.threads.runs.retrieve(thread.id, run.id);
    } while (completedRun.status !== "completed");

    // Handle required actions for function calls
    if (completedRun.status === "requires_action") {
      // await handleDatabaseFunction(completedRun.required_action);
      const reqActions =
        completedRun.required_action.submit_tool_outputs.tool_calls;
      console.log("reqActions", reqActions);
    }

    // Once the run is completed, get the messages
    const messages = await openAi.beta.threads.messages.list(thread.id);
    return NextResponse.json(messages);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error Occured" }, { status: 400 });
  }
}
