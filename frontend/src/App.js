import React from 'react'
import NoteState from './context/NoteState'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import FacultyPage from './components/FacultyPage'
import FirstPage from './components/FirstPage'
import Jwtdecode from './components/Jwtdecode'
import Header from './components/Header'

const App = () => {
  return (
    <NoteState>
      <Header />
      <Routes>
        <Route path='/jwt' element={<Jwtdecode />} />
        <Route path='/' element={<FirstPage />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/facultypage' element={<FacultyPage />} />
      </Routes>
    </NoteState>
  )
}

export default App