import axios from "axios";
import {createMD5Hash} from "../core/crypto";
import {MARVEL_API_PRIVATE_KEY, MARVEL_API_PUBLIC_KEY, MARVEL_API_URL} from "../constants/config";

export default class MarvelApi {
    static async listCharacters() {
        const axiosResponse = await axios.get(url(`/characters`, {limit: "100"}));
        return axiosResponse.data;
    }

    static async getCharacter(id: string) {
        const axiosResponse = await axios.get(url(`/characters/${id}`));
        return axiosResponse.data;
    }
}

const url = (path: string, parameters?: Record<string, string>) => {
    const timestamp = Date.now().toString()
    const hash = createMD5Hash(timestamp + MARVEL_API_PRIVATE_KEY + MARVEL_API_PUBLIC_KEY);
    const baseUrl = MARVEL_API_URL + "/v1/public";
    const additionalParameter = parameters ? Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join("&") : "";
    const urlWithoutAdditionalParameter = baseUrl + path + `?ts=${timestamp}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash}`;
    return additionalParameter ? (urlWithoutAdditionalParameter + "&" + additionalParameter) : urlWithoutAdditionalParameter;
}