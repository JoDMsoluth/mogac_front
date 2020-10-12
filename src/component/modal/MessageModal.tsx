import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import useInput from '../../lib/hooks/useInput';
import CustomInput from '../../lib/CustomInput';
import { Title } from '@material-ui/icons';
import messageGql from '../../lib/gql/messageGql';
import { useMutation } from '@apollo/react-hooks';
import { useAuth } from '../../utils/auth/AuthProvider';

interface MessageModalProps {
  sendUser: string;
  sendUserName : string
  sendUserEmail : string
}
export default function MessageModal({sendUser, sendUserName, sendUserEmail} : MessageModalProps) {
  const [{data}] = useAuth()
  const [title, changeTitle] = useInput('');
  const [contents, changeContents] = useInput('');

  console.log(data.getCurrentUser._id)

  const [createMessage] = useMutation(messageGql.CREATE_MESSAGE);
  
  const clickOk = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await createMessage({
        variables: {
          data : {
            title,
            contents,
            userId: sendUser,
            sendUserName,
            sendUserEmail,
            sendUser : data.getCurrentUser._id
          }
        },
      });
      if (result) {
        alert('쪽지를 보냈습니다.');
      }
    },
    [title, contents, sendUserName, sendUser, sendUserEmail],
  );

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Name>받는 사람 : {sendUserName}</S.Name>
          <Button onClick={clickOk} color="primary" variant="contained" style={{marginBottom:"1rem"}}>
            쪽지하기
          </Button>
        </S.Header>
        <CustomInput
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={changeTitle as any}
          inputIcon={<Title />}
        />
        <S.DescTextArea
          name="contents"
          value={contents}
          rows={6}
          cols={37}
          onChange={changeContents}
          maxLength={350}
        ></S.DescTextArea>
      </S.Container>
    </>
  );
}

const S: any = {};

S.Container = styled.div`
  overflow: auto;
  padding : 1rem;
  background: ${palette.gray5};
  color: ${palette.gray6};
  &:hover {
    box-shadow: 0 0 30px 0 rgba(223, 120, 239, 0.2);
  }
`;

S.Header = styled.div`
  display : flex;
  justify-content: space-between;
`;

S.Name = styled.div`
  line-height: 2.5rem;
  color: white;
`;

S.AvatarWrap = styled.div`
  width: 10rem;
`;

S.DescTextArea = styled.textarea`
  flex: 1;
  color: ${palette.blue8};
  margin: 0.2rem 0 0.5rem 0;
  @media (max-width: 768px) {
    margin: 0 0 0.5rem 0;
  }
`;
