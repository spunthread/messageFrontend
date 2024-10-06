import React from 'react'
import add from "../assets/AddEditDel/add.svg"

function CreateBoard({setShow}) {
  return (
        <div onClick={()=>setShow(true)} style={{
          
            position:"fixed"
            ,bottom:20,right:20
        }} className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
<img src={add} alt='Add'/>        
</div>
  )
}

export default CreateBoard