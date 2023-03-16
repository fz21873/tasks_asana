import { PencilIcon, TrashIcon, ArrowLeftCircleIcon, CheckIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import {  useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TOKE, instanceAxios } from '../../global/axiosInstance'
import { ContextGlobal } from '../../global/ContextGlobal'
import useResquestData from '../../hooks/useRequestData'

//style 
const styleDescription = ' flex w-1/2 p-2 border-l-violet-600 border-spacing-1 border-4 rounded-md h-auto'
const styletag = 'h-1/5 p-2 rounded flex items-center text-white'

export default function DetailsPage() {
    const { deleteTask , navegacao } = useContext(ContextGlobal)
    const { id } = useParams()

    const [edit, setEdit] = useState(false)
    const [newDescription, setNewDescription] = useState("")

    const [response, isLoading] = useResquestData({
        axiosInstance: instanceAxios,
        method: 'get',
        path: `/tasks/${id}`,
        param: {
            params: {
              assignee: '1203990323388467', 
              workspace: '1203990075003949',
              opt_fields: 'date,gid,name,completed,notes,due_at, due_on'
            }
        },
       
    })
    const [showTask, setShowTask] = useState('')

    const editDescription = () => {
//no use axiosInstance
        const options = {
            method: 'PUT',
            url: `https://app.asana.com/api/1.0/tasks/${id}`,
            headers: {
                accept: 'application/json',
                authorization: TOKE
            },
            data: { data: { notes: newDescription } }
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data.data);
                setShowTask(response.data.data)
                location.reload(true)
            })
            .catch(function (error) {
                console.error(error);
            });

        setEdit(!edit)
    }
   

   /* useEffect(() => {
        if (!isLoading) {
            setShowTask(response)
        }
    }, [isLoading])*/
 // console.log(showTask.data)

    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center bg-violet-300'>
            <button onClick={() =>navegacao("/board/")}><ArrowLeftCircleIcon className="h-10 w-10 text-violet-600" /></button>
            {/* tag status completed */}
            <div className='flex items-center'>
                <h1 className='font-semibold m-2 text-3xl'>
                    {showTask && showTask.name}</h1>
                <h5 className={showTask && showTask.completed ?
                    `bg-green-500 ${styletag}` :
                    `bg-red-500 ${styletag}`}>
                    {showTask.completed ? "Done" : "Open"} </h5>
            </div>

            <div className='w-1/2 flex justify-around bg-slate-200 h-52 rounded-lg p-4 shadow-lg'>
                {/* notes */}
                <div className={
                    edit ?
                        `${styleDescription}, bg-slate-300 border-spacing-4`
                        :
                        `${styleDescription}`
                }>
                    {edit ?
                        <textarea className='bg-transparent w-full h-full text-black'
                            onChange={(e) => setNewDescription(e.target.value)}
                            value={newDescription}
                        />
                        :
                        <h5>{showTask && showTask.notes ?
                            showTask.notes
                            : "vazio"} </h5>
                    }

                    {edit ? <button onClick={editDescription}>
                        <CheckIcon className='w-5 bg-green-500 h-full' /> </button> : null} </div>

                {/* button action */}
                <div className='grid'>

                    {/* button edit */}
                    <button onClick={() => setEdit(!edit)} >
                        <PencilIcon className="h-5 w-5 text-violet-600" aria-hidden="true" />
                    </button>

                    {/* button delete */}
                    <button onClick={() => deleteTask(id)}>
                        <TrashIcon className="h-5 w- text-violet-600" aria-hidden="true" />
                    </button>
                </div>
            </div>

        </div >
    )
}