'use client';

import { FC, useState } from 'react';
import DrawCanvas from './DrawCanvas';
import OptionButton from './OptionButton';

const UserInputZone: FC = () => {
  const [clear, setClear] = useState<boolean>(false);
  const [predict, setPredict] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string>('...');

  const clearClickHandler = (): void => setClear(true);

  const resetClearHandler = (): void => setClear(false);

  const predictClickHandler = (): void => {};

  const resetPredictHandler = (): void => setPredict(false);

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
        <OptionButton>Import</OptionButton>
        <OptionButton onClick={predictClickHandler}>Predict</OptionButton>
        <OptionButton onClick={clearClickHandler}>Clear</OptionButton>
      </div>
    </>
  );
};

export default UserInputZone;
