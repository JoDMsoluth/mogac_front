import produce from 'immer';

export interface IinitialWriteState {
  title: string;
  desc: string;
  contents: string;
  tags: string;
  cover_img: string;
  category?: string;
  skillset?: string;
  series?: string;
  seriesId?: string;
  comments?: any;
}

export const initialWriteState: IinitialWriteState = {
  title: '',
  desc: '',
  contents: '',
  tags: '',
  cover_img: '',
  skillset: '',
  seriesId: '',
  series: '',
  comments: null,
};

export const writeReducer = (state = initialWriteState, action) => {
  switch (action.type) {
    case 'Reset': {
      return initialWriteState;
    }
    case 'ChangeTitle': {
      return produce(state, (draft) => {
        draft.title = action.data;
      });
    }
    case 'ChangeDesc': {
      return produce(state, (draft) => {
        draft.desc = action.data;
      });
    }
    case 'ChangeContents': {
      return produce(state, (draft) => {
        draft.contents = action.data;
      });
    }
    case 'ChangeCoverImg': {
      return produce(state, (draft) => {
        draft.cover_img = action.data;
      });
    }
    case 'ChangeCategory': {
      return produce(state, (draft) => {
        draft.category = action.data;
      });
    }
    case 'ChangeSkillSet': {
      return produce(state, (draft) => {
        draft.skillset = action.data;
      });
    }
    case 'ChangeSeries': {
      return produce(state, (draft) => {
        draft.series = action.data;
      });
    }
    case 'ChangeSeriesId': {
      return produce(state, (draft) => {
        draft.seriesId = action.data;
      });
    }
    case 'ChangeTags': {
      return produce(state, (draft) => {
        draft.tags = action.data;
      });
    }
    case 'ChangeComments': {
      return produce(state, (draft) => {
        draft.comments = action.data;
      });
    }
    case 'AddComments': {
      return produce(state, (draft) => {
        draft.comments.unshift(action.data);
      });
    }
    case 'DeleteComments': {
      return produce(state, (draft) => {
        draft.comments = draft.comments.filter((v) => v._id !== action.data);
        console.log('filter', draft.comments);
      });
    }
    default:
      return state;
  }
};
