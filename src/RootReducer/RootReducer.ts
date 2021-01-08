import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/AuthSlice';
import userReducer from '../Features/Auth/UserSlice';
import diariesReducer from '../Features/Diary/DiarySlice';
import entriesReducer from '../Features/Entry/EntriesSlice';
import editorReducer from '../Features/Entry/EditorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  diaries: diariesReducer,
  entries: entriesReducer,
  user: userReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
