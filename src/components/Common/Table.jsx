import React, { useState, useCallback } from "react";
import { useTable } from "react-table";

function Table({ children, columns, data }) {
    const [hovering, setHovering] = useState(false);

    const handleMouseOver = useCallback(() => {
        !hovering &&
        setHovering(true);
    }, [hovering]);

    const handleMouseOut = useCallback(() => {
        !!hovering &&
        setHovering(false);
    }, [hovering]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

  return (
    <div className={`${hovering? "scrollhost":"disViable"} max-h-[28rem]`}
         onMouseLeave={handleMouseOut}
         onMouseEnter={handleMouseOver}
    >
        <table {...getTableProps()}
            className="w-full p-4">
            <thead>
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}
                    className="border-b-2 border-yellow-300"
                >
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}
                        lassName="sticky top-0 text-left p-3 border-r-8 border-slate-50 bg-slate-50 z-10"
                        >
                            {column.render("Header")}
                        </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}
                        className="mx-1 py-2 border-b-2 border-slate-100"
                    >
                        {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}
                                className="w-5 p-3 mr-2 tracking-widest"
                            >
                                {cell.render("Cell")}
                            </td>
                        ))}
                    </tr>
                );
                })}
            </tbody>
        </table>
    </div>
  );
}

export default Table;