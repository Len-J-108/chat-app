import { useEffect, useState } from "react"
import URL from '../localhost.js';
// Axios speciale
import API from '../api.js';
const UserList = () => {

  const [listOfUsers, setListOfUsers] = useState([]);

    useEffect(() => {
        //fetch all users
        const fetchAllUsers = async () => {
          const response = await API.get(`${URL}/users/get-all`)
          const data = response.data;
          console.log(data);

          setListOfUsers(data);
        }
        fetchAllUsers();
    }, [])
  return (
    <>
    <ul>
      {listOfUsers.map((item) => {
        return <li key={item._id}>{item.userName}</li>
      })}
    </ul>
    </>
  )
}

export default UserList