import { Agent, createNetwork, gemini } from "@inngest/agent-kit";
import { designerAgent } from "../inngest/agent"

export interface NetworkState {
    sandboxId: string | null;
    files: Record<string, string> | null | undefined;
    summary: string | null;
}

export const networkAssign = (codingAgent : any) => createNetwork<NetworkState>({
    name: "Coding Network",
    agents: [codingAgent],
    maxIter: 2,
    router: ({ network }) => {

        const solution = network.state.data.summary;
        if (solution) {
            return;
        }

        return designerAgent;
    }
});