'use client';

import type { FC } from 'react';
import classNames from '../public/model/class_names.json';
import Category from './Category';

export interface CategoriesListProps {
  resetShowCategories: () => void;
}

const CategoriesList: FC<CategoriesListProps> = ({ resetShowCategories }) => {
  return (
    <>
      <div
        className="absolute flex h-screen w-screen flex-col items-center justify-center bg-black/50"
        onClick={resetShowCategories}
      ></div>
      <div className="absolute flex h-5/6 w-1/2 flex-wrap items-center justify-around rounded-3xl border-8 border-black bg-[#edc255] p-3 shadow-[1px_4px_10px_5px_rgba(0,0,0,0.25)]">
        <h1 className="w-1/2 rounded-xl border-4 border-black bg-green-300/90 p-3 text-center text-3xl font-bold shadow-inout">
          Categories to Draw
        </h1>
        <ol className="flex h-5/6 flex-wrap items-center justify-around">
          {[...classNames].sort().map((value, index) => (
            <Category key={index} name={value}></Category>
          ))}
        </ol>
      </div>
    </>
  );
};

export default CategoriesList;
