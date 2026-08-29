import { generateText, Output } from "ai";
import { createGoogle } from "@ai-sdk/google";
import { mealAnalysisResponseSchema } from "@calorie-ai-app/auth/schemas/meal";
import { ANALYSIS_PROMPT } from "@/constants/system-prompt";

const google = createGoogle({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const analyzeMealImage = async (
  imageBase64: string,
  mediaType: string,
) => {
  console.log("[ai] 1. Starting AI analysis:", {
    mediaType,
    base64Length: imageBase64.length,
  });

  try {
    const result = await generateText({
      model: google("gemini-3.7-flash"),
      output: Output.object({
        schema: mealAnalysisResponseSchema,
      }),
      providerOptions: {
        google: {
          structuredOutputs: false,
        },
      },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: ANALYSIS_PROMPT },
            { type: "image", image: imageBase64, mediaType: mediaType },
          ],
        },
      ],
    });

    console.log("[ai] 2. AI response received:", {
      hasOutput: !!result.output,
      outputKeys: result.output ? Object.keys(result.output) : [],
    });
    console.log("[ai] 3. Full output:", JSON.stringify(result.output, null, 2));

    return result.output;
  } catch (error) {
    console.error("[ai] Error:", error);
    throw new Error((error as Error).message);
  }
};
