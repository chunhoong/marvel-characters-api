import {createHash} from "crypto";

export const createMD5Hash = (content: string) => {
    return createHash("md5").update(content).digest("hex");
};