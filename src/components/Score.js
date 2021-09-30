import React from 'react'
import coin from "./assets/coin.gif"

export default function Score({ score }) {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={coin} alt="" style={{ width: "40px", height: "40px" }} />
            <div style={{ color: "#57CC99", fontWeight: "bold", fontSize: "20px", margin: "20px 0" }}>
                Your score: {score}
            </div>
        </div>
    )
}
