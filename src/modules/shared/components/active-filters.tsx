"use client";

import { Badge } from "~/modules/shared/components/ui/badge";
import { Skeleton } from "~/modules/shared/components/ui/skeleton";
import { date } from "~/modules/shared/utils/date";

type FilterData = {
	data: { label: string; value: number }[];
	selected: number[];
};

export type Filters = {
	wallets?: FilterData;
	branches?: FilterData;
	products?: FilterData;
	status?: FilterData;
	fromDate?: Date;
	toDate?: Date;
};

type ActiveFiltersProps = {
	filters: Filters;
	isLoading?: boolean;
	className?: string;
};

export function ActiveFilters({ filters, isLoading, className = "" }: ActiveFiltersProps) {
	if (isLoading) {
		return (
			<section className={`flex justify-end gap-2 ${className}`}>
				<header className="mr-6">
					<h2 className="typography-label-md">Filtros ativos:</h2>
				</header>
				<Skeleton className="h-7 w-24" />
				<Skeleton className="h-7 w-24" />
			</section>
		);
	}

	const hasWalletsFilter = !!filters.wallets?.selected && filters.wallets.selected.length > 0;
	const hasBranchesFilter = !!filters.branches?.selected && filters.branches.selected.length > 0;
	const hasProductsFilter = !!filters.products?.selected && filters.products.selected.length > 0;
	const hasStatusFilter = !!filters.status?.selected && filters.status.selected.length > 0;
	const hasFromDateFilter = Boolean(filters.fromDate);
	const hasToDateFilter = Boolean(filters.toDate);

	const hasActiveFilters =
		hasWalletsFilter || hasBranchesFilter || hasProductsFilter || hasStatusFilter || hasFromDateFilter || hasToDateFilter;

	if (!hasActiveFilters) {
		return null;
	}

	return (
		<section className={`flex shrink-0 justify-end gap-2 overflow-x-auto ${className}`}>
			<header>
				<h2 className="typography-label-md">Filtros ativos:</h2>
			</header>
			{filters.wallets?.selected && filters.wallets.selected.length > 0 && <WalletsFilter wallets={filters.wallets} />}
			{filters.branches?.selected && filters.branches.selected.length > 0 && <BranchesFilter branches={filters.branches} />}
			{filters.products?.selected && filters.products.selected.length > 0 && <ProductsFilter products={filters.products} />}
			{filters.status?.selected && filters.status.selected.length > 0 && <StatusFilter status={filters.status} />}
			{filters.fromDate && <FromDateFilter fromDate={filters.fromDate} />}
			{filters.toDate && <ToDateFilter toDate={filters.toDate} />}
		</section>
	);
}

type WalletsFilterProps = {
	wallets: FilterData;
};
function WalletsFilter({ wallets }: WalletsFilterProps) {
	const selectedWallets = wallets.data.filter((wallet) => wallets.selected.includes(wallet.value));
	return (
		<Badge variant="info">
			{selectedWallets.length > 1 ? `Carteiras` : `Carteira`}: {selectedWallets.map((wallet) => wallet.label).join(", ")}
		</Badge>
	);
}

type BranchesFilterProps = {
	branches: FilterData;
};
function BranchesFilter({ branches }: BranchesFilterProps) {
	const selectedBranches = branches.data.filter((branch) => branches.selected.includes(branch.value));
	return (
		<Badge variant="info">
			{selectedBranches.length > 1 ? `Núcleos` : `Núcleo`}: {selectedBranches.map((branch) => branch.label).join(", ")}
		</Badge>
	);
}

type ProductsFilterProps = {
	products: FilterData;
};
function ProductsFilter({ products }: ProductsFilterProps) {
	const selectedProducts = products.data.filter((product) => products.selected.includes(product.value));
	return <Badge variant="info">Produtos: {selectedProducts.map((product) => product.label).join(", ")}</Badge>;
}

type StatusFilterProps = {
	status: FilterData;
};
function StatusFilter({ status }: StatusFilterProps) {
	const selectedStatus = status.data.filter((statusItem) => status.selected.includes(statusItem.value));
	return <Badge variant="info">Status: {selectedStatus.map((statusItem) => statusItem.label).join(", ")}</Badge>;
}

type FromDateFilterProps = {
	fromDate: Date;
};
function FromDateFilter({ fromDate }: FromDateFilterProps) {
	return <Badge variant="info">Desde: {date(fromDate).format("DD/MM/YYYY")}</Badge>;
}

type ToDateFilterProps = {
	toDate: Date;
};
function ToDateFilter({ toDate }: ToDateFilterProps) {
	return <Badge variant="info">Até: {date(toDate).format("DD/MM/YYYY")}</Badge>;
}
