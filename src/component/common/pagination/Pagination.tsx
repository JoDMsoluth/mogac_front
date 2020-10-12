import React, { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import qs from 'qs';
import palette from '../../../lib/pallete';

interface buildLinkProps {
  page: number;
  url: string;
  isQuery: boolean;
}

const buildLink = ({ url, page, isQuery }: buildLinkProps): string => {
  const query = qs.stringify({ page });
  return isQuery ? `${url}&${query}` : `${url}?${query}`;
};

interface PaginationProps {
  url: string;
  page: number;
  lastPage: number;
  isQuery?: boolean;
}

export default function Pagination({
  url,
  page = 1,
  lastPage,
  isQuery = false,
}: PaginationProps) {
  return (
    <S.PaginationWrap>
      <Link
        href={
          +page === 1
            ? buildLink({
                isQuery,
                url,
                page: 1,
              })
            : buildLink({ isQuery, url, page: +page - 1 })
        }
      >
        <S.CustomLink disabled={page === 1}>back</S.CustomLink>
      </Link>
      <S.PageNumber>{page}</S.PageNumber>
      <Link
        href={
          +page === +lastPage
            ? buildLink({ isQuery, url, page: +lastPage })
            : buildLink({ isQuery, url, page: +page + 1 })
        }
      >
        <S.CustomLink disabled={+page === +lastPage}>Next</S.CustomLink>
      </Link>
    </S.PaginationWrap>
  );
}

const S: any = {};

S.PaginationWrap = styled.div`
  color: ${palette.teal9};
  width: 320px;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

interface CustomLinkProps {
  disabled: boolean;
}

S.CustomLink = styled.a<CustomLinkProps>`
  pointer-events: ${(props) => (props.disabled ? 'none' : '')};
  background: ${palette.blue3};
  border-radius: 3.5rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  width: 4rem;
  height: 2rem;
  line-height: 1.9rem;
` as FC<CustomLinkProps>;

S.PageNumber = styled.div``;
