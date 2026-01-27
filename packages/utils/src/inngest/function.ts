import { inngest } from "./client";
import dotenv from "dotenv"
import { designerAgent } from "@workspace/utils/src/inngest/agent";
import { network, state_d } from "@workspace/utils/src/inngest/network"
import { sandboxId } from "@workspace/utils/src/sandboxId"

dotenv.config();

export const testAgent = inngest.createFunction(
  { id: "hello-from-AI" },
  { event: "test/ai-hello" },

  async ({ event, step }) => {

    const sandbox_Id = await step.run("get-id", () => {
      sandboxId
    });

    const codingAgent = await step.run("get-agent", () => {
      designerAgent
    });

    const getNetwork = await step.run("intialise-network", () => {
      network
    });

    if(!sandbox_Id) return "Sandbox not found";

    const state = state_d(sandbox_Id);

    const output = await network.run(event.data.prompt, { state });

    return {
      output
    }
  }
);
