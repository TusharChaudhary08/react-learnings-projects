import { useState } from 'react'



function App() {

  const [color , setcolor] = useState('#8EC5FF');

   function changecolor() {

    
  }
 

  return (
    <>
    <div className='h-screen w-screen  flex justify-center items-end' style={{backgroundColor: color}} >
       
    <div className="h-10 w-169 bg-gray-100 rounded-2xl m-6 flex justify-around items-center shadow-xl p-6 " >
      <div className='h-7.5 w-20 bg-[#FB64B6] rounded-md flex justify-center items-center font-bold  active:scale-95 cursor-pointer' onClick={()=>{setcolor("#FB64B6")}}>hotpink</div>
      <div className='h-7.5 w-20 bg-[#FDC700] rounded-md flex justify-center items-center font-bold  active:scale-95 cursor-pointer' onClick={()=>{setcolor("#FDC700")}}>yellow</div>
      <div className='h-7.5 w-20 bg-[#05DF72] rounded-md flex justify-center items-center font-bold active:scale-95 cursor-pointer' onClick={()=>{setcolor("#05DF72")}}>green</div>
      <div className='h-7.5 w-20 bg-[#C27AFF] rounded-md flex justify-center items-center font-bold  active:scale-95 cursor-pointer' onClick={()=>{setcolor("#C27AFF")}}>purple</div>
      <div className='h-7.5 w-20 bg-[#FFFFFF]  rounded-md flex justify-center items-center font-bold border-1 border-black active:scale-95 cursor-pointer' onClick={()=>{setcolor("#FFFFFF")}}>white</div>

    </div>

    </div>
    
    </>
  )
}

export default App
