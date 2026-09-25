import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn } from "./router-BEo5tnh-.mjs";
import { i as PERIOD_LABEL } from "./format-C5-nVPS0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/period-toggle-CrQeTpVG.js
var import_jsx_runtime = require_jsx_runtime();
var KEYS = [
	"month",
	"year",
	"all"
];
function PeriodToggle({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 rounded-lg bg-surface-2 p-1",
		children: KEYS.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(key),
			className: cn("h-9 rounded-md text-sm font-medium transition-[background-color,color,scale] duration-150", value === key ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"),
			children: PERIOD_LABEL[key]
		}, key))
	});
}
//#endregion
export { PeriodToggle as t };
