import type { FC } from 'react';
import OptionButton from '../components/OptionButton';

const Home: FC = () => {
  return (
    <main className="flex h-screen w-screen flex-1 flex-col items-center justify-around bg-[#edc255] p-4">
      <h1 className="w-1/2 rounded-xl border-4 border-black bg-green-300/90 p-3 text-center text-3xl font-bold shadow-inout">
        Dubijos
      </h1>
      <canvas
        className="h-4/6 w-8/12 rounded-3xl border-8 border-black bg-white shadow-[1px_4px_10px_5px_rgba(0,0,0,0.25)]"
        height={720}
        width={1280}
      ></canvas>
      <span className="w-1/2 rounded-xl border-4 border-black bg-white p-3 text-center text-3xl font-semibold">
        This is {'...'}
      </span>
      <div className="flex w-7/12 justify-center text-3xl font-semibold">
        <OptionButton>Import</OptionButton>
        <OptionButton>Predict</OptionButton>
        <OptionButton>Export</OptionButton>
      </div>
    </main>
  );
};

export default Home;
