import React from 'react';
import { Tag } from '@blueprintjs/core';
import classes from './TaskStatusTag.module.scss';

interface TaskStatusTagProps {
  status: string;
}

const TaskStatusTag: React.FC<TaskStatusTagProps> = ({ status }) => {
  const getIntent = React.useCallback(() => {
    switch (status) {
      case 'PENDING':
        return 'none';
      case 'COMPLETED':
        return 'success';
      case 'FAILED':
        return 'danger';
    }
  }, [status]);
  return (
    <Tag className={classes.tag} fill intent={getIntent()}>
      {status}
    </Tag>
  );
};

export default TaskStatusTag;
