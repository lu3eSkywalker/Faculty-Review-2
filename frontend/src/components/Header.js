import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/NoteContext';

const Header = () => {

    const {isloggedin, setIsLoggedIn} = useContext(NoteContext);

    const navigate = useNavigate();

const buttonHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token')

    try {
        const loggedOut = await fetch(
            `${process.env.REACT_APP_BASE_URL}/logout`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                    "Authorization": `Bearer ${token}`
                },
            }
        );

        const data = await loggedOut.json();

        if(loggedOut.ok) {
            console.log(data.message);
            
            localStorage.clear();
            navigate('/frontpage')
        } else {
            console.log(data.message)
        }


    }
    catch(error) {
        console.log("Error", error)
    }
}


const token = localStorage.getItem('token');























  return (
    <div>

<header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Faculty Review</span>
            </a>

            <div class="flex items-center lg:order-2">
            {token && <div><button onClick={buttonHandler} class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >Logout</button></div>}



                {!token && <button onClick={() => navigate('/login')} class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Login</button>}
                {!token && <button onClick={() => navigate('/signup')} class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Signup</button>}
            </div>


            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="/Homepage" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Faculty</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>


            
    </div>
  )
}

export default Header