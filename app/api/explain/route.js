import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { code } = await req.json();

    const prompt = `
You are a code expert. Explain the following code in simple terms, step by step.
Also, check for possible bugs or errors and suggest improvements.

Code:
${code}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // use gpt-4-turbo if you have access
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const explanation = response.choices[0].message.content;
    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
