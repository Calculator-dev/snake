import React from 'react'
import { Button } from "@mui/material"

export default function ButtonStart({ start }) {
    return (
        <Button variant="contained" color="primary" onClick={start} style={{ marginTop: "20px" }}>
            StartGame
        </Button>
    )
}