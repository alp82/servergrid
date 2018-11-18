import React from 'react';
import styled from 'react-emotion'

const Flex = styled('div')`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  &:hover > div {
    background: ${props => props.theme.color[props.color]};
  }
  
  &:hover > p {
    color: ${props => props.theme.color[props.color]};
  }
`;

const Icon = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  width: 1.3em;
  height: 1.3em;
  border-radius: 50%;
  font-size: 300%;
`;

const Label = styled('p')`
  margin-top: 1em;
  font-size: 90%;
`;

const IconWithLabel = ({ icon, label, color, ...props }) => (
  <Flex color={color} {...props}>
    <Icon>{icon}</Icon>
    <Label>{label}</Label>
  </Flex>
);

export default IconWithLabel;
