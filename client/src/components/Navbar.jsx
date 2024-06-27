import React, { useState } from 'react'
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link,  useNavigate } from 'react-router-dom';
import Signin from './signin';
import { useDispatch, useSelector } from 'react-redux';
import VideoCallOutlined from '@mui/icons-material/VideoCallOutlined';
import Upload from './upload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from '../redux/userslice';

const Container = styled.div`
position:sticky;
top: 0;
background-color: ${({theme}) => theme.bgLighter};
margin-top: 10px;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
height: 100%;
padding: 0 20px;
justify-content: flex-end;
position: relative;
`
const Search = styled.div`
position: absolute;
left: 0;
right: 0;
margin: auto;
width: 40%;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px;
display: flex;
justify-content: space-between;
align-items: center;
color: ${({theme}) => theme.text};
`
const Input = styled.input`
border: none;
background-color: transparent;
outline: none;
width: 100%;
color: ${({theme}) => theme.text};

`
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    `
const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
color: ${({theme}) => theme.text};
font-weight: 500;
`
const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`

const Buttons = styled.button`
  padding: 10px;
  background-color: red;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Navbar = () => {

const dispatch = useDispatch()

  const logoutHandler = async () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/signin")
  }
  const navigate = useNavigate()
  const [open,setopen] = useState(false)
  const [q,setq] = useState("")
  const {currentUser} = useSelector((state) => state.user)
  return (
    <>
    <Container>
      <Wrapper>
        <Search>
        <Input placeholder='Search' onChange={(e)=>setq(e.target.value)}/>
        <SearchOutlinedIcon onClick={()=>navigate(`/search?q=${q}`)}/>
        </Search>
{  currentUser ? (<User>
  <VideoCallOutlined style={{cursor: "pointer"}} onClick={()=>setopen(true)}/>
  <Avatar src={currentUser?.img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
  {currentUser?.name}
  <Buttons onClick={logoutHandler}>log out</Buttons>
</User> 
):(
<Link to="signin" style={{textDecoration: "none", color: "inherit"}}>
        <Button>
          <AccountCircleOutlinedIcon/>
          SIGN IN
          </Button>
        </Link>   
)}
        </Wrapper>
      </Container>
      {open && <Upload setopen={setopen}/>}
    </>
  )
}

export default Navbar