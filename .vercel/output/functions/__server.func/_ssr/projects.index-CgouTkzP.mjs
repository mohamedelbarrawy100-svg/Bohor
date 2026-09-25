import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as Search, s as Plus } from "../_libs/lucide-react.mjs";
import { a as cn, i as useAppStore, r as PageHeader } from "./router-BEo5tnh-.mjs";
import { r as Input, t as Button } from "./input-BcCa64Fd.mjs";
import { a as STATUS_LABEL, s as formatMoney } from "./format-C5-nVPS0.mjs";
import { i as ProjectSheet } from "./forms-CpfGsL-t.mjs";
import { a as projectTotals } from "./reports-F9VHMiE9.mjs";
import { t as Badge } from "./badge-2ucH1I_D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects.index-CgouTkzP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "الكل"
	},
	{
		id: "in_progress",
		label: "جاري"
	},
	{
		id: "completed",
		label: "مكتمل"
	},
	{
		id: "planning",
		label: "تخطيط"
	},
	{
		id: "on_hold",
		label: "متوقف"
	}
];
function ProjectsPage() {
	const projects = useAppStore((s) => s.projects);
	const customers = useAppStore((s) => s.customers);
	const payments = useAppStore((s) => s.payments);
	const expenses = useAppStore((s) => s.expenses);
	const currency = useAppStore((s) => s.settings.currency);
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [open, setOpen] = (0, import_react.useState)(false);
	const rows = (0, import_react.useMemo)(() => {
		const needle = q.trim();
		return projects.filter((p) => {
			if (filter !== "all" && p.status !== filter) return false;
			if (!needle) return true;
			const customer = customers.find((c) => c.id === p.customerId)?.name ?? "";
			return `${p.name} ${p.location} ${customer}`.includes(needle);
		});
	}, [
		projects,
		customers,
		q,
		filter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "المشاريع",
			subtitle: `${projects.length} مشروع`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " جديد"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "بحث بالاسم أو العميل",
						className: "pr-10"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(f.id),
						className: cn("h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-[background-color,color] duration-150", filter === f.id ? "bg-primary text-primary-fg" : "bg-surface text-muted shadow-card"),
						children: f.label
					}, f.id))
				}),
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface px-4 py-12 text-center shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "لا توجد مشاريع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "أضف مشروعًا واربطه بعميل."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-4",
							onClick: () => setOpen(true),
							children: "إضافة مشروع"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: rows.map((p) => {
						const t = projectTotals(p, payments, expenses);
						const customer = customers.find((c) => c.id === p.customerId);
						const tone = p.status === "completed" ? "gain" : p.status === "on_hold" ? "warn" : p.status === "planning" ? "default" : "primary";
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
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-0.5 truncate text-xs text-muted",
											children: [
												customer?.name,
												" · ",
												p.location
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone,
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
									className: "mt-2 grid grid-cols-3 gap-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: ["العقد", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-0.5 block tabular-nums text-ink",
												children: formatMoney(p.contractAmount, currency)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: ["محصل", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-0.5 block tabular-nums text-gain",
												children: formatMoney(t.collected, currency)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: ["متبقي", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-0.5 block tabular-nums text-warn",
												children: formatMoney(t.remaining, currency)
											})]
										})
									]
								})
							]
						}, p.id);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectSheet, {
			open,
			onOpenChange: setOpen
		})
	] });
}
//#endregion
export { ProjectsPage as component };
