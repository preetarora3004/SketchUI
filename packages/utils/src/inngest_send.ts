"use server"

import { inngest } from "./inngest/client";

export const invoke = async(prompt : string, projectId : string)=> {
    await inngest.send({
        name : "test/ai-hello",
        data : {
            prompt,
            projectId 
        }
    })
}
