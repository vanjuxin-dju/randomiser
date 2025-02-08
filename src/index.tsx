import React from "react"
import ReactDOM from "react-dom/client"
import RandomiserWrapper from "./RandomiserWrapper"
import "./styles.less"

let rootDiv = document.getElementById("root")!
let root = ReactDOM.createRoot(rootDiv)
root.render(<RandomiserWrapper />)