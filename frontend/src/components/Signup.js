import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const {signupData, setSignupData} = useContext(NoteContext);

    const navigate = useNavigate();


    
    function changeHandler(e) {
        const {name, value} = e.target;

        setSignupData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const submitHandler = async(e) => {
        e.preventDefault();

            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_BASE_URL}/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...signupData}),
                }
            );

            console.log("FORM RESPONSE.......", savedUserResponse)

            if(savedUserResponse.ok) {
                navigate('/login')
            }
            else {
                console.log("Error")
            }

    }

    

  return (
    <div>
        <form>
            <input 
            type='text'
            placeholder='firstName'
            name='firstName'
            onChange={changeHandler}
            value={signupData.firstName}
            />

            <br></br>

            <input 
            type='text'
            placeholder='lastName'
            name='lastName'
            onChange={changeHandler}
            value={signupData.lastName}
            />

            <br></br>

            <input 
            type='text'
            placeholder='email'
            name='email'
            onChange={changeHandler}
            value={signupData.email}
            />


            <br></br>


            <input 
            type='text'
            placeholder='password'
            name='password'
            onChange={changeHandler}
            value={signupData.password}
            />
        </form>

        <br></br>
        <br></br>

        <button onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default Signup