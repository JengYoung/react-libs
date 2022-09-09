import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/react.svg';
import HeaderLink from './Header/HeaderLink';

const StyledLogoContainer = styled.div`
  width: 3rem;
  height: 3rem;
  img {
    width: 100%;
    height: 100%;
  }
`;
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 5rem;
  padding: 0 1rem;
  background-color: #fefefe;
  box-shadow: 0px 0.5px 1px 1px #eeeeee;
`;

const StyledNav = styled.nav`
  margin-left: 1rem;
`;

function Header() {
  const links = [
    {
      path: '/home',
      name: '홈',
    },
    {
      path: '/me',
      name: '마이페이지',
    },
  ];

  const location = useLocation();
  const [pathName, setPathName] = useState('');

  useEffect(() => {
    setPathName(() => location.pathname);
  }, [location]);

  return (
    <StyledHeader>
      <StyledLogoContainer>
        <img src={Logo} alt="logo" />
      </StyledLogoContainer>
      <StyledNav>
        {links.map((link) => (
          <HeaderLink nowPath={pathName} key={link.path} path={link.path}>
            {link.name}
          </HeaderLink>
        ))}
      </StyledNav>
    </StyledHeader>
  );
}

export default Header;
