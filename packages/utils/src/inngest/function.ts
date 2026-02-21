import { inngest } from "./client";
import dotenv from "dotenv"
import { designerAgent } from "../inngest/agent";
import { networkAssign } from "../inngest/network"
import { sandboxId } from "../sandboxId"
import { sandboxUrl } from "../sandboxUrl";
import { client } from "@workspace/db/index";

dotenv.config();

export const codingAgent = inngest.createFunction(
  { id: "hello-from-AI" },
  { event: "test/ai-hello" },

  async ({ event, step }) => {

    const sandbox_Id = await step.run("get-id", () => {
      return sandboxId();
    });

    if (!sandbox_Id) return "Sandbox not found";

    const network = networkAssign(designerAgent);
    
    network.state.data.sandboxId = sandbox_Id;
  
    const output = await network.run(event.data.prompt);

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
