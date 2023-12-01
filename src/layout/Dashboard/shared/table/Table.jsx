import { 
	useReactTable,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/react-table";
import "./tableStyles.css";
import { useMemo, useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";

// const petData = async () => {
// 	const res = await fetch("/petData.json");
// 	const data = await res.json();
// 	return data;
// }

export default function Table({ columnDef, data }) {
	const [sorting, setSorting] = useState([])
	const finalData = useMemo(() => data, [data]);
	const finalColumnDef = useMemo(() => columnDef, [columnDef]);
	const prevNextPaginationStyle = "flex items-center justify-center h-10 px-4 leading-tight font-semibold text-title bg-white border border-gray-300 ms-0 border-e-0 hover:bg-gray-100 hover:text-gray-700"
	const pageLegendPaginationStyle = "flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
	
	const table = useReactTable({
		columns: finalColumnDef,
		data: finalData,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting: sorting,
		},
		onSortingChange: setSorting,
	})
	
	const { 
		setPageIndex,
		getPageCount,
		previousPage,
		nextPage,
		getCanNextPage,
		getCanPreviousPage,
	} = table;
	const currentPage = table.options.state.pagination.pageIndex;
	const totalPage = getPageCount();
	
	return <div className="overflow-x-auto rounded-lg">
		<table>
			<thead>
				{table.getHeaderGroups().map(header => {
					return <tr key={ header.id }>
						{header.headers.map(column => {
							return <th key={ column.id } className="text-white bg-primary" colSpan={ column.colSpan } onClick={ column.column.getToggleSortingHandler() }>
								<span className={`items-center gap-2 flex justify-center`}>
								{column.isPlaceholder
									? null
									: flexRender(
										column.column.columnDef.header,
										column.getContext(),
								)}
								{
									!column.isPlaceholder &&
									{ asc: <FaArrowUp/>, desc: <FaArrowDown/> }[
										column.column.getIsSorted() ?? null
									]
								}
								</span>
							</th>
						})}
					</tr>
				})}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => {
					return <tr key={ row.id } className="">
						{ row.getVisibleCells().map(cell => {
							return <td key={ cell.id } className="md:text-lg">
								{ 
									flexRender(
										cell.column.columnDef.cell,
										cell.getContext(),
									)
								}
							</td>
						})}
					</tr>
				})}
			</tbody>
		</table>
		{ totalPage > 1 &&
		<div className="mx-auto mt-5 w-max">
			<nav aria-label="Page navigation example">
				<ul className="inline-flex h-10 text-base -space-x-px">
					<li>
					<button
						onClick={ () => previousPage() }
						className={ `${prevNextPaginationStyle} rounded-s-lg` }
						disabled={ !getCanPreviousPage() }
					>Previous</button>
					</li>
					
					{
						[...Array(totalPage).keys()].map(num => <li key={num} >
							<button 
								className={ `${pageLegendPaginationStyle} ${ (num === currentPage) && "font-bold text-black" }` }
								onClick={ () => setPageIndex(num) }
							>
								{ num + 1 }
							</button>
						</li>)
					}
					
					<li>
					<button
						onClick={ () => nextPage() }
						disabled={ !getCanNextPage() }
						className={ `${prevNextPaginationStyle} rounded-e-lg` }
					>Next</button>
					</li>
				</ul>
			</nav>
		</div>
		}
	</div>
}
