import React from "react";
import { useParams } from "react-router-dom";

function User() {
    const {userid} = useParams()
    return(
        <>
          <div className="bg-gray-700 p-8 text-white text-center text-4xl">User : {userid}</div>
        </>
    )
}

export default User;