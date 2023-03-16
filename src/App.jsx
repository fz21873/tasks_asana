import { BrowserRouter } from "react-router-dom"
import { EstadoGlobal } from "./global/ContextGlobal"
import Routing from "./global/Routing"


function App() {
  

  return (
    
      <BrowserRouter>
        <EstadoGlobal>
        <Routing/> 
        </EstadoGlobal>
      </BrowserRouter>
   
  )
}

export default App
