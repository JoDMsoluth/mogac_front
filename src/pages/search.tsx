import React, { ReactNode, useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import NaverAPIMap from '../component/search/map/NaverAPIMap';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import SearchFilterBox from '../component/search/filterbox/SelectFilterBox';
import SearchingUserList from '../component/search/users/SearchingUserList';
import Search from '../component/search';

const SearchPage: NextPage = () => {
  return (
    <>
      <main>
        <Search/>
      </main>
    </>
  );
};

export default SearchPage;
