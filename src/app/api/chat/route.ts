import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import connectDb from "@/lib/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { message, ownerId } = await req.json();
    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "message and owner id is required" },
        { status: 400, headers: corsHeaders },
      );
    }

    await connectDb();

    const setting = await Settings.findOne({ ownerId });
    if (!setting) {
      return NextResponse.json(
        { message: "Settings not found" },
        { status: 400, headers: corsHeaders },
      );
    }

    const KNOWLEDGE = `
      Business Name : ${setting.businessName || "not provided"} 
      Support Email: ${setting.supportEmail || "not provided"} 
      Knowledge: ${setting.knowledge || "not provided"} 
    `;

    const prompt = `You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.
You may rephrase, summarize, or interpret the information if needed.
Do NOT invent new policies, prices, or promises.

If the customer's question is completely unrelated to the information,
or cannot be reasonably answered from it, reply exactly with:
"Please contact support."

----------------------
BUSINESS INFORMATION
----------------------
${KNOWLEDGE}


----------------------
CUSTOMER QUESTION
----------------------
${message}

----------------------
ANSWER
----------------------`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
      });

      return NextResponse.json(response.text, { headers: corsHeaders });
    } catch (error: any) {
      console.warn("Primary model failed", error.message || error);

      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-flash-lite-latest",
        contents: prompt,
      });
      return NextResponse.json(fallbackResponse.text, { headers: corsHeaders });
    }
  } catch (error) {
    console.error("Error in fallback or general setup:", error);
    return NextResponse.json(
      { message: "Failed to generate response" },
      { status: 500, headers: corsHeaders },
    );
  }
}
