import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import Logo from "../Logo";
import SuperHeader from "../SuperHeader";

const Header = () => {
  // Our site features two visual headers, but they should be
  // grouped semantically as a single header.
  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
      </MainHeader>
    </header>
  );
};

const MainHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 48px;

  padding: 24px 32px;
  border-bottom: 1px solid ${COLORS.gray[300]};
`;

// Wrapper used instead of styled(Logo) because the keyboard navigation experience is broken when applying
// styles directly to the Logo Component, as the styles hit the h1 but not the a tag
const LogoWrapper = styled.div`
  position: absolute;
  /* Removes the height stretch coming from the parent flex container */
  align-self: flex-start;
  left: 32px;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 3rem;
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

export default Header;
