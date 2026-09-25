import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Trash2, l as Pencil, m as ChevronRight, s as Plus } from "../_libs/lucide-react.mjs";
import { i as useAppStore, n as Route, r as PageHeader } from "./router-BEo5tnh-.mjs";
import { t as Button } from "./input-BcCa64Fd.mjs";
import { a as STATUS_LABEL, o as formatDate, r as METHOD_LABEL, s as formatMoney, t as CATEGORY_LABEL } from "./format-C5-nVPS0.mjs";
import { i as ProjectSheet, n as ExpenseSheet, r as PaymentSheet } from "./forms-CpfGsL-t.mjs";
import { a as projectTotals } from "./reports-F9VHMiE9.mjs";
import { t as Badge } from "./badge-2ucH1I_D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._projectId-g7cayxmb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectDetail() {
	const { projectId } = Route.useParams();
	const navigate = useNavigate();
	const projects = useAppStore((s) => s.projects);
	const customers = useAppStore((s) => s.customers);
	const allPayments = useAppStore((s) => s.payments);
	const allExpenses = useAppStore((s) => s.expenses);
	const currency = useAppStore((s) => s.settings.currency);
	const deleteProject = useAppStore((s) => s.deleteProject);
	const deletePayment = useAppStore((s) => s.deletePayment);
	const deleteExpense = useAppStore((s) => s.deleteExpense);
	const project = projects.find((p) => p.id === projectId);
	const customer = customers.find((c) => c.id === project?.customerId);
	const payments = (0, import_react.useMemo)(() => allPayments.filter((p) => p.projectId === projectId), [allPayments, projectId]);
	const expenses = (0, import_react.useMemo)(() => allExpenses.filter((e) => e.projectId === projectId), [allExpenses, projectId]);
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [expOpen, setExpOpen] = (0, import_react.useState)(false);
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: "المشروع غير موجود"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/projects",
			className: "mt-3 inline-block text-sm text-primary",
			children: "العودة للمشاريع"
		})]
	});
	const t = projectTotals(project, allPayments, allExpenses);
	const tone = project.status === "completed" ? "gain" : project.status === "on_hold" ? "warn" : "primary";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: project.name,
			subtitle: customer?.name,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => setEdit(true),
					"aria-label": "تعديل",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "حذف",
					onClick: () => {
						if (confirm("حذف المشروع وكل دفعاته؟")) {
							deleteProject(project.id);
							navigate({ to: "/projects" });
						}
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-loss" })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects",
					className: "inline-flex items-center gap-1 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" }), " كل المشاريع"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone,
								children: STATUS_LABEL[project.status]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: formatDate(project.startDate)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: project.location
						}),
						project.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: project.notes
						}) : null,
						customer?.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `tel:${customer.phone}`,
							className: "mt-3 inline-block text-sm text-primary",
							dir: "ltr",
							children: customer.phone
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "قيمة العقد",
							value: formatMoney(project.contractAmount, currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "المحصل",
							value: formatMoney(t.collected, currency),
							gain: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "المتبقي",
							value: formatMoney(t.remaining, currency),
							warn: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "مصروفات المشروع",
							value: formatMoney(t.spent, currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "الربح المتوقع",
							value: formatMoney(t.expectedProfit, currency),
							gain: t.expectedProfit >= 0,
							loss: t.expectedProfit < 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "الربح النقدي",
							value: formatMoney(t.cashProfit, currency),
							gain: t.cashProfit >= 0,
							loss: t.cashProfit < 0
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-surface-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-primary",
						style: { width: `${t.progress}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-xs text-muted tabular-nums",
					children: [
						"نسبة التحصيل ",
						t.progress,
						"%"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "الدفعات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setPayOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " دفعة"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-surface shadow-card",
					children: payments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 py-6 text-center text-sm text-muted",
						children: "لا توجد دفعات"
					}) : payments.slice().sort((a, b) => b.date.localeCompare(a.date)).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: i ? "flex items-center gap-3 border-t border-line px-4 py-3" : "flex items-center gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular-nums text-sm font-medium text-gain",
								children: formatMoney(p.amount, currency)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									formatDate(p.date),
									" · ",
									METHOD_LABEL[p.method],
									p.notes ? ` · ${p.notes}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-10 text-subtle",
							"aria-label": "حذف الدفعة",
							onClick: () => deletePayment(p.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mx-auto size-4" })
						})]
					}, p.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "مصروفات المشروع"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setExpOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " مصروف"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-surface shadow-card",
					children: expenses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 py-6 text-center text-sm text-muted",
						children: "لا توجد مصروفات"
					}) : expenses.slice().sort((a, b) => b.date.localeCompare(a.date)).map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: i ? "flex items-center gap-3 border-t border-line px-4 py-3" : "flex items-center gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular-nums text-sm font-medium text-loss",
								children: formatMoney(e.amount, currency)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted",
								children: [
									formatDate(e.date),
									" · ",
									CATEGORY_LABEL[e.category],
									e.vendor ? ` · ${e.vendor}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-10 text-subtle",
							"aria-label": "حذف المصروف",
							onClick: () => deleteExpense(e.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mx-auto size-4" })
						})]
					}, e.id))
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectSheet, {
			open: edit,
			onOpenChange: setEdit,
			initial: project
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentSheet, {
			open: payOpen,
			onOpenChange: setPayOpen,
			presetProjectId: project.id
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseSheet, {
			open: expOpen,
			onOpenChange: setExpOpen,
			presetProjectId: project.id
		})
	] });
}
function Stat({ label, value, gain, loss, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface p-3.5 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1 text-sm font-semibold tabular-nums ${gain ? "text-gain" : loss ? "text-loss" : warn ? "text-warn" : "text-ink"}`,
			children: value
		})]
	});
}
//#endregion
export { ProjectDetail as component };
