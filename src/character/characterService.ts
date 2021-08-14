import MarvelApi from "../integration/marvelApi";
import Character from "./character";

class CharacterService {

    async listCharacterIds(): Promise<number[]> {
        const response = await MarvelApi.listCharacters();
        return response.data.results.map((result: Record<string, unknown>) => result.id);
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