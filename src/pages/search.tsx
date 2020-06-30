import React, { ReactNode, useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import TotalSearchHeader from '../component/common/layout/search/TotalSearchHeader';
import TotalSearchBody from '../component/common/layout/search/TotalSearchBody';

interface TotalSearchProps {
  searchWord: string;
  filter: string;
}

const TotalSerach: NextPage<TotalSearchProps> = ({ searchWord, filter }) => {
  return (
    <>
      <main>
        <TotalSearchHeader searchWord={searchWord} filter={filter} />
        <TotalSearchBody searchWord={searchWord} filter={filter} />
      </main>
    </>
  );
};

TotalSerach.getInitialProps = async (ctx: NextPageContext) => {
  const { q, filter } = ctx.query;
  return { searchWord: q as string, filter: filter as string };
};

export default TotalSerach;
