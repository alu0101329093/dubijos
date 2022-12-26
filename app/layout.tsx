import type { FC, ReactNode } from 'react';
import '../styles/globals.css';

export interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
