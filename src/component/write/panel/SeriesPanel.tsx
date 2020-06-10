import react, { useState, useCallback, FC } from 'react';
import { Select } from '@material-ui/core';
import useInput from '../../../lib/hooks/useInput';
import { useUser } from '../../../utils/user/UserProvide';
import { useAuth } from '../../../utils/auth/AuthProvider';
import { useQuery } from '@apollo/react-hooks';
import UserGql from '../../../lib/gql/userGql';
import styled from 'styled-components';
import { ListAlt, Add } from '@material-ui/icons';
import palette from '../../../lib/pallete';
import { useWrite } from '../../../utils/write/WriteProvide';
import AddSeriesPanel from './AddSeriesPanel';

export default function SeriesPanel() {
  const { data, error, loading } = useQuery(UserGql.GET_ALL_SERIES_BY_USER);
  const { state, dispatch } = useWrite();
  const { series, seriesTitle, seriesId } = state;
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [toggleAddPanel, setToggleAddPanel] = useState<boolean>(false);

  const changeOpenPanel = useCallback(() => {
    setOpenPanel(!openPanel);
  }, [openPanel]);

  const changeSeries = useCallback(
    (seriesId: string, seriesTitle: string) => () => {
      dispatch({ type: 'ChangeSeriesId', data: seriesId });
      dispatch({ type: 'ChangeSeriesTitle', data: seriesTitle });
      setOpenPanel(!openPanel);
    },
    [openPanel, seriesId],
  );
  if (loading) {
    return <div></div>;
  }
  if (error) {
    console.error(error);
  }
  if (data && !series) {
    console.log(data);
    dispatch({ type: 'ChangeSeries', data: data.getAllSeriesByUser.series });
  }
  return (
    <>
      <S.SelectWrap>
        <S.SelectSpan onClick={changeOpenPanel}>
          {seriesTitle ? seriesTitle : 'Series'}
        </S.SelectSpan>
        <S.SelectIconWrap>
          <ListAlt />
        </S.SelectIconWrap>
        <S.SelectOptionWrap open={openPanel}>
          <S.SelectOption onClick={() => setToggleAddPanel(true)}>
            <Add />
          </S.SelectOption>
          {series?.length > 0 &&
            series.map((v) => (
              <S.SelectOption
                key={v.title}
                onClick={changeSeries(v._id, v.title)}
              >
                {v.title}
              </S.SelectOption>
            ))}
        </S.SelectOptionWrap>
      </S.SelectWrap>
      {toggleAddPanel && (
        <AddSeriesPanel setToggleAddPanel={setToggleAddPanel} />
      )}
    </>
  );
}

const S: any = {};

S.SelectWrap = styled.div`
  margin: 0.75rem 0;
  position: relative;
  width: 100%;
  height: 2.5rem;
  color: rgba(0, 0, 255, 0.25);
  z-index: 1;
`;

S.SelectSpan = styled.div`
  outline: none;
  color: ${palette.blue8};
  border: 1px solid white;
  background: ghostwhite;
  border-radius: 7px;
  height: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2.4rem;
  width: 100%;
  box-sizing: border-box;
`;

S.SelectOption = styled.div`
  height: 2rem;
  font-size: 1rem;
  line-height: 2rem;
  overflow: hidden;
  &:hover {
    background: ${palette.gray3};
  }
`;

S.SelectOptionWrap = styled.div<{ open: boolean }>`
  text-align: center;
  color: ${palette.blue9};
  max-height: ${(prop) => (prop.open ? '10rem' : '0')};
  width: 100%;
  overflow: auto;
  background: ${palette.gray2};
  border-radius: 3px;
  transition: max-height 0.5s ease;
  @media (max-width: 763px) {
    max-height: ${(prop) => (prop.open ? '6rem' : '0')};
  }
` as FC<{ open: boolean }>;

S.SelectIconWrap = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;
