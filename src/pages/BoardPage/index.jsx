import Input from "../../components/Input"
import Card from "../../components/Card"
import { useContext } from "react"
import { ContextGlobal } from "../../global/ContextGlobal"
const BoardPage = () =>{
  const { listTask,loading } = useContext(ContextGlobal)
  return(
  <div className="flex flex-wrap bg-violet-300 min-h-screen p-3">
   <Input/>
   { loading  ? 'Carregando..':
    <div className="flex w-full justify-between">
      {listTask.map((item,i)=>
        <Card key={i} name={item.day} list={item.tasks} valor={i}/>)}
    </div>
   }
   
  </div>)
}
export default BoardPage;