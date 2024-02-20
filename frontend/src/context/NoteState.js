import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [isloggedin, setIsLoggedIn] = useState(false);

    const [search, setSearch] = useState('');

    const [facultydata, setFacultyData] = useState();

    return (
        <NoteContext.Provider value={{formData, setFormData, signupData, setSignupData, search, setSearch, facultydata, setFacultyData}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState