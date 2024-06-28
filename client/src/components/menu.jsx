import React from "react";
import styled from "styled-components";
import Youtubelogo from "../assets/logo.png"
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

 const Container = styled.div`
  flex: 1 1 0%;
  background-color: ${({theme}) => theme.bglight};
  height: 160vh;
  color: ${({theme}) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0px;
 `
 const Wrapper = styled.div`
 padding: 18px 26px;
 `
 const Logo = styled.div`
 display: flex;
 align-items: center;
 gap: 5px;
 font-weight: bold;
 margin-bottom: 15px;
 `
 const Img = styled.img`
 height: 25px;
 `

 const Item = styled.div`
 display: flex;
 align-items: center;
 gap: 20px;
 cursor: pointer;
 padding: 3px 0;

 &:hover{
    background-color: ${({theme})=>theme.soft}
 }
 `
const HR = styled.hr`
margin: 10px 0;
border: 0.5px solid ${({theme}) => theme.soft};
`
const Login = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
    color: #b3b3b3;
    margin-top: 15px;
`
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    width: 80%;
    `
    const Title = styled.h2`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
`

export const Menu = ({theme, setTheme}) => {

    const {currentUser} = useSelector((state) => state.user)

    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
                <Logo>
                    <Img src={Youtubelogo}/>
                        SM-TUBE
                </Logo>
                </Link>
                <Item>
                    <HomeIcon/>
                    Home
                    </Item>
                    <Link to="trends" style={{textDecoration: "none", color: "inherit"}}>
                    <Item>
                    <ExploreOutlinedIcon/>
                    Explore
                    </Item>
                    </Link>
                    <Link to="subscriptions" style={{textDecoration: "none", color: "inherit"}}>
                    <Item>
                    <SubscriptionsOutlinedIcon/>
                    Subscription
                    </Item>
                    </Link>
                    <HR/>
                    <Item>
                    <LibraryAddCheckOutlinedIcon/>
                    Library
                    </Item>
                    <Item>
                    <HistoryOutlinedIcon/>
                    History
                    </Item>
                    <HR/>
{                  !currentUser &&
    <>
      <Login>
                        Sign in to like s, comment, and subscribe.
                        <Link to="signin" style={{textDecoration: "none"}}>
                        <Button><AccountCircleOutlinedIcon/>SIGN IN</Button>
                        </Link>
                        </Login>
  <HR/>
  </>
}                      
                    <Title>BEST OF SM-TUBE</Title>
                    <Item>
                    <LibraryMusicOutlinedIcon/>
                    Music
                    </Item>
                    <Item>
                    <SportsBasketballOutlinedIcon/>
                    Sports
                    </Item>
                    <Item>
                    <SportsEsportsOutlinedIcon/>
                   Gaming
                    </Item>
                    <Item>
                    <MovieCreationOutlinedIcon/>
                    Movies
                    </Item>
                    <Item>
                    <ArticleOutlinedIcon/>
                    News
                    </Item>
                    <Item>
                    <LiveTvOutlinedIcon/>
                    Live
                    </Item>
                    <HR/>
                    <Item>
                    <SettingsOutlinedIcon/>
                    Setting
                    </Item>
                    <Item>
                    <FlagOutlinedIcon/>
                    Report
                    </Item>
                    <Item>
                    <HelpOutlineOutlinedIcon/>
                    Help
                    </Item>
                    <Item onClick={()=> setTheme(!theme)}>
                    <SettingsBrightnessOutlinedIcon/>
                    {theme ? "Dark Mode" : "Light Mode"}
                    </Item>

                </Wrapper>
        </Container>
    )
}