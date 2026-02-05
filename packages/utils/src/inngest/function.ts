import { inngest } from "./client";
import dotenv from "dotenv"
import { designerAgent } from "../inngest/agent";
import { network, state_d } from "../inngest/network"
import { sandboxId } from "../sandboxId"
import { sandboxUrl } from "../sandboxUrl";

dotenv.config();

export const codingAgent = inngest.createFunction(
  { id: "hello-from-AI" },
  { event: "test/ai-hello" },

  async ({ event, step }) => {

    const sandbox_Id = await step.run("get-id", () => {
      return sandboxId();
    });

    const codingAgent = await step.run("get-agent", () => {
      return designerAgent;

    });

    const getNetwork = await step.run("intialise-network", () => {
      return network;
    });

    if (!sandbox_Id) return "Sandbox not found";

    const state = state_d(sandbox_Id);

    const output = await network.run(event.data.prompt, { state });

    const sandbox_Url = await step.run("get-url", () => {
      return sandboxUrl(sandbox_Id);
    })

    return {
      url: sandbox_Url,
      title: "untilted",
      files: output.state.data.files,
      summary: output.state.data.summary
    }
  }
);
