// 스킬 레벨에 관한 유틸함수
export const makeSkillLevel = (ableSkillSet: string[]) => {
  const level = [];
  for (const skill of ableSkillSet) {
    level.push(`${skill}/0`);
  }
  return level;
};
