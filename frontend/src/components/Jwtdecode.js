import React from 'react'
import { jwtDecode } from "jwt-decode";

const Jwtdecode = () => {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiYW5ha2luc2t5d2Fsa2VyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFuYWtpbiIsImlkIjoiNjVkMzdjMjkzOTk2YTQxMzk4ZTVhZGYxIn0sImlhdCI6MTcwODM2NTIzMCwiZXhwIjoxNzA4NDUxNjMwfQ.WWrS7m_8LOprJ0zUnKaTY743yP0moQRtCpae90TroVU"
  const decoded = jwtDecode(token);

  console.log(decoded)


  return (
    <div>
      App
    </div>
  )
}

export default Jwtdecode