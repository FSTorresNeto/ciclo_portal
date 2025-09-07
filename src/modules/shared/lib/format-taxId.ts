export const formatTaxId = (value: string) => {
	const taxId = value?.replace(/\D+/g, "");

	return taxId?.length <= 11 ? formatCpf(taxId) : formatCnpj(taxId);
};

export const formatCpf = (value: string) => {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");
};

export const formatCnpj = (value: string) =>
	value
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1/$2")
		.replace(/(\d{4})(\d{1,2})/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");

export const hideTaxId = (taxId: string) => {
	const newTaxId = taxId?.replace(/[^\w\s]/gi, "");

	if (newTaxId?.length === 11) return `***.${newTaxId?.substring(3, 6)}.${newTaxId?.substring(6, 9)}-**`;

	return `**.${newTaxId?.substring(2, 5)}.***/****-${newTaxId?.substring(12, 14)}`;
};

export const hideRFC = (rfc: string) => {
	return rfc && `#######${rfc?.substring(7, 13)}`;
};
