type PokemonTypes = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonSprites = {
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
};

export type Pokemon = {
  id?: number;
  name?: string;
  height?: number;
  weight?: number;
  types?: PokemonTypes[];
  sprites?: PokemonSprites;
};
