import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import { useNavigate } from 'react-router-dom';

const FacultyPage = () => {

  // const {search} = useContext(NoteContext);

  const navigate = useNavigate();

  const [inputdata, setInputData] = useState('');
  const [reviewdata, setReviewData] = useState([]);

  function changeHandler(e) {
    const {value} = e.target
    setInputData(value)
  }

  const searchName = localStorage.getItem('searchName');
  const search = JSON.parse(searchName);

  useEffect(() => {
    realtimeReview();
  }, []);

  const realtimeReview = async (e) => {
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

      const facultyReview = await savedUserResponse.json();

      console.log("Search Response.....", facultyReview)
      console.log(facultyReview.data.title)
      console.log(facultyReview.data.review[0].review + "                By: " +  facultyReview.data.review[0].userName)
      setReviewData(facultyReview.data)

    }
    catch(error) {
      console.log("Error", error)
    }
  }



  const buttonHandler = async (e) => {
    e.preventDefault();



    const storedToken = localStorage.getItem('token');
    console.log(storedToken)

    const storedUserId = localStorage.getItem('userId');
    console.log(storedUserId)

    const storedfacultyId = localStorage.getItem('facultyId');
    console.log(storedfacultyId)

    const userName = localStorage.getItem('userName');
    console.log(userName)


    try {
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: storedUserId,
          facultyId: storedfacultyId,
          userName: userName,
          review: inputdata,
        })
      }
      )

      if(savedUserResponse.ok) {
        realtimeReview();
      }


      if(!savedUserResponse.ok) {
        console.log('Failed to save user review')

        const res = await savedUserResponse.json();

        console.log(res);
      }
    }
    catch(error) {
      console.log("Error", error)
    }
    console.log(inputdata)



    // console.log(facultydata._id)

  }

  const storedFacultyData = localStorage.getItem('facultydata')
  const parsedFacultyData = storedFacultyData ? JSON.parse(storedFacultyData) : null;
  // console.log(parsedFacultyData)



  return (
    <div>

      <br></br>
      <br></br>

      <div class='flex flex-col items-center'>
      This is faculty Page

      {parsedFacultyData&&(
        <div>
        <p>{parsedFacultyData.title}</p>
        <img src={parsedFacultyData.image} alt="Faculty_Photo" width="200" height="250" />
        </div>)}

      </div>


      

      {/* <p>Reviews</p>
       {reviewdata && reviewdata.review && reviewdata.review.map((item, index) => (
         <p key={index}>
           {item.review + "   By: " + item.userName}
           <br></br>
           <br></br>
         </p>
       ))} */}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {reviewdata && reviewdata.review && reviewdata.review.map((item, index) => (
          <div key={index} className="mb-4 flex items-start">
            <p className="text-lg mr-2">{item.review}</p>
            <p className="text-sm">
              <span className="underline"> by: {item.userName}</span>
            </p>
          </div>
        ))}
      </div>






      <form onSubmit={buttonHandler}>
        <input
        type='text'
        placeholder='faculty'
        onChange={changeHandler}
        value={inputdata}
        />
      </form>

      <button onClick={buttonHandler}
      class='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
      >Post the Review</button>
      

    </div>
  )
}

export default FacultyPage
