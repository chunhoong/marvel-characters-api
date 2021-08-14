import MarvelApi from "../integration/marvelApi";
import characterService from "./characterService";

jest.mock("../integration/marvelApi");

describe("character service", () => {

    beforeAll(() => {
        MarvelApi.listCharacters = jest.fn().mockResolvedValue(require("../__tests__/mock/listCharacters.json"));
        MarvelApi.getCharacter = jest.fn().mockResolvedValue(require("../__tests__/mock/getCharacter.json"));
    });

    it("should list character IDs correctly", async () => {
        const actual = await characterService.listCharacterIds();
        const expected = [1011334, 1017100, 1009144, 1010699, 1009146, 1016823, 1009148, 1009149, 1010903, 1011266, 1010354, 1010846, 1012717, 1011297, 1011031, 1009150, 1011198, 1011175, 1011136, 1011176];
        expect(actual).toEqual(expect.arrayContaining(expected));
    });

    it("should get character detail correctly", async () => {
        const actual = await characterService.getCharacter("1011334");
        const expected = {
            "id": 1011334,
            "name": "3-D Man",
            "description": ""
        };
        expect(actual).toMatchObject(expected);
    });

});