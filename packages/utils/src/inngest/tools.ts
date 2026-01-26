import { createTool } from "@inngest/agent-kit";
import { z } from "zod"
import { Sandbox } from "@e2b/code-interpreter"

export const commandLine = createTool({
    name: "terminal-command",
    description: "use the terminal to run command",
    parameters: z.object({
        command: z.string(),
    }),

    handler: async ({ command }, { network }) => {

        console.log("terminal >", command);
        const buffer = { onStdOut: "", onStdErr: "" };

        try {
            const sbx = await Sandbox.connect(network.state.data.sandboxId)
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
            console.log(`Error on ${buffer.onStdOut} is ${buffer.onStdErr}`);
            return console.log(`Error on ${buffer.onStdOut} is ${buffer.onStdErr}`);
        }
    }
})

export const createOrUpdateFile = createTool({
    name: "Create or update file",
    description: "File updation or creation",
    parameters: z.object({
        files: z.array(
            z.object({
                path: z.string(),
                content: z.string()
            })
        )
    }),

    handler: async ({ files }, { network }) => {

        try {
            const sbx = Sandbox.connect(network.state.data.sandboxId);
            for (const file of files) {
                (await sbx).files.write(file.path, file.content);
            }

            return `${files.map((f) => f.path).join(" ")}`
        }
        catch (err) {
            return err;
        }
    }
})