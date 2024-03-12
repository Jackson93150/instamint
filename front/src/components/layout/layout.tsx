import React, { ReactNode } from 'react';

import { Navbar } from '../navbar/navbar';

interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="h-fit w-full">{children}</main>
    </React.Fragment>
  );
};
