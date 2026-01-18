import { createTool } from "@inngest/agent-kit";
import { z } from "zod"
import { Sandbox } from "@e2b/code-interpreter"

export const envCreation = createTool({
    name: "terminal-command",
    description: "use the terminal to run command",
    parameters: z.object({
        command: z.string(),
    }),

    handler: async ({ command }) => {

        console.log("terminal >", command);
        const buffer = { onStdOut: "", onStdErr: "" };

        try{
            const sbx = await Sandbox.create("SketchUI");
            const results = await sbx.commands.run(command, {

                onStdout : (data : any) => {
                    buffer.onStdOut += data;
                },

                onStderr : (data : any) => {
                    buffer.onStdErr += data;
                }
            })
            console.log("Terminal Results ", results.stdout)
            return results.stdout;
        }
        catch(err){
            return err;
        }
    }
})