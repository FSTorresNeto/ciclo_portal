export function PhoneFormater(value: string) {
	value = value.replace(/\D/g, "");
	if (value.length <= 10) {
		return value.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
	} else {
		return value.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
	}
}
