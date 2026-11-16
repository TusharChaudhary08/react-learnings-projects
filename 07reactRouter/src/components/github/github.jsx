import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Github() {

    const [data, setData] = useState(0)

    useEffect(()=>{
    fetch('https://api.github.com/users/TusharChaudhary08')
    .then(res => res.json())
    .then(apiData => {setData(apiData)
        console.log(apiData);
    })
    
    }, [])

    
    return(
        <>
          <div className="flex justify-center"><img src={data.avatar_url} alt="" className="rounded-full h-60 w-60"/></div>
          <div className="bg-gray-700 p-8 text-white text-center text-4xl">Github followers : {data.followers}

          </div>

          
        </>
    )
}

export default Github;