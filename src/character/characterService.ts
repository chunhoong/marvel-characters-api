import MarvelApi from "../integration/marvelApi";
import Character from "./character";
import Cache from "../core/cache";
import {CacheKeys} from "../constants/cache";

class CharacterService {

    async listCharacterIds(): Promise<number[]> {
        const cachedCharacterIds = await Cache.getAs<number[]>(CacheKeys.CHARACTER_IDS);

        if (cachedCharacterIds) {
            return cachedCharacterIds;
        }

        const response = await MarvelApi.listCharacters();
        const characterIds: number[] = response.data.results.map((result: Record<string, unknown>) => result.id);

        await Cache.set(CacheKeys.CHARACTER_IDS, characterIds);

        return characterIds;
    }

    async getCharacter(id: string): Promise<Character> {
        const response = await MarvelApi.getCharacter(id);
        return response.data.results.map((result: Record<string, unknown>) => ({
            id: result.id,
            name: result.name,
            description: result.description
        }))[0];
    }

}

export default new CharacterService();