import React, { useEffect, useState ,useCallback} from "react"
import {useNavigate } from "react-router-dom"
import useResquestData from "../hooks/useRequestData"
import { instanceAxios } from "./axiosInstance"
export const ContextGlobal = React.createContext()

export const EstadoGlobal = ({children}) =>{
  
  const [data , loading ] = useResquestData({
    method:'get',
    path: '/tasks',
    param: {
      params: {
        assignee: '1203990323388467', 
        workspace: '1203990075003949',
        opt_fields:'data,gid,name,completed,notes,due_at,due_on'}
    },
  })
  const navegacao = useNavigate()

  const [listTask,setListTask] = useState([])

  console.log(data)

  function groupTaskDay(){
    //iniciando os arrays vazios
    const daysOfWeek = {
      Sunday:[],
      Monday:[],
      Tuesday:[],
      Wednesday:[],
      Thursday:[],
      Friday:[],
      Saturday:[]
    }
    //transformando a data em string
    const result = data && data.data && data.data.data.reduce((acc,item)=>{
      const day = item.due_on
      if(day){
        const dayOfWeek = new Date(day).toLocaleDateString('en-US',
        {weekday:'long', timeZone:'UTC'})
        acc[dayOfWeek].push(item)
      }
      return acc
    },daysOfWeek)

    const daysOfWeekArr = Object.entries(result).map(([day,tasks])=>{
      return {
        day,
        tasks
      }
    })

    setListTask(daysOfWeekArr)
  }

  useEffect(()=>{
    {!loading ? groupTaskDay():null}
  },[loading])
   
  const deleteTask = (id) => {

    instanceAxios.delete(`/tasks/${id}`)
        .then(() => { alert('Task Removida com sucesso') ;  location.reload(true) })
        .catch((erro) => { console.log(erro) })

        navegacao("/board")

}


  return(
    <ContextGlobal.Provider value={{ listTask,setListTask,navegacao,loading,deleteTask,data }}>
      {children}
    </ContextGlobal.Provider>
  )
}