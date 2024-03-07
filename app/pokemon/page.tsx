"use client";
import { useCallback, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { HomeModernIcon } from "@heroicons/react/24/outline";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(pathname + "?" + createQueryString("id", inputValue));
  };

  if (error) {
    return <NotFound resetInput={() => setInputValue(undefined)} />;
  }

  const valueOutOfRange =
    inputValue !== undefined &&
    (parseInt(inputValue, 10) < 1 || parseInt(inputValue, 10) > 151);

  return (
    <>
      <Link href="/" className="ml-24 mt-8 block">
        <HomeModernIcon className="w-10" />
      </Link>
      <div className="p-24 pt-8">
        <div className="relative pb-4">
          <form onSubmit={handleSubmit} className="flex w-[400px]">
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
              className="rounded-tl-none rounded-bl-none"
              disabled={valueOutOfRange || isFetching}
            >
              Find Pokemon
            </Button>
          </form>
          {valueOutOfRange && (
            <span className="mt-2 pl-4 block text-sm text-rose-500 absolute">
              Value out of range. Enter number between 1 and 151
            </span>
          )}
        </div>
        {isFetching && <PokemonLoadingCard />}
        {pokemon && !isFetching && <PokemonCard pokemon={pokemon} />}
      </div>
    </>
  );
};

export default PokemonPage;
