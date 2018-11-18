import React from 'react';
import styled from 'react-emotion'

const Background = styled('div')`
  background: #0e0e0e;
`;

const Page = styled('div')`
  display: grid;
  grid-template-areas: "head head"
                       "nav  main"
                       "foot foot";
  grid-template-rows: 1fr 6fr 1fr;
  grid-template-columns: 18em 1fr;
  max-width: 100em;
  height: 100vh;
  margin: 0 auto;
  padding: 0 1em;
`;

const Head = styled('header')`
  grid-area: head;
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

const Foot = styled('footer')`
  grid-area: foot;
`;

const Layout = ({ nav, main }) => (
  <Background>
    <Page>
      <Head />
      <Nav>
        {nav()}
      </Nav>
      <Main>
        {main()}
      </Main>
      <Foot />
    </Page>
  </Background>
);

export default Layout;
