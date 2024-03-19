import "../assets/style.css"
import javascriptLogo from "../javascript.svg"
import viteLogo from "/logo.svg"
import { setupCounter } from "../counter.js"

document.querySelector("#app").innerHTML = `
  <div>
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
      <img src="${javascriptLogo}"  class="logo vanilla" alt="JavaScript logo" />
    <h1>Hello Gooner!</h1>
    <h2>Increase Goon Count!</h2>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p>
      This project uses the Vite Build Tool.
      <br>
      <br>
      It is designed to be a Progressive Web App (PWA)
      <br>
      <br>
      It will become a visual novel eventually.
    </p>
  </div>
`

setupCounter(document.querySelector("#counter"))
