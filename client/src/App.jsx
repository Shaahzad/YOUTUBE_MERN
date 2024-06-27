import styled, { ThemeProvider } from "styled-components"
import './App.css'
import { Menu } from "./components/menu"
import Navbar from "./components/Navbar"
import { darkTheme, lightTheme } from "./utils/theme"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/pages/home" 
import Video from "./components/pages/video"
import Signin from "./components/signin"
import Search from "./components/pages/search"
import { useSelector } from "react-redux"

const Container = styled.div`
   display: flex;
`
const Main =  styled.div`
  flex: 7;
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text};
`
const Wrapper = styled.div`
  padding: 22px 96px;
`

function App() {
const [theme, setTheme] = useState(true)
const {currentUser} = useSelector((state) => state.user)
  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
    <Container>
      <BrowserRouter>
    <Menu theme={theme} setTheme={setTheme}/>
    <Main>
    <Navbar/>
    <Wrapper>
   <Routes>
    <Route path="/">
     <Route index element={currentUser ? <Home type="random"/> : <Signin/>}/>
     <Route path="trends" element={currentUser ? <Home type="trend"/> :   <Signin/>}/>
     <Route path="subscriptions" element={currentUser ? <Home type="sub"/> : <Signin/>}/>
     <Route path="search" element={<Search/>}/>
     <Route path="signin" element={<Signin/>}/>
     </Route>
     <Route path="video">
      <Route path=":id" element={<Video/>}/>
    </Route>
   </Routes>
    </Wrapper>
    </Main>
      </BrowserRouter>
    </Container>
    </ThemeProvider>
  )
}

export default App
