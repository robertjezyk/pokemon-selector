"use client";
import { useCallback, useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PokemonCard } from "@/components/PokemonCard";
import { NotFound } from "@/components/NotFound";

import type { Pokemon } from "@/app/types";

const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 151;

const PokemonPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const id = searchParams.get("id") || undefined;

  const [inputValue, setInputValue] = useState(id);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [networkError, setNetworkError] = useState<string | unknown | null>(
    null
  );

  const getPokemon = async (pokemonId: string) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );

      if (response) {
        const data = await response.json();
        setPokemon(data);
        setNetworkError(null);
      }
    } catch (networkError) {
      console.error("Error fetching Pokemon:", networkError);
      setNetworkError(networkError);
    }
  };

  useEffect(() => {
    if (id) {
      getPokemon(id);
    }
  }, [id]);

  const createQueryString = useCallback(
    (name: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
        setPokemon(null);
      }

      return params.toString();
    },
    [searchParams]
  );

  if (networkError) {
    return <NotFound setError={setNetworkError} />;
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
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default PokemonPage;
