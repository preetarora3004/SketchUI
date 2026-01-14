import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import dotenv from "dotenv"

dotenv.config();

console.log("hey")

console.log(process.env.GEMINI_API_KEY);

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const testAgent = inngest.createFunction(
  { id: "hello-from-AI" },
  { event: "test/ai-hello" },

  async ({ event, step }) => {

    const agent = createAgent({
      name: "Web Designer",
      description: "This AI is professional web developer that can build amazing websites with unique designs",
      system: "You are a professional web developer that can design beautifull and unique website designs using next js and its framework",
      model: gemini({
        model: "gemini-2.5-flash",
        apiKey: "AIzaSyDMZIwpVx0PHAoR9g8MfLTWRuhcXDGKlLo"
      })
    })

  }
);
