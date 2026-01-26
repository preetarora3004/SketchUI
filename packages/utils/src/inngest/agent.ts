import { createAgent, gemini } from "@inngest/agent-kit";
import { commandLine, createOrUpdateFile } from "@workspace/utils/src/inngest/tools";

export const designerAgent = createAgent({

    name: "Web Designer",
    description: "This AI is professional web developer that can build amazing websites with unique designs",
    system: "You are a professional web developer that can design beautifull and unique website designs using next js and its framework",
    model: gemini({
        model: "gemini-2.5-flash",
        apiKey: "AIzaSyDgnNABAT4JI-FzioiFN0s18wFIIj6xAYk"
    }),
    tools: [commandLine, createOrUpdateFile]
})