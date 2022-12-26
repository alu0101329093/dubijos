import type { ReactNode } from 'react';

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  );
}
