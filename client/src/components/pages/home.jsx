import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../card'
import axios from "axios"
const Container = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
`
const Home = ({type}) => {
  const [videos, setVideos] = useState([])

  useEffect(()=>{
    const fetchVideo = async () => {
      const res = await axios.get(`http://localhost:8800/api/videos/${type}`)
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