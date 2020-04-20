import React, { ReactNode } from 'react';

interface WithCheckLoginContainerProps {
  children: ReactNode;
}

const WithCheckLoginContainer = ({
  children,
}: WithCheckLoginContainerProps) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};
