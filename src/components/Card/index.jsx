import { EyeIcon } from '@heroicons/react/20/solid'
import { useState,useContext, useCallback } from 'react';
import { ContextGlobal } from "../../global/ContextGlobal";
import { instanceAxios } from '../../global/axiosInstance';

const CardPage = ({ name, list}) =>{
  const [check,setCheck] = useState(false)
  const { listTask,setListTask,navegacao } = useContext(ContextGlobal)
  const styleCardTask ='flex justify-content-center items-center gap-2 shadow-xl'
  const [corCard,setCorCard] =useState(`bg-slate-400 ${styleCardTask}`)
 
 /* const changeStatus = (e,item)=>{
   
     Sim api
    const mapDay = listTask.map((task)=>{
      if(task.day === item){
        const upDateStatus = task.tasks.map((stat)=>{
          if(e){
            setCheck(e)
             if(stat.id === item.id){
              return {
                      ...stat,
                     status:'done'
                    }
             }
          }else{
            setCheck(e)
            if(stat.id === item.id){
               return {
                    ...stat,
                    status:'open'
               }
            }
          }
          return stat
        })

        return {...task, tasks:upDateStatus}
      }
      return task
    })
     setListTask(mapDay)
  }*/

  const changeStatus = useCallback((e,task)=>{
    const data = {
      data:
      { completed: e ,
       id: task.gid}
    };
   
    instanceAxios.put(`/tasks/${task.gid}`, data)
    .then((resp)=> {
     
      console.log(resp.data);
      window.location.reload(false);
      
    }).catch((erro)=>{
      console.log(erro);
    })
   
  },[listTask,setCheck])

  return(
    <div className="w-100 rounded bg-violet-600 text-black shadow-lg text-center m-2 p-2">
    <h1 className='flex w-full justify-center items-center'>
        {name}</h1>
    <hr />

    {list.map((task, i) => <div key={i}
        className={task && task.completed ?
            `${styleCardTask} bg-green-400`
            :
            `${styleCardTask} bg-gray-200`}>

        <input
            type={'checkbox'}
            checked={task.completed ? true : false}
            onChange={(e) => changeStatus(e.target.checked, task)}
        />
        <h5>{task.name}</h5>
        {/* removi o /day */}
        <button onClick={() => navegacao(`/details/${task.gid}`)}>
            <EyeIcon className='w-5 text-violet-600' />
        </button>
    </div>)}




</div >)
}
export default CardPage;