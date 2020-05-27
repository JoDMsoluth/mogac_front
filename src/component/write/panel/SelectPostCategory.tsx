import react, { useState, useCallback, useEffect } from 'react';
import { useWrite } from '../../../utils/write/WriteProvide';
import { InputLabel, Select, Input } from '@material-ui/core';
import styled from 'styled-components';

interface SelectPostDialogProps {
  categoryArray: any[];
  skillsetData: {};
}

export default function SelectPostDialog({
  categoryArray,
  skillsetData,
}: SelectPostDialogProps) {
  const { state, dispatch } = useWrite();
  const { category, skillset } = state;

  const changeCategory = useCallback(
    (e) => {
      dispatch({ type: 'ChangeCategory', data: e.target.value });
      console.log(category);
    },
    [category],
  );

  const changeSkillSet = useCallback(
    (e) => {
      dispatch({ type: 'ChangeSkillSet', data: e.target.value });
      console.log(skillset);
    },
    [skillset],
  );

  return (
    <>
      <S.CategoryBoxWrap>
        <div>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            native
            value={category}
            onChange={changeCategory as any}
            input={<Input />}
          >
            {categoryArray.map((cate) => (
              <S.OptionList key={cate} value={cate}>
                {cate}
              </S.OptionList>
            ))}
          </Select>
        </div>
        <div>
          <InputLabel id="skillset">SkillSet</InputLabel>
          <Select
            native
            value={skillset}
            onChange={changeSkillSet as any}
            input={<Input />}
          >
            {skillsetData[category]
              ? skillsetData[category].map((skill) => (
                  <S.OptionList key={skill.skill} value={skill.skill}>
                    {skill.skill}
                  </S.OptionList>
                ))
              : ''}
          </Select>
        </div>
      </S.CategoryBoxWrap>
    </>
  );
}

const S: any = {};

S.CategoryBoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

S.OptionList = styled.option`
  width: 100%;
`;
