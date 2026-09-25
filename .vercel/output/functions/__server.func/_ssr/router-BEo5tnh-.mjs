import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as FolderKanban, p as FileSpreadsheet, r as TriangleAlert, t as Wallet, u as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BEo5tnh-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}
function todayIso() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
var DEMO_STATE = {
	settings: {
		companyName: "مؤسسة النور للتشطيبات",
		ownerName: "محمود عبد الرحمن",
		phone: "01023456789",
		openingCapital: 18e4,
		currency: "EGP"
	},
	customers: [
		{
			id: "c_ahmed",
			name: "أحمد محمود السيد",
			phone: "01098765432",
			address: "التجمع الخامس، القاهرة الجديدة",
			notes: "عميل شقة كاملة التشطيب",
			createdAt: "2026-01-12"
		},
		{
			id: "c_fatima",
			name: "فاطمة حسن علي",
			phone: "01234567890",
			address: "الساحل الشمالي، سيدي عبد الرحمن",
			notes: "فيلا صيفي — تشطيب فاخر",
			createdAt: "2026-03-04"
		},
		{
			id: "c_amal",
			name: "شركة الأمل العقارية",
			phone: "0225678901",
			address: "مدينة نصر، شارع عباس العقاد",
			notes: "محل تجاري دور أرضي",
			createdAt: "2026-05-20"
		}
	],
	projects: [
		{
			id: "p_tagamoa",
			customerId: "c_ahmed",
			name: "شقة 120م — التجمع الخامس",
			location: "كمبوند ليان، التجمع الخامس",
			contractAmount: 42e4,
			startDate: "2026-02-01",
			status: "in_progress",
			notes: "تشطيب كامل: سباكة، كهرباء، أرضيات، دهانات، مطبخ.",
			createdAt: "2026-01-18"
		},
		{
			id: "p_sahel",
			customerId: "c_fatima",
			name: "فيلا الساحل الشمالي",
			location: "سيدي عبد الرحمن، الكيلو 134",
			contractAmount: 89e4,
			startDate: "2026-03-15",
			status: "in_progress",
			notes: "تشطيب الواجهات والحديقة والطابق الأرضي.",
			createdAt: "2026-03-08"
		},
		{
			id: "p_nasr",
			customerId: "c_amal",
			name: "محل تجاري — مدينة نصر",
			location: "عباس العقاد، مدينة نصر",
			contractAmount: 175e3,
			startDate: "2026-06-01",
			status: "completed",
			notes: "تسليم تم في أغسطس. ضمان سنة على الكهرباء.",
			createdAt: "2026-05-22"
		}
	],
	payments: [
		{
			id: "pay_1",
			projectId: "p_tagamoa",
			amount: 12e4,
			date: "2026-02-03",
			method: "bank",
			notes: "دفعة تعاقد"
		},
		{
			id: "pay_2",
			projectId: "p_tagamoa",
			amount: 9e4,
			date: "2026-05-11",
			method: "cash",
			notes: "بعد السباكة والكهرباء"
		},
		{
			id: "pay_3",
			projectId: "p_sahel",
			amount: 25e4,
			date: "2026-03-18",
			method: "bank",
			notes: "دفعة أولى"
		},
		{
			id: "pay_4",
			projectId: "p_sahel",
			amount: 18e4,
			date: "2026-07-02",
			method: "cheque",
			notes: "شيك شهر يوليو"
		},
		{
			id: "pay_5",
			projectId: "p_nasr",
			amount: 8e4,
			date: "2026-06-04",
			method: "bank",
			notes: "تعاقد"
		},
		{
			id: "pay_6",
			projectId: "p_nasr",
			amount: 95e3,
			date: "2026-08-20",
			method: "wallet",
			notes: "دفعة التسليم"
		}
	],
	expenses: [
		{
			id: "ex_1",
			projectId: "p_tagamoa",
			category: "materials",
			amount: 64e3,
			date: "2026-02-10",
			vendor: "معرض السيراميك الحديث",
			notes: "أرضيات حمامات ومطبخ"
		},
		{
			id: "ex_2",
			projectId: "p_tagamoa",
			category: "labor",
			amount: 38e3,
			date: "2026-04-02",
			vendor: "مقاول العمالة اليومية",
			notes: "محارة ودهان"
		},
		{
			id: "ex_3",
			projectId: "p_sahel",
			category: "materials",
			amount: 145e3,
			date: "2026-04-12",
			vendor: "شركة الرخام المصري",
			notes: "رخام الواجهة والسلالم"
		},
		{
			id: "ex_4",
			projectId: "p_sahel",
			category: "transport",
			amount: 18e3,
			date: "2026-04-14",
			vendor: "نقل مواد الساحل",
			notes: "نقل رخام للساحل"
		},
		{
			id: "ex_5",
			projectId: "p_nasr",
			category: "materials",
			amount: 42e3,
			date: "2026-06-08",
			vendor: "تشطيبات النور — مخزن",
			notes: "جبس بورد وإضاءة"
		},
		{
			id: "ex_6",
			projectId: "p_nasr",
			category: "labor",
			amount: 27e3,
			date: "2026-07-15",
			vendor: "ورشة التشطيب",
			notes: "عمالة المحل"
		},
		{
			id: "ex_7",
			projectId: null,
			category: "rent",
			amount: 24e3,
			date: "2026-01-05",
			vendor: "مالك المخزن",
			notes: "إيجار مخزن الربع الأول"
		},
		{
			id: "ex_8",
			projectId: null,
			category: "tools",
			amount: 9600,
			date: "2026-03-01",
			vendor: "عدة البناء",
			notes: "شنيور وعدة كهرباء"
		}
	]
};
var EMPTY_STATE = {
	settings: {
		companyName: "شركتي للمقاولات",
		ownerName: "",
		phone: "",
		openingCapital: 0,
		currency: "EGP"
	},
	customers: [],
	projects: [],
	payments: [],
	expenses: []
};
var useAppStore = create()(persist((set) => ({
	...DEMO_STATE,
	updateSettings: (patch) => set((s) => ({ settings: {
		...s.settings,
		...patch
	} })),
	addCustomer: (input) => {
		const id = uid("c");
		set((s) => ({ customers: [{
			...input,
			id,
			createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		}, ...s.customers] }));
		return id;
	},
	updateCustomer: (id, patch) => set((s) => ({ customers: s.customers.map((c) => c.id === id ? {
		...c,
		...patch
	} : c) })),
	deleteCustomer: (id) => set((s) => {
		const projectIds = new Set(s.projects.filter((p) => p.customerId === id).map((p) => p.id));
		return {
			customers: s.customers.filter((c) => c.id !== id),
			projects: s.projects.filter((p) => p.customerId !== id),
			payments: s.payments.filter((p) => !projectIds.has(p.projectId)),
			expenses: s.expenses.filter((e) => !e.projectId || !projectIds.has(e.projectId))
		};
	}),
	addProject: (input) => {
		const id = uid("p");
		set((s) => ({ projects: [{
			...input,
			id,
			createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		}, ...s.projects] }));
		return id;
	},
	updateProject: (id, patch) => set((s) => ({ projects: s.projects.map((p) => p.id === id ? {
		...p,
		...patch
	} : p) })),
	deleteProject: (id) => set((s) => ({
		projects: s.projects.filter((p) => p.id !== id),
		payments: s.payments.filter((p) => p.projectId !== id),
		expenses: s.expenses.map((e) => e.projectId === id ? {
			...e,
			projectId: null
		} : e)
	})),
	addPayment: (input) => {
		const id = uid("pay");
		set((s) => ({ payments: [{
			...input,
			id
		}, ...s.payments] }));
		return id;
	},
	updatePayment: (id, patch) => set((s) => ({ payments: s.payments.map((p) => p.id === id ? {
		...p,
		...patch
	} : p) })),
	deletePayment: (id) => set((s) => ({ payments: s.payments.filter((p) => p.id !== id) })),
	addExpense: (input) => {
		const id = uid("ex");
		set((s) => ({ expenses: [{
			...input,
			id
		}, ...s.expenses] }));
		return id;
	},
	updateExpense: (id, patch) => set((s) => ({ expenses: s.expenses.map((e) => e.id === id ? {
		...e,
		...patch
	} : e) })),
	deleteExpense: (id) => set((s) => ({ expenses: s.expenses.filter((e) => e.id !== id) })),
	loadDemo: () => set({ ...DEMO_STATE }),
	resetAll: () => set({ ...EMPTY_STATE })
}), {
	name: "daftar-almuqawil-v1",
	skipHydration: true,
	partialize: (s) => ({
		settings: s.settings,
		customers: s.customers,
		projects: s.projects,
		payments: s.payments,
		expenses: s.expenses
	})
}));
var NAV = [
	{
		to: "/",
		label: "الرئيسية",
		icon: LayoutDashboard
	},
	{
		to: "/projects",
		label: "المشاريع",
		icon: FolderKanban
	},
	{
		to: "/money",
		label: "الخزينة",
		icon: Wallet
	},
	{
		to: "/reports",
		label: "التقارير",
		icon: FileSpreadsheet
	}
];
function navActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		useAppStore.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 pb-[calc(4.75rem+env(safe-area-inset-bottom))]",
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-sm",
			style: { paddingBottom: "env(safe-area-inset-bottom)" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-lg grid-cols-4",
				children: NAV.map((item) => {
					const active = navActive(pathname, item.to);
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium transition-[color,opacity] duration-150", active ? "text-primary" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: active ? 2.25 : 1.75
						}), item.label]
					}, item.to);
				})
			})
		})]
	});
}
function PageHeader({ title, subtitle, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-line/70 bg-bg/90 px-4 py-3 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-ink",
					children: title
				}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 truncate text-sm text-muted",
					children: subtitle
				}) : null]
			}), action]
		})
	});
}
var styles_default = "/assets/styles-CuvJ8_51.css";
var APP_NAME = "دفتر المقاول";
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#1f4a40"
			},
			{
				name: "description",
				content: "حسابات بسيطة لشركات المقاولات والتشطيبات الصغيرة"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$7 = () => import("./routes-BwWEF4aW.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./customers-B0scDkPk.mjs");
var Route$6 = createFileRoute("/customers")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./money-CRHiVbdC.mjs");
var Route$5 = createFileRoute("/money")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./projects-CLVm_UNT.mjs");
var Route$4 = createFileRoute("/projects")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./reports-iUqLiW4h.mjs");
var Route$3 = createFileRoute("/reports")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./settings-DaEuJGFI.mjs");
var Route$2 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./projects.index-CgouTkzP.mjs");
var Route$1 = createFileRoute("/projects/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./projects._projectId-g7cayxmb.mjs");
var Route = createFileRoute("/projects/$projectId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var CustomersRoute = Route$6.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => Route$8
});
var MoneyRoute = Route$5.update({
	id: "/money",
	path: "/money",
	getParentRoute: () => Route$8
});
var ProjectsRoute = Route$4.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$8
});
var ReportsRoute = Route$3.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => Route$8
});
var SettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$8
});
var ProjectsIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => ProjectsRoute
});
var ProjectsRouteChildren = {
	ProjectsProjectIdRoute: Route.update({
		id: "/$projectId",
		path: "/$projectId",
		getParentRoute: () => ProjectsRoute
	}),
	ProjectsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	CustomersRoute,
	MoneyRoute,
	ProjectsRoute: ProjectsRoute._addFileChildren(ProjectsRouteChildren),
	ReportsRoute,
	SettingsRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { cn as a, useAppStore as i, Route as n, todayIso as o, PageHeader as r, router_exports as t };
