import React from 'react';
import { Link } from 'react-router-dom';
import { StyledHeader, StyledLogo } from './styled';
import User from './User';
import logoWhite from './../../../../logo-white.svg';

const Header = () => {
    return (
        <StyledHeader>
            <Link style={{textDecoration: 'none'}} to="/">
                <StyledLogo src={logoWhite} width={50} />
            </Link>
            <User />
        </StyledHeader>
    )
}

export default Header;

