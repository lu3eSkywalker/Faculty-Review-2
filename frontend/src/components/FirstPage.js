import React from 'react'
import { useNavigate } from 'react-router-dom'

const FirstPage = () => {
    const navigate = useNavigate();



  return (
    <div>
        <button onClick={() => navigate('/login')}>Login</button>
            <br></br>
        <button onClick={() => navigate('/signup')}>Signup</button>
    </div>
  )
}

export default FirstPage