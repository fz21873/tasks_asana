
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useContext, useState } from 'react'
import { ContextGlobal } from '../../global/ContextGlobal'

export default function LoginPage() {
  const [showPage,setShowPage] = useState(false)
  const { navegacao } = useContext(ContextGlobal)
  const cadastro=(e)=>{
   e.preventDefault()
   localStorage.setItem('name',e.target[1].value)
   localStorage.setItem('email',e.target[2].value)
   localStorage.setItem('password',e.target[3].value)
   localStorage.setItem('remember',e.target[4].checked)

  }

  const login=(e)=>{
    e.preventDefault()
    if(e.target[1].value === localStorage.getItem('email')){
      if(e.target[2].value === localStorage.getItem('password')){
        navegacao('/board')
      }else{
        alert('A senha não confere')
      }
    }else{
      alert('O email não confere')
    }
  }
 const  limpiarCadastroLogin =()=>{
  Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
  );
    
    setShowPage(!showPage)
    
  }
  return (
    <>
     
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
             {showPage ? 'Cadastre-se': 'Entre'}
            </h2>
           
          </div>
          <form className="mt-8 space-y-6" onSubmit={showPage ? cadastro : login}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              {/* fields */}
              {showPage ? 
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Name"
                />
              </div>
              :null}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button  onClick={()=> limpiarCadastroLogin()} className="font-medium text-indigo-600 hover:text-indigo-500">
                  {showPage ? 'Já tem cadstro? Faça Login':' Não tem Login? Cadastre-se'}
                 
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {showPage ? 'Save' :'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}