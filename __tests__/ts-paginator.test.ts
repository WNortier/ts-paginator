import useTsPaginator from '../ts-paginator';
import { renderHook } from '@testing-library/react';
describe('ts-paginator', () => {
  describe('ts-paginator with 21 records', () => {
    const { result } = renderHook(() => useTsPaginator(21, 0));
    const {
      totalRecordCount,
      rowsPerPage,
      currentPage,
      _determinePaginationMessage,
      _determineRowsPerPageOptions,
      _determinePaginationPages,
      _determinePaginationDisabledState,
      _handleChangePage,
      _handleChangeRowsPerPage,
    } = result.current;

    test('It should initialize correctly with 21 records', () => {
      expect(totalRecordCount).toBe(21);
      expect(rowsPerPage).toBe(10);
      expect(currentPage).toBe(0);
    });
    test('It should calc the pagination message', () => {
      expect(_determinePaginationMessage()).toBe('Displaying 1 to 10 of 21 records');
    });
    test('It should calc the options for the rows per page', () => {
      expect(_determineRowsPerPageOptions()).toEqual([10, 25, 50]);
    });
    test('It should calc the disabled state', () => {
      expect(_determinePaginationDisabledState()).toBe(false);
    });

    test('It should calc the pagination pages', () => {
      expect(_determinePaginationPages()).toEqual([1, 2, 3]);
    });
  });
  describe('ts-paginator with less than 10 records', () => {
    const { result } = renderHook(() => useTsPaginator(7, 0));
    const {
      totalRecordCount,
      rowsPerPage,
      currentPage,
      _determinePaginationMessage,
      _determinePaginationDisabledState,
    } = result.current;
    test('It should initialize correctly with 21 records', () => {
      expect(totalRecordCount).toBe(7);
      expect(rowsPerPage).toBe(10);
      expect(currentPage).toBe(0);
    });

    test('It should calc the pagination message', () => {
      expect(_determinePaginationMessage()).toBe('Displaying 1 to 7 of 7 records');
    });

    test('It should calc the disabled state as true since there are less than 10 records', () => {
      expect(_determinePaginationDisabledState()).toBe(true);
    });
  });
  describe('ts-paginator with 351 records', () => {
    const { result } = renderHook(() => useTsPaginator(351, 5));
    const {
      totalRecordCount,
      rowsPerPage,
      currentPage,
      _determinePaginationMessage,
      _determineRowsPerPageOptions,
      _determinePaginationPages,
      _determinePaginationDisabledState,
      _handleChangePage,
      _handleChangeRowsPerPage,
    } = result.current;

    test('It should initialize correctly with 21 records', () => {
      expect(totalRecordCount).toBe(351);
      expect(rowsPerPage).toBe(10);
      expect(currentPage).toBe(5);
    });
    test('It should calc the pagination message', () => {
      expect(_determinePaginationMessage()).toBe('Displaying 51 to 60 of 351 records');
    });
    test('It should calc the options for the rows per page', () => {
      expect(_determineRowsPerPageOptions()).toEqual([10, 25, 50, 100]);
    });
    test('It should calc the disabled state', () => {
      expect(_determinePaginationDisabledState()).toBe(false);
    });
    test('It should calc the pagination pages', () => {
      expect(_determinePaginationPages()).toEqual([1, 0, 3, 4, 5, 6, 7, 0, 36]);
    });
  });
});
