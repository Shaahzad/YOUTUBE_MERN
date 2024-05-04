import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from './card'
import axios from 'axios'



const Container = styled.div`
flex: 2;

`


const Recommendation = ({tags}) => {
    const [video,setvideo] = useState([])
        const fetchvideo = async ()=>{
            const res = await axios.get(`http://localhost:8800/api/videos/tags?tags=${tags}`)
            setvideo(res.data)
        }
      useEffect(()=>{
        fetchvideo()
    },[tags])
      return (
    <Container>
{video?.map(video=>{
<Card type="sm" key={video._id} video={video}/>
})}
    </Container>
  )
}

export default Recommendation