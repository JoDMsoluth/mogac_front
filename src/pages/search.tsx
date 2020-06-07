import React, { ReactNode, useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import NaverAPIMap from '../component/search/map/NaverAPIMap';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import SearchFilterBox from '../component/search/filterbox/SelectFilterBox';
import SearchingUserList from '../component/search/users/SearchingUserList';

const SearchPage: NextPage = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.MAP_API_KEY}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.async = true;
    script2.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.MAP_API_KEY}&submodules=drawing`;
    document.head.appendChild(script2);
  });
  return (
    <>
      <main>
        <SearchFilterBox />
        <NaverAPIMap />
        <SearchingUserList />
      </main>
    </>
  );
};

export default SearchPage;
