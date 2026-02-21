import { createAgent, gemini,  } from "@inngest/agent-kit";
import { terminal, createOrUpdateFiles, readFiles } from "../inngest/tools";
import { PROMPT } from "../prompt";
import type { NetworkState } from "./network";

export const designerAgent = createAgent<NetworkState>({

    name: "Web-Designer",
    description: "This AI is professional web developer that can build amazing websites with unique designs",
    system: PROMPT,
    model: gemini({
        model: "gemini-2.5-flash-lite",
        apiKey: process.env.GEMINI_API_KEY
    }),
    tools: [terminal, createOrUpdateFiles, readFiles]
})