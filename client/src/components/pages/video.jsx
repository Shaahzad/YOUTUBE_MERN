import { AddTaskOutlined, ReplyOutlined, ThumbDown, ThumbDownAltOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comments from '../comments'
import  Card  from '../card'
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom'
import {dislike, fetchSuccess, like} from "../../redux/videoSlice.js"
import { format } from 'timeago.js'
import axios from 'axios'
import { Subscriptions } from '../../redux/userslice.js'
import Recommendation from '../recommendation'

const Container = styled.div`
display: flex;
gap: 24px;
`
const Content = styled.div`
flex: 5;
`
const VideoWrapper = styled.div`

`
const Title = styled.h1`
font-size: 18px;
font-weight: bold;
margin-top: 20px;
margin-bottom: 20px;
color: ${({theme}) => theme.text}
`
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between
`
const Info = styled.span`
color: ${({theme})=> theme.textsoft}
`
const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({theme})=> theme.text}
`
const Button = styled.div`
display: flex;
align-items: center;
gap: 5px;
cursor: pointer;
`
const HR = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({theme})=> theme.soft} 
`
const Channel = styled.div`
display: flex;
justify-content: space-between;
`
const ChannelInfo = styled.div`
display: flex;
gap: 20px
`
const Subscribe = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: white;
border: none;
height: max-content;
padding: 10px 20px;
border-radius: 3px;
cursor: pointer;

`
const Image = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
`
const ChannelDetail = styled.div`
display: flex;
flex-direction:column;
color: ${({theme})=> theme.text}
`
const ChannelName = styled.span`
font-weight: 500;
`
const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20px;
color: ${({theme})=> theme.textsoft};
font-size: 14px
`
const Description = styled.p`
font-size: 14px
`
const VideoFrame = styled.video`
  max-height: 500px;
  width: 100%;
  object-fit: cover;

`



const Video = () => {
  const {currentUser} = useSelector((state) => state.user)
  const {currentVideo} = useSelector((state) => state.video)
  const dispatch = useDispatch()
  const path = useLocation().pathname.split("/")[2];
  
  const [channel,setChannel] = useState({})

    const fetchVideo = async () => {
      try{
      const videores = await axios.get(`https://youtube-mern-back.vercel.app/api/videos/find/${path}`)
      const channelres = await axios.get(`https://youtube-mern-back.vercel.app/api/users/find/${videores.data.userId}`)
      setChannel(channelres.data)
      dispatch(fetchSuccess(videores.data))
      }catch(error){
        next(error)
      }
  }
  useEffect(() => {
    fetchVideo()
  },[path,dispatch])

  const Handellike = async () => {
    await axios.put(`https://youtube-mern-back.vercel.app/api/users/like/${currentVideo._id}`,null,{
      withCredentials: true,
    },
    dispatch(like(currentUser._id))
    );
  
}

const Handeldislike = async () => {
    await axios.put(`https://youtube-mern-back.vercel.app/api/users/dislike/${currentVideo._id}`,null,{
      withCredentials: true
    },
    dispatch(dislike(currentUser._id))
    );
}

const HandelSub = async ()=>{
  currentUser.subscribedUsers.includes(channel._id)  ?
  await axios.put(`https://youtube-mern-back.vercel.app/api/users/unsub/${channel._id}`,null,{withCredentials: true})    
                         :
await axios.put(`https://youtube-mern-back.vercel.app/api/users/sub/${channel._id}`,null,{withCredentials: true})
dispatch(Subscriptions(channel._id))
}


return (
    <Container>
      <Content>
        <VideoWrapper>
        <VideoFrame src={currentVideo?.videoUrl} controls autoPlay/>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
           {currentVideo?.views}  views ·  {format(currentVideo?.createdAt)}
            </Info> 
            <Buttons>
                <Button onClick={Handellike}>{currentVideo?.likes.includes(currentUser?._id) ? (<ThumbUp/> ):(<ThumbUpOutlined/>)}{" "} {currentVideo?.likes?.length}</Button>
                <Button onClick={Handeldislike}>{currentVideo?.dislikes.includes(currentUser?._id) ? (<ThumbDown/>): (<ThumbDownAltOutlined/>)}Dislike</Button>
                <Button><ReplyOutlined/>Share</Button>
                <Button><AddTaskOutlined/>Save</Button>
            </Buttons>
      </Details>
      <HR/>
      <Channel>
        <ChannelInfo>
          <Image src={channel.img}/>
        <ChannelDetail>
          <ChannelName>{channel?.name}</ChannelName>
          <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
          <Description>
          {currentVideo?.desc}
       </Description>
        </ChannelDetail>
        </ChannelInfo>
        <Subscribe onClick={HandelSub}>{currentUser?.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
      </Channel>
      <HR/>
        <Comments videoId={currentVideo?._id}/>
      </Content>
      <Recommendation tags={currentVideo?.tags}/>
    </Container>
  )
}

export default Video