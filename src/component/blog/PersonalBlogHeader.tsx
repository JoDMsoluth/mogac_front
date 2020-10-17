import react, { useCallback, useState } from 'react';
import { Container, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CategoryGql from '../../lib/gql/categoryGql';
import { useAuth } from '../../utils/auth/AuthProvider';
import Modal from '../modal/Modal';
import RecommendModal from '../modal/RecommendModal';

interface PersonalBlogHeaderProps {
  userName: string;
  userId : string;
  userAbleSkill : any;
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const PersonalBlogHeader = ({ userName, userId, userAbleSkill } : PersonalBlogHeaderProps) => {
  const classes = useStyles();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);


  const clickSkill = useCallback((skill) => () => {
    setVisibleModal(true)
    setSelectedSkill(skill)
  }, [visibleModal])

  const reset = useCallback(() => {
    setSelectedSkill(null)
    setVisibleModal(false)
  }, [selectedSkill, visibleModal])
  
  console.log('selectedSkill', selectedSkill)
  
  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            블로그
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            {`${userName}님의 블로그입니다.`}
          </Typography>

          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              {userAbleSkill?.map(skill => 
              <Grid item>
                <Button variant="contained" color="primary" onClick={clickSkill(skill)}>
                  {skill.split(' ')[skill.split(' ').length-1]}
                </Button>
              </Grid>
              )}
            </Grid>
          </div>
        </Container>
      </div>
      {/* 기술추천 모달 */}
      {selectedSkill && <Modal 
        visible={visibleModal}
        setVisible={setVisibleModal}
        render={<RecommendModal skillName={selectedSkill} userId={userId} />}
      />}
    </>
  );
};

export default PersonalBlogHeader;
