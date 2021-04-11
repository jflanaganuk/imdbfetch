import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container } from "./container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Offline } from "./offline";

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
    }, []);

    return (
        <Router basename="/imdbfetch">
            <Switch>
                <Route exact path="/offline">
                    <Offline />
                </Route>
                <Route exact path="/">
                    <Container movies={response} />
                </Route>
                <Route path="/:id">
                    <Container movies={response} />
                </Route>
            </Switch>
        </Router>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
