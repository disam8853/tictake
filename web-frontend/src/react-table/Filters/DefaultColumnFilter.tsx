import Form from 'react-bootstrap/Form'
import type { FilterProps } from 'react-table'

export default function defaultColumnFilter<T extends Record<string, unknown>>({
  column: { filterValue, preFilteredRows, setFilter, id },
}: FilterProps<T>): JSX.Element {
  const count = preFilteredRows.length

  return (
    <Form.Control
      type="text"
      placeholder={`Search ${count} records...`}
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined) 
      }}
      data-cy={`${id}-filter-input`}
    />
  )
}
