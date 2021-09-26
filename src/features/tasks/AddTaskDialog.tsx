import React from 'react';
import {
  Button,
  Dialog,
  DialogProps,
  FormGroup,
  InputGroup,
  MenuItem,
} from '@blueprintjs/core';
import { useAppDispatch } from '../../app/hooks';
import { useFormik } from 'formik';
import { Suggest } from '@blueprintjs/select';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import PageSuggest from './PageSuggest';

interface AddTaskDialogProps extends Pick<DialogProps, 'isOpen' | 'onClose'> {}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ onClose, isOpen }) => {
  const dispatch = useAppDispatch();
  const [createTask, res] = useMutation(gql`
    mutation createTask($pageId: ID) {
      createTask(input: { pageId: $pageId }) {
        id
      }
    }
  `);
  console.log('res', res);
  const { values, handleChange, handleSubmit, handleReset, setFieldValue } =
    useFormik<{
      pageId: number | null;
      term: string;
    }>({
      initialValues: {
        pageId: null,
        term: '',
      },
      async onSubmit({ pageId }) {
        console.log('pageId', pageId);
        await createTask({ variables: { pageId } });
      },
    });
  return (
    <Dialog
      canEscapeKeyClose
      canOutsideClickClose
      onClose={onClose}
      isOpen={isOpen}
      title="Add task"
      onClosed={handleReset}
      usePortal
    >
      <div className="bp3-dialog-body">
        <FormGroup label="Page title">
          <PageSuggest
            onItemSelect={(page) => setFieldValue('pageId', page.id)}
          />
        </FormGroup>
      </div>
      <div className="bp3-dialog-footer">
        <div className="bp3-dialog-footer-actions">
          <Button onClick={onClose}>Close</Button>
          <Button
            intent="primary"
            onClick={(event: React.SyntheticEvent<HTMLElement, Event>) => {
              handleSubmit();
              onClose && onClose(event);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddTaskDialog;
