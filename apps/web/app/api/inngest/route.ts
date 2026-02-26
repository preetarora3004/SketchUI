import { inngest } from "@workspace/utils/inngest/client"
import { serve } from 'inngest/next'
import { codingAgent, history } from "@workspace/utils/inngest/function"

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        codingAgent,
        history
    ]
})  

