import React from "react"
import type { FilterProps } from 'react-table'
import Form from 'react-bootstrap/Form'
export default function selectColumnFilter<T extends Record<string, unknown>>({
  column: { filterValue, preFilteredRows, setFilter, id },
}: FilterProps<T>): JSX.Element {
  const options = React.useMemo(() => {
    const options = new Set<string>()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <Form.Control as="select" value={filterValue} 
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}>
      <option value="">--</option>
      {options.map((option: string, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Form.Control>
  )
}
