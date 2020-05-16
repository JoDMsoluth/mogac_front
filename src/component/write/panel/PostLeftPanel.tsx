import react, { useCallback } from 'react';
import styled from 'styled-components';
import { useWrite } from '../../../utils/write/WriteProvide';

export default function PostLeftPanel() {
  const { state, dispatch } = useWrite();

  const onChangeTitle = useCallback(
    (e) => {
      dispatch({ type: 'ChangeTitle', data: e.target.value });
    },
    [state.title],
  );

  const onChangeDesc = useCallback(
    (e) => {
      dispatch({ type: 'ChangeDesc', data: e.target.value });
    },
    [state.desc],
  );

  return (
    <>
      <S.LeftPanelWrap>
        <S.TitleInput
          type="text"
          name="title"
          value={state.title}
          placeholder="Title"
          onChange={onChangeTitle}
        />
        <S.DescTextArea
          name="desc"
          value={state.desc}
          rows={5}
          onChange={onChangeDesc}
          maxLength={250}
        ></S.DescTextArea>
      </S.LeftPanelWrap>
    </>
  );
}

const S: any = {};

S.LeftPanelWrap = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem 1rem 1rem;
`;

S.TitleInput = styled.input`
  height: 3rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
`;

S.DescTextArea = styled.textarea``;
