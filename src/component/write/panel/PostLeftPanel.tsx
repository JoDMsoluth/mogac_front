import react, { useCallback } from 'react';
import styled from 'styled-components';
import { useWrite } from '../../../utils/write/WriteProvide';
import CustomInput from '../../../lib/CustomInput';
import { Title, LocalOffer } from '@material-ui/icons';
import palette from '../../../lib/pallete';

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
  const changeTags = useCallback(
    (e) => {
      dispatch({ type: 'ChangeTags', data: e.target.value });
    },
    [state.tags],
  );

  return (
    <>
      <S.LeftPanelWrap>
        <CustomInput
          type="text"
          name="title"
          value={state.title}
          placeholder="Title"
          onChange={onChangeTitle}
          inputIcon={<Title />}
        />
        <S.DescTextArea
          name="desc"
          value={state.desc}
          rows={10}
          cols={35}
          onChange={onChangeDesc}
          maxLength={350}
        ></S.DescTextArea>
        <CustomInput
          type="text"
          name="tags"
          value={state.tags}
          placeholder="Tags"
          onChange={changeTags}
          inputIcon={<LocalOffer />}
        />
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
  color: ${palette.blue6};
  height: 3rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
`;

S.DescTextArea = styled.textarea`
  flex: 1;
  margin-bottom: 0.5rem;
  color: ${palette.blue8};
`;
