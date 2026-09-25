import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn, i as useAppStore, r as PageHeader } from "./router-BEo5tnh-.mjs";
import { i as PERIOD_LABEL, s as formatMoney, t as CATEGORY_LABEL } from "./format-C5-nVPS0.mjs";
import { r as incomeStatement, t as balanceSheet } from "./reports-F9VHMiE9.mjs";
import { t as PeriodToggle } from "./period-toggle-CrQeTpVG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-iUqLiW4h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const settings = useAppStore((s) => s.settings);
	const customers = useAppStore((s) => s.customers);
	const projects = useAppStore((s) => s.projects);
	const payments = useAppStore((s) => s.payments);
	const expenses = useAppStore((s) => s.expenses);
	const currency = settings.currency;
	const [period, setPeriod] = (0, import_react.useState)("year");
	const [tab, setTab] = (0, import_react.useState)("income");
	const snapshot = (0, import_react.useMemo)(() => ({
		settings,
		customers,
		projects,
		payments,
		expenses
	}), [
		settings,
		customers,
		projects,
		payments,
		expenses
	]);
	const income = (0, import_react.useMemo)(() => incomeStatement(snapshot, period), [snapshot, period]);
	const sheet = (0, import_react.useMemo)(() => balanceSheet(snapshot), [snapshot]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "التقارير",
		subtitle: `${settings.companyName} · ${PERIOD_LABEL[period]}`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeriodToggle, {
				value: period,
				onChange: setPeriod
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 rounded-lg bg-surface-2 p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab("income"),
					className: cn("h-10 rounded-md text-sm font-medium", tab === "income" ? "bg-surface text-ink shadow-sm" : "text-muted"),
					children: "قائمة الدخل"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab("balance"),
					className: cn("h-10 rounded-md text-sm font-medium", tab === "balance" ? "bg-surface text-ink shadow-sm" : "text-muted"),
					children: "الميزانية"
				})]
			}),
			tab === "income" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl bg-surface p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "border-b border-line pb-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-muted",
								children: "قائمة الدخل والأرباح والخسائر"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-lg font-semibold",
								children: settings.companyName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: PERIOD_LABEL[period]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						label: "إيرادات المشاريع (قيمة العقود)",
						value: formatMoney(income.revenue, currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						label: "منها محصّل نقدًا",
						value: formatMoney(income.collected, currency),
						muted: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-line pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1 text-xs font-medium text-muted",
								children: "المصروفات"
							}),
							income.byCategory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "لا توجد مصروفات",
								value: formatMoney(0, currency),
								muted: true
							}) : income.byCategory.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: CATEGORY_LABEL[row.category],
								value: formatMoney(row.amount, currency)
							}, row.category)),
							income.overhead > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "منها مصروفات عامة",
								value: formatMoney(income.overhead, currency),
								muted: true
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								label: "إجمالي المصروفات",
								value: formatMoney(income.expensesTotal, currency),
								strong: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 rounded-lg bg-surface-2 px-3 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								children: income.netProfit >= 0 ? "صافي الربح" : "صافي الخسارة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: income.netProfit >= 0 ? "text-lg font-semibold tabular-nums text-gain" : "text-lg font-semibold tabular-nums text-loss",
								children: formatMoney(income.netProfit, currency)
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-relaxed text-muted",
						children: "الإيراد هنا قيمة عقود المشاريع التي بدأت في الفترة. الربح النقدي الفعلي يظهر في الرئيسية من التحصيل ناقص الصرف."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl bg-surface p-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "border-b border-line pb-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-muted",
								children: "الميزانية العامة — المركز المالي"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-lg font-semibold",
								children: settings.companyName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "في تاريخ اليوم"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 mb-1 text-xs font-medium text-muted",
						children: "الأصول"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						label: "النقدية والصندوق",
						value: formatMoney(sheet.cash, currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						label: "ذمم العملاء (متبقي العقود)",
						value: formatMoney(sheet.receivables, currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						label: "إجمالي الأصول",
						value: formatMoney(sheet.totalAssets, currency),
						strong: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 mb-1 text-xs font-medium text-muted",
						children: "حقوق الملكية"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						label: "رأس المال",
						value: formatMoney(sheet.capital, currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						label: sheet.retained >= 0 ? "أرباح محتجزة" : "خسائر مرحلة",
						value: formatMoney(sheet.retained, currency)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						label: "إجمالي حقوق الملكية",
						value: formatMoney(sheet.totalEquity, currency),
						strong: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 rounded-lg bg-surface-2 px-3 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "توازن الميزانية"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: sheet.balanced ? "font-medium text-gain" : "font-medium text-loss",
								children: sheet.balanced ? "متوازنة" : "غير متوازنة"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-relaxed text-muted",
						children: "النقدية = رأس المال + التحصيل − المصروفات. الذمم = قيمة العقود − المحصّل."
					})
				]
			})
		]
	})] });
}
function Line({ label, value, muted, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: strong ? "mt-1 flex items-baseline justify-between gap-3 border-t border-line pt-2" : "flex items-baseline justify-between gap-3 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: muted ? "text-sm text-muted" : "text-sm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: strong ? "text-sm font-semibold tabular-nums" : muted ? "text-sm tabular-nums text-muted" : "text-sm tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { ReportsPage as component };
