import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Phone, i as Trash2, s as Plus } from "../_libs/lucide-react.mjs";
import { i as useAppStore, r as PageHeader } from "./router-BEo5tnh-.mjs";
import { t as Button } from "./input-BcCa64Fd.mjs";
import { s as formatMoney } from "./format-C5-nVPS0.mjs";
import { t as CustomerSheet } from "./forms-CpfGsL-t.mjs";
import { n as customerBalance } from "./reports-F9VHMiE9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-B0scDkPk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomersPage() {
	const customers = useAppStore((s) => s.customers);
	const projects = useAppStore((s) => s.projects);
	const payments = useAppStore((s) => s.payments);
	const currency = useAppStore((s) => s.settings.currency);
	const deleteCustomer = useAppStore((s) => s.deleteCustomer);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => customers.map((c) => ({
		...c,
		projectCount: projects.filter((p) => p.customerId === c.id).length,
		due: customerBalance(c.id, projects, payments)
	})), [
		customers,
		projects,
		payments
	]);
	const editing = customers.find((c) => c.id === editId) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "العملاء",
			subtitle: `${customers.length} عميل`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " جديد"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2 px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "سجل بيانات العملاء واربط كل مشروع بصاحبه."
			}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface px-4 py-12 text-center shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "لا يوجد عملاء بعد"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: () => setOpen(true),
					children: "إضافة عميل"
				})]
			}) : rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface p-4 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "min-w-0 text-start",
							onClick: () => setEditId(c.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted",
								children: c.address || "بدون عنوان"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-10 shrink-0 text-subtle",
							"aria-label": "حذف العميل",
							onClick: () => {
								if (confirm("حذف العميل ومشاريعه؟")) deleteCustomer(c.id);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mx-auto size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between text-sm",
						children: [c.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${c.phone}`,
							className: "inline-flex items-center gap-1.5 text-primary",
							dir: "ltr",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), c.phone]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "بدون هاتف"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								c.projectCount,
								" مشروع · متبقي",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-warn",
									children: formatMoney(c.due, currency)
								})
							]
						})]
					}),
					c.projectCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/projects",
						className: "mt-3 block text-xs text-muted",
						children: "عرض المشاريع"
					}) : null
				]
			}, c.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerSheet, {
			open,
			onOpenChange: setOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerSheet, {
			open: Boolean(editId),
			onOpenChange: (v) => {
				if (!v) setEditId(null);
			},
			initial: editing
		})
	] });
}
//#endregion
export { CustomersPage as component };
