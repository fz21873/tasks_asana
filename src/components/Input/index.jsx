import { useContext, useState } from "react";
import { ContextGlobal } from "../../global/ContextGlobal";
import { instanceAxios } from '../../global/axiosInstance';

const Input = () =>{
  const { listTask,setListTask } = useContext(ContextGlobal)
  const [nameTask,setNameTask] = useState('')
  const [dayTask,setDayTask] = useState('')
 

  const addNewTask= ()=>{
  /* sim api
     const dayMap = listTask.map((item) => {
       if(item.day === dayTask){
        return{
          ...item,
          tasks:[
            ...item.tasks,
            {
              id:uuid(),
              name:nameTask,
              description:'',
              status:'open',
              day:dayTask
            }
          ]
        }
       }
       return item
      
      })
      setListTask(dayMap)
     setNameTask("")*/

     const data = {
      data: {
          name: nameTask,
          completed: false,
          due_on: dayTask,
          notes: '',
          assignee: '1203990323388467', 
          workspace: '1203990075003949',
      }
  }


  instanceAxios.post(`/tasks`, data)

      .then(function (response) {
          console.log(response.data);
          location.reload(true)
      })
      .catch(function (error) {
          console.error(error.response.data);
      });


  //COM CUSTOMHOOK



  setNameTask('')
  setDayTask('')
     
  }
  return(
  <div className="flex m-auto rounded shadow-md gap-2">
    <input className="margin-left:5px" 
    value={nameTask}
    onChange={(e)=>setNameTask(e.target.value)} 
    placeholder="New Task"/>
    <input type={'date'} onChange={(e) =>setDayTask(e.target.value)} />
     <button onClick={() => addNewTask()}
     className="w-10 text-white rounded-md bg-green-400">Add</button>

  
  </div>)
}
export default Input;