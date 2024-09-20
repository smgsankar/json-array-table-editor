import { postMessageToVSCode } from "./factory";

const INCONSISTENT_COLUMNS = "Array of JSON Data has inconsistent keys";

const fallbackJSONData = {
  headers: [],
  data: [],
};

export const parseJSON = (rawData: string) => {
  if (!rawData) {
    return fallbackJSONData;
  }
  try {
    const data = JSON.parse(rawData);
    if (!Array.isArray(data)) {
      // since the custom editor only supports array data
      throw new Error("Parsed JSON Data is not an array");
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
  } catch (e) {
    postMessageToVSCode({ type: "error", text: (e as Error).message });
    return fallbackJSONData;
  }
};
