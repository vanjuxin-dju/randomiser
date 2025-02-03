import React from "react"
import ReactDOM from "react-dom/client"
import Randomiser from "./Randomiser"
import "./styles.less"

let rootDiv = document.getElementById("root")!
let root = ReactDOM.createRoot(rootDiv)
root.render(<Randomiser />)