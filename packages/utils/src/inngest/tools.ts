import { createTool } from "@inngest/agent-kit";
import { z } from "zod";
import { Sandbox } from "@e2b/code-interpreter";

export const terminal = createTool({
    name: "terminal",
    description: "use the terminal to run command",
    parameters: z.object({
        command: z.string(),
    }),

    handler: async ({ command }, { network, step }) => {

        return await step?.run("terminal", async () => {
            console.log("terminal >", command);
            const buffer = { onStdOut: "", onStdErr: "" };

            try {
                const apiKey = process.env.E2B_API_KEY;
                const sbx = await Sandbox.connect(network.state.data.sandboxId, {
                    apiKey: apiKey
                })
                const results = await sbx.commands.run(command, {

                    onStdout: (data: any) => {
                        buffer.onStdOut += data;
                    },

                    onStderr: (data: any) => {
                        buffer.onStdErr += data;
                    }
                })
                console.log("Terminal Results ", results.stdout)
                return results.stdout;
            }
            catch (err) {
                const errorMsg = `Error on ${buffer.onStdOut} is ${buffer.onStdErr}`;
                console.log(errorMsg);
                return errorMsg;
            }
        })
    }
})

export const createOrUpdateFiles = createTool({
    name: "createOrUpdateFiles",
    description: "File updation or creation",
    parameters: z.object({
        files: z.array(
            z.object({
                path: z.string(),
                content: z.string()
            })
        )
    }),

    handler: async ({ files }, { network, step }) => {
    
        if (!network?.state?.data?.sandboxId) {
            const msg = "No sandboxId set on network.state.data; cannot write files";
            console.error(msg);
            return msg;
        }

        try {
            const newFiles = await step?.run("createOrUpdate", async () => {
                const updatedFiles: Record<string, string> = network.state.data.files ?? {};
                const apiKey = process.env.E2B_API_KEY;
                const sbx = await Sandbox.connect(network.state.data.sandboxId, {
                    apiKey: apiKey
                });

                for (const file of files) {
                    await sbx.files.write(file.path, file.content);
                    updatedFiles[file.path] = file.content;
                    console.log(`File written: ${file.path}`);
                }

                if(network.state.data.files === updatedFiles) {console.log("True")};

                return updatedFiles;
            });

            if (newFiles && typeof newFiles === "object") {
                network.state.data.files = newFiles as Record<string, string>;
                console.log("createOrUpdateFiles: persisted files:", Object.keys(network.state.data.files));
                return "Files updated";
            }

            const errMsg = typeof newFiles === "string" ? newFiles : "Unknown error updating files";
            console.error("createOrUpdateFiles failed:", errMsg);
            return errMsg;
        }
        catch (err) {
            console.error("createOrUpdateFiles exception:", err);
            return `error is ${err}`;
        }
    }
})

export const readFiles = createTool({
    name: "readFiles",
    description: "Read files in the sandbox",
    parameters: z.object({
        files: z.array(z.string())
    }),

    handler: async ({ files }, { network, step }) => {

        return await step?.run("readFiles", async () => {
            const apiKey = process.env.E2B_API_KEY;
            const sandbox = await Sandbox.connect(network.state.data.sandboxId, {
                    apiKey: apiKey
                });
            const contents: any = [];

            for (const file of files) {
                const content = await sandbox.files.read(file);
                contents.push({ path: file, content });
            }

            return `changed content are ${JSON.stringify(contents)}`;
        })
    }
})