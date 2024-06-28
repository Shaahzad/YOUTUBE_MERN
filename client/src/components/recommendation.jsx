import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from './card'
import axios from 'axios'



const Container = styled.div`
flex: 1;
`


const Recommendation = ({tags}) => {
    const [video,setvideo] = useState([])
        const fetchvideo = async ()=>{
            const res = await axios.get(`https://youtube-mern-backend.vercel.app/api/videos/tags?tags=${tags}`)
            setvideo(res.data)
        }
      useEffect(()=>{
        fetchvideo()
    },[tags])
      return (
    <Container>
{video?.map(video=>(
<Card type="sm" key={video._id} video={video}/>
))}
    </Container>
  )
}

export default Recommendation