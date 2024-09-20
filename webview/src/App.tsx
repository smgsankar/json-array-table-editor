import { useEffect } from "react";
import { postMessageToVSCode } from "./store/factory";

export function App() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type == "update") {
        console.log("event.data.type ==> ", event.data.text);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      Hello, bros!
      <button
        onClick={() => {
          postMessageToVSCode({ type: "update", text: "Hello, parent!" });
        }}
      >
        Send message to parent
      </button>
    </div>
  );
}
