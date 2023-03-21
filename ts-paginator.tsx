import React from 'react';
/**
 * A helper function for pagination
 * @totalRecordCountProp: Argument The total count of records,
 * @currentPageProp: Argument The current page selection (zero indexed),
 * @rowsPerPageProp: Argument The rows per page (default 10),
 * @returns
 * @totalRecordCount Variable The total count of records
 * @currentPage Variable The current page selection (zero indexed)
 * @rowsPerPage Variable The current rows per page selection
 * @_handleChangeTotalRecordCount Function to change the @totalRecordCount value
 * @_handleChangePage Function to change the @currentPage value
 * @_handleChangeRowsPerPage Function to handle the @rowsPerPage value
 */
type rowsPerPagePropVal = 10;
const useTsPaginator = (
  totalRecordCountProp: number,
  currentPageProp: number,
  rowsPerPageProp: rowsPerPagePropVal = 10,
): {
  totalRecordCount: number;
  rowsPerPage: number;
  currentPage: number;
  _determinePaginationMessage: (options?: { verb: 'Showing' | 'Displaying' }) => string;
  _determineRowsPerPageOptions: () => number[];
  _determinePaginationPages: () => number[];
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
    _determinePaginationPages();
  }, [totalRecordCount]);

  React.useEffect(() => {
    _determinePaginationMessage();
    _determinePaginationDisabledState();
    _determinePaginationPages();
  }, [rowsPerPage]);

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

  function _determinePaginationMessage(options?: { verb: 'Displaying' | 'Showing' }): string {
    const startingPoint = determinePaginationStartingPoint();
    const endPoint = determinePaginationEndPoint();
    const verb = options ? options.verb : 'Displaying';
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

  function _determinePaginationPages(): number[] {
    let paginationPages: number[] = [];
    const pageCount = determinePageCount(totalRecordCount, rowsPerPage);
    switch (pageCount) {
      case 1: {
        paginationPages = [1];
        break;
      }
      case 2: {
        paginationPages = [1, 2];
        break;
      }
      case 3: {
        paginationPages = [1, 2, 3];
        break;
      }
      case 4: {
        paginationPages = [1, 2, 3, 4];
        break;
      }
      case 5: {
        paginationPages = [1, 2, 3, 4, 5];
        break;
      }
      case 6: {
        paginationPages = [1, 2, 3, 4, 5, 6];
        break;
      }
      case 7: {
        paginationPages = [1, 2, 3, 4, 5, 6, 7];
        break;
      }
      default: {
        const page = currentPage + 1
        const isFirstFourOrLastFourPages = ([1, 2, 3, 4].includes(page) || [pageCount, pageCount - 1, pageCount - 2, pageCount - 3, pageCount - 4].includes(page))
        const pageOne = page === 1
        const pageTwoOrThree = (page === 2 || page === 3)
        const pageFour = (page === 4)
        //
        const lastPage = page === pageCount
        const secondOrThirdLastPage = (page === pageCount - 1 || page === pageCount - 2)
        const fourthLastPage = (page === pageCount - 3)

        if (isFirstFourOrLastFourPages) {
          if (pageOne) paginationPages = [1, 2, 3, 4, 5, 0, pageCount];
          else if (pageTwoOrThree) paginationPages = [1, 2, 3, 4, 5, 0, pageCount];
          else if (pageFour) paginationPages = [1, 2, 3, 4, 5, 6, 0, pageCount];
          else if (lastPage) {
            paginationPages = [1, 0, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
          }
          else if (secondOrThirdLastPage)
            paginationPages = [1, 0, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
          else if (fourthLastPage)
            paginationPages = [1, 0, pageCount - 5, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
        } else
          paginationPages = [
            1,
            0,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
            currentPage + 3,
            0,
            pageCount,
          ];
        break
      }
    }
    return paginationPages;
  }

  function _handleChangeTotalRecordCount(newTotalRecordCount: number): void {
    setTotalRecordCount(newTotalRecordCount);
    setCurrentPage(0);
    setRowsPerPage(10);
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
    currentPage,
    rowsPerPage,
    //
    _determinePaginationMessage,
    _determineRowsPerPageOptions,
    _determinePaginationPages,
    _determinePaginationDisabledState,
    //
    _handleChangeTotalRecordCount,
    _handleChangePage,
    _handleChangeRowsPerPage,
  };
};

export default useTsPaginator;
module.exports = useTsPaginator;
