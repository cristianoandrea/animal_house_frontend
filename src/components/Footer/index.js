import React from 'react';
import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    StyledLink1,
    FooterLink1
} from './FooterElements';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinkItems>
                        <FooterLink to="/" description="Qua puoi trovare tutti i nostri servizi" >Home</FooterLink>
                        <FooterLink to="/store" description="Giocattoli, accessori, sanitari e tanti altri prodotti">Store</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLink to="/presenza" description="Toelettatura, dogsitting, Veterinario, Psicologo">Servizi</FooterLink>
                        <FooterLink to="/community" description="Interagisci e conosci gli altri amanti di animali">Comunità</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLink1 to="https://site222301.tw.cs.unibo.it/game/" description="Divertiti con i nostri minigiochi sui tuoi animali preferiti">Game</FooterLink1>
                        <FooterLink1 to="https://site222301.tw.cs.unibo.it/backoffice/" description="Pannello amministrativo del sito">Backoffice</FooterLink1>
                    </FooterLinkItems>
                </FooterLinksContainer>
            </FooterWrap>
        </FooterContainer>
    );
};

export default Footer;