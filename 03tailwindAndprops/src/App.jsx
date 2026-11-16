import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react'



function App() {

  const [length, setLength] = useState(8);

  const [numAllowed, setNumAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {

    let pass = ""

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) {

      str += "0123456789"

    }

    if (charAllowed) {
      str += "!@#$%^&*()_+={}`~"
    }

    for (let i = 0; i < length; i++) {

      let index = Math.floor(Math.random() * str.length);

      pass += str.charAt(index);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]);  // usecallback() optimize when change happen in this dependencies it dont call the fuction


  useEffect(() => {
    passwordGenerator();
    setMessage("");
  }, [length, numAllowed, charAllowed, passwordGenerator]) // useEffect() make function call when change happen in this dependencies (it dont need nay varible to store it like use callback)




  return (
    <>

      <div className='w-full max-w-md shadow-md rounded-lg mx-auto px-4 py-4 my-8 text-orange-400 bg-gray-700'>
        <h1 className='mb-2 text-center text-2xl text-white'>Password Generator</h1>

        <div className='h-6 mb-3'>
          <p className=''>{message}</p>
        </div>


        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            placeholder='password'
            className='w-full bg-gray-200  text-gray-950 font-lg py-1 px-3 outline-none'
            readOnly
            ref={passwordRef}
          />


          <button className='bg-blue-500  font-bold px-4 text-center text-white shrink-0 cursor-pointer active:bg-gray-500'
            onClick={() => {
              copyPasswordToClipboard()
              setMessage("* password copied to clipboard")
            }} >
            Copy
          </button>

        </div>

        <div className='flex justify-around text-sm gap-x-3'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="">Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              className='cursor-pointer'
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}

            />
            <label htmlFor="numberInput" className='cursor-pointer'>Number</label>

          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              className='cursor-pointer'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}

            />

            <label htmlFor="characterInput" className='cursor-pointer'>Characters</label>

          </div>

        </div>


      </div>



    </>
  )
}

export default App
