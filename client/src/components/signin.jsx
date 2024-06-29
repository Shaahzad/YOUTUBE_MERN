import React, { useState } from 'react'
import styled from 'styled-components'
import axios from "axios"
import { loginFailure, loginSuccess, loginstart } from '../redux/userslice'
import { useDispatch } from 'react-redux'
import {auth,provider} from "../firebase.js"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
display:flex;
justify-content: center;
flex-direction:column;
align-items:center;
height:calc(100vh - 56px);
color: ${({theme}) => theme.text};
`
const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
background-color: ${({theme}) => theme.bglight};
border: 1px solid ${({theme}) => theme.soft};
padding: 20px 50px;
gap: 10px;
`
const Title = styled.h1`
font-size: 24px;
`

const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;
`

const Input = styled.input`
border: 1px solid ${({theme}) => theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 100%;
outline: none;
color: ${({theme}) => theme.text};

`

const Button = styled.button`
border: none;
border-radius: 3px;
padding: 10px 20px;
font-weight: 600;
cursor: pointer;
background-color: ${({theme}) => theme.textsoft};
color: ${({theme}) => theme.bgLighter};
`

const More = styled.div`
display: flex;
font-size: 12px;
margin-top: 10px;
`

const NavLink = styled.div`
margin-left: 50px;
`

const Link = styled.span`
margin-left: 30px;
`

export const Signin = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlelogin = async (e) => {
    e.preventDefault()
    dispatch(loginstart())
    try {
      const res = await axios.post("https://youtube-mern-back.vercel.app/api/auth/signin",{name,password},{
        withCredentials: true,
      })
        console.log(res.data.token)
        localStorage.setItem("token", res.data.token)
        dispatch(loginSuccess(res.data))
        navigate("/")
    } catch (error) {
        dispatch(loginFailure())
    }
  }

  const signinwithgoogle = async ()=>{
    dispatch(loginstart())
      signInWithPopup(auth,provider).then((res)=>{
       axios.post("https://youtube-mern-back.vercel.app/api/auth/google",{
          name:res.user.displayName,
          email:res.user.email,
          img:res.user.photoURL
        }).then((res)=>{
          dispatch(loginSuccess(res.data))
          navigate("/")
        })
    }).catch((err)=>{
      dispatch(loginFailure())
    })
  }

  const handlesignup = async (e) => {
    e.preventDefault()
    dispatch(loginstart())
    try {
      const res = await axios.post("https://youtube-mern-back.vercel.app/api/auth/signup",{name,email,password},{
        withCredentials: true,
      })
       dispatch(loginSuccess(res.data))
       alert(res.data)
    } catch (error) {
        dispatch(loginFailure())
    }
    setName("")
    setEmail("")
    setPassword("")
     
  }
  

  return (
    <Container>
        <Wrapper>
         <Title>Sign in</Title>
         <SubTitle>To Continue To SM-Tube</SubTitle>
         <Input placeholder='username' onChange={(e) => setName(e.target.value)}/>
         <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
         <Button onClick={handlelogin}>Sign in</Button>
         <Title>Or</Title>
         <Button onClick={signinwithgoogle}>Sign in with google</Button>
         <Title>Or</Title>
         <Input placeholder='username' onChange={(e) => setName(e.target.value)}/>
         <Input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
         <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
         <Button onClick={handlesignup}>Sign up</Button>
        </Wrapper>
        <More>
            English (USA)
            <NavLink>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
            </NavLink>
        </More>
    </Container>
  )
}

export default Signin