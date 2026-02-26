import { inngest } from "./client";
import { designerAgent } from "../inngest/agent";
import { networkAssign } from "../inngest/network"
import { sandboxId } from "../sandboxId"
import { sandboxUrl } from "../sandboxUrl";
import { client } from "@workspace/db/index";
import Sandbox from "@e2b/code-interpreter";
import { isStringRecord } from "@workspace/utils/src/utility"

import "dotenv/config"

export const codingAgent = inngest.createFunction(
  { id: "hello-from-AI" },
  { event: "test/ai-hello" },

  async ({ event, step }) => {

    const messageCreation = await step.run("create-message", async () => {

      const message = await client.message.create({
        data: {
          content: event.data.prompt,
          userId: event.data.userId,
          projectId: event.data.projectId
        }
      })

      return message;

    })

    const sandbox_Id = await step.run("get-id", () => {
      return sandboxId();
    });

    if (!sandbox_Id) return "Sandbox not found";

    const network = networkAssign(designerAgent);

    network.state.data.sandboxId = sandbox_Id;

    const output = await network.run(event.data.prompt);

    if (output.state.data.files) {

      const files = output.state.data.files as Record<string, string> ?? {}
      const summary = output.state.data.summary as string ?? ""

      const fragmentCreation = await step.run("create-fragment", async () => {

        const fragment = await client.fragments.create({
          data: {
            files,
            messageId: messageCreation.id,
            summary
          }
        })
      })
    }

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

export const history = inngest.createFunction(
  { id: "history" },
  { event: "history/project" },

  async ({ event, step }) => {

    const message = await client.message.findFirst({
      where: {
        projectId: event.data.projectId
      },
      include: {
        fragement: true
      }
    })

    if (!message) return {
      message: `No project found`,
      status: 400
    };

    const sandbox_Id = await step.run("get-id", () => {
      return sandboxId();
    })

    if (!sandbox_Id || !message.fragement?.files) return {
      message: "No sandbox found",
      status: 400
    }

    if (isStringRecord(message.fragement.files)) {

      const files = message.fragement.files;
      const reloading = await step.run("get-page", async () => {

        try {
          const apiKey = process.env.E2B_API_KEY;
          const sbx = await Sandbox.connect(sandbox_Id, {
            apiKey
          })

          if (typeof files.path === "string" && typeof files.content === "string") {
            await sbx.files.write(files.path, files.content);
          }
          else {
            throw new Error("Invalid input");
          }
        }
        catch (err) {
          return err;
        }
      })
    }

    const sandbox_Url = await step.run("get-url", () => {
      return sandboxUrl(sandbox_Id);
    })

    return {
      url: sandbox_Url
    }
  }
)
