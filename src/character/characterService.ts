import MarvelApi from "../integration/marvelApi";
import Character from "./character";
import cache from "../core/cache";
import {CacheKeys} from "../constants/cache";
import {ResourceNotFoundError} from "../core/error";

class CharacterService {

    async listCharacterIds(): Promise<number[]> {
        const cachedCharacterIds = await cache.getAs<number[]>(CacheKeys.CHARACTER_IDS);

        if (cachedCharacterIds) {
            return cachedCharacterIds;
        }

        const response = await MarvelApi.listCharacters();
        const characterIds: number[] = response.data.data.results.map((result: Record<string, unknown>) => result.id);

        await cache.set(CacheKeys.CHARACTER_IDS, characterIds, 60 * 60);

        return characterIds;
    }

    async getCharacter(id: string): Promise<Character> {
        try {
            const response = await MarvelApi.getCharacter(id);
            return response.data.data.results.map((result: Record<string, unknown>) => ({
                id: result.id,
                name: result.name,
                description: result.description
            }))[0];
        } catch (error) {
            if (error?.response?.status === 404) {
                throw new ResourceNotFoundError("Cannot find the character");
            } else {
                throw error;
            }
        }
    }

}

export default new CharacterService();