import styled from '@emotion/styled';
import React, { ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  margin-right: 1rem;
  font-weight: 700;
  color: #40b9fe;

  &.link--active,
  &:hover {
    color: #00a2ff;
    text-decoration: underline;
    text-underline-offset: 0.375rem;
  }
`;

interface HeaderLinkProps {
  nowPath: string;
  path: string;
  children: ReactNode;
}

function HeaderLink({ nowPath, path, children }: HeaderLinkProps) {
  const isActive = useMemo(() => {
    return nowPath === path ? 'link--active' : '';
  }, [nowPath]);
  return (
    <StyledLink className={isActive} to={path}>
      {children}
    </StyledLink>
  );
}

export default HeaderLink;
