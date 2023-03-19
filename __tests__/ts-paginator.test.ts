import useTsPaginator from '../ts-paginator';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
describe('ts-paginator', () => {
  const { result } = renderHook(() => useTsPaginator(20, 10, 0));
  const {
    totalRecordCount,
    rowsPerPage,
    currentPage,
    determinePaginationMessage,
    determinePaginationDisabledState,
    determineRowsPerPageOptions,
    handleChangePage,
    handleChangeRowsPerPage,
  } = result.current;

  test('It should initialize correctly', () => {
    expect(totalRecordCount).toBe(20);
    expect(rowsPerPage).toBe(10);
    expect(currentPage).toBe(0);
  });
  test('It should calc the pagination message', () => {
    expect(determinePaginationMessage()).toBe('Displaying 1 to 10 of 20 records');
  });
  test('It should calc the options for the rows per page', () => {
    expect(determineRowsPerPageOptions()).toEqual([10, 25, 50]);
  });
  test('It should calc the disabled state', () => {
    expect(determinePaginationDisabledState()).toBe(false);
  });
});
