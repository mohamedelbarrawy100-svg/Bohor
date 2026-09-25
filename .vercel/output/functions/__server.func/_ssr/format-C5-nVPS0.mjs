//#region node_modules/.nitro/vite/services/ssr/assets/format-C5-nVPS0.js
var CURRENCY_LABEL = {
	EGP: "ج.م",
	SAR: "ر.س",
	AED: "د.إ"
};
var moneyFmt = new Intl.NumberFormat("ar-EG", {
	numberingSystem: "latn",
	maximumFractionDigits: 0,
	minimumFractionDigits: 0
});
function formatMoney(amount, currency = "EGP") {
	return `${amount < 0 ? "−" : ""}${moneyFmt.format(Math.abs(Math.round(amount)))} ${CURRENCY_LABEL[currency]}`;
}
function formatNumber(amount) {
	return `${amount < 0 ? "−" : ""}${moneyFmt.format(Math.abs(Math.round(amount)))}`;
}
function formatDate(iso) {
	if (!iso) return "—";
	const [y, m, d] = iso.split("-");
	if (!y || !m || !d) return iso;
	return `${d}/${m}/${y}`;
}
var STATUS_LABEL = {
	planning: "تخطيط",
	in_progress: "جاري التنفيذ",
	completed: "مكتمل",
	on_hold: "متوقف"
};
var METHOD_LABEL = {
	cash: "نقدي",
	bank: "تحويل بنكي",
	cheque: "شيك",
	wallet: "محفظة"
};
var CATEGORY_LABEL = {
	materials: "خامات ومواد",
	labor: "عمالة",
	transport: "نقل",
	tools: "عدد وأدوات",
	rent: "إيجار",
	other: "أخرى"
};
var PERIOD_LABEL = {
	month: "هذا الشهر",
	year: "هذه السنة",
	all: "كل الفترة"
};
function inPeriod(isoDate, period, now = /* @__PURE__ */ new Date()) {
	if (period === "all") return true;
	const parts = isoDate.split("-").map(Number);
	const y = parts[0];
	const m = parts[1];
	if (!y || !m) return false;
	if (period === "year") return y === now.getFullYear();
	return y === now.getFullYear() && m === now.getMonth() + 1;
}
function monthLabel(key) {
	const [y, m] = key.split("-");
	return `${[
		"يناير",
		"فبراير",
		"مارس",
		"أبريل",
		"مايو",
		"يونيو",
		"يوليو",
		"أغسطس",
		"سبتمبر",
		"أكتوبر",
		"نوفمبر",
		"ديسمبر"
	][Number(m) - 1] ?? m} ${y}`;
}
//#endregion
export { STATUS_LABEL as a, formatNumber as c, PERIOD_LABEL as i, inPeriod as l, CURRENCY_LABEL as n, formatDate as o, METHOD_LABEL as r, formatMoney as s, CATEGORY_LABEL as t, monthLabel as u };
