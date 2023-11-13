import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
    // A basic loading spinner
    return (
        <>
            <div style={{display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "20%"}}>
                <ReactLoading
                    type={"spin"}
                    color={"#03fc4e"}
                    height={100}
                    width={100}
                />
                <h1 style={{fontFamily: "serif", fontVariant: "small-caps"}}>Analyzing</h1>
            </div>
        </>
    )
}

export default Loading;