"use client";

import {
	type Column,
	type ColumnDef,
	type OnChangeFn,
	type PaginationState,
	type Table as PrimitiveTable,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ArrowDown,
	ArrowUp,
	CalendarDays,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ChevronsUpDown,
	PlusCircle,
	Search,
} from "lucide-react";
import React, { useState } from "react";
import { type DateRange } from "react-day-picker";
import { cn } from "~/modules/shared/utils/cn";
import { date } from "../../utils/date";
import { CalendarMark, Eraser, Filter2 } from "../icons";
import { Button, buttonVariants } from "./button";
import { Calendar } from "./calendar";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown-menu";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

export const DEFAULT_PAGE_SIZE = 20;

type UseDataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	manualPagination?: boolean;
	manualSorting?: boolean;
	columnVisibility?: VisibilityState;
	onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
	pagination?: PaginationState;
	onPaginationChange?: OnChangeFn<PaginationState>;
	sorting?: SortingState;
	onSortingChange?: OnChangeFn<SortingState>;
	pageCount?: number;
	rowCount?: number;
};
export function useDataTable<TData, TValue>({
	columns,
	data,
	manualPagination,
	manualSorting,
	columnVisibility,
	onColumnVisibilityChange,
	pagination = { pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE },
	onPaginationChange,
	sorting,
	onSortingChange,
	pageCount,
	rowCount,
}: UseDataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination,
		manualSorting,
		state: {
			columnVisibility,
			pagination,
			sorting,
		},
		pageCount: pageCount,
		rowCount: rowCount ?? 0,
		onColumnVisibilityChange,
		onPaginationChange,
		onSortingChange,
	});

	return table;
}

type DataTableProps<TData> = {
	table: PrimitiveTable<TData>;
	className?: string;
	onRowClick?: (row: TData) => void;
	isLoading?: boolean;
	emptyContent?: React.ReactNode;
};
export function DataTable<TData>({ table, className, onRowClick, isLoading, emptyContent }: DataTableProps<TData>) {
	return (
		<Table className={className}>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id}>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{isLoading ? (
					Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
						<TableRow key={`skeleton-${index}`}>
							{Array.from({
								length: table.getVisibleFlatColumns().length,
							}).map((_, cellIndex) => (
								<TableCell key={`skeleton-cell-${cellIndex}`}>
									<Skeleton className="h-4" />
								</TableCell>
							))}
						</TableRow>
					))
				) : table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
							onClick={() => onRowClick?.(row.original)}
							className={onRowClick ? "cursor-pointer" : undefined}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell
									key={cell.id}
									align="left"
									data-column-size={cell.column.columnDef.size}
									data-column-maxsize={cell.column.columnDef.maxSize}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={table.getVisibleFlatColumns().length} className="text-center">
							{emptyContent ?? "Nenhum resultado encontrado."}
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

type DataTablePaginationProps<TData> = {
	table: PrimitiveTable<TData>;
	className?: string;
};

export function DataTablePagination<TData>({ table, className }: DataTablePaginationProps<TData>) {
	const selectedRows = table.getFilteredSelectedRowModel().rows;

	return (
		<div
			className={cn(
				"border-border dark:bg-neutral-80 typography-label-md flex h-16 w-full items-center justify-between rounded-b-2xl border-t px-4",
				className,
			)}
		>
			<div>
				<span>Total de registros: {table.getRowCount()}</span>
			</div>
			<div className={cn("flex-1", selectedRows.length === 0 && "invisible")}>
				{selectedRows.length} de&nbsp;
				{table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				{/* <div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Linhas por página: </p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div> */}
				<div className="flex items-center justify-center">
					Página {table.getState().pagination.pageIndex + 1}&nbsp;de&nbsp;
					{Math.max(table.getPageCount(), 1)}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="neutral"
						hierarchy="secondary"
						size="icon"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Primeira página</span>
						<ChevronsLeft />
					</Button>
					<Button
						variant="neutral"
						hierarchy="secondary"
						size="icon"
						className="h-8 w-8 p-0"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Página anterior</span>
						<ChevronLeft />
					</Button>
					<Button
						variant="neutral"
						hierarchy="secondary"
						size="icon"
						className="h-8 w-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Próxima página</span>
						<ChevronRight />
					</Button>
					<Button
						variant="neutral"
						hierarchy="secondary"
						size="icon"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Última página</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	);
}

type DataTableColumnHeaderProps<TData, TValue> = React.HTMLAttributes<HTMLDivElement> & {
	column: Column<TData, TValue>;
	title: string;
};

export function DataTableColumnHeader<TData, TValue>({ column, title, className }: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return (
			<div
				className={cn(
					buttonVariants({ size: "sm", variant: "neutral", hierarchy: "secondary" }),
					"data-[state=open]:bg-accent h-full w-full justify-start rounded-none px-0 text-zinc-500 hover:bg-transparent",
					className,
				)}
			>
				{title}
			</div>
		);
	}

	return (
		<Button
			className="data-[state=open]:bg-accent h-full w-full justify-start rounded-none px-0 text-zinc-500 hover:bg-transparent"
			onClick={() => column.toggleSorting()}
			size="sm"
			variant="neutral"
			hierarchy="secondary"
		>
			<span>{title}</span>
			{column.getIsSorted() === "desc" ? <ArrowDown /> : column.getIsSorted() === "asc" ? <ArrowUp /> : <ChevronsUpDown />}
		</Button>
	);
}

export type DataTableColumnVisibilityItem = {
	id: string;
	label: React.ReactNode;
	visible: boolean;
};

type DataTableColumnVisibilityProps = {
	children: React.ReactNode;
	columns: DataTableColumnVisibilityItem[];
	onChange: (columnId: string, visible: boolean) => void;
	onShowAllClick: (checked: boolean) => void;
};

export function DataTableColumnVisibility({ children, columns, onChange, onShowAllClick }: DataTableColumnVisibilityProps) {
	const allVisible = columns.every((column) => column.visible);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuCheckboxItem checked={allVisible} onCheckedChange={onShowAllClick}>
					Mostrar Todas
				</DropdownMenuCheckboxItem>
				<Separator className="py-2" />
				{columns.map((column) => (
					<DropdownMenuCheckboxItem
						key={column.id}
						checked={column.visible}
						onCheckedChange={(value) => onChange(column.id, !!value)}
					>
						{column.label}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

type DataTableValueRangeFilterProps = {
	children?: React.ReactNode;
	min: number | undefined;
	max: number | undefined;
	handleApply: (min: number | undefined, max: number | undefined) => void;
	className?: string;
};

export function DataTableValueRangeFilter({ children, min, max, handleApply, className }: DataTableValueRangeFilterProps) {
	const triggerChild = children ?? (
		<Button variant="neutral" hierarchy="secondary" size="sm" className={className}>
			<PlusCircle />
			Valor
		</Button>
	);

	const [open, setOpen] = React.useState(false);
	const [minValue, setMinValue] = React.useState<string>(min?.toString() ?? "");
	const [maxValue, setMaxValue] = React.useState<string>(max?.toString() ?? "");

	const unmaskValue = React.useCallback((value: string) => {
		return Number(value.replace(/[R$.,\s]/g, "")) / 100;
	}, []);

	const maskValue = React.useCallback((value: string) => {
		const numbers = value.replace(/\D/g, "");
		if (!numbers) return "";
		return (Number(numbers) / 100).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	}, []);

	const handleClear = () => {
		setMinValue("");
		setMaxValue("");
		handleApply(undefined, undefined);
	};

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter" && open) {
				setOpen(false);
				handleApply(minValue.length ? unmaskValue(minValue) : undefined, maxValue.length ? unmaskValue(maxValue) : undefined);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [open, minValue, maxValue, unmaskValue, handleApply]);

	return (
		<Popover
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (!isOpen) {
					handleApply(minValue.length ? unmaskValue(minValue) : undefined, maxValue.length ? unmaskValue(maxValue) : undefined);
				}
			}}
		>
			<PopoverTrigger asChild>{triggerChild}</PopoverTrigger>
			<PopoverContent align="end" className="w-64 p-0">
				<div className="space-y-2 p-4">
					<p className="text-sm font-medium">Intervalo (R$)</p>
					<div className="flex w-full gap-2">
						<Input
							className="flex-1"
							placeholder="Min."
							value={minValue}
							onChange={(e) => setMinValue(maskValue(e.target.value))}
						/>
						<Separator className="w-6" />
						<Input
							className="flex-1"
							placeholder="Max."
							value={maxValue}
							onChange={(e) => setMaxValue(maskValue(e.target.value))}
						/>
					</div>
				</div>
				<div className="border-border border-t">
					<Button
						variant="neutral"
						hierarchy="tertiary"
						className="w-full justify-center text-center"
						onClick={handleClear}
						type="button"
					>
						Limpar
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

type DataTableDateRangeFilterProps = {
	children?: React.ReactNode;
	min: Date | undefined;
	max: Date | undefined;
	handleApply: (min: Date | undefined, max: Date | undefined) => void;
};
export function DataTableDateRangeFilter({ children, min, max, handleApply }: DataTableDateRangeFilterProps) {
	const triggerChild = children ?? (
		<Button variant="neutral" hierarchy="secondary" size="sm">
			<CalendarDays />
			{!min && !max ? "Escolha uma data" : `${date(min).format("DD/MM/YYYY")} - ${date(max).format("DD/MM/YYYY")}`}
		</Button>
	);

	const [open, setOpen] = useState(false);
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: min,
		to: max,
	});

	const handleDateSelect = (range: DateRange | undefined) => {
		setDateRange(range);
	};

	const handleClose = React.useCallback(() => {
		setOpen(false);
		handleApply(dateRange?.from, dateRange?.to);
	}, [dateRange, handleApply]);

	const handleClear = () => {
		setDateRange(undefined);
		setDateRange({
			from: undefined,
			to: undefined,
		});
	};

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter" && open) {
				handleClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [open, dateRange, handleClose]);

	return (
		<Popover
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (!isOpen) {
					handleClose();
				}
			}}
		>
			<PopoverTrigger asChild>{triggerChild}</PopoverTrigger>
			<PopoverContent align="end" className="w-fit p-0">
				<Calendar mode="range" numberOfMonths={1} selected={dateRange} onSelect={handleDateSelect} />
				<div className="border-border border-t">
					<Button variant="neutral" hierarchy="tertiary" className="w-full justify-center text-center" onClick={handleClear}>
						Limpar
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

type DataTableDateFilterProps = {
	children?: React.ReactNode;
	date: Date | undefined;
	handleApply: (date: Date | undefined) => void;
};

export function DataTableDateFilter({ children, date, handleApply }: DataTableDateFilterProps) {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

	React.useEffect(() => {
		setSelectedDate(date);
	}, [date]);

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent align="end" className="flex w-64 flex-col gap-2.5 px-2.5 py-4">
				<Input placeholder="DD/MM/AAAA" endIcon={<CalendarMark />} />
				<Calendar className="p-0" mode="single" selected={selectedDate} onSelect={setSelectedDate} />
				<Separator />
				<div className="border-border grid grid-cols-2 gap-2">
					<Button onMouseDown={() => handleApply(selectedDate)} size="sm" variant="neutral">
						<Filter2 />
						Filtar
					</Button>
					<Button onMouseDown={() => handleApply(undefined)} size="sm" variant="neutral" hierarchy="tertiary">
						<Eraser />
						Limpar
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

type DataTableSearchProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	debounceMs?: number;
	className?: string;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
};

export function DataTableSearch({
	value,
	onChange,
	placeholder = "Buscar...",
	debounceMs = 300,
	className,
	startIcon,
	endIcon,
}: DataTableSearchProps) {
	const [searchValue, setSearchValue] = useState(value);

	React.useEffect(() => {
		setSearchValue(value);
	}, [value]);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			onChange(searchValue);
		}, debounceMs);

		return () => clearTimeout(timer);
	}, [searchValue, onChange, debounceMs]);

	return (
		<Input
			type="search"
			placeholder={placeholder}
			value={searchValue}
			onChange={(e) => setSearchValue(e.target.value)}
			className={className}
			startIcon={startIcon === undefined ? <Search /> : startIcon}
			endIcon={endIcon}
		/>
	);
}

type DataTableContainerProps = React.HTMLAttributes<HTMLDivElement>;
export function DataTableContainer({ className, ...props }: DataTableContainerProps) {
	return (
		<div className={cn("bg-neutral-0 dark:bg-neutral-90 flex min-h-max flex-col overflow-x-auto rounded-2xl", className)} {...props}>
			<div className="min-w-max">{props.children}</div>
		</div>
	);
}

type DataTableToolbarProps = React.HTMLAttributes<HTMLDivElement>;
export function DataTableToolbar({ children, className, ...props }: DataTableToolbarProps) {
	return (
		<div className={cn("flex items-center justify-between", className)} {...props}>
			{children}
		</div>
	);
}

type DataTableFiltersProps = React.HTMLAttributes<HTMLDivElement>;
export function DataTableFilters({ children, className, ...props }: DataTableFiltersProps) {
	return (
		<div className={cn("flex items-center gap-2.5", className)} {...props}>
			{children}
		</div>
	);
}
