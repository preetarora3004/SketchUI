"use client"

import {invoke} from "@workspace/utils/inngest_send"

export default function Page(){

    const invokeAI = async()=>{
        try{
            const res = await invoke();
            console.log(res);
        } catch(err){
            console.log(err);
        }
    }

    return (<div className="flex justify-center items-center">
        <button onClick={invoke}>
            Invoke
        </button>
    </div>)

}