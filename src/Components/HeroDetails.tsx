import { useEffect, useRef, useState } from "react";
import { Hero } from "../types/hero";
import { useParams } from "react-router-dom";
import { useMessages } from "../context/MessageContext";
import HeroForm from "./HeroForm";

const URL = import.meta.env.VITE_API_URL;

export default function HeroDetails() {
  const [hero, setHero] = useState<Hero | null>(null);
  const params = useParams();
  const { addMessage } = useMessages();

  const fetched = useRef(false);

  useEffect(() => {
    if (!fetched.current) {
      fetch(`${URL}/heroes/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setHero(data);
          addMessage(`Hero ${data.name} loaded`);
        });

      fetched.current = true;
    }
  }, [params.id, addMessage]);

  if (!hero) return null;

  return (
    <>
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
        <HeroForm hero={hero} setHero={setHero} />
      </div>
    </>
  );
}
