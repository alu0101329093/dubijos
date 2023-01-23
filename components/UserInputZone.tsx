'use client';

import { FC, useState } from 'react';
import CategoriesList from './CategoriesList';
import DrawCanvas from './DrawCanvas';
import OptionButton from './OptionButton';

const UserInputZone: FC = () => {
  const [clear, setClear] = useState<boolean>(false);
  const [predict, setPredict] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string>('...');
  const [showCategories, setShowCategories] = useState(false);

  const clearClickHandler = (): void => setClear(true);

  const resetClearHandler = (): void => setClear(false);

  const predictClickHandler = (): void => setPredict(true);

  const resetPredictHandler = (): void => setPredict(false);

  const showCategoriesHandler = (): void => setShowCategories(true);

  const resetShowCategoriesHandler = (): void => setShowCategories(false);

  return (
    <>
      <DrawCanvas
        clear={clear}
        resetClear={resetClearHandler}
        predict={predict}
        resetPredict={resetPredictHandler}
        setPrediction={setPrediction}
      />
      <span className="w-1/2 rounded-xl border-4 border-black bg-white p-3 text-center text-3xl font-semibold">
        This is {prediction}
      </span>
      <div className="flex w-7/12 justify-center text-3xl font-semibold">
        <OptionButton onClick={showCategoriesHandler}>Categories</OptionButton>
        <OptionButton onClick={predictClickHandler}>Predict</OptionButton>
        <OptionButton onClick={clearClickHandler}>Clear</OptionButton>
      </div>
      {showCategories && (
        <CategoriesList resetShowCategories={resetShowCategoriesHandler} />
      )}
    </>
  );
};

export default UserInputZone;
