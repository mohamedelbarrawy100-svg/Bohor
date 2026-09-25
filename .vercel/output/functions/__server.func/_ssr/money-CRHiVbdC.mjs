import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Trash2, s as Plus } from "../_libs/lucide-react.mjs";
import { a as cn, i as useAppStore, r as PageHeader } from "./router-BEo5tnh-.mjs";
import { t as Button } from "./input-BcCa64Fd.mjs";
import { l as inPeriod, o as formatDate, r as METHOD_LABEL, s as formatMoney, t as CATEGORY_LABEL } from "./format-C5-nVPS0.mjs";
import { n as ExpenseSheet, r as PaymentSheet } from "./forms-CpfGsL-t.mjs";
import { t as PeriodToggle } from "./period-toggle-CrQeTpVG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/money-CRHiVbdC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MoneyPage() {
	const payments = useAppStore((s) => s.payments);
	const expenses = useAppStore((s) => s.expenses);
	const projects = useAppStore((s) => s.projects);
	const currency = useAppStore((s) => s.settings.currency);
	const deletePayment = useAppStore((s) => s.deletePayment);
	const deleteExpense = useAppStore((s) => s.deleteExpense);
	const [tab, setTab] = (0, import_react.useState)("in");
	const [period, setPeriod] = (0, import_react.useState)("year");
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [expOpen, setExpOpen] = (0, import_react.useState)(false);
	const inRows = (0, import_react.useMemo)(() => payments.filter((p) => inPeriod(p.date, period)).slice().sort((a, b) => b.date.localeCompare(a.date)), [payments, period]);
	const outRows = (0, import_react.useMemo)(() => expenses.filter((e) => inPeriod(e.date, period)).slice().sort((a, b) => b.date.localeCompare(a.date)), [expenses, period]);
	const inTotal = inRows.reduce((s, p) => s + p.amount, 0);
	const outTotal = outRows.reduce((s, e) => s + e.amount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "الخزينة",
			subtitle: "التحصيل والمصروفات",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => tab === "in" ? setPayOpen(true) : setExpOpen(true),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
					" ",
					tab === "in" ? "دفعة" : "مصروف"
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeriodToggle, {
					value: period,
					onChange: setPeriod
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface p-3.5 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "تحصيل الفترة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-base font-semibold tabular-nums text-gain",
							children: formatMoney(inTotal, currency)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-surface p-3.5 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "صرف الفترة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-base font-semibold tabular-nums text-loss",
							children: formatMoney(outTotal, currency)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 rounded-lg bg-surface-2 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("in"),
						className: cn("h-10 rounded-md text-sm font-medium", tab === "in" ? "bg-surface text-ink shadow-sm" : "text-muted"),
						children: "الدفعات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab("out"),
						className: cn("h-10 rounded-md text-sm font-medium", tab === "out" ? "bg-surface text-ink shadow-sm" : "text-muted"),
						children: "المصروفات"
					})]
				}),
				tab === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-surface shadow-card",
					children: inRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						onAdd: () => setPayOpen(true),
						label: "لا توجد دفعات في هذه الفترة"
					}) : inRows.map((p, i) => {
						const project = projects.find((x) => x.id === p.projectId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: i ? "flex items-center gap-3 border-t border-line px-4 py-3" : "flex items-center gap-3 px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: project?.name ?? "مشروع"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											formatDate(p.date),
											" · ",
											METHOD_LABEL[p.method],
											p.notes ? ` · ${p.notes}` : ""
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tabular-nums text-sm font-medium text-gain",
									children: formatMoney(p.amount, currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-10 text-subtle",
									"aria-label": "حذف",
									onClick: () => deletePayment(p.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mx-auto size-4" })
								})
							]
						}, p.id);
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-surface shadow-card",
					children: outRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
						onAdd: () => setExpOpen(true),
						label: "لا توجد مصروفات في هذه الفترة"
					}) : outRows.map((e, i) => {
						const project = projects.find((x) => x.id === e.projectId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: i ? "flex items-center gap-3 border-t border-line px-4 py-3" : "flex items-center gap-3 px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: e.vendor || CATEGORY_LABEL[e.category]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs text-muted",
										children: [
											formatDate(e.date),
											" · ",
											CATEGORY_LABEL[e.category],
											project ? ` · ${project.name}` : " · عام"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tabular-nums text-sm font-medium text-loss",
									children: formatMoney(e.amount, currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-10 text-subtle",
									"aria-label": "حذف",
									onClick: () => deleteExpense(e.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mx-auto size-4" })
								})
							]
						}, e.id);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentSheet, {
			open: payOpen,
			onOpenChange: setPayOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseSheet, {
			open: expOpen,
			onOpenChange: setExpOpen
		})
	] });
}
function Empty({ onAdd, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4",
			size: "sm",
			onClick: onAdd,
			children: "إضافة"
		})]
	});
}
//#endregion
export { MoneyPage as component };
