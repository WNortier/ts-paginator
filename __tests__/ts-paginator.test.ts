import useTsPaginator from '../ts-paginator';
import { renderHook } from '@testing-library/react';
describe('ts-paginator', () => {
  const { result } = renderHook(() => useTsPaginator(20, 0));
  const {
    totalRecordCount,
    rowsPerPage,
    currentPage,
    _determinePaginationMessage,
    _determinePaginationDisabledState,
    _determineRowsPerPageOptions,
    _handleChangePage,
    _handleChangeRowsPerPage,
  } = result.current;

  test('It should initialize correctly', () => {
    expect(totalRecordCount).toBe(20);
    expect(rowsPerPage).toBe(10);
    expect(currentPage).toBe(0);
  });
  test('It should calc the pagination message', () => {
    expect(_determinePaginationMessage()).toBe('Displaying 1 to 10 of 20 records');
  });
  test('It should calc the options for the rows per page', () => {
    expect(_determineRowsPerPageOptions()).toEqual([10, 25, 50]);
  });
  test('It should calc the disabled state', () => {
    expect(_determinePaginationDisabledState()).toBe(false);
  });
});
