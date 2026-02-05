import Sandbox from "@e2b/code-interpreter";

export const sandboxId = async ()=>{

    const apiKey = process.env.E2B_API_KEY;
    const sandbox = await Sandbox.create("SketchUI", {apiKey : apiKey, timeoutMs : 600_000});
    return sandbox.sandboxId;
}