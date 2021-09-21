import React from 'react';
import AppNavbar from './AppNavbar';
import TasksTable from './features/tasks/TasksTable';

function App() {
  return (
    <>
      <AppNavbar />
      <TasksTable />
      {/*<FormGroup*/}
      {/*>*/}
      {/*  <InputGroup id="text-input" placeholder="Placeholder text" />*/}
      {/*</FormGroup>*/}
    </>
  );
}

export default App;
