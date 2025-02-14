import { ChangeEvent, useState } from "react";
import { HEROES } from "./data/heroes-dummy";

type Hero = {
  id: number;
  name: string;
};

function App() {
  const heroes: Hero[] = HEROES;
  const [hero, setHero] = useState<Hero>({ id: 1, name: "Wolverine" });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHero({ ...hero, name: e.target.value }); //spread operator to create a new object, not update
  };

  return (
    <div className="container mt-5 mx-auto">
      <h2 className="text-2xl">My heroes</h2>
      <ul className="flex flex-col gap-2 my-3">
        {/* 
        () => {
          return 
        } 
          equals
        () => () */}
        {heroes.map((hero) => (
          <li key={hero.id} className="flex">
            <span className="bg-blue-600 text-white rounded-l p-2">
              {hero.id}
            </span>
            <span className="bg-yellow-300 rounded-r w-1/4 p-2">
              {hero.name}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl">Details</h2>
      <div>
        <span className="font-bold">ID: </span>
        <span>{hero.id}</span>
        <div className="space-x-2">
          <span className="font-bold">Name:</span>
          <span className="uppercase">{hero.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-3 border-t">
        <label className="mt-2">Hero Name</label>
        <input
          className="border border-gray-300 rounded-lg p-2 w-1/4"
          type="text"
          placeholder="name"
          value={hero.name}
          onChange={handleNameChange}
        />
      </div>
    </div>
  );
}

export default App;
