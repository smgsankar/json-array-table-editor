import { useEffect, useReducer } from "react";
import { dataReducer, initialState } from "./utils/store";
import { TableEditor } from "./components/TableEditor";
import { parseJSON } from "./utils/helpers";

export function App() {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const messageHandler = (event: MessageEvent) => {
    console.log("received message ==> ", event.data);

    const { type, ...rest } = event.data;
    switch (type) {
      case "init":
        const parsedJSON = parseJSON(rest.text);
        dispatch({ type, payload: parsedJSON });
        break;
      case "update":
        console.log("event.data.text ==> ", rest.text);
        break;
      default:
        console.log("Unknown message type: ", type);
    }
  };

  console.log("state ==> ", state);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      messageHandler(event);
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return <TableEditor data={state.data} headers={state.headers} />;
}
