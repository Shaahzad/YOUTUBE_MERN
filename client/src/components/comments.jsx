import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from './comment'
import { useSelector } from 'react-redux'

const Container = styled.div`
`
const NewComment = styled.div`
display: flex;
align-items: center;
gap: 10px;
`
const Input = styled.input`
border: none;
border-bottom: 1px solid ${({theme}) => theme.soft};
background-color: transparent;
outline: none;
width: 100%;
color: ${({theme}) => theme.text};
padding: 5px;
`
const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;

`

const Comments = ({videoId}) => {
  const {currentUser} = useSelector((state) => state.user)
  const [comment,setcomment] = useState([])

  useEffect(()=>{
    const fetchcomment = async ()=>{
       try {
        const res =  await axios.get(`http://localhost:8800/api/comments/${videoId}`,{},{withCredentials:true})
        setcomment(res.data)
       } catch (error) {
        
       }
    }
    fetchcomment()
  },[videoId])
  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser?.img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
            <Input placeholder='Add a comment...'/>
        </NewComment>
        {comment.map((comment)=>(
          <Comment key={comment._id} comment={comment}/>
        ))}
    </Container>
  )
}

export default Comments