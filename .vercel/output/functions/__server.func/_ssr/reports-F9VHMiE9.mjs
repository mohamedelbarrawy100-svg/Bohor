import { l as inPeriod } from "./format-C5-nVPS0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-F9VHMiE9.js
function projectTotals(project, payments, expenses) {
	const collected = payments.filter((p) => p.projectId === project.id).reduce((s, p) => s + p.amount, 0);
	const spent = expenses.filter((e) => e.projectId === project.id).reduce((s, e) => s + e.amount, 0);
	return {
		collected,
		spent,
		remaining: Math.max(project.contractAmount - collected, 0),
		expectedProfit: project.contractAmount - spent,
		cashProfit: collected - spent,
		progress: project.contractAmount <= 0 ? 0 : Math.min(100, Math.round(collected / project.contractAmount * 100))
	};
}
function incomeStatement(state, period) {
	const revenue = state.projects.filter((p) => inPeriod(p.startDate, period)).reduce((s, p) => s + p.contractAmount, 0);
	const collected = state.payments.filter((p) => inPeriod(p.date, period)).reduce((s, p) => s + p.amount, 0);
	const periodExpenses = state.expenses.filter((e) => inPeriod(e.date, period));
	const expensesTotal = periodExpenses.reduce((s, e) => s + e.amount, 0);
	const byCategory = [
		"materials",
		"labor",
		"transport",
		"tools",
		"rent",
		"other"
	].map((category) => ({
		category,
		amount: periodExpenses.filter((e) => e.category === category).reduce((s, e) => s + e.amount, 0)
	})).filter((row) => row.amount > 0);
	const overhead = periodExpenses.filter((e) => !e.projectId).reduce((s, e) => s + e.amount, 0);
	return {
		revenue,
		collected,
		expensesTotal,
		byCategory,
		netProfit: revenue - expensesTotal,
		overhead
	};
}
function balanceSheet(state) {
	const collected = state.payments.reduce((s, p) => s + p.amount, 0);
	const spent = state.expenses.reduce((s, e) => s + e.amount, 0);
	const cash = state.settings.openingCapital + collected - spent;
	const contractTotal = state.projects.reduce((s, p) => s + p.contractAmount, 0);
	const receivables = Math.max(contractTotal - collected, 0);
	const totalAssets = cash + receivables;
	const capital = state.settings.openingCapital;
	const retained = contractTotal - spent;
	const totalEquity = capital + retained;
	return {
		cash,
		receivables,
		totalAssets,
		capital,
		retained,
		totalEquity,
		balanced: Math.abs(totalAssets - totalEquity) < 1
	};
}
function customerBalance(customerId, projects, payments) {
	return projects.filter((p) => p.customerId === customerId).reduce((sum, p) => {
		const collected = payments.filter((pay) => pay.projectId === p.id).reduce((s, pay) => s + pay.amount, 0);
		return sum + Math.max(p.contractAmount - collected, 0);
	}, 0);
}
function monthlySeries(payments, expenses, months = 6) {
	const now = /* @__PURE__ */ new Date();
	const keys = [];
	for (let i = months - 1; i >= 0; i--) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		const m = String(d.getMonth() + 1).padStart(2, "0");
		keys.push(`${d.getFullYear()}-${m}`);
	}
	return keys.map((key) => ({
		key,
		collected: payments.filter((p) => p.date.startsWith(key)).reduce((s, p) => s + p.amount, 0),
		spent: expenses.filter((e) => e.date.startsWith(key)).reduce((s, e) => s + e.amount, 0)
	}));
}
//#endregion
export { projectTotals as a, monthlySeries as i, customerBalance as n, incomeStatement as r, balanceSheet as t };
