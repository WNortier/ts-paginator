import React from 'react';

enum PaginationMessageVerb {
  DISPLAYING = 'Displaying',
  SHOWING = 'Showing',
}

/**
 * A helper function for pagination
 * @totalRecordCount Variable The total count of records
 * @rowsPerPage Variable The current rows per page selection
 * @currentPage Variable The current page selection (zero indexed)
 * @_handleChangePage Function to change the @currentPage value
 * @_handleChangeRowsPerPage Function to handle the @rowsPerPage value
 * @returns
 */
const useTsPaginator = (
  totalRecordCountProp: number,
  rowsPerPageProp: number,
  currentPageProp: number,
): {
  totalRecordCount: number;
  rowsPerPage: number;
  currentPage: number;
  _determinePaginationMessage: (options?: { verb: PaginationMessageVerb.DISPLAYING | PaginationMessageVerb.SHOWING }) => string;
  _determineRowsPerPageOptions: () => number[];
  _determinePaginationDisabledState: () => boolean;
  _handleChangeTotalRecordCount: (newTotalRecordCount: number) => void;
  _handleChangeRowsPerPage: (newRowsPerPage: number) => void;
  _handleChangePage: (newPage: number) => void;
} => {
  const [totalRecordCount, setTotalRecordCount] = React.useState<number>(totalRecordCountProp);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(rowsPerPageProp);
  const [currentPage, setCurrentPage] = React.useState<number>(currentPageProp);

  React.useEffect(() => {
    _determineRowsPerPageOptions();
    _determinePaginationMessage();
    _determinePaginationDisabledState();
  }, [totalRecordCount]);

  React.useEffect(() => {
    _determinePaginationMessage();
    _determinePaginationDisabledState();
  }, [rowsPerPage]);

  React.useEffect(() => {
    return () => setCurrentPage(0);
  }, []);

  // determine count works out how many pages there are
  function determinePageCount(trc: number, rpp: number): number {
    const calculateCount = trc / rpp;
    const hasRemainder = trc % rpp;
    let count = calculateCount;
    if (hasRemainder) {
      count = Number(count.toString().split('.')[0]) + 1;
    }
    return count;
  }

  // returns an array consisting of the rows pre page options
  function _determineRowsPerPageOptions(): number[] {
    const rowsPerPageOption: number[] = [];
    if (totalRecordCount < 10) rowsPerPageOption.push(10);
    else if (totalRecordCount % 10 > 0 || totalRecordCount % 10 === 0) {
      if (totalRecordCount >= 10 && totalRecordCount <= 100) rowsPerPageOption.push(10, 25, 50);
      else if (totalRecordCount >= 100 && totalRecordCount <= 500) rowsPerPageOption.push(10, 25, 50, 100);
      else if (totalRecordCount >= 500 && totalRecordCount <= 10000000)
        rowsPerPageOption.push(10, 25, 50, 100, 250, 500);
      else rowsPerPageOption.push(10, 20, 30);
    }
    return rowsPerPageOption;
  }

  function determinePaginationStartingPoint(): number {
    let startingPoint: number | undefined;
    startingPoint = rowsPerPage * currentPage + 1;
    return startingPoint;
  }

  function determinePaginationEndPoint(): number {
    let endPoint: number | undefined;
    const startingPoint = determinePaginationStartingPoint();

    endPoint = Math.min(startingPoint + rowsPerPage, totalRecordCount) - 1;
    let theCurrentPage = currentPage;
    if (++theCurrentPage === determinePageCount(totalRecordCount, rowsPerPage))
      endPoint = Math.min(startingPoint + rowsPerPage, totalRecordCount);

    return endPoint;
  }

  function _determinePaginationMessage(options?: { verb: PaginationMessageVerb.DISPLAYING | PaginationMessageVerb.SHOWING }): string {
    const startingPoint = determinePaginationStartingPoint();
    const endPoint = determinePaginationEndPoint();
    const verb = options ? options.verb : PaginationMessageVerb.DISPLAYING;
    const message = `${verb} ${startingPoint} to ${endPoint} of ${totalRecordCount} records`;
    return message;
  }
  // disable the ability to change the page if the records are below 10
  function _determinePaginationDisabledState(): boolean {
    let startingPoint: number | undefined;
    let endPoint: number | undefined;
    startingPoint = rowsPerPage * currentPage + 1;
    endPoint = Math.min(startingPoint + rowsPerPage, totalRecordCount) - 1;
    let theCurrentPage = currentPage;
    if (++theCurrentPage === determinePageCount(totalRecordCount, rowsPerPage))
      endPoint = Math.min(startingPoint + rowsPerPage, totalRecordCount);
    return determinePageCount(totalRecordCount, rowsPerPage) === 1 && (endPoint === totalRecordCount ? true : false);
  }

  function _handleChangeTotalRecordCount(newTotalRecordCount: number): void {
    setTotalRecordCount(newTotalRecordCount);
  }

  function _handleChangePage(newPage: number): void {
    setCurrentPage(newPage - 1);
  }

  function _handleChangeRowsPerPage(newRowsPerPage: number): void {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0);
  }

  return {
    totalRecordCount,
    rowsPerPage,
    currentPage,
    //
    _determinePaginationMessage,
    _determineRowsPerPageOptions,
    _determinePaginationDisabledState,
    //
    _handleChangeTotalRecordCount,
    _handleChangePage,
    _handleChangeRowsPerPage,
  };
};

export default useTsPaginator;
module.exports = useTsPaginator;
