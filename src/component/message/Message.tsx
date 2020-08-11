import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../common/error/ErrorMessage';
import palette from '../../lib/pallete';

export default function Message() {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // reducer로 로그인 처리 보냄
    reset();
  };

  return (
    <>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.MessageHeader>
          <span>받는 사람</span>
          <button type="submit">보내기</button>
        </S.MessageHeader>
        <S.FormItem>
          <input
            id="title"
            name="title"
            placeholder="title..."
            ref={register({
              required: 'required',
            })}
            type="text"
          />
          {errors.title && <ErrorMessage>제목을 입력해주세요.</ErrorMessage>}
        </S.FormItem>
        <S.FormItem>
          <textarea
            id="content"
            name="content"
            placeholder="content..."
            ref={register({
              required: 'required',
              minLength: {
                value: 5,
                message: 'min length is 5',
              },
            })}
          />
          {errors.title && (
            <ErrorMessage>내용을 5글자 이상 입력해주세요</ErrorMessage>
          )}
        </S.FormItem>
      </S.Form>
    </>
  );
}

const S: any = {};

S.MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  & > span,
  button {
    padding: 1rem;
    border: 1px solid ${palette.gray5};
    background: ${palette.gray1};
    border-radius: 5px;
  }
`;
S.Form = styled.form`
  color: ${palette.gray8};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30rem;
  height: 15rem;
  padding: 1rem;
`;

S.FormItem = styled.div`
  width: 100%;
  & > input,
  textarea {
    width: 100%;
    border: 1px solid ${palette.gray5};
  }
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  position: relative;
`;
