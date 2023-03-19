
import tsPaginator from '../ts-paginator'
describe('ts-paginator', () => {
    const paginator = tsPaginator()
    test('It should calc the pagination message', () => {
        expect(paginator.determinePaginationMessage(10, 10, 0)).toBe('Displaying 1 to 10 of 10 records');
    })
    test('It should calc the pagination message', () => {
        expect(paginator.determinePaginationDisabledState(10, 10, 0)).toBe(true);
        expect(paginator.determinePaginationDisabledState(100, 50, 0)).toBe(false);
    })
    test('It should calc the options for the rows per page', () => {
        expect(paginator.determineRowsPerPageOptions(9)).toEqual([10]);
        expect(paginator.determineRowsPerPageOptions(50)).toEqual([10, 25, 50]);
        expect(paginator.determineRowsPerPageOptions(400)).toEqual([10, 25, 50, 100]);
        expect(paginator.determineRowsPerPageOptions(1000)).toEqual([10, 25, 50, 100, 250, 500]);
    })
});
