"use client"

import styles from "./page.module.css";
import { useState } from "react";

function PromptForm( {onSubmit}: {onSubmit: any} ){
    const [prompt, setPrompt] = useState("");

    return (
        <form className={styles.submitForm} onSubmit={(e)=> {
            e.preventDefault();

            if(prompt === ""){
                return;
            }
            

            onSubmit(prompt);
            setPrompt("");
        }}>
            <input type="text" value={prompt} onChange={e => {
                setPrompt(e.target.value)
            }}></input>
            <input type="submit"/>
        </form>
    )
}

export default function Chat({lecture}: {lecture: string}){
    const [choices, setChoices] = useState<any[]>([]);
    
    return (
        <div className={styles.chatWrapper}>
            <div className={styles.chatHeader}>
                Chat with ALANT
            </div>
            <div className={styles.chatBox}>
                {choices.map(choice => {
                    return (
                        <p key={choice.index}>{choice.message.content}</p>
                    )
                })}
            </div>
            <PromptForm onSubmit={async ( prompt:any ) => {
                const response = await fetch("/api/chatGpt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt, lecture
                    }),
                });

                const result = await response.json();
                setChoices(result.choices)
            }}/>
        </div>
    )
}