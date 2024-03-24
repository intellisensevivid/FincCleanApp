import React from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { RiEdit2Line } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

const UserTable = ({ columns, data, onEdit, onDelete }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()} className="w-full">
        <thead className="text-left text-gray-400 p-1.5">
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, i) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={i}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-gray-200" : "bg-white"
                }  font-[500]`}
              >
                {row.cells.map((cell, i) => (
                  <td {...cell.getCellProps()} key={i} className="p-1.5">
                    {cell.render("Cell")}
                  </td>
                ))}
                <td className="gap-3 flex">
                  <button onClick={() => onEdit(row.original)}>
                    <RiEdit2Line className="text-blue-500 text-xl" />
                  </button>
                  {row.original.role.name !== "admin" && (
                    <button onClick={() => onDelete(row.original)}>
                      <FaTrash className="text-red-400 text-lg" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div>
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {page.length}
          </strong>{" "}
        </span>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div> */}
    </div>
  );
};

export default UserTable;
