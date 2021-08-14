import MarvelApi from "../integration/marvelApi";

class CharacterService {

    async listCharacterIds() {
        return (await MarvelApi.listCharacters()).data.results
            .map((result: { id: any; }) => result.id);
    }

    async getCharacter(id: string) {
        return (await MarvelApi.getCharacter(id)).data.results
            .map((result: { id: any; name: any; description: any; }) => ({
                id: result.id,
                name: result.name,
                description: result.description
            }))[0];
    }

}

export default new CharacterService();