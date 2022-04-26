/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components/macro';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { QUERIES, WEIGHTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import {keyframes} from "styled-components";

const MobileMenu = ({ isOpen, onDismiss }) => {
  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content aria-label="Menu">
        <CloseButton onClick={onDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
        <Footer>
          <SubLink href="/terms">Terms and Conditions</SubLink>
          <SubLink href="/privacy">Privacy Policy</SubLink>
          <SubLink href="/contact">Contact Us</SubLink>
        </Footer>
      </Content>
    </Overlay>
  );
};

const ModalFadesIn = keyframes`
  from {
    opacity: 25%;
  }
  to {
    opacity: 75%;
  }
`

const MenuPopIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const ContentFadesIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
`

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-backdrop);
  display: flex;
  justify-content: flex-end;
  
  animation: ${ModalFadesIn} 200ms;
`;

const Content = styled(DialogContent)`
  background: white;
  width: 300px;
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  
  animation: ${MenuPopIn} 200ms backwards;
  animation-delay: 50ms;
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: 0;
  padding: 16px;

  animation: ${ContentFadesIn} 250ms backwards;
  animation-delay: 200ms;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  animation: ${ContentFadesIn} 250ms backwards;
  animation-delay: 200ms;
`;

const NavLink = styled.a`
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
    color: var(--color-secondary);
  }

  animation: ${ContentFadesIn} 250ms backwards;
  animation-delay: 200ms;
`;

const Filler = styled.div`
  flex: 1;

  animation: ${ContentFadesIn} 250ms backwards;
  animation-delay: 200ms;
`;
const Footer = styled.footer`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;

  animation: ${ContentFadesIn} 250ms backwards;
  animation-delay: 200ms;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;

  animation: ${ContentFadesIn} 250ms backwards;
  animation-delay: 200ms;
`;

export default MobileMenu;
