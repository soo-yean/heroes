import { useEffect, useRef, useState } from "react";
import { Hero } from "../types/hero";
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const URL = import.meta.env.VITE_API_URL;

export default function HeroesList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const { addMessage } = useMessages();

  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${URL}/heroes`)
        .then((res) => res.json())
        .then((data) => {
          setHeroes(data);
          addMessage("All heroes loaded");
        });
      fetched.current = true;
    }
  }, [addMessage]);

  async function deleteHero(hero: Hero) {
    try {
      const res = await fetch(`${URL}/heroes/${hero.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(res.statusText);

      setHeroes((prevHeroes) => prevHeroes.filter((h) => h.id !== hero.id));
      addMessage(`Hero ${hero.name} deleted`);
    } catch (error) {
      console.log(error);
      addMessage("Failed to delete");
    }
  }

  return (
    <>
      <div className="flex gap-3">
        <h2 className="text-2xl">My heroes</h2>
        <Link to="/heroes/create" className="btn">
          Create New
        </Link>
      </div>
      <ul className="flex flex-col gap-2 my-3">
        {/* 
          () => {
            return 
          } 
            equals
          () => () */}
        {heroes.map((hero) => (
          <Link
            to={`/heroes/${hero.id}`}
            key={hero.id}
            className="flex cursor-pointer"
          >
            <span className="bg-blue-600 text-white rounded-l p-2">
              {hero.id}
            </span>
            <div className="flex justify-between bg-yellow-300 rounded-r w-full p-2">
              <span>{hero.name}</span>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  deleteHero(hero);
                }}
                className="bg-amber-100 px-1 cursor-pointer"
              >
                X
              </span>
            </div>
          </Link>
        ))}
      </ul>
    </>
  );
}
