import { ReactNode } from 'react';

import { Navbar } from '../navbar/navbar';

interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
