import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const {search, setSearch, facultydata, setFacultyData} = useContext(NoteContext);



  const navigate = useNavigate();


  function changeHandler(e) {
    const { value } = e.target;
    setSearch(value);
  }

  const buttonHandler = async (e) => {
    e.preventDefault();


    try {
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getfaculty/${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      
      const searchData = await savedUserResponse.json();

      console.log("Search Response....", searchData)

      setFacultyData(searchData.data)


      //Faculty id in local storage
      const facultyId = searchData.data._id;
      localStorage.setItem('facultyId', facultyId)
      console.log(facultyId)


    }
    catch(error) {
      console.log("Error loggin in", error)
    }

    console.log(search)
  }


  function reviewHandler(e) {
    e.preventDefault();

    const facultyDataInlocalStorage = JSON.stringify(facultydata)
    localStorage.setItem('facultydata', facultyDataInlocalStorage);

    const facultySearchInlocalStorage = JSON.stringify(search)
    localStorage.setItem('searchName', facultySearchInlocalStorage)


    navigate('/facultypage')
  }

  return (
    <div>

    <br></br>
    <br></br>
      <div class='flex flex-col items-center'>
        <label class="block mb-2 text-sm font-medium text-gray-900">Type Faculty Name</label>
        <form className='max-w-sm mx-auto'>
        <input 
          class='block mb-2 text-sm font-medium text-gray-900'
          type='text'
          placeholder='faculty name'
          onChange={changeHandler}
          value={search}
        />
        </form>
        
      </div>

      <div class='flex flex-col items-center'>
      <button onClick={buttonHandler} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
      >Search</button>

      Info..

      {facultydata && (
        <div>
          <p>{facultydata.title}</p>
          <a href={facultydata.url}><img src={facultydata.image} alt="Faculty_Photo" width="250" height="300" /> </a>
          
        </div>
      )
      }

      <div>
        <button onClick={reviewHandler}
        class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Reviews</button>
      </div>

      </div>
    </div>
  )
}

export default HomePage