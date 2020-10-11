import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: ({ isMainUser }) => {
        const mainUserStyle = isMainUser
            ? { backgroundColor: "#666677", alignSelf: "flex-end" }
            : {};

        return {
            width: "fit-content",
            maxWidth: "500px",
            marginBottom: "20px",
            ...mainUserStyle
        };
    },
    message: {
        whiteSpace: "break-spaces"
    }
});

export default function Message({ input, userName, isMainUser }) {
    const { root, message } = useStyles({ isMainUser });
    // console.log(userName);
    return (
        <>
            {!isMainUser ? (
                <Typography variant="h6" component="h2">
                    {userName}:
                </Typography>
            ) : null}

            <Card className={root}>
                <CardContent>
                    <Typography
                        variant="body2"
                        component="p"
                        className={message}
                    >
                        {input}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
