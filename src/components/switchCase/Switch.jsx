// This is a simple Switch component that can be used to toggle between two states.
// It can be used in a variety of applications, such as toggling between light and dark mode, or enabling and disabling a feature.
// This is a simple Switch component that can be used to toggle between two states.

import React from 'react'

const Switch = ({ on, children }) => {
  const childrenArray = React.Children.toArray(children);
  const match = childrenArray.find((child) => child.props.value === on) ||
    childrenArray.find((child) => child.props.value === undefined);
  return match ? match.props.children : null;
};
export default Switch