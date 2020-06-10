// 스킬 레벨에 관한 유틸함수
export const makeSkillLevel = (ableSkillSet: string[]) => {
  const level = [];
  for (const skill of ableSkillSet) {
    level.push(`${skill}/0`);
  }
  return level;
};

export const getSkillFormat = (level: string[]) => {
  const SkillLevelArray: number[] = [];
  const SkillNameArray: string[] = [];
  const SkillFormat: { skill: string; level: number }[] = [];
  for (const lev of level) {
    const skillset = lev.split('/');
    const skillName = skillset[0];
    const skillLevel: number = parseInt(skillset[1], 10);
    SkillNameArray.push(skillName.split(' ')[2]);
    SkillLevelArray.push(skillLevel);
    SkillFormat.push({ skill: skillName.split(' ')[2], level: skillLevel });
  }
  // 최고 점수를 찾는다.
  const maxLevel = Math.max(...SkillLevelArray);

  for (const lev of level) {
    const skillset = lev.split('/');
    const skillName: string = skillset[0];
    const skillLevel: number = parseInt(skillset[1], 10);
    // 최고점수를 가진 스킬이름과 그 최고점수를 반환한다.
    if (skillLevel == maxLevel) {
      return {
        highLevelSkill: [skillName.split(' ')[2], skillName],
        SkillNameArray,
        SkillLevelArray,
        SkillFormat,
      };
    }
  }
  // 없으면 앞쪽에 있는 스킬을 반환한다.
  return {
    highLevelSkill: [SkillNameArray[0], SkillLevelArray[0]],
    SkillNameArray,
    SkillLevelArray,
    SkillFormat,
  };
};

export const skillLevelSum = (SkillLevelArray: number[]) => {
  return SkillLevelArray.reduce(function(prev, next) {
    return prev + next;
  }, 0);
};
