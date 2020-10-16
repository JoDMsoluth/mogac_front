import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import palette from '../../lib/pallete';
import useInput from '../../lib/hooks/useInput';
import recommendGql from '../../lib/gql/recommendGql';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useAuth } from '../../utils/auth/AuthProvider';
import RecommendList from './RecommendList';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width : '40rem',
      background: `${palette.gray0}`,
      padding: theme.spacing(4),
    },
    textField: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      width: '100%',
    },
    commentHeader: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    userAvater: {
      width: '10rem',
    },
  }));
  

interface RecommendModalProps {
  skillName: string;
  userId : string;
}
export default function RecommendModal({skillName, userId} : RecommendModalProps) {
  const [{ data }, _] = useAuth();
  const classes = useStyles();

  const [contents, changeContents] = useInput('');
  const [recommends, setRecommends] = useState([]);

  const [createRecommend] = useMutation(recommendGql.CREATE_RECOMMEND);
  const { loading, data : recommendList, error, refetch } = useQuery(recommendGql.GET_ALL_RECOMMENDS, {
    variables: { page:1, skillName },
  });
  
  const clickOk = useCallback(
    async (e) => {
      e.preventDefault();
      const result = await createRecommend({
        variables: {
          data : { 
            skillName,
            level:1,
            userId,
            title: "기술추천",
            contents
          }
        },
      });
      if (result) {
        alert('기술 추천 했습니다.');
        refetch();
        // setRecommends(recommendList.getAllRecommends.docs);
      }
    },
    [contents, skillName],
  );

  console.log('recommends', recommendList?.getAllRecommends, skillName, userId)

  
  useEffect(() => {
    if (recommendList) {
      setRecommends(recommendList.getAllRecommends.docs);
    }
  }, [recommendList, recommends]);


  return (
    <>
    <div className={classes.root}>
      <div className={classes.commentHeader}>
        <S.AvatarWrap>
          <Avatar alt="JoHyehyeong" src={`https://picsum.photos/200/300?random=123`} />
          <div>
            <S.AvatarName>&nbsp;{data.getCurrentUser.name}</S.AvatarName>
            <S.AvatarDesc>
              &nbsp;{data.getCurrentUser.ableSkillSet[0]}
            </S.AvatarDesc>
          </div>
        </S.AvatarWrap>
        <Button variant="contained" onClick={clickOk}>
          기술추천
        </Button>
      </div>
      <TextField
        id="outlined-full-width"
        label="Recommend Input"
        style={{ margin: 8 }}
        placeholder="기술을 추천하는 이유를 적여주세요"
        fullWidth
        name="contents"
        value={contents}
        margin="normal"
        multiline
        InputLabelProps={{
        shrink: true,
        }}
        variant="outlined"
        onChange={changeContents} />
      {!loading && !error && recommendList && <RecommendList recommends={recommends} /> }
      </div>
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

S.AvatarWrap = styled.div`
  display: flex;
`;
S.AvatarName = styled.div`
  margin: auto 0;
  color: ${palette.gray8};
`;
S.AvatarDesc = styled.div`
  margin: auto 0;
  color: ${palette.gray6};
`;
