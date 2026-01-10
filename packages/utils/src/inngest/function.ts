import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
import dotenv from "dotenv"

dotenv.config();

console.log("hey")

console.log(process?.env.Gemini);

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
      name: "Greet-Agent",
      description: "Greets everyone warmly",
      system: "You are a greeting machine",
      model: gemini({
        model: "gemini-2.5-flash",
        apiKey : process.env.Gemini
      })
    })

    const { output } = await agent.run("Greet me gemini")

    return {
      message : output
    }
  }
);
