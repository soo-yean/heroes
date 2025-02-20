import { FormEvent } from "react";
import { Hero } from "../types/hero";
import { useMessages } from "../context/MessageContext";
import { useNavigate } from "react-router-dom";

type Props = {
  hero?: Hero;
  setHero?: (hero: Hero) => void;
};

const URL = import.meta.env.VITE_API_URL;

export default function HeroForm({ hero, setHero }: Props) {
  const { addMessage } = useMessages();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = hero ? `${URL}/heroes/${hero.id}` : `${URL}/heroes`;
    const method = hero ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formData.get("name") }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();
      const message = hero
        ? `Hero ${hero.name} updated to ${data.name}`
        : `Hero ${data.name} created`;

      addMessage(message);
      if (hero && setHero) {
        setHero(data);
      } else {
        navigate(`/heroes/${data.id}`);
      }
    } catch (error) {
      console.log(error);
      addMessage("Failed to update");
    }
  };

  return (
    <div className="mt-3">
      <h2 className="text-2xl">{hero ? "Edit Hero" : "Create Hero"}</h2>
      <form onSubmit={onSubmit}>
        <label className="mt-2">Hero Name</label>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded-lg p-2 w-1/4"
            type="text"
            name="name"
            placeholder="name"
            defaultValue={hero?.name || ""}
          />
          <button type="submit" className="btn">
            {hero ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
