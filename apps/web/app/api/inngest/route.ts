import { inngest } from "@workspace/utils/inngest/client"
import { serve } from 'inngest/next'
import { testAgent } from "@workspace/utils/inngest/function"

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        testAgent
    ]
})

