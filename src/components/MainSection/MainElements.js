import styled from 'styled-components'
import { FaTimes} from 'react-icons/fa'
import { Link as LinkRouter } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll'
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md'

export const HeroContainer= styled.div`
    background: #0c0c0c;
    display:flex;
    //margin-top: -80px;
    justify-content:center;
    align-items:center;
    padding: 0 30px;
    height: 800px; 
    position: relative;
    z-index:1;

    :before {
        conten: '';
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%,
        rgba(0,0,0,0.6) 100%),
        linear-gradient(180deg, rgba(0,0,0,0.2)0%, transparent 100%);
        z-index: 2;
    }
`

export const HeroBG= styled.div`
    position:absolute;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const HeroContent= styled.div`
    z-index:3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const HeroH1 = styled.h1`
    color: #fff;
    font-size:48px;
    text-align: center;

    @media screen and (max-width: 768px) {
        font-size: 40px;
    }

    @media screen and (max-width: 460px) {
        font-size: 32px.
    }
`
export const HeroP= styled.p`
    margin-top: 24px;
    color: #fff;
    font-size: 20px;
    text-align: center;
    max-width: 900px;

    @media screen and (max-width: 768px) {
        font-size: 24px;
    }

    @media screen and (max-width: 460px) {
        font-size: 18px.
    }
`
export const HeroBtnWrapper= styled.div`
    margin-top: 32px;
    display:flex;
    flex-direction: column;
    align-items: center;
`
export const ArrowForward= styled(MdArrowForward)`
    margin-left: 8px;
    fontsize:20px;
`

export const ArrowRight= styled(MdKeyboardArrowRight)`
    margin-left: 8px;
    fontsize:20px;
`