export function dateFormaterWithTime(date: Date) {
	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
		timeStyle: "short",
	}).format(date);
}

export function dateFormater(date: Date) {
	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
	}).format(date);
}
