import { FormEvent, useEffect, useRef, useState } from "react";
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
          addMessage(`Hero ${data.name} loaded`);
        });

      fetched.current = true;
    }
  }, [params.id, addMessage]);

  if (!hero) return null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = `${URL}/heroes/${hero.id}`;

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type to application/json
        },
        body: JSON.stringify({ name: formData.get("name") }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();

      addMessage(`Hero ${hero.name} updated to ${data.name}`);
      setHero(data);
    } catch (error) {
      console.log(error);
      addMessage("Failed to update");
    }
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
        <form onSubmit={onSubmit}>
          <label className="mt-2">Hero Name</label>
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded-lg p-2 w-1/4"
              type="text"
              name="name"
              placeholder="name"
              defaultValue={hero.name}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
