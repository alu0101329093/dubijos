import type { FC } from 'react';
import UserInputZone from '../components/UserInputZone';

const Home: FC = () => {
  return (
    <main className="flex h-screen w-screen flex-1 flex-col items-center justify-around bg-[#edc255] p-4">
      <h1 className="w-1/2 rounded-xl border-4 border-black bg-green-300/90 p-3 text-center text-3xl font-bold shadow-inout">
        Dubijos
      </h1>
      <UserInputZone />
    </main>
  );
};

export default Home;
