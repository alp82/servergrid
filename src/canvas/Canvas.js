import React from 'react';
import { useStore } from 'easy-peasy';
import styled from 'react-emotion';

import { fade, pulse } from '../theme/ainmations';

const Wrapper = styled('div')`
  padding: 2em;
`;

const Title = styled('h1')`
`;

const SubTitle = styled('div')`
  margin-bottom: 1em;
  font-size: 80%;
`;

const Grid = styled('div')`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.theme.canvas.server.width}em, 1fr));
  grid-auto-rows: auto;
  grid-auto-flow: row dense;
  align-items: start;
`;

const Server = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => props.theme.canvas.server.width}em;
  height: ${props => props.theme.canvas.server.height}em;
  border-radius: 3px;
  background: ${props => props.theme.color.dark};
  text-align: center;
  transform-origin: 50% 50%;
  ${props => props.spawning && 'animation: ' + pulse + ' 1s cubic-bezier(0.5, 0.5, 0, 1) infinite;'}
  ${props => props.destroying && 'animation: ' + pulse + ' 1s cubic-bezier(0.5, 0.5, 0, 1) infinite;'}
`;

const App = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-basis: 0;
  flex-grow: 1;
  background: ${props => props.theme.color.app[props.type]};
  ${props => props.spawning && 'animation: ' + fade + ' 1s cubic-bezier(0.5, 0.5, 0, 1) infinite;'}
  ${props => props.destroying && 'animation: ' + fade + ' 1s cubic-bezier(0.5, 0.5, 0, 1) infinite;'}
`;

const AppTitle = styled('h2')`
`;

const AppLabel = styled('div')`
`;

const Canvas = () => {
  const { servers, capacityLeft } = useStore(
    state => ({
      servers: state.servers,
      capacityLeft: state.capacityLeft,
    })
  );
  return (
    <Wrapper>
      <Title>
        Server Canvas
      </Title>
      <SubTitle>
        Capacity Left: <strong>{capacityLeft} Apps</strong>
      </SubTitle>
      <Grid>
          {servers.map(server => (
            <Server key={server.id} spawning={server.spawning} destroying={server.destroying}>
              {server.apps.map(app => (
                <App key={app.id} type={app.type} spawning={app.spawning} destroying={app.destroying}>
                  <AppTitle>{app.type}</AppTitle>
                  <AppLabel>{app.label}</AppLabel>
                </App>
              ))}
            </Server>
          ))}
      </Grid>
    </Wrapper>
  );
};

export default Canvas;
