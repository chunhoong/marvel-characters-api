import {createHash} from "crypto";
import axios from "axios";

export default class MarvelApi {
    static async listCharacters() {
        const axiosResponse =  await axios.get(url(`/characters`));
        return axiosResponse.data;
    }

    static async getCharacter(id: string) {
        const axiosResponse = await axios.get(url(`/characters/${id}`));
        return axiosResponse.data;
    }
}

const url = (path: string, parameters?: Record<string, string>) => {
    const timestamp = Date.now().toString()
    const PRIVATE_KEY = process.env["marvel.api.privateKey"];
    const PUBLIC_KEY = process.env["marvel.api.publicKey"];
    const hash = createHash("md5").update(timestamp + PRIVATE_KEY + PUBLIC_KEY).digest("hex");
    const baseUrl = process.env["marvel.api.url"] + "/v1/public";
    const additionalParameter = parameters ? Object.keys(parameters).map(key => `${key}=${parameters[key]}`).join("&") : "";
    const urlWithoutAdditionalParameter = baseUrl + path + `?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;
    return additionalParameter ? (urlWithoutAdditionalParameter + "&" + additionalParameter) : urlWithoutAdditionalParameter;
}