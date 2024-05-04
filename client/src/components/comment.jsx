import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
gap: 10px;
margin: 30px 0;
`
const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;

`
const Details = styled.div`
display: flex;
flex-direction: column;
gap: 10px
`
const Name = styled.span`
font-size: 14px;
font-weight: 500
`
const Date = styled.span`
font-size: 12px;
font-weight: 400px;
color: ${({theme}) => theme.textSoft};
margin-left: 5px
`
const Text = styled.span`
font-size: 14px
`
const Comment = ({comment}) => {
  const [channel,setchannel] = useState({})

  useEffect(()=>{
    const fetchcomment = async ()=>{
      const res = await axios.get(`http://localhost:8800/api/users/find/${comment.userId}`)
      setchannel(res.data)
    }
    fetchcomment()
  },[comment.userId])
  return (
    <Container>
      <Avatar src={channel?.img} />
      <Details>
        <Name>{channel?.name} <Date>{channel?.createdAt}</Date></Name>
        <Text>{comment?.desc}</Text>
      </Details>
    </Container>
  )
}

export default Comment