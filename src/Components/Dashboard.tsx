import { useState, useEffect } from "react";
import { Hero } from "../types/hero";
import { Link } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

const URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const { addMessage } = useMessages();

  useEffect(() => {
    fetch(`${URL}/heroes?_limit=4`)
      .then((res) => res.json())
      .then((data) => {
        setHeroes(data);
        addMessage("Top heroes loaded");
      });
  }, [addMessage]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl">Top Heroes</h2>
      <div className="flex gap-3">
        {heroes.map((hero) => (
          <Link
            key={hero.id}
            to={`/heroes/${hero.id}`}
            className="p-4 bg-amber-300 text-blue-900 rounded-lg cursor-pointer"
          >
            {hero.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
