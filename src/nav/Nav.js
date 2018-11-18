import React from 'react';
import { useAction } from 'easy-peasy';
import styled from 'react-emotion'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

import { appNames } from '../store/store';
import AppButton from '../ui/AppButton';
import IconWithLabel from '../ui/IconWithLabel';

const Wrapper = styled('div')`
  display: grid;
  grid-template-areas: "server"
                       "apps";
  grid-template-rows: 16em 1fr;
`;

const Server = styled('header')`
  grid-area: server;
  display: flex;
  justify-content: center;
  margin: 2em;
  
  & > div {
    margin-right: 2em;
  }
  
  & > div:last-child {
    margin-right: 0;
  }
`;

const Apps = styled('main')`
  grid-area: apps;
`;

const AppLabel = styled('div')`
  padding: 1em 2em;
  color: grey;
  font-size: 80%;
`;



const Nav = () => {
  const addServer = useAction(dispatch => dispatch.addServer);
  const destroyServer = useAction(dispatch => dispatch.destroyServer);

  return (
    <Wrapper>
    <Server>
      <IconWithLabel icon={<FaPlusCircle />} label="Add Server" color="positive" onClick={() => addServer()} />
      <IconWithLabel icon={<FaMinusCircle />} label="Destroy" color="danger" onClick={() => destroyServer()} />
    </Server>
    <Apps>
      <AppLabel>Available Apps</AppLabel>
      <ul>
        {Object.keys(appNames).map(type => (
          <AppButton key={type} type={type} label={appNames[type]} />
        ))}
      </ul>
    </Apps>
    </Wrapper>
    );
};

export default Nav;
