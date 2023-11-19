import {useState} from "react"

const Header = (props) => {

  return (
    <>
    <div>Header</div>
    <p>{props.userData.userName}</p>
    </>
  )
}

export default Header