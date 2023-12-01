import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
    // A basic loading spinner
    return (
        <>
            <div style={{
                position: 'absolute',
                backgroundColor: 'black',
                height: '100vh',
                width: '100vw',
                opacity: '0.75',
                zIndex: '-100'
            }}>

            </div>
            <div 
                style={{
                    display: 'flex',
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    height: '100vh',
                }}
            >
                <ReactLoading
                    type={"spin"}
                    color={"#03fc4e"}
                    height={100}
                    width={100}
                />
                <h1 style={{fontFamily: "serif", fontVariant: "small-caps", color: 'white', opacity: '1.0'}}>Analyzing</h1>
            </div>
        </>
    )
}

export default Loading;