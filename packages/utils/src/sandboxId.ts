import Sandbox from "@e2b/code-interpreter";

export const sandboxId = async ()=>{

    const sandbox = await Sandbox.create("SketchUI", {apiKey : process.env.E2B_ACCESS_TOKEN});
    return sandbox.sandboxId;
}