"use server"

import { inngest } from "./inngest/client";

export const invoke = async()=> {
    await inngest.send({
        name : "test/hello.world",
        data : {
            email : "Preet"
        }
    })
}
