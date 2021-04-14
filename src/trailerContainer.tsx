import React, { useEffect, useState } from "react";
import { rootUrl } from "./env";
import { Trailer } from "./trailer";

export const TrailerContainer = (props: { id: string }) => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        var url = `${rootUrl}/${props.id}trailer.json`;
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
    }, [props.id]);

    return <Trailer trailer={response} />;
};
