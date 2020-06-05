import react, { useMemo, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import CommentGql from '../../lib/gql/commentGql';
import { useWrite } from '../../utils/write/WriteProvide';
import styled from 'styled-components';

interface EditCommentProps {
  toggleEdit: boolean;
  onClickToggle: any;
  commentId: string;
  setToggleEdit: any;
  reComments?: any[];
  setReComments?: any;
}

export default function EditComment({
  toggleEdit,
  onClickToggle,
  commentId,
  setToggleEdit,
  reComments,
  setReComments,
}: EditCommentProps) {
  const { control, handleSubmit, errors } = useForm();
  const [contents, setContents] = useState<string>('');
  const { state, dispatch } = useWrite();
  const [updateComment] = useMutation(CommentGql.UPDATE_COMMENT_IN_POST);

  const changeContents = useCallback(
    ([e]) => {
      setContents(e);
      return { value: e };
    },
    [contents],
  );
  const onSubmit = async (data) => {
    console.log('submit', data);

    const result = await updateComment({
      variables: {
        data: {
          commentId,
          secret: false,
          contents: data.contents,
        },
      },
    });
    if (result) {
      console.log(result);
      if (reComments) {
        console.log(reComments, commentId, '비교');
        const index = reComments.findIndex((v) => v._id == commentId);
        console.log('index', index);
        if (index > -1) {
          reComments[index] = result.data.updateComment;
          setReComments(reComments);
        }
      } else {
        dispatch({ type: 'UpdateComments', data: result.data.updateComment });
      }
      setToggleEdit(false);
    }
  };
  return (
    <>
      {useMemo(
        () => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={
                <TextField
                  id="outlined-full-width"
                  label="Comment Input"
                  style={{ margin: 8 }}
                  placeholder="Placeholder"
                  fullWidth
                  value={contents}
                  margin="normal"
                  multiline
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="contents"
                  variant="outlined"
                  onChange={changeContents}
                />
              }
              name="contents"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.contents && <p>contents is required</p>}
            <S.ButtonWrap>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setToggleEdit(false)}
              >
                Cancel
              </Button>
              <Button variant="outlined" color="primary" type="submit">
                Submit
              </Button>
            </S.ButtonWrap>
          </form>
        ),
        [contents, errors, toggleEdit],
      )}
    </>
  );
}

const S: any = {};

S.ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  & button {
    width: 5rem;
  }
  & button:first-child {
    margin-right: 0.5rem;
  }
`;
