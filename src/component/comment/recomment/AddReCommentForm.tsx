import react, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import CommentGql from '../../../lib/gql/commentGql';
import { useMutation } from '@apollo/react-hooks';

interface AddReCommentFormProps {
  parentComment: string;
  reComments: any[];
  setReComments: any;
}

export default function AddReCommentForm({
  parentComment,
  reComments,
  setReComments,
}) {
  const { control, errors, handleSubmit } = useForm();
  const [addReComment] = useMutation(CommentGql.CREATE_RECOMMENT_IN_POST);
  const [reContents, setReContents] = useState<string>('');
  const changeReContents = useCallback(
    ([e]) => {
      setReContents(e);
      return { value: e };
    },
    [reContents],
  );

  const onSubmit = async (data) => {
    console.log('submit', data);
    const result = await addReComment({
      variables: {
        data: {
          parentComment,
          secret: false,
          contents: data.reContents,
        },
      },
    });
    if (result) {
      console.log(result.data.createReComment);
      console.log(reComments, parentComment, '비교');
      setReComments(reComments.concat(result.data.createReComment));
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={
            <TextField
              id="outlined-full-width"
              label="Comment Input"
              style={{ margin: 8 }}
              placeholder="ReContents"
              fullWidth
              name="contents"
              value={reContents}
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={changeReContents}
            />
          }
          name="reContents"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.contents && <p>contents is required</p>}
        <S.ButtonWrap>
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
        </S.ButtonWrap>
      </form>
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
