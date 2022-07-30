import React from "react"
import rgbToHex from "./utils/convert"

export default function ColorItem(props){

    const hex = rgbToHex(...props.rgb)
    const greyHex = "#808080"


    const colorStyle= {
        backgroundColor: `${hex}`
    }

    const colorStyleForSpan = {
        color: greyHex === hex ? `#00FFFF` : greyHex
        // in case the user chooses a grey color it won't be clear that he copied something to the clipboard
    }

    return(
        <div className={`color-item ${props.id > 10 && 'light'}`} style={colorStyle} onClick={() => props.toggleCopied(props.id)}>
            <h5>{`${props.weight} %`}</h5>
            <p>{`${hex}`}</p>
            { props.selected && <span style={colorStyleForSpan}>COPIED TO CLIPBOARD</span>}
        </div>
    )
}