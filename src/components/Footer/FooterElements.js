import React from 'react'
import styled from "styled-components";
import { Link as LinkRouter } from 'react-router-dom'

export const FooterContainer = styled.footer`
    background-color: #101522;
`;

export const FooterWrap = styled.div`
    padding: 48px 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;

    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`;

export const FooterLinksContainer = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: center;
    width: 100%;

    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`;

export const FooterLinkItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px;
    text-align: center;
    color: #fff;
    width: 100%;

    @media screen and (max-width: 420px) {
        margin: 0;
        padding: 10px;
    }
`;

export const FooterLinkTitle = styled.h1`
    font-size: 14px;
    margin-bottom: 16px;
    color: #ccc;
`;

export const StyledLink = styled(LinkRouter)`
    color: #fff;
    text-decoration: none;
    margin-bottom: 0.5rem;
    margin-right: 1rem; 
    font-size: 14px;
    display: inline-block;
    position: relative;

    &:hover {
        color: #01bf71;
        transition: 0.3s ease-out;
    }
`;

export const StyledLink1 = styled.a`
    color: #fff;
    text-decoration: none;
    margin-bottom: 0.5rem;
    margin-right: 1rem; 
    font-size: 14px;
    display: inline-block;
    position: relative;

    &:hover {
        color: #01bf71;
        transition: 0.3s ease-out;
    }
`;

export const FooterLink = ({ to, children, description }) => {
    return (
        <div>
            <StyledLink to={to}>
                {children}
            </StyledLink>
            <FooterLinkTitle>{description}</FooterLinkTitle>
        </div>
    );
};

export const FooterLink1 = ({ to, children, description }) => {
    return (
        <div>
            <StyledLink1 href={to}>
                {children}
            </StyledLink1>
            <FooterLinkTitle>{description}</FooterLinkTitle>
        </div>
    );
};