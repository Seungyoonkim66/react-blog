import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext, ThemeStyleContext } from '../../context/ThemeContext';

const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 16px;
    background-color : ${props => props.theme.backgroundColor};
    color : ${props => props.theme.color};
    font-size: x-small;
    text-align: center;
    opacity: .7;
`;

function Footer(){
    const { isDark } = useContext(ThemeContext);
    const theme = useContext(ThemeStyleContext);
    const thisYear = new Date().getFullYear();

    return(
        <FooterContainer theme={isDark ?  theme.dark : theme.light }>
            copyrightⓒ {thisYear} All rights reserved by Seungyoon
        </FooterContainer>
    );
}

export default Footer;