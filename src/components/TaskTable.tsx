import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {useTaskStore} from '../store';
import {BaseTask} from '../types';

const columnHelper = createColumnHelper<BaseTask>();

const columns = [
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: () => 'Type',
    cell: info => info.getValue(),
  }),
];

/**
 * TaskTable component that displays parent tasks and subtasks using TanStack Table.
 */
const TaskTable = () => {
  const parentTasks = useTaskStore(state => state.parentTasks);
  const subtasks = useTaskStore(state => state.subtasks);
  
  // Combine parent tasks and subtasks for display
  const data = React.useMemo(() => [...parentTasks, ...subtasks], [parentTasks, subtasks]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export {TaskTable};
