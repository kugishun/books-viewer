import React from "react";
// import { Dimmer , Loader } from "semantic-ui-react";
import ReactLoading from "react-loading"

function Loading({ inverted = true, content="Loading..."}) {
    return (
        <ReactLoading
        type="spin"
        color="black"
        height="10%"
        width="10%"
        className="mx-auto"
      />
    )
}

export default Loading;