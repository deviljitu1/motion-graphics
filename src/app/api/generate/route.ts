import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI that configures a motion graphics video based on user descriptions. 
You MUST respond with ONLY a valid JSON object matching this structure:
{
  "title": "A short, punchy title (max 5 words)",
  "subtitle": "A slightly longer explanatory subtitle (max 10 words)",
  "brandColor": "A hex color code (e.g. #ff0000) that best fits the theme"
}
Do not include markdown blocks or any other text, just the raw JSON object.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error("Failed to generate content");
    }

    const parsed = JSON.parse(aiResponse);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "Failed to process prompt" },
      { status: 500 }
    );
  }
}
