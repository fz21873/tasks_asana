import { useEffect, useState } from "react"
import { instanceAxios } from "../global/axiosInstance"

const useResquestData = (parametros,initialState)=>{

  // desetruturação
  const  { method, path , param } = parametros

  const [data,setData] = useState(initialState)

  const [erro,setErro] = useState()

  const [loading,setLoading] = useState(true)

  useEffect(()=>{
   instanceAxios[method](path,param)
   .then((response)=> setData(response))
   .catch((erro)=> setErro(erro))
   .finally(()=> setLoading(false))
  },[])

  return [data,erro,loading]
}

export default useResquestData