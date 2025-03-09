import { AbilitieDTO } from "./abilitie-dto";
import { GenericDTO } from "./generic-dto";
import { TypeDTO } from "./type-dto";

export class PokemonDTO extends GenericDTO {
    id!: string;
    name!: string;
    types!: TypeDTO[];
    abilities!: AbilitieDTO[];
    sprite_url!: string;
}


