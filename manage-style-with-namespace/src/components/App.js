import React, { useState } from "react";
import RandomGif from "./RandomGif";

export default function App() {
    const [ctlSwitch1, setCtlSwitch1] = useState(true);
    const [ctlSwitch2, setCtlSwitch2] = useState(true);
    const [ctlSwitch3, setCtlSwitch3] = useState(true);
    return (
        <>
            <div>
                <button onClick={() => setCtlSwitch1(state => !state)}>
                    Show / Hide{" "}
                </button>
                {ctlSwitch1 ? <RandomGif /> : null}
            </div>
            <div>
                <button onClick={() => setCtlSwitch2(state => !state)}>
                    Show / Hide{" "}
                </button>
                {ctlSwitch2 ? <RandomGif /> : null}
            </div>
            <div>
                <button onClick={() => setCtlSwitch3(state => !state)}>
                    Show / Hide{" "}
                </button>
                {ctlSwitch3 ? <RandomGif /> : null}
            </div>
        </>
    );
}
