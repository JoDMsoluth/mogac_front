import produce from 'immer';

export interface IinitialUserState {
  name: string;
  email: string;
  password: string;
  image_url?: string;
  gender: string;
  ableLocation?: Array<string>;
  ableSkillSet?: Array<string>;
}

export const initialUserState: IinitialUserState = {
  name: '',
  email: '',
  password: '',
  image_url: '',
  gender: '',
  ableLocation: [],
  ableSkillSet: [],
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'Reset': {
      return initialUserState;
    }
    case 'ChangeName': {
      return produce(state, (draft) => {
        draft.name = action.data;
      });
    }
    case 'ChangeEmail': {
      return produce(state, (draft) => {
        draft.email = action.data;
      });
    }
    case 'ChangePassword': {
      return produce(state, (draft) => {
        draft.password = action.data;
      });
    }
    case 'ChangeImageUrl': {
      return produce(state, (draft) => {
        draft.image_url = action.data;
      });
    }
    case 'ChangeGender': {
      return produce(state, (draft) => {
        draft.gender = action.data;
      });
    }
    case 'ChangeAbleLocation': {
      return produce(state, (draft) => {
        draft.ableLocation = action.data;
      });
    }
    case 'ChangeAbleSkillSet': {
      return produce(state, (draft) => {
        draft.ableSkillSet = action.data;
      });
    }
    default:
      return state;
  }
};
