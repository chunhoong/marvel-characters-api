import {createMD5Hash} from "./crypto";

describe("crypto", () => {

    it("should create md5 hash correctly", () => {
        const hash = createMD5Hash("1abcd1234");
        expect(hash).toBe("ffd275c5130566a2916217b101f26150");
    });

})