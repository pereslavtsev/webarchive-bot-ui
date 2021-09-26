import React from 'react';
import AppNavbar from './AppNavbar';
import TasksTable from './features/tasks/TasksTable';

function App() {
  return (
    <>
      <AppNavbar />
      <TasksTable />
    </>
  );
}

export default App;
