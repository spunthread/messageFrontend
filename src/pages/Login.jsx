import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

function Login() {
    const {dispatch}=useContext(GlobalContext)
  return (
    <div>

        <button onClick={()=>dispatch({type:"LOGIN",payload:true})}>Login</button>
    </div>
  )
}

export default Login