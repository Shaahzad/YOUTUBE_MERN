import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { format, render, cancel, register } from 'timeago.js'
import axios from "axios"

const Container = styled.div`
width: ${({type})=> type !== "sm" && "360px"};
margin-bottom: ${({type})=> type === "10px" && "45px"};
cursor: pointer;
display: ${({type})=> type === "sm" && "flex"};
gap: 10px
`

const Img = styled.img`
width: 300px;
height: ${({type})=> type === "sm" ? "100px" : "200px"};
object-fit: cover;
background-color: #999;
margin-top: 10px;
flex: 1;
`

const Detail = styled.div`
display: flex;
margin-top: ${({type})=> type !== "sm" && "16px"};
gap: 20px;
flex: 1;
`
const ChannelLogo = styled.img`
width: 36px;
height: 36px;
border-radius: 50%;
background-color: #999;
display: ${({type})=> type === "sm" && "none"}
`
const Text = styled.div`
`
const Title = styled.h1`
font-size: 16px;
font-weight:500px;
color: ${({theme})=> theme.text}
`
const ChannelName = styled.h2`
font-size: 14px;
color: ${({theme})=> theme.textSoft};
margin: 9px 0px;
`
const Info = styled.div`
font-size: 14px;
color: ${({theme})=> theme.textSoft}
`


const Card = ({type,video}) => {
const [channel,setChannel] = useState({})

useEffect(()=>{
  const fetchChannel = async ()=>{
    const res = await axios.get(`http://localhost:8800/api/users/find/${video.userId}`)
    setChannel(res.data)
  }
  fetchChannel()
},[video?.userId])

  return (
    <Link to={`/video/${video?._id}`} style={{textDecoration: "none", color: "inherit"}}>
    <Container type={type}>
    <Img type={type} src={video?.imgUrl}/>
    <Detail type={type}>
    <ChannelLogo type={type} src={channel?.img}/>
    <Text>
    <Title>{video?.title}</Title>
    <ChannelName>{channel.name}</ChannelName>
    <Info>{video?.views} views . {format(video?.createdAt)}</Info>
    </Text>
    </Detail>
    </Container>
    </Link>
  )
}

export default Card