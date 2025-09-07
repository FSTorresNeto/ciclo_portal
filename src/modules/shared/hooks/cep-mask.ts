export function CEPMask(value: string): string {
	return value
		.replace(/\D/g, "") // só números
		.replace(/(\d{5})(\d)/, "$1-$2") // aplica hífen
		.slice(0, 9); // limita tamanho
}
