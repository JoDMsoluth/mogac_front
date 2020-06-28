import react, { useState, useEffect, useCallback } from 'react';
import useInput from '../../lib/hooks/useInput';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  Input,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { Title, Description } from '@material-ui/icons';
import { locationsDataSet } from '../../../data/location';
import palette from '../../lib/pallete';
import CustomInput from '../../lib/CustomInput';
import { useMutation } from '@apollo/react-hooks';
import teamGql from '../../lib/gql/teamGql';
import { useRouter } from 'next/router';

interface CreateTeamDialogProps {
  categoryArray: any;
  skillsetData: any;
  setTeams: any;
  teams: any;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const CreateTeamDialog = ({
  categoryArray,
  skillsetData,
  setTeams,
  teams,
}: CreateTeamDialogProps) => {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [skillset, changeSkillSet] = useInput<string>('');
  const [title, changeTitle] = useInput<string>('');
  const [desc, changeDesc] = useInput<string>('');

  const pubLocationArray = Object.keys(locationsDataSet);
  const [pubLocation, changePubLocation] = useInput<string>(
    pubLocationArray ? pubLocationArray[0] : '',
  );
  const [subLocation, changeSubLoction] = useInput<string>('');

  const [addTeam] = useMutation(teamGql.ADD_TEAM);

  const changeCategory = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [category],
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createTeam = useCallback(async () => {
    if (!skillset || !subLocation) {
      alert('스킬셋과 스터디지역을 선택해주세요');
      return;
    }
    if (title.length < 1 || title.length > 50) {
      alert('제목은 필수이고 50글자 이내');
      return;
    }
    if (desc.length < 1 || desc.length > 200) {
      alert('설명은 200글자 이내');
      return;
    }
    try {
      const result = await addTeam({
        variables: {
          data: {
            title,
            desc,
            location: `${pubLocation} ${subLocation}`,
            category: `${category} ${skillset}`,
          },
        },
      });
      if (result) {
        console.log('result', result);
        alert('팀이 생성 되었습니다.');
        setTeams([result.data.createTeam, ...teams]);
        router.push('/team');
      }
    } catch (e) {
      console.log(e);
    }

    handleClose();
  }, [title, desc, skillset, subLocation]);
  useEffect(() => {
    if (categoryArray[0]) setCategory(categoryArray[0]);
  }, [categoryArray]);
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create New Team
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create New Team</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <S.FormControl className={classes.formControl}>
              <InputLabel htmlFor="pubLocation">Pub Location</InputLabel>
              <Select
                native
                value={pubLocation}
                onChange={changePubLocation as any}
                input={<Input />}
                defaultValue={''}
              >
                {pubLocationArray.map((pub) => (
                  <option key={pub} value={pub}>
                    {pub}
                  </option>
                ))}
              </Select>
            </S.FormControl>
            <S.FormControl className={classes.formControl}>
              <InputLabel id="subLocation">Sub Location</InputLabel>
              <Select
                labelId="subLocation"
                value={subLocation}
                onChange={changeSubLoction as any}
                input={<Input />}
                disabled={pubLocation.length < 1}
              >
                {pubLocation
                  ? locationsDataSet[pubLocation].map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))
                  : ''}
              </Select>
            </S.FormControl>
            <S.FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                native
                value={category}
                onChange={changeCategory as any}
                input={<Input />}
              >
                {categoryArray.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </Select>
            </S.FormControl>
            <S.FormControl className={classes.formControl}>
              <InputLabel id="skillset">SkillSet</InputLabel>
              <Select
                labelId="skillset"
                value={skillset}
                onChange={changeSkillSet as any}
                input={<Input />}
              >
                {skillsetData[category]
                  ? skillsetData[category].map((skill) => (
                      <option key={skill.skill} value={skill.skill}>
                        {skill.skill}
                      </option>
                    ))
                  : ''}
              </Select>
            </S.FormControl>
          </form>
          <S.PanelWrap>
            <TextField
              id="outlined-textarea"
              label="Title"
              placeholder="Title"
              variant="outlined"
              type="text"
              name="title"
              value={title}
              onChange={changeTitle as any}
              fullWidth
            />
            <TextField
              id="outlined-textarea"
              label="Description"
              placeholder="Description"
              multiline
              variant="outlined"
              type="text"
              name="desc"
              value={desc}
              onChange={changeDesc as any}
              rowsMax={5}
              fullWidth
            />
          </S.PanelWrap>
        </DialogContent>

        <DialogActions style={{ marginRight: '1.5rem' }}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createTeam} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const S: any = {};

S.FormControl = styled(FormControl)`
  @media (max-width: 720px) {
    width: 100%;
  }
`;
S.PanelWrap = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem 0rem 0.5rem;
  @media (max-width: 720px) {
    padding: 0;
  }
  & > div {
    margin-top: 0.5rem;
  }
`;

S.TitleInput = styled.input`
  color: ${palette.blue6};
  height: 3rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  margin: 1rem 0rem;
`;

S.DescTextArea = styled.textarea`
  flex: 1;
  color: ${palette.blue8};
  margin: 0.2rem 0 0.5rem 0;
  @media (max-width: 768px) {
    margin: 0 0 0.5rem 0;
  }
`;

export default CreateTeamDialog;
