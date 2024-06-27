import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  useState } from 'react';
import  { useNavigate } from "react-router-dom"
import axios from "axios"
import app from "../firebase.js"
import { useSelector } from 'react-redux';

const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #0000008b;
display: flex;
justify-content: center;
align-items: center;
`
const Wrapper = styled.div`
width: 600px;
height: 600px;
background-color: ${({theme}) => theme.bglight};
color: ${({theme}) => theme.text};
padding: 20px;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;
`
const Close = styled.div`
position: absolute;
top: 20px;
right: 20px;
cursor: pointer
`
const Title = styled.h1`
text-align: center;
`
const Input = styled.input`
border: 1px solid ${({theme})=> theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
color: ${({theme})=> theme.text};
`
const Desc = styled.textarea`
border: 1px solid ${({theme})=> theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
color: ${({theme})=> theme.text};
`
const Button = styled.button`
background-color: ${({theme})=> theme.soft};
color: ${({theme})=> theme.text};
font-weight: 500;
border: none;
border-radius: 3px;
padding: 10px 20px;
cursor: pointer;
`
const Label = styled.label`
font-style: 14px;
`

const upload = ({setopen}) => {
  const [img,setImg] = useState(undefined)
  const [video,setVideo] = useState(undefined)
  const[imgPerc, setImgPerc] = useState(0)
  const[videoPerc, setVideoPerc] = useState(0)
  const [input,setinput] = useState({})
  const [tags,setTags] = useState([])

  const navigate = useNavigate()
const Handeltags = (e) => {
  setTags(e.target.value.split(","))
}
const handelChange = (e) =>{
  setinput((prev)=>{
    return {...prev, [e.target.name]: e.target.value}
  })
}
const uploadfile = (file, urlType) => {
  const storage = getStorage(app);
  const fn = new Date().getTime() + file.name
const storageRef = ref(storage, fn);
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress))
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
      break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setinput((prev)=>{
    return {...prev, [urlType] : downloadURL}
  })
    });
  }
)
}

useEffect(() => {
 video && uploadfile(video, "video")
},[video])
useEffect(() => {
  img && uploadfile(img, "img")
},[img])

const handelupload = async (e) => {
  e.preventDefault()
  const token = localStorage.getItem("token")
  const res = await axios.post("http://localhost:8800/api/videos",{...input, tags, imgUrl: input.imgUrl, videoUrl: input.videoUrl},{
    headers: {Authorization: `Bearer ${token}`},
    withCredentials: true 
  })
  setopen(false)
  res.status === 200 && navigate(`http://localhost:8800/api/video/${res.data._id}`,null,{
    withCredentials: true
  })
}
  return (
    <Container>
        <Wrapper>
            <Close onClick={() => setopen(false)}>X</Close>
            <Title>upload a new video</Title>
            <Label>Video:</Label>
     {videoPerc > 0 ? ("Uploading " + videoPerc + "%") : (<Input type='file' accept='video/*' onChange={(e)=>setVideo(e.target.files[0])}/>)}            
  <Input type='text' placeholder='Title' name='title' onChange={handelChange}/>
            <Desc placeholder='Description' rows={8} name='desc' onChange={handelChange}/>
            <Input type='text' placeholder='seprate the tags with comma' onChange={Handeltags}/>
            <Label>Image:</Label>
     {
     imgPerc > 0 ? ("Uploading " + imgPerc + "%")
      : 
       (<Input type='file' accept='image/*' onChange={(e)=>setImg(e.target.files[0])}/>)
       
       }
             <Button onClick={handelupload}>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default upload