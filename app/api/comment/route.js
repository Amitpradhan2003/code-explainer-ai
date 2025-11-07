import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { code } = await req.json();

    const prompt = `
You are a senior software engineer. Add clear and meaningful comments to this code to help beginners understand it.
Keep the code format the same, just insert comments where helpful.
Do not explain outside the code. Return only the commented code.

Code:
${code}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const commentedCode = response.choices[0].message.content;
    return NextResponse.json({ commentedCode });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
