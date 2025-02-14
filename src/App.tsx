import { ChangeEvent, useState } from "react";
import { HEROES } from "./data/heroes-dummy";
import { Hero } from "./types/hero";
import HeroDetails from "./Components/HeroDetails";

function App() {
  const [heroes, setHeroes] = useState<Hero[]>(HEROES);
  const [currHeroId, setCurrHeroId] = useState<number | null>(null);

  const currHero = heroes.find((hero) => hero.id === currHeroId);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value;

    //spread operator to create a new object and replace the original, not update
    setHeroes((prevHeroes) =>
      prevHeroes.map((hero) => {
        if (hero.id === currHeroId) {
          return { ...hero, name: updatedName };
        }
        return hero;
      })
    );
  };

  const handleCurrHero = (id: number) => {
    setCurrHeroId(id);
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
          <li
            onClick={() => handleCurrHero(hero.id)}
            key={hero.id}
            className="flex cursor-pointer"
          >
            <span className="bg-blue-600 text-white rounded-l p-2">
              {hero.id}
            </span>
            <span className="bg-yellow-300 rounded-r w-1/4 p-2">
              {hero.name}
            </span>
          </li>
        ))}
      </ul>

      <HeroDetails hero={currHero} onNameChange={handleNameChange} />
    </div>
  );
}

export default App;
