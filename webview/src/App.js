"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const store_1 = require("./utils/store");
const TableEditor_1 = require("./components/TableEditor");
const helpers_1 = require("./utils/helpers");
function App() {
    const [state, dispatch] = (0, react_1.useReducer)(store_1.dataReducer, store_1.initialState);
    const messageHandler = (event) => {
        console.log("received message ==> ", event.data);
        const { type, ...rest } = event.data;
        switch (type) {
            case "init":
                const parsedJSON = (0, helpers_1.parseJSON)(rest.text);
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
    (0, react_1.useEffect)(() => {
        const handleMessage = (event) => {
            messageHandler(event);
        };
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);
    return (0, jsx_runtime_1.jsx)(TableEditor_1.TableEditor, { data: state.data, headers: state.headers });
}
//# sourceMappingURL=App.js.map