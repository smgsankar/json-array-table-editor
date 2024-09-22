"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = void 0;
const factory_1 = require("./factory");
const INCONSISTENT_COLUMNS = "Array of JSON Data has inconsistent keys";
const fallbackJSONData = {
    headers: [],
    data: [],
};
const parseJSON = (data) => {
    console.log("incoming data ==> ", data);
    try {
        if (!Array.isArray(data) ||
            typeof data[0] !== "object" ||
            !Object.keys(data[0]).length) {
            // since the custom editor only supports array data
            throw new Error("Invalid data type, the extension only supports array of JSON objects");
        }
        const headers = Object.keys(data[0]);
        data.some((row) => {
            if (headers.length !== Object.keys(row).length) {
                throw new Error(INCONSISTENT_COLUMNS);
            }
            if (headers.some((header) => !Object.keys(row).includes(header))) {
                throw new Error(INCONSISTENT_COLUMNS);
            }
            if (Object.keys(row).some((key) => !headers.includes(key))) {
                throw new Error(INCONSISTENT_COLUMNS);
            }
        });
        return { headers, data };
    }
    catch (e) {
        console.log("Error parsing JSON data ==> ", data, e.message);
        (0, factory_1.postMessageToVSCode)({ type: "error", text: e.message });
        return fallbackJSONData;
    }
};
exports.parseJSON = parseJSON;
//# sourceMappingURL=helpers.js.map