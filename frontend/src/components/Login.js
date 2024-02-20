import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Login = () => {
    const {formData, setFormData, isloggedin, setIsLoggedIn} = useContext(NoteContext)

    const [incorrect, setIncorrect] = useState('')

    const navigate = useNavigate();

    function changeHandler(event) {
        const {name, value} = event.target;

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
        }
        })
    }

    const buttonHandler = async (event) => {
        event.preventDefault();

        try{
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...formData})
                }
            )
            
            console.log("Form Response.....", savedUserResponse)

            if(savedUserResponse.ok === false) {
                setIncorrect('password is incorrect')
            }

            const res = await savedUserResponse.json();

            const token = res.token

            localStorage.setItem('token', token)

            const decode = jwtDecode(token);
            console.log(decode.payload.id)

            const userId = decode.payload.id
            localStorage.setItem('userId', userId)

            const userName = decode.payload.firstName
            localStorage.setItem('userName', userName)


            if(savedUserResponse.ok) {
                navigate('/homepage')
            }
            else {
                setIncorrect('password is incorrect')
            }
        }
        catch(error) {
            console.log("Error loggin in", error)
        }
        console.log(formData)
    }

  return (
    <div>


        <form class='max-w-sm mx-auto'>
            <label>Your Email</label>
            <input 
            class="block mb-2 text-sm font-medium text-gray-900"
            type='text'
            placeholder='email'
            name='email'
            onChange={changeHandler}
            value={formData.email}
            />

            <br></br>

            <label class="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input 
            class='class="block mb-2 text-sm font-medium text-gray-900'
            type='text'
            placeholder='password'
            name='password'
            onChange={changeHandler}
            value={formData.password}
            />
            
        </form>
        <br></br>

        <div class='flex flex-col items-center'>
            <br></br>

        {<button onClick={buttonHandler}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Login</button>}
        

        <br></br>
        <div>
            <p>{incorrect}</p>
        </div>

        </div>

    </div>
  )
}

export default Login