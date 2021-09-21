import { Tag } from '@blueprintjs/core';
import React from 'react';
import { selectTasks } from './tasksReducer';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Column, useTable } from 'react-table';
import { fetchTasks } from './tasksRoutines';
import TaskStatusTag from './TaskStatusTag';

export const TasksTable = () => {
  const data = useAppSelector(selectTasks);
  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'Title',
        accessor: 'pageId',
      },
      {
        Header: 'Archived',
        accessor: 'pageId3',
      },
      {
        Header: 'Unarchived',
        accessor: 'pageId4',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => <TaskStatusTag status={value} />,
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: 'Updated At',
        accessor: 'updatedAt',
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
    ],
    []
  );
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data: data ?? [],
    });
  return (
    <table
      className="bp4-html-table bp4-html-table-bordered bp4-html-table-condensed bp4-html-table-striped bp4-interactive"
      {...getTableProps()}
    >
      <thead>
        <tr>
          {headers.map((column) => (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TasksTable;
