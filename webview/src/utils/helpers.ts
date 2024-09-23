import { postMessageToVSCode } from "./factory";
import { Data, DiffIndex } from "./store";

const INCONSISTENT_COLUMNS = "Array of JSON Data has inconsistent keys";

const fallbackJSONData = {
  headers: [],
  data: [],
};

export const parseJSON = (data: any) => {
  console.log("incoming data ==> ", data);
  try {
    if (
      !Array.isArray(data) ||
      typeof data[0] !== "object" ||
      !Object.keys(data[0]).length
    ) {
      // since the custom editor only supports array data
      throw new Error(
        "Invalid data type, the extension only supports array of JSON objects"
      );
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
    console.log("Error parsing JSON data ==> ", data, (e as Error).message);
    postMessageToVSCode({ type: "error", text: (e as Error).message });
    return fallbackJSONData;
  }
};

export const findDiffIndex = (
  oldData: Data,
  newData: Data
): DiffIndex | undefined => {
  if (oldData.length !== newData.length) {
    return;
  }
  for (let i = 0; i < oldData.length; i++) {
    if (JSON.stringify(oldData[i]) !== JSON.stringify(newData[i])) {
      const diff = Object.keys(oldData[i]).find(
        (key) => oldData[i][key] !== newData[i][key]
      );
      if (!diff) {
        return;
      }
      return {
        index: i,
        header: diff,
      };
    }
  }
};

export const getForceUpdateHeader = (
  rowIndex: number,
  forceUpdate?: DiffIndex
) => {
  if (!forceUpdate) {
    return;
  }
  if (forceUpdate.index === rowIndex) {
    return forceUpdate.header;
  }
};
