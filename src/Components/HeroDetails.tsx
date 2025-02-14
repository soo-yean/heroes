import { ChangeEvent } from "react";
import { Hero } from "../types/hero";

type Props = {
  hero?: Hero;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function HeroDetails({ hero, onNameChange }: Props) {
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
        <label className="mt-2">Hero Name</label>
        <input
          className="border border-gray-300 rounded-lg p-2 w-1/4"
          type="text"
          placeholder="name"
          value={hero.name}
          onChange={onNameChange}
        />
      </div>
    </>
  );
}
