import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../card'
import axios from "axios"


const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 10px;
`
const Home = ({type}) => {
  const [videos, setVideos] = useState([])

  useEffect(()=>{
    const fetchVideo = async () => {
      const res = await axios.get(`https://youtube-mern-back.vercel.app/api/videos/${type}`)
      setVideos(res.data)
    }
    fetchVideo()
  },[type])

  return (
    <Container>
      {videos.map((video)=>(
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  )
}

export default Home