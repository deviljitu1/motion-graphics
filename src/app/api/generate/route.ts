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
          content: `You are an AI Video Director. Based on the user's prompt, generate a full storyboard timeline for a motion graphics video.
You MUST respond with ONLY a valid JSON object matching this exact structure:
{
  "theme": "HeroScene", // Must be exactly "HeroScene", "CyberpunkScene", or "MinimalistScene" based on the prompt's vibe
  "brandColor": "#ff00ff", // A hex color that fits the prompt
  "scenes": [
    {
      "title": "Short punchy text (max 5 words)",
      "subtitle": "Explanatory text (max 10 words)",
      "durationInSeconds": 4 // How long this scene should be shown (e.g., 3 to 7 seconds)
    }
  ]
}
Generate between 3 and 7 scenes that tell a compelling story, explain a product, or fit the user's description. The total duration of all scenes combined must be at least 15 seconds, up to a maximum of 60 seconds.
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
