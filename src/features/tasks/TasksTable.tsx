import React from 'react';
import { selectTasks, taskAdded, taskUpdated } from './tasksReducer';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Column, useTable } from 'react-table';
import { fetchTasks } from './tasksRoutines';
import TaskStatusTag from './TaskStatusTag';
import { gql, useSubscription } from '@apollo/client';

export const TasksTable = () => {
  const data = useAppSelector(selectTasks);
  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'Title',
        accessor: 'pageTitle',
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
    //dispatch(subscribeOnTaskAdded());
  }, [dispatch]);
  const x = useSubscription(
    gql`
      subscription taskAdded {
        taskAdded {
          id
          pageId
          pageTitle
          status
          status
          createdAt
          updatedAt
        }
      }
    `
  );
  const y = useSubscription(
    gql`
      subscription taskUpdated {
        taskUpdated {
          id
          pageId
          pageTitle
          status
          status
          createdAt
          updatedAt
        }
      }
    `
  );
  React.useEffect(() => {
    // @ts-ignore
    x?.data?.taskAdded && dispatch(taskAdded(x.data.taskAdded));
  }, [dispatch, x.data]);
  React.useEffect(() => {
    // @ts-ignore
    y?.data?.taskUpdated && dispatch(taskUpdated(y.data.taskUpdated));
  }, [dispatch, y, y.data]);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data: data ?? [],
    });
  return (
    <table
      width="100%"
      className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped bp3-interactive"
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
