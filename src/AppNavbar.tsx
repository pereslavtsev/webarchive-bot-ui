import { Button, Navbar } from '@blueprintjs/core';
import classes from './App.module.scss';
import React from 'react';
import AddTaskDialog from './features/tasks/AddTaskDialog';

const AppNavbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Navbar>
      <Navbar.Group align="left" className={classes.group}>
        <Navbar.Heading>WebArchiveBot</Navbar.Heading>
        <Navbar.Divider />
        <Button intent="primary" icon="plus" onClick={() => setOpen(true)}>
          Add task
        </Button>
        <AddTaskDialog isOpen={open} onClose={() => setOpen(false)} />
        <Navbar.Divider />
        <Button minimal icon="play" text="Play" />
        <Button minimal icon="document" text="Files" />
      </Navbar.Group>
    </Navbar>
  );
};

export default AppNavbar;
