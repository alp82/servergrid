import React from 'react';
import { useAction } from 'easy-peasy';
import styled from 'react-emotion'
import { FaPlus, FaMinus } from 'react-icons/fa';

const Box = styled('div')`
  display: flex;
  align-items: center;
  
  margin-bottom: 1px;
  height: 3.5em;
  background: #141414; 
  cursor: pointer;
  
  &:hover {
    background: #191919;
  }
`;

const Indicator = styled('div')`
  width: 0.35em;
  height: 100%;
  background: ${props => props.theme.color.app[props.type]};
`;

const Label = styled('span')`
  flex-grow: 1;
  margin-left: 2em;
`;

const Buttons = styled('span')`
  z-index: 1;
  margin-right: -1em;
  font-size: 90%;
  
  & > * {
    margin-right: 0.5em;  
  }
  & > *:last-child {
    margin-right: 0;  
  }
`;

const Button = styled('span')`
  padding: .35em;
  // border: 2px solid grey;
  border-radius: 50%;
  cursor: pointer;  
  ${props => props.type && 'background: ' + props.theme.color.app[props.type]}
`;

const AppButton = ({ type, label, ...props }) => {
  const addApp = useAction(dispatch => dispatch.addApp);
  const destroyApp = useAction(dispatch => dispatch.destroyApp);

  return (
    <Box {...props}>
      <Indicator type={type} />
      <Label>{label}</Label>
      <Buttons>
        <Button onClick={() => destroyApp({ type })}><FaMinus /></Button>
        <Button onClick={() => addApp({ type })} type={type}><FaPlus /></Button>
      </Buttons>
    </Box>
  );
}

export default AppButton;
