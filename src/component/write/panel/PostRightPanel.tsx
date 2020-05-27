import react, { useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import UploadCoverImage from '../../common/utils/UploadCoverImage';
import CustomInput from '../../../lib/CustomInput';
import { LocalOffer, ListAlt } from '@material-ui/icons';
import { useWrite } from '../../../utils/write/WriteProvide';
import CategoryGql from '../../../lib/gql/categoryGql';
import SelectPostCategory from './SelectPostCategory';
import SeriesPanel from './SeriesPanel';

export default function PostRightPanel() {
  const { state, dispatch } = useWrite();
  const { series, category, skillset, tags } = state;
  const {
    categoryArray,
    skillsetData,
    loading,
  } = CategoryGql.loadAllCategory();

  const changeSeries = useCallback(
    (e) => {
      dispatch({ type: 'ChangeSeries', data: e.target.value });
    },
    [series],
  );

  useEffect(() => {
    console.log('category, skillset1', category, skillset);
    if (!loading) {
      if (categoryArray[0])
        dispatch({ type: 'ChangeCategory', data: categoryArray[0] });
      skillsetData[categoryArray[0]] &&
        dispatch({
          type: 'ChangeSkillSet',
          data: skillsetData[categoryArray[0]][0].skill,
        });
      console.log('category, skillset2', category, skillset);
    }
  }, [loading]);

  return (
    <>
      <S.RightPanelWrap>
        <S.ImageWrap>
          <UploadCoverImage />
        </S.ImageWrap>

        <SeriesPanel />
        {loading ? (
          ''
        ) : (
          <SelectPostCategory
            categoryArray={categoryArray}
            skillsetData={skillsetData}
          />
        )}
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
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  height: 10rem;
  flex: 1;
  position: relative;
  overflow: hidden;
  &:hover {
    color: ${palette.gray7};
    cursor: pointer;
  }
`;
