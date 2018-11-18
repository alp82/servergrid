import React from 'react';
import styled from 'react-emotion'

const Background = styled('div')`
  background: #0e0e0e;
`;

const Page = styled('div')`
  display: grid;
  grid-template-areas: "nav  main";
  grid-template-columns: 18em 1fr;
  max-width: 100em;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 1em;
`;

const Nav = styled('nav')`
  grid-area: nav;
  background: ${props => props.theme.color.dark};
  color: white;
`;

const Main = styled('main')`
  grid-area: main;
  background: black;
  color: white;
`;

const Layout = ({ nav, main }) => (
  <Background>
    <Page>
      <Nav>
        {nav()}
      </Nav>
      <Main>
        {main()}
      </Main>
    </Page>
  </Background>
);

export default Layout;
