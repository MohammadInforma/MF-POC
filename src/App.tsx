import React, { useState } from 'react'
import PaginationComponent from './components/Pagination.tsx'

const App = () => {
  const [pagination, setPagination] = useState();
  return (
    <>
      <div>This is App</div>
      <PaginationComponent setPageIndex={setPagination} pageIndex={0} totalCount={120} resetSelections={() => { } } />
    </>
  )
}

export default App