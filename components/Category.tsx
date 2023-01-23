import type { FC } from 'react';

export interface CategoryProps {
  name: string;
  key: number;
}

const Category: FC<CategoryProps> = ({ name, key }) => {
  return (
    <li
      className="mx-2 flex-auto rounded-xl border-4 border-black bg-white p-2 px-3 text-center text-xl font-bold shadow-[1px_4px_10px_5px_rgba(0,0,0,0.25)]"
      key={key}
    >
      {name}
    </li>
  );
};

export default Category;
