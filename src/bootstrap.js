import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import PaginationComponent from './components/Pagination.tsx'

// Mount function to start up the app
const mount = (el, props) => {

  createRoot(el).render(<PaginationComponent {...props} />)
  console.log('inside app')
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#test-root');

    const paginationProps = {
      setPageIndex: ()=>{}, // Function to set the current page index
      pageIndex: 0, // Current page index
      totalCount: 120, // Total number of items
      resetSelections: () => {} // Function to reset selections (optional)
    };
  if (devRoot) {
    mount(devRoot, paginationProps);
  }
}

// We are running through container
// and we should export the mount function
export { mount };
