"use client";
import { useCallback, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonLoadingCard } from "@/components/PokemonLoadingCard";
import { NotFound } from "@/components/NotFound";

const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 151;

const getPokemon = async (pokemonId?: string) => {
  try {
    if (pokemonId) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );

      return response.json();
    }
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
  }
};

const PokemonPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const id = searchParams.get("id") || undefined;

  const {
    data: pokemon,
    error,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemon(id),
    enabled: !!id,
  });

  const [inputValue, setInputValue] = useState(id);

  const createQueryString = useCallback(
    (name: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );

  if (error) {
    return <NotFound resetInput={() => setInputValue(undefined)} />;
  }

  const valueOutOfRange =
    inputValue !== undefined &&
    (parseInt(inputValue, 10) < 1 || parseInt(inputValue, 10) > 151);

  return (
    <div className="p-24">
      <div className="relative pb-4">
        <div className="flex w-[400px]">
          <Input
            placeholder="Enter number between 1 and 151"
            defaultValue={inputValue}
            type="number"
            min={MIN_POKEMON_ID}
            max={MAX_POKEMON_ID}
            onChange={(e) => setInputValue(e.target.value)}
            className="rounded-tr-none rounded-br-none"
          />
          <Button
            type="submit"
            onClick={() => {
              router.push(pathname + "?" + createQueryString("id", inputValue));
            }}
            className="rounded-tl-none rounded-bl-none"
            disabled={valueOutOfRange}
          >
            Find Pokemon
          </Button>
        </div>
        {valueOutOfRange && (
          <span className="mt-2 pl-4 block text-sm text-rose-500 absolute">
            Value out of range. Enter number between 1 and 151
          </span>
        )}
      </div>
      {isFetching && <PokemonLoadingCard />}
      {pokemon && !isFetching && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default PokemonPage;
