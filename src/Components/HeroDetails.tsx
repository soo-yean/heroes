import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Hero } from "../types/hero";
import { useParams } from "react-router-dom";
import { useMessages } from "../context/MessageContext";

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
          addMessage(`Hero ${data.name.toUpperCase()} loaded`);
        });

      fetched.current = true;
    }
  }, [params.id, addMessage]);

  if (!hero) return null;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value;
    setHero({ ...hero, name: updatedName });
  };

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
        <label className="mt-2">Hero Name</label>
        <input
          className="border border-gray-300 rounded-lg p-2 w-1/4"
          type="text"
          placeholder="name"
          value={hero.name}
          onChange={handleNameChange}
        />
      </div>
    </>
  );
}
