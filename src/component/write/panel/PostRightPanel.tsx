import react, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import UploadCoverImage from '../../common/utils/UploadCoverImage';
import CustomInput from '../../../lib/CustomInput';
import { Title, LocalOffer } from '@material-ui/icons';
import { useWrite } from '../../../utils/write/WriteProvide';

interface PostRightPanelProps {}

export default function PostRightPanel({}: PostRightPanelProps) {
  const { state, dispatch } = useWrite();
  const { series, category, skillset, tags } = state;

  const changeSeries = useCallback(
    (e) => {
      dispatch({ type: 'ChangeSeries', data: e.target.value });
    },
    [series],
  );
  const changeCategory = useCallback(
    (e) => {
      dispatch({ type: 'ChangeCategory', data: e.target.value });
    },
    [category],
  );
  const changeSkillSet = useCallback(
    (e) => {
      dispatch({ type: 'ChangeSkillSet', data: e.target.value });
    },
    [skillset],
  );
  const changeTags = useCallback(
    (e) => {
      dispatch({ type: 'ChangeTags', data: e.target.value });
    },
    [tags],
  );

  return (
    <>
      <S.RightPanelWrap>
        <S.ImageWrap>
          <UploadCoverImage />
        </S.ImageWrap>
        <CustomInput
          type="text"
          name="series"
          value={series}
          placeholder="Series"
          inputIcon={<Title />}
          onChange={changeSeries}
        />
        <CustomInput
          type="text"
          name="category"
          value={category}
          placeholder="Category"
          onChange={changeCategory}
        />
        <CustomInput
          type="text"
          name="skillset"
          value={skillset}
          placeholder="SkillSet"
          onChange={changeSkillSet}
        />
        <CustomInput
          type="text"
          name="tags"
          value={tags}
          placeholder="Tags"
          onChange={changeTags}
          inputIcon={<LocalOffer />}
        />
      </S.RightPanelWrap>
    </>
  );
}

const S: any = {};

S.RightPanelWrap = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0 1rem 1rem 0.5rem;
`;

S.ImageWrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  flex: 1;
  position: relative;
  overflow: hidden;
  &:hover {
    color: ${palette.gray7};
    cursor: pointer;
  }
`;
