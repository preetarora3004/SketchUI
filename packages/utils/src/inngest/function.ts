import { inngest } from "./client";
import dotenv from "dotenv"
import { designerAgent } from "@workspace/utils/src/inngest/agent";
import { network } from "@workspace/utils/src/inngest/network"
import { sandboxId } from "@workspace/utils/src/sandboxId"
import type { NetworkState } from "@workspace/utils/src/inngest/network"
import { createState } from "@inngest/agent-kit";

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

    const state = createState<NetworkState>({
      sandboxId: sandbox_Id
    })

    const output = await network.run(event.data.prompt, { state });

    return {
      output
    }
  }
);
