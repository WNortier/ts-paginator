enum PaginationMessageVerb {
  DISPLAYING = 'Displaying',
  SHOWING = 'Showing',
}
/**
 * A helper function for pagination
 * @totalRecordCount Variable The total count of records
 * @rowsPerPage Variable The current rows per page selection
 * @currentPage Variable The current page selection
 * @handleChangePage Function to change the @currentPage value (coming soon)
 * @handleChangeRowsPerPage Function to handle the @rowsPerPage value (coming soon)
 * @returns
 */
function tsPaginator(): {
  determinePaginationMessage: (trc: number, rpp: number, cp: number) => string;
  determineRowsPerPageOptions: (trc: number) => number[];
  determinePaginationDisabledState: (trc: number, rpp: number, cp: number) => boolean;
} {
  // determine count works out how many pages there are
  function determinePageCount(totalRecordCount: number, rowsPerPage: number): number {
    const calculateCount = totalRecordCount / rowsPerPage;
    const hasRemainder = totalRecordCount % rowsPerPage;
    let count = calculateCount;
    if (hasRemainder) {
      count = Number(count.toString().split('.')[0]) + 1;
    }
    return count;
  }

  // returns an array consisting of the rows pre page options
  function determineRowsPerPageOptions(totalRecordCount: number): number[] {
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

  function determinePaginationStartingPoint(rowsPerPage: number, currentPage: number): number {
    let startingPoint: number | undefined;
    startingPoint = rowsPerPage * currentPage + 1;
    return startingPoint;
  }

  function determinePaginationEndPoint(rowsPerPage: number, currentPage: number, totalRecordCount: number): number {
    let endPoint: number | undefined;
    const startingPoint = determinePaginationStartingPoint(rowsPerPage, currentPage);

    endPoint = Math.min(startingPoint + rowsPerPage, totalRecordCount) - 1;
    let theCurrentPage = currentPage;
    if (++theCurrentPage === determinePageCount(totalRecordCount, rowsPerPage))
      endPoint = Math.min(startingPoint + rowsPerPage, totalRecordCount);

    return endPoint;
  }

  function determinePaginationMessage(
    totalRecordCount: number,
    rowsPerPage: number,
    currentPage: number,
    options?: { verb: PaginationMessageVerb },
  ): string {
    const startingPoint = determinePaginationStartingPoint(rowsPerPage, currentPage);
    const endPoint = determinePaginationEndPoint(rowsPerPage, currentPage, totalRecordCount);
    const verb = options ? options.verb : PaginationMessageVerb.DISPLAYING;
    const message = `${verb} ${startingPoint} to ${endPoint} of ${totalRecordCount} records`;
    return message;
  }
  // disable the ability to change the page if the records are below 10
  function determinePaginationDisabledState(
    totalRecordCount: number,
    rowsPerPage: number,
    currentPage: number,
  ): boolean {
    let startingPoint: number | undefined;
    let endPoint: number | undefined;
    startingPoint = rowsPerPage * currentPage + 1;
    endPoint = Math.min(startingPoint + rowsPerPage, totalRecordCount) - 1;
    let theCurrentPage = currentPage;
    if (++theCurrentPage === determinePageCount(totalRecordCount, rowsPerPage))
      endPoint = Math.min(startingPoint + rowsPerPage, totalRecordCount);
    return determinePageCount(totalRecordCount, rowsPerPage) === 1 && (endPoint === totalRecordCount ? true : false);
  }

  return {
    determinePaginationMessage,
    determineRowsPerPageOptions,
    determinePaginationDisabledState,
  };
}

export default tsPaginator;
module.exports = tsPaginator;
