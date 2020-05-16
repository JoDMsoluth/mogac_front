import produce from 'immer';

export interface IinitialWriteState {
  title: string;
  desc: string;
  contents: string;
  tags: string;
  cover_Img: string;
  category?: string;
  series?: string;
}

export const initialWriteState: IinitialWriteState = {
  title: '',
  desc: '',
  contents: '',
  tags: '',
  cover_Img: '',
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
        draft.cover_Img = action.data;
      });
    }
    case 'ChangeCategory': {
      return produce(state, (draft) => {
        draft.category = action.data;
      });
    }
    case 'ChangeSeries': {
      return produce(state, (draft) => {
        draft.series = action.data;
      });
    }
    default:
      return state;
  }
};
