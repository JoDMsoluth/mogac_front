import react, { useCallback } from 'react';
import useInput from '../../../lib/hooks/useInput';
import { Title, Description } from '@material-ui/icons';
import CustomInput from '../../../lib/CustomInput';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import palette from '../../../lib/pallete';
import seriesGql from '../../../lib/gql/seriesGql';
import { useMutation } from '@apollo/react-hooks';
import { useWrite } from '../../../utils/write/WriteProvide';

interface setToggleAddPanelProps {
  setToggleAddPanel: any;
}

export default function AddSeriesPanel({
  setToggleAddPanel,
}: setToggleAddPanelProps) {
  const [title, onChangeTitle] = useInput<string>('');
  const [desc, onChangeDesc] = useInput<string>('');
  const [addSeries] = useMutation(seriesGql.ADD_SERIES);
  const { state, dispatch } = useWrite();

  const onClickAddSeries = useCallback(
    async (e) => {
      e.preventDefault();
      if (desc.length > 500) {
        alert('시리즈 설명은 500글자 이내입니다.');
      }
      if (title.length < 1 && title.length > 50) {
        alert('시리즈 제목은 필수이고 50글자 이내입니다.');
      }
      const descFormat = desc ? desc : '';

      const result = await addSeries({
        variables: {
          data: {
            title,
            description: descFormat,
          },
        },
      });
      if (result) {
        dispatch({ type: 'AddSeries', data: result.data.createSeries });
      }
      setToggleAddPanel(false);
    },
    [title, desc],
  );

  return (
    <S.AddSeriesPanelWrap>
      <div>
        <CustomInput
          type="text"
          name="title"
          value={title}
          placeholder="Title"
          onChange={onChangeTitle as any}
          inputIcon={<Title />}
        />
        <S.DescTextArea
          name="desc"
          value={desc}
          rows={6}
          cols={35}
          onChange={onChangeDesc}
          maxLength={350}
        ></S.DescTextArea>
      </div>
      <S.ButtonWrap>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setToggleAddPanel(false)}
        >
          Back
        </Button>
        <Button color="primary" variant="contained" onClick={onClickAddSeries}>
          Add
        </Button>
      </S.ButtonWrap>
    </S.AddSeriesPanelWrap>
  );
}

const S: any = {};

S.AddSeriesPanelWrap = styled.div`
  background: ${palette.blue1};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  z-index: 100;
`;

S.DescTextArea = styled.textarea`
  flex: 1;
  color: ${palette.blue8};
  margin-bottom: 0.5rem;
`;

S.ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  & > button {
    background: ${palette.blue3};
  }
`;
