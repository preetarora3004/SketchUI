"use server"

import { inngest } from "./inngest/client";

export const invoke = async(prompt : String)=> {
    await inngest.send({
        name : "test/ai-hello",
        data : {
            prompt : prompt
        }
    })
}
