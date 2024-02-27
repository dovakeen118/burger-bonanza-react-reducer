import React from "react"

const OptionCollection = (props) => {
  const options = props.options.map((option) => {
    return (
      <option key={option} value={option}>{option}</option>
    )
  })
  return (
    <>
      {options}
    </>
  )
}

export default OptionCollection