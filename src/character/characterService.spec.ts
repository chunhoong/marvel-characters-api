import MarvelApi from "../integration/marvelApi";
import characterService from "./characterService";
import cache from "../core/cache";
import {mocked} from "ts-jest/utils";
import {AxiosResponse} from "axios";
import {ResourceNotFoundError} from "../core/error";

jest.mock("../integration/marvelApi");
jest.mock("../core/cache");

describe("character service", () => {

    const mockedCache = mocked(cache, true);
    const MockedMarvelApi = mocked(MarvelApi, true);

    beforeAll(() => {
        mockedCache.set.mockResolvedValue();

        MockedMarvelApi.listCharacters.mockResolvedValue({
            status: 200,
            data: require("../__tests__/jsons/listCharacters.json")
        } as AxiosResponse);

        MockedMarvelApi.getCharacter.mockResolvedValue({
            status: 200,
            data: require("../__tests__/jsons/getCharacter.json")
        } as AxiosResponse);
    });

    beforeEach(() => {
        mockedCache.set.mockClear();
        mockedCache.getAs.mockReset();
        MockedMarvelApi.listCharacters.mockClear();
        MockedMarvelApi.getCharacter.mockClear();
    });

    it("should list character IDs correctly", async () => {
        mockedCache.getAs.mockResolvedValue(null);

        const actual = await characterService.listCharacterIds();
        const expected = [1011334, 1017100, 1009144, 1010699, 1009146, 1016823, 1009148, 1009149, 1010903, 1011266, 1010354, 1010846, 1012717, 1011297, 1011031, 1009150, 1011198, 1011175, 1011136, 1011176];

        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(MarvelApi.listCharacters).toBeCalled();
    });

    it("should return character IDs from cache when cache is present", async () => {
        const expected = [1011334, 1017100, 1009144, 1010699, 1009146, 1016823, 1009148, 1009149, 1010903, 1011266, 1010354, 1010846, 1012717, 1011297, 1011031, 1009150, 1011198, 1011175, 1011136, 1011176];

        mockedCache.getAs.mockResolvedValue(expected);

        const actual = await characterService.listCharacterIds();

        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(MarvelApi.listCharacters).not.toBeCalled();
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

    it("should throw ResourceNotFoundError when Marvel Comic API returns status 404", async () => {
        MockedMarvelApi.getCharacter.mockRejectedValue({
            response: {
                status: 404
            }
        });

        try {
            await characterService.getCharacter("non-existing-character-id");
            fail("ResourceNotFoundError is expected")
        } catch (error) {
            expect(error instanceof ResourceNotFoundError).toBeTruthy();
        }
    });

    it("should throw error when Marvel Comic API returns non 200 and non 404 status", async () => {
        MockedMarvelApi.getCharacter.mockRejectedValue({
            response: {
                status: 500
            }
        });

        try {
            await characterService.getCharacter("non-existing-character-id");
            fail("ResourceNotFoundError is expected");
        } catch (error) {
            expect(error.response.status).toBe(500);
        }
    });

});