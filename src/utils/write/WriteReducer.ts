import produce from 'immer';

export interface IinitialWriteState {
  title: string;
  desc: string;
  contents: string;
  tags: string;
  cover_img: string;
  category?: string;
  skillset?: string;
  seriesTitle?: string;
  series?: any;
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
  seriesTitle: '',
  series: [],
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
        console.log(action.data, 'series reducer');
        draft.series = action.data;
      });
    }
    case 'ChangeSeriesId': {
      return produce(state, (draft) => {
        draft.seriesId = action.data;
      });
    }
    case 'ChangeSeriesTitle': {
      return produce(state, (draft) => {
        draft.seriesTitle = action.data;
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
    case 'UpdateComments': {
      return produce(state, (draft) => {
        const index = draft.comments.findIndex((v) => v._id == action.data._id);
        console.log(index);
        if (index > -1) {
          console.log(index);
          draft.comments[index].contents = action.data.contents;
        }
        console.log('filter', draft.comments);
      });
    }
    case 'AddSeries': {
      return produce(state, (draft) => {
        draft.series.push(action.data);
      });
    }
    default:
      return state;
  }
};
