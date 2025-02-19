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

  return (
    <>
      <h2 className="text-2xl">My heroes</h2>
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
            <span className="bg-yellow-300 rounded-r w-full p-2">
              {hero.name}
            </span>
          </Link>
        ))}
      </ul>
    </>
  );
}
