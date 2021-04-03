import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container } from "./container";

const App = () => {

    const [response, setResponse] = useState(null);

    useEffect(() => {
        var url = `https://www.uploadr.co.uk/imdbfetch/public/outputs/boxOffice10.json`;
        var req = new Request(url);
        fetch(req)
        .then((response) => response.json())
        .then((data) => {
            if (data.errorMessage == "") {
                setResponse(data);
            } else {
                console.error("Error with returned data:");
                console.error(data);
            }
        })
        .catch((e) => console.error(e));
    }, [])
        
    return <Container movies={response} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
