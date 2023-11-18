import { useEffect } from "react"
import URL from '../localhost.js';
// Axios speciale
import API from '../api.js';
const UserList = () => {
    useEffect(() => {
        //fetch all users
        API.get(`${URL}/`)

    })
  return (

    <ul></ul>
  )
}

export default UserList