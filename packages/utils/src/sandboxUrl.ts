import Sandbox from "@e2b/code-interpreter";

export const sandboxUrl = async (id: string) => {

    const apiKey = process.env.E2B_API_KEY;
    const sandbox = await Sandbox.connect(id, { apiKey: apiKey });

    const host = sandbox.getHost(3000);

    return `http://${host}`;
}