import React from "react"
import ColorItem from "./ColorItem"
import Values from 'values.js'
import rgbToHex from "./utils/convert"

function App() {

  const [color , setColor] = React.useState()
  const [error , setError] = React.useState(false)
  const [list , setList] = React.useState((new Values('#0000FF').all(10)).map(oneColor =>{ 
    return {...oneColor, selected: false}
  }))


  const handleSubmit = (e) =>{
    e.preventDefault()
    setError(false)

    try {
      let colors = (new Values(color).all(10)).map(oneColor =>{ 
        return {...oneColor, selected: false}
      })
     setList(colors)

    } catch (error) {
      setError(true)
      console.log(error);
    }
    // handle empty/invalid inputs that values library does not deal with

  }

  const handleChange = (e)=>{
    setColor(e.target.value)
  }

  const toggleCopied = (index) =>{
    navigator.clipboard.writeText(rgbToHex(...list[index].rgb))

    setList(oldVal => oldVal.map( item => {
      return(
        oldVal.indexOf(item) === index || item.selected ? {...item , selected: !item.selected} : item
      )
      // if something is already copied, it would be overriden and we show that to the user by toggling the selected property
    }))
  }

  const colors = list.map( (color, index) =>{
    return(
      <ColorItem
            key={index}
            id={index}
            rgb={color.rgb}
            hex={color.hex}
            type={color.type}
            weight={color.weight}
            selected={color.selected}
            alpha={color.alpha}
            toggleCopied={toggleCopied}
      />
    )
  })


  return (
    <>
      <section className="up-container">
        <h3>Color Generator</h3>
        <form className="form" onSubmit={handleSubmit}>
          <input 
            type="text"
            value={color}
            placeholder="#0000FF"
            onChange={handleChange}
            className={error ? "error" : null}
          />
          <button className="up-btn">Generate</button>
        </form>
      </section>
      <section className="down-container">
        {colors}
      </section>
    </>
  )
}

export default App
