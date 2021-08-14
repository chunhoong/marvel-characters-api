import MarvelApi from "../integration/marvelApi";

class CharacterService {

    async listCharacterIds() {
        const response = await MarvelApi.listCharacters();
        return response.data.results.map((result: { id: any; }) => result.id);
    }

    async getCharacter(id: string) {
        const response = await MarvelApi.getCharacter(id);
        return response.data.results.map((result: { id: any; name: any; description: any; }) => ({
            id: result.id,
            name: result.name,
            description: result.description
        }))[0];
    }

}

export default new CharacterService();