import react from 'react';
import styled from 'styled-components';
import useInput from '../../../lib/hooks/useInput';

interface PostLeftPanelProps {
  title: string;
  changeTitle: string;
  markdown: string;
}

export default function PostLeftPanel({
  title,
  changeTitle,
  markdown,
}: PostLeftPanelProps) {
  const [desc, changeDesc] = useInput<string>(markdown);
  return (
    <>
      <S.LeftPanelWrap>
        <S.TitleInput
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={changeTitle}
        />
        <S.DescTextArea
          name="desc"
          value={desc}
          rows={5}
          onChange={changeDesc}
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
