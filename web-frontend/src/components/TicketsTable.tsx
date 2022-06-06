import { useMemo } from 'react'
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'
import type { TableOptions } from 'react-table'
import BTable from 'react-bootstrap/Table'
import { SortAlphaDown, SortAlphaUp } from 'react-bootstrap-icons'
import DefaultColumnFilter from '../react-table/Filters/DefaultColumnFilter'
import { Event } from '../Types/event'
import Button from 'react-bootstrap/Button'
import { TicketType } from '../Types/ticket'

export default function EventsTable({ columns, data }: TableOptions<TicketType>): JSX.Element {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    [],
  )

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    page, 
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex,pageSize }
    
  } = useTable<TicketType>(
    {
      columns,
      data,
      defaultColumn,
      isMultiSortEvent: () => true,
    },
    
    useFilters,
    useSortBy,
    usePagination,
  )

  return (
    <>
      <BTable striped bordered hover size="sm" {...getTableProps({ className: 'table-fit' })}>
        <thead className="sticky-top" style={{ backgroundColor: 'white' }}>
          {headerGroups.map((headerGroup) => {
            const { key: headerGroupKey, ...getHeaderGroupProps } = headerGroup.getHeaderGroupProps()
            return (
              <tr key={headerGroupKey} {...getHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key: headerKey, ...getHeaderProps } = column.getHeaderProps()
                  return (
                    <th key={headerKey} {...getHeaderProps}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortAlphaUp className="ms-1" />
                            ) : (
                              <SortAlphaDown className="ms-1" />
                            )
                          ) : (
                            ''
                          )}
                        </span>
                      </div>
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, idx) => {
            prepareRow(row)
          
            const { key: rowKey, ...getRowProps } = row.getRowProps()
            return (
              <tr key={rowKey} {...getRowProps}>
                {row.cells.map((cell) => {
                  const { key: cellKey, ...getCellProps } = cell.getCellProps({ style: { color: 'inherit' } })
                  return (
                    <td key={cellKey} {...getCellProps}>
                      <div style={{ textAlign: "center" }}>
                        {cell.render('Cell')}
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>
      <div>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>{' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>{' '}
      
        <span>
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}  
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
