'use client';

import type { FC, ReactNode } from 'react';

export interface OptionButtonProps {
  children: ReactNode;
}

const OptionButton: FC<OptionButtonProps> = ({ children }) => {
  return (
    <button className="m-2 flex-1 rounded-2xl bg-[#D9D9D9]/50 p-3 text-center shadow-inout">
      {children}
    </button>
  );
};

export default OptionButton;
