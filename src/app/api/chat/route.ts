// import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import Groq from "groq-sdk";
// import { createOpenAI } from "@ai-sdk/openai";

// export const runtime = "edge";

const groq = new Groq({
  apiKey: process.env.GROQ_CLOUD_API_KEY,
  // baseURL: "https://api.groq.com/openai/v1",
});

// const groqOpenAI = createOpenAI({
//   apiKey: process.env.GROQ_CLOUD_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1",
// });

// const config = new Configuration({
//   apiKey: process.env.GROQ_CLOUD_API_KEY,
//   basePath: "https://api.groq.com/openai/v1",
// });

// const openai = new OpenAIApi(config);

// POST localhost:3000/api/chat

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant. Answer questions clearly and concisely.",
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
