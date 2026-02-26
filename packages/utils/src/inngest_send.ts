"use server"

import { inngest } from "./inngest/client";

export const generateResponse = async(prompt : string, projectId : string, userId : string)=> {
    await inngest.send({
        name : "test/ai-hello",
        data : {
            prompt,
            projectId,
            userId
        }
    })
}
