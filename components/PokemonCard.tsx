import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import type { Pokemon } from "@/app/types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  if (!pokemon) {
    return null;
  }

  const types = pokemon?.types?.map((type) => type.type.name);
  const artwork = pokemon?.sprites?.other["official-artwork"].front_default;

  return (
    <Card className="my-8 w-[400px] flex text-sm">
      <CardContent className="w-[200px] pt-6 border-r border-r-[hsl(var(--border))]">
        <div className="flex justify-between py-4">
          <p className="flex flex-col">
            Name:
            <span className="capitalize font-bold">{pokemon.name}</span>
          </p>
          <p className="flex flex-col self-end">
            ID: <span className="capitalize font-bold">{pokemon.id}</span>
          </p>
        </div>

        <div className="flex justify-between py-4">
          <p className="flex flex-col">
            Type:
            <span className="capitalize font-bold">{types?.join(", ")}</span>
          </p>
        </div>

        <div className="flex justify-between py-4">
          <p className="flex flex-col">
            Height:
            <span className="capitalize font-bold">{pokemon.height}</span>
          </p>
          <p className="flex flex-col">
            Weight:
            <span className="capitalize font-bold self-end">
              {pokemon.weight}
            </span>
          </p>
        </div>
      </CardContent>
      {artwork && (
        <CardContent className="pt-6 w-[200px] flex justify-center items-center">
          <Image
            priority
            src={artwork}
            width={200}
            height={200}
            alt={`Picture of ${pokemon.name}`}
          />
        </CardContent>
      )}
    </Card>
  );
};
