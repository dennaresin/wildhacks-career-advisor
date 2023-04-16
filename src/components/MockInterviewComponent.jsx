import { speak } from "../../utilities/texttospeech";
// import speechtotext from "../../utilities/speechtotext";
import React from "react";
import { TextField } from "@mui/material";
import { mockInterviewConversation } from "../../utilities/openai"

const MockInterviewComponent = ({ previousConvo }) => {
    const [message, setMessage] = React.useState("");
    const [previousMessages, setPreviousMessages] = React.useState(previousConvo);

    const handleClick = () => {
        mockInterviewConversation(message, previousConvo).then((res) => {
            setPreviousMessages(res);
            speak(res[0]);
            setMessage("");
        });

    }

    return (
        <div>
            {previousConvo.map((messageObject) => {
                messageObject.role == "user"
                    ? <p className="userMessage" key={messageObject.content}>{messageObject.content}</p>
                    : <p className="aiMessage" key={messageObject.content}>{messageObject.content}</p>
            })}
            <TextField
                type="text"
                placeholder="Enter questions or responses here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                InputProps={{
                    style: {
                        background: "white",
                        fontSize: "0.8rem",
                        width: "90%",
                        marginLeft: "5%",
                        display: "flex",
                        alignText: "center",
                        borderRadius: "8px",
                        boxShadow: "inset 0 2px 8px #e5e5e5",
                    }
                    // disableUnderline: true,
                }}
            />
            <button onClick={handleClick}>
                Enter
            </button>
        </div>
    )
}

export default MockInterviewComponent