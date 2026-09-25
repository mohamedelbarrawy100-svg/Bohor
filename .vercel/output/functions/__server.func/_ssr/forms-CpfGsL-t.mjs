import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn, i as useAppStore, o as todayIso } from "./router-BEo5tnh-.mjs";
import { a as Textarea, i as NativeSelect, n as Field, r as Input, t as Button } from "./input-BcCa64Fd.mjs";
import { a as STATUS_LABEL, r as METHOD_LABEL, t as CATEGORY_LABEL } from "./format-C5-nVPS0.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forms-CpfGsL-t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sheet({ open, onOpenChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		shouldScaleBackground: false,
		children
	});
}
function SheetContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
		className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-dvh flex-col rounded-t-xl bg-surface outline-none", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-line" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
				className: "px-5 pt-4 text-lg font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-3",
				children
			})
		]
	})] });
}
function CustomerSheet({ open, onOpenChange, initial }) {
	const addCustomer = useAppStore((s) => s.addCustomer);
	const updateCustomer = useAppStore((s) => s.updateCustomer);
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [phone, setPhone] = (0, import_react.useState)(initial?.phone ?? "");
	const [address, setAddress] = (0, import_react.useState)(initial?.address ?? "");
	const [notes, setNotes] = (0, import_react.useState)(initial?.notes ?? "");
	const reset = (c) => {
		setName(c?.name ?? "");
		setPhone(c?.phone ?? "");
		setAddress(c?.address ?? "");
		setNotes(c?.notes ?? "");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (v) => {
			if (v) reset(initial);
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			title: initial ? "تعديل عميل" : "عميل جديد",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					if (!name.trim()) return;
					const payload = {
						name: name.trim(),
						phone: phone.trim(),
						address: address.trim(),
						notes: notes.trim()
					};
					if (initial) updateCustomer(initial.id, payload);
					else addCustomer(payload);
					onOpenChange(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "اسم العميل",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الهاتف",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: phone,
							onChange: (e) => setPhone(e.target.value),
							inputMode: "tel",
							dir: "ltr",
							className: "text-start"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "العنوان",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: address,
							onChange: (e) => setAddress(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ملاحظات",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2 w-full",
						children: "حفظ"
					})
				]
			})
		})
	});
}
function ProjectSheet({ open, onOpenChange, initial, presetCustomerId }) {
	const customers = useAppStore((s) => s.customers);
	const addProject = useAppStore((s) => s.addProject);
	const updateProject = useAppStore((s) => s.updateProject);
	const [customerId, setCustomerId] = (0, import_react.useState)(initial?.customerId ?? presetCustomerId ?? customers[0]?.id ?? "");
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [location, setLocation] = (0, import_react.useState)(initial?.location ?? "");
	const [amount, setAmount] = (0, import_react.useState)(initial ? String(initial.contractAmount) : "");
	const [startDate, setStartDate] = (0, import_react.useState)(initial?.startDate ?? todayIso());
	const [status, setStatus] = (0, import_react.useState)(initial?.status ?? "in_progress");
	const [notes, setNotes] = (0, import_react.useState)(initial?.notes ?? "");
	const reset = (p) => {
		setCustomerId(p?.customerId ?? presetCustomerId ?? customers[0]?.id ?? "");
		setName(p?.name ?? "");
		setLocation(p?.location ?? "");
		setAmount(p ? String(p.contractAmount) : "");
		setStartDate(p?.startDate ?? todayIso());
		setStatus(p?.status ?? "in_progress");
		setNotes(p?.notes ?? "");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (v) => {
			if (v) reset(initial);
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			title: initial ? "تعديل مشروع" : "مشروع جديد",
			children: customers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-sm text-muted",
				children: "أضف عميلًا أولاً من صفحة العملاء قبل إنشاء مشروع."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					if (!name.trim() || !customerId) return;
					const payload = {
						customerId,
						name: name.trim(),
						location: location.trim(),
						contractAmount: Number(amount) || 0,
						startDate,
						status,
						notes: notes.trim()
					};
					if (initial) updateProject(initial.id, payload);
					else addProject(payload);
					onOpenChange(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "العميل",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: customerId,
							onChange: (e) => setCustomerId(e.target.value),
							required: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								disabled: true,
								children: "اختر العميل"
							}), customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "اسم المشروع",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الموقع",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: location,
							onChange: (e) => setLocation(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "قيمة التعاقد",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							inputMode: "numeric",
							dir: "ltr",
							className: "text-start tabular-nums",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "تاريخ البدء",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: startDate,
							onChange: (e) => setStartDate(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "الحالة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: status,
							onChange: (e) => setStatus(e.target.value),
							children: Object.keys(STATUS_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: STATUS_LABEL[k]
							}, k))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "ملاحظات",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2 w-full",
						children: "حفظ"
					})
				]
			})
		})
	});
}
function PaymentSheet({ open, onOpenChange, initial, presetProjectId }) {
	const projects = useAppStore((s) => s.projects);
	const addPayment = useAppStore((s) => s.addPayment);
	const updatePayment = useAppStore((s) => s.updatePayment);
	const [projectId, setProjectId] = (0, import_react.useState)(initial?.projectId ?? presetProjectId ?? projects[0]?.id ?? "");
	const [amount, setAmount] = (0, import_react.useState)(initial ? String(initial.amount) : "");
	const [date, setDate] = (0, import_react.useState)(initial?.date ?? todayIso());
	const [method, setMethod] = (0, import_react.useState)(initial?.method ?? "cash");
	const [notes, setNotes] = (0, import_react.useState)(initial?.notes ?? "");
	const reset = (p) => {
		setProjectId(p?.projectId ?? presetProjectId ?? projects[0]?.id ?? "");
		setAmount(p ? String(p.amount) : "");
		setDate(p?.date ?? todayIso());
		setMethod(p?.method ?? "cash");
		setNotes(p?.notes ?? "");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (v) => {
			if (v) reset(initial);
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			title: initial ? "تعديل دفعة" : "تحصيل دفعة",
			children: projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-sm text-muted",
				children: "أضف مشروعًا أولاً حتى تستطيع تسجيل دفعة."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					if (!projectId) return;
					const payload = {
						projectId,
						amount: Number(amount) || 0,
						date,
						method,
						notes: notes.trim()
					};
					if (initial) updatePayment(initial.id, payload);
					else addPayment(payload);
					onOpenChange(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "المشروع",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: projectId,
							onChange: (e) => setProjectId(e.target.value),
							required: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								disabled: true,
								children: "اختر المشروع"
							}), projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.name
							}, p.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "المبلغ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							inputMode: "numeric",
							dir: "ltr",
							className: "text-start tabular-nums",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "التاريخ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "طريقة الدفع",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: method,
							onChange: (e) => setMethod(e.target.value),
							children: Object.keys(METHOD_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: METHOD_LABEL[k]
							}, k))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "بيان",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2 w-full",
						children: "حفظ الدفعة"
					})
				]
			})
		})
	});
}
function ExpenseSheet({ open, onOpenChange, initial, presetProjectId }) {
	const projects = useAppStore((s) => s.projects);
	const addExpense = useAppStore((s) => s.addExpense);
	const updateExpense = useAppStore((s) => s.updateExpense);
	const [projectId, setProjectId] = (0, import_react.useState)(initial?.projectId ?? presetProjectId ?? "");
	const [category, setCategory] = (0, import_react.useState)(initial?.category ?? "materials");
	const [amount, setAmount] = (0, import_react.useState)(initial ? String(initial.amount) : "");
	const [date, setDate] = (0, import_react.useState)(initial?.date ?? todayIso());
	const [vendor, setVendor] = (0, import_react.useState)(initial?.vendor ?? "");
	const [notes, setNotes] = (0, import_react.useState)(initial?.notes ?? "");
	const reset = (e) => {
		setProjectId(e?.projectId ?? presetProjectId ?? "");
		setCategory(e?.category ?? "materials");
		setAmount(e ? String(e.amount) : "");
		setDate(e?.date ?? todayIso());
		setVendor(e?.vendor ?? "");
		setNotes(e?.notes ?? "");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (v) => {
			if (v) reset(initial);
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			title: initial ? "تعديل مصروف" : "مصروف جديد",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: (e) => {
					e.preventDefault();
					const payload = {
						projectId: projectId || null,
						category,
						amount: Number(amount) || 0,
						date,
						vendor: vendor.trim(),
						notes: notes.trim()
					};
					if (initial) updateExpense(initial.id, payload);
					else addExpense(payload);
					onOpenChange(false);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "التصنيف",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: category,
							onChange: (e) => setCategory(e.target.value),
							children: Object.keys(CATEGORY_LABEL).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: CATEGORY_LABEL[k]
							}, k))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "المشروع (اختياري)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: projectId,
							onChange: (e) => setProjectId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "مصروف عام — بدون مشروع"
							}), projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p.id,
								children: p.name
							}, p.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "المبلغ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							inputMode: "numeric",
							dir: "ltr",
							className: "text-start tabular-nums",
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "التاريخ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "المورد / الجهة",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: vendor,
							onChange: (e) => setVendor(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "بيان",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2 w-full",
						children: "حفظ المصروف"
					})
				]
			})
		})
	});
}
//#endregion
export { ProjectSheet as i, ExpenseSheet as n, PaymentSheet as r, CustomerSheet as t };
