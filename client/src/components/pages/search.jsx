import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '../card'
import { useLocation } from 'react-router-dom'


const Container = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 10px;
`
const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  console.log(query);

  const fetchVideos = async () => {
      try {
          const res = await axios.get(`https://youtube-mern-backend.vercel.app/api/videos/search${query}`);
          setVideos(res.data);
      } catch (error) {
          console.error("Error fetching videos:", error);
      }
  };

  useEffect(() => {
      fetchVideos();
  }, []);



return (
    <Container>
      {videos.map(video=>{
        return(
          <Card key={video._id} video={video}/>
        )
      })}
    </Container>
  )
}

export default Search