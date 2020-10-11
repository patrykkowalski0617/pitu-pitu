import React, { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/Message";
import { FormControl, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";
import firebase from "firebase";

const useStyles = makeStyles({
    root: {
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        backgroundColor: "#d3d3d3",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    message: {
        whiteSpace: "break-spaces"
    },
    textField: { width: "100%", paddingRight: "15px" },
    button: {
        maxWidth: "200px"
    },
    formContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end"
    },
    messagesWrapper: {
        display: "flex",
        flexDirection: "column"
    }
});
function App() {
    const [input, setInput] = useState("");
    const [isEneter, setIsEnter] = useState(false);
    const [mainUserName, setMainUserName] = useState("Main user");
    const [messages, setMessages] = useState([]);

    const {
        root,
        button,
        formContainer,
        textField,
        messagesWrapper
    } = useStyles();

    useEffect(() => {
        const name = window.prompt();
        setMainUserName(name);

        db.collection("messages")
            .orderBy("timestamp", "aPatryksc")
            .onSnapshot(snapshot =>
                setMessages(snapshot.docs.map(doc => doc.data()))
            );
    }, []);
    const onChangeHandler = e => {
        if (!isEneter) {
            setInput(e.target.value);
        }
    };
    const sendMessage = e => {
        if ((input && e.which === 13 && !e.shiftKey) || e.type === "click") {
            e.preventDefault();

            db.collection("messages").add({
                userName: mainUserName,
                input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            // setMessages([...messages, { userName: mainUserName, input }]);
            setInput("");
        }
    };

    const cacheEnter = e => {
        if (e.which === 13 && !e.shiftKey) {
            setIsEnter(true);
        } else {
            setIsEnter(false);
        }
    };

    return (
        <div className={root}>
            <div className={messagesWrapper}>
                {messages.map(({ input, userName }, i) => (
                    <Message
                        key={i}
                        input={input}
                        userName={userName}
                        isMainUser={userName === mainUserName}
                    />
                ))}
            </div>
            <form>
                <FormControl className={formContainer}>
                    <TextField
                        className={textField}
                        id="message-field"
                        value={input}
                        label="Type message..."
                        multiline
                        rowsMax={3}
                        onChange={onChangeHandler}
                        onKeyPress={sendMessage}
                        onKeyDown={cacheEnter}
                    ></TextField>
                    <Button
                        className={button}
                        variant="outlined"
                        disabled={!input}
                        type="submit"
                        onClick={sendMessage}
                    >
                        Send
                    </Button>
                </FormControl>
            </form>
        </div>
    );
}

export default App;
