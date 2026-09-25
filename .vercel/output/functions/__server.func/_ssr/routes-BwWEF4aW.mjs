import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Settings2, d as Landmark, g as ArrowDownLeft, h as ArrowUpRight, n as Users, s as Plus } from "../_libs/lucide-react.mjs";
import { i as useAppStore, r as PageHeader } from "./router-BEo5tnh-.mjs";
import { t as Button } from "./input-BcCa64Fd.mjs";
import { a as STATUS_LABEL, c as formatNumber, l as inPeriod, o as formatDate, s as formatMoney, u as monthLabel } from "./format-C5-nVPS0.mjs";
import { i as ProjectSheet, n as ExpenseSheet, r as PaymentSheet } from "./forms-CpfGsL-t.mjs";
import { a as projectTotals, i as monthlySeries } from "./reports-F9VHMiE9.mjs";
import { t as PeriodToggle } from "./period-toggle-CrQeTpVG.mjs";
import { t as Badge } from "./badge-2ucH1I_D.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BwWEF4aW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChartTip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-surface px-3 py-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 font-medium",
			children: label
		}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "tabular-nums text-muted",
			children: [
				p.dataKey === "collected" ? "تحصيل" : "صرف",
				": ",
				formatNumber(Number(p.value ?? 0))
			]
		}, String(p.dataKey)))]
	});
}
function CashflowChart({ data }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-44 rounded-lg bg-surface-2" });
	const rows = data.map((d) => ({
		...d,
		label: monthLabel(d.key).split(" ")[0] ?? d.key
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		dir: "ltr",
		className: "h-44 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data: rows,
				barGap: 3,
				margin: {
					top: 8,
					right: 4,
					left: -18,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						strokeDasharray: "3 3",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "var(--color-muted)",
							fontSize: 10
						},
						axisLine: false,
						tickLine: false,
						tickFormatter: (v) => formatNumber(v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						cursor: { fill: "rgba(26,25,22,0.04)" },
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "collected",
						fill: "var(--color-primary)",
						radius: [
							4,
							4,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "spent",
						fill: "var(--color-subtle)",
						radius: [
							4,
							4,
							0,
							0
						]
					})
				]
			})
		})
	});
}
function Home() {
	const settings = useAppStore((s) => s.settings);
	const projects = useAppStore((s) => s.projects);
	const payments = useAppStore((s) => s.payments);
	const expenses = useAppStore((s) => s.expenses);
	const customers = useAppStore((s) => s.customers);
	const [period, setPeriod] = (0, import_react.useState)("year");
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [expOpen, setExpOpen] = (0, import_react.useState)(false);
	const [projOpen, setProjOpen] = (0, import_react.useState)(false);
	const currency = settings.currency;
	const stats = (0, import_react.useMemo)(() => {
		const collected = payments.filter((p) => inPeriod(p.date, period)).reduce((s, p) => s + p.amount, 0);
		const spent = expenses.filter((e) => inPeriod(e.date, period)).reduce((s, e) => s + e.amount, 0);
		const cash = settings.openingCapital + payments.reduce((s, p) => s + p.amount, 0) - expenses.reduce((s, e) => s + e.amount, 0);
		const due = projects.reduce((sum, p) => sum + projectTotals(p, payments, expenses).remaining, 0);
		return {
			collected,
			spent,
			profit: collected - spent,
			cash,
			due
		};
	}, [
		payments,
		expenses,
		projects,
		period,
		settings.openingCapital
	]);
	const series = (0, import_react.useMemo)(() => monthlySeries(payments, expenses, 6), [payments, expenses]);
	const recent = (0, import_react.useMemo)(() => {
		const pays = payments.map((p) => ({
			id: p.id,
			kind: "in",
			title: projects.find((x) => x.id === p.projectId)?.name ?? "دفعة",
			amount: p.amount,
			date: p.date
		}));
		const exps = expenses.map((e) => ({
			id: e.id,
			kind: "out",
			title: e.vendor || "مصروف",
			amount: e.amount,
			date: e.date
		}));
		return [...pays, ...exps].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
	}, [
		payments,
		expenses,
		projects
	]);
	const activeProjects = projects.filter((p) => p.status === "in_progress").slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: settings.companyName,
			subtitle: "دفتر المقاول — حسابات التشطيبات",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/settings",
					"aria-label": "الإعدادات",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-5" })
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeriodToggle, {
					value: period,
					onChange: setPeriod
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
							label: "التحصيل",
							value: formatMoney(stats.collected, currency),
							tone: "gain"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
							label: "المصروفات",
							value: formatMoney(stats.spent, currency),
							tone: "loss"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
							label: stats.profit >= 0 ? "صافي الربح" : "صافي الخسارة",
							value: formatMoney(stats.profit, currency),
							tone: stats.profit >= 0 ? "gain" : "loss"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
							label: "مستحق من العملاء",
							value: formatMoney(stats.due, currency),
							tone: "warn"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "حركة الصندوق"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									"الرصيد:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums text-ink",
										children: formatMoney(stats.cash, currency)
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CashflowChart, { data: series }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-4 text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-sm bg-primary" }), " تحصيل"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-sm bg-subtle" }), " صرف"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "h-12",
							onClick: () => setPayOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " دفعة"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "h-12",
							onClick: () => setExpOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " مصروف"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							className: "h-12",
							onClick: () => setProjOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " مشروع"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/customers",
						className: "flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-surface text-sm font-medium shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
							" العملاء (",
							customers.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/reports",
						className: "flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-surface text-sm font-medium shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-4" }), " المركز المالي"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "مشاريع جارية"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/projects",
						className: "text-xs text-muted",
						children: "الكل"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: activeProjects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl bg-surface px-4 py-8 text-center text-sm text-muted shadow-card",
						children: "لا توجد مشاريع قيد التنفيذ"
					}) : activeProjects.map((p) => {
						const t = projectTotals(p, payments, expenses);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/projects/$projectId",
							params: { projectId: p.id },
							className: "block rounded-xl bg-surface p-4 shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-medium",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-muted",
											children: p.location
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "primary",
										children: STATUS_LABEL[p.status]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-primary",
										style: { width: `${t.progress}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex justify-between text-xs text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums",
										children: ["محصل ", formatMoney(t.collected, currency)]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums",
										children: ["متبقي ", formatMoney(t.remaining, currency)]
									})]
								})
							]
						}, p.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm font-semibold",
					children: "آخر الحركات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-surface shadow-card",
					children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 py-8 text-center text-sm text-muted",
						children: "لا توجد حركات بعد"
					}) : recent.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: i ? "flex items-center gap-3 border-t border-line px-4 py-3" : "flex items-center gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: row.kind === "in" ? "flex size-9 items-center justify-center rounded-md bg-gain-soft text-gain" : "flex size-9 items-center justify-center rounded-md bg-loss-soft text-loss",
								children: row.kind === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: row.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: formatDate(row.date)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: row.kind === "in" ? "tabular-nums text-sm font-medium text-gain" : "tabular-nums text-sm font-medium text-loss",
								children: [row.kind === "in" ? "+" : "−", formatMoney(row.amount, currency)]
							})
						]
					}, row.id))
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentSheet, {
			open: payOpen,
			onOpenChange: setPayOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseSheet, {
			open: expOpen,
			onOpenChange: setExpOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectSheet, {
			open: projOpen,
			onOpenChange: setProjOpen
		})
	] });
}
function Kpi({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-3.5 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 text-base font-semibold tabular-nums tracking-tight ${tone === "gain" ? "text-gain" : tone === "loss" ? "text-loss" : "text-warn"}`,
			children: value
		})]
	});
}
//#endregion
export { Home as component };
