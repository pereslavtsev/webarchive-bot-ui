import { Button, Navbar } from '@blueprintjs/core';
import classes from './App.module.scss';
import React from 'react';

const AppNavbar: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Group align="left" className={classes.group}>
        <Navbar.Heading>WebArchiveBot</Navbar.Heading>
        <Navbar.Divider />
        <Button intent="primary" icon="plus">
          Add task
        </Button>
        <Navbar.Divider />
        <Button className="bp4-minimal" icon="play" text="Play" />
        <Button className="bp4-minimal" icon="document" text="Files" />
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNavbar;
