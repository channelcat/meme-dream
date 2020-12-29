import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';

export default function App() {
    useEffect(() => {(async () => {
        console.log("SENDING")
        const arg = await ipcRenderer.invoke("test-message", "ping");
        console.log("RECV", arg);
    })()}, [])
    return <div>
        Stuffgss3!!
    </div>
}