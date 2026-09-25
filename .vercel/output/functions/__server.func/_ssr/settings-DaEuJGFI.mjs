import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as ChevronRight } from "../_libs/lucide-react.mjs";
import { i as useAppStore, r as PageHeader } from "./router-BEo5tnh-.mjs";
import { i as NativeSelect, n as Field, r as Input, t as Button } from "./input-BcCa64Fd.mjs";
import { n as CURRENCY_LABEL } from "./format-C5-nVPS0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DaEuJGFI.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const settings = useAppStore((s) => s.settings);
	const updateSettings = useAppStore((s) => s.updateSettings);
	const loadDemo = useAppStore((s) => s.loadDemo);
	const resetAll = useAppStore((s) => s.resetAll);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "الإعدادات",
		subtitle: "بيانات الشركة والدفاتر"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5 px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" }), " الرئيسية"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 rounded-xl bg-surface p-4 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "بيانات الشركة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "اسم الشركة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: settings.companyName,
							onChange: (e) => updateSettings({ companyName: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "اسم صاحب العمل",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: settings.ownerName,
							onChange: (e) => updateSettings({ ownerName: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الهاتف",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: settings.phone,
							onChange: (e) => updateSettings({ phone: e.target.value }),
							inputMode: "tel",
							dir: "ltr",
							className: "text-start"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "رأس المال الافتتاحي",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: String(settings.openingCapital),
							onChange: (e) => updateSettings({ openingCapital: Number(e.target.value) || 0 }),
							inputMode: "numeric",
							dir: "ltr",
							className: "text-start tabular-nums"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "العملة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: settings.currency,
							onChange: (e) => updateSettings({ currency: e.target.value }),
							children: Object.keys(CURRENCY_LABEL).map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: code,
								children: [
									CURRENCY_LABEL[code],
									" (",
									code,
									")"
								]
							}, code))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3 rounded-xl bg-surface p-4 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "البيانات"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "التطبيق يحفظ كل شيء على هذا الموبايل. يمكنك تحميل أمثلة للتجربة أو مسح الدفاتر والبدء من صفر."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "w-full",
						onClick: () => loadDemo(),
						children: "تحميل بيانات تجريبية"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						className: "w-full",
						onClick: () => {
							if (confirm("مسح كل العملاء والمشاريع والحركات؟")) resetAll();
						},
						children: "مسح كل البيانات"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-1 pb-4 text-center text-xs text-subtle",
				children: "دفتر المقاول — حسابات بسيطة لشركات التشطيبات والمقاولات الصغيرة. أضفه إلى الشاشة الرئيسية من المتصفح لاستخدامه كتطبيق."
			})
		]
	})] });
}
//#endregion
export { SettingsPage as component };
