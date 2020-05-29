import react, { useState, useCallback, FC } from 'react';
import { Select } from '@material-ui/core';
import useInput from '../../../lib/hooks/useInput';
import { useUser } from '../../../utils/user/UserProvide';
import { useAuth } from '../../../utils/auth/AuthProvider';
import { useQuery } from '@apollo/react-hooks';
import UserGql from '../../../lib/gql/userGql';
import styled from 'styled-components';
import { ListAlt } from '@material-ui/icons';
import palette from '../../../lib/pallete';
import { useWrite } from '../../../utils/write/WriteProvide';

export default function SeriesPanel() {
  const { data, error, loading } = useQuery(UserGql.GET_ALL_SERIES_BY_USER);
  const { state, dispatch } = useWrite();
  const { series, seriesId } = state;
  const [openPanel, setOpenPanel] = useState<boolean>(false);

  const changeOpenPanel = useCallback(() => {
    setOpenPanel(!openPanel);
  }, [openPanel]);

  const changeSeries = useCallback(
    (series: string, seriesId: string) => () => {
      dispatch({ type: 'ChangeSeries', data: series });
      dispatch({ type: 'ChangeSeriesId', data: seriesId });
      setOpenPanel(!openPanel);
    },
    [series, openPanel, seriesId],
  );

  return (
    <S.SelectWrap>
      <S.SelectSpan onClick={changeOpenPanel}>
        {series ? series : 'Series'}
      </S.SelectSpan>
      <S.SelectIconWrap>
        <ListAlt />
      </S.SelectIconWrap>
      <S.SelectOptionWrap open={openPanel}>
        {!loading &&
          data.getAllSeriesByUser.series &&
          data.getAllSeriesByUser.series.map((v) => (
            <S.SelectOption
              key={v.title}
              value={v.title}
              onClick={changeSeries(v.title, v._id)}
            >
              {v.title}
            </S.SelectOption>
          ))}
      </S.SelectOptionWrap>
    </S.SelectWrap>
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
` as FC<{ open: boolean }>;

S.SelectIconWrap = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;
