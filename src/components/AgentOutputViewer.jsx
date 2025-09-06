import React from 'react'

const AgentOutputViewer = ({data}) => {
    try{
            if (data.hasOwnProperty("message")) {
            try {
            if (typeof data.message === "string") {
                // Fix backend Python-style dicts if needed
                const fixedMessage = data.message.replace(/'/g, '"');
                displayData = JSON.parse(fixedMessage);
            } else {
                displayData = data.message;
            }
            } catch (err) {
            console.error("❌ Failed to parse message:", err);
            displayData = { error: "Could not parse message" };
            }
    } 
        // Case 2: fallback to payload if present
        else if (data.hasOwnProperty("payload")) {
            displayData = data.payload;
        }

            
        return (
            <div>        
                <ol>
                    {Object.entries(data).map(([key, value]) => (
                        <li key={key}>
                        <strong>{key}</strong>: {String(value)}
                    </li>
                    ))}
                </ol>            
            </div>
        );
    }
    catch(error){
        return(
            <div id='error'>
                <strong>error</strong>
            </div>
        );
    }
}

export default AgentOutputViewer
