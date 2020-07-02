import React from 'react';
import SearchTeamListCard from './SearchTeamListCard';
import SearchBlogListCard from './SearchBlogListCard';
import SearchUserListCard from './SearchUserListCard';

interface TotalSearchBodyProps {
  searchWord: string;
  filter: string;
}

const showSearchResult = (filter: string, searchWord: string) => {
  switch (filter) {
    case 'user':
      return <SearchUserListCard searchWord={searchWord} />;
    case 'blog':
      return <SearchBlogListCard searchWord={searchWord} />;
    case 'team':
      return <SearchTeamListCard searchWord={searchWord} />;
    default:
      return;
  }
};

export default function TotalSearchBody({
  searchWord,
  filter,
}: TotalSearchBodyProps) {
  console.log(filter, searchWord, 'result');
  return <div>{showSearchResult(filter, searchWord)}</div>;
}
