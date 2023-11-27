import { 
	useReactTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/react-table";
import "./tableStyles.css";
import { useMemo } from "react";

// const petData = async () => {
// 	const res = await fetch("/petData.json");
// 	const data = await res.json();
// 	return data;
// }

export default function Table({ columnDef, data }) {
	const finalData = useMemo(() => data, [data]);
	const finalColumnDef = useMemo(() => columnDef, [columnDef]);
	
	const table = useReactTable({
		columns: finalColumnDef,
		data: finalData,
		getCoreRowModel: getCoreRowModel(),
	})
	
	return <>
		<table className="">
			<thead>
				{table.getHeaderGroups().map(header => {
					return <tr key={ header.id }>
						{header.headers.map(column => {
							return <th key={ column.id} className="text-white bg-primary" colSpan={ column.colSpan }>
								{column.isPlaceholder
									? null
									: flexRender(
										column.column.columnDef.header,
										column.getContext(),
								)}
							</th>
						})}
					</tr>
				})}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => {
					return <tr key={ row.id }>
						{ row.getVisibleCells().map(cell => {
							return <td key={ cell.id }>
								{ cell.column.columnDef.cellType === "image" && cell.value ? (
									<img src={ cell.value } alt={ `Image for ${cell.column.columnDef.header}` }/>
								) : (
										flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)
								)
								}
							</td>
						})}
					</tr>
				})}
			</tbody>
		</table>
	</>
}
