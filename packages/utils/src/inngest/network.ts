import { createNetwork, createState } from "@inngest/agent-kit";
import { designerAgent } from "@workspace/utils/src/inngest/agent"

interface NetworkState {
    sandboxId: string | null;
}

export const state_d = (sandboxId: string | any): Record<string, any> => {

    const state = createState<NetworkState>({
        sandboxId
    })
    return state;
}

export const network = createNetwork({
    name: "Coding Network",
    agents: [designerAgent]
});