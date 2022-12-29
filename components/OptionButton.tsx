'use client';

import type { FC, MouseEventHandler, ReactNode } from 'react';

export interface OptionButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const OptionButton: FC<OptionButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="m-2 flex-1 rounded-2xl bg-[#D9D9D9]/50 p-3 text-center shadow-inout"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OptionButton;
