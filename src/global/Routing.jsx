 import {Routes, Route} from 'react-router-dom'
 import LoginPage from '../pages/LoginPage'
 import BoardPage from '../pages/BoardPage'
 import DetailsPage from '../pages/DetailsPage'
 const Routing =()=>{
  return(
    <Routes>
       <Route path="/" element={<LoginPage/>}/>
       <Route path="/board" element={<BoardPage/>}/>
       <Route path="/details/:id" element={<DetailsPage/>}/>
    </Routes>
  )
}

export default Routing