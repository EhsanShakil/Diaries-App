import React, { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../RootReducer/RootReducer';
import http from '../../Services/api';
import { Entry } from '../../Interfaces/entry.interface';
import { setEntries } from '../Entry/EntriesSlice';
import { setCurrentlyEditing, setCanEdit } from '../Entry/EditorSlice';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../Store/Store';

const DiaryEntriesList: FC = () => {
  const { entries }: any = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { id }: any = useParams();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div className="entries">
      <header >
        <Link to="/" className='back'>
          <h3>← Go Back</h3>
        </Link>
      </header>
      <ul>
        {entries.map((entry: any) => (
          <li
            key={entry.id}
            onClick={() => {
              dispatch(setCurrentlyEditing(entry));
              dispatch(setCanEdit(true));
            }}
          >
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryEntriesList;