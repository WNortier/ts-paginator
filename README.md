# ts-paginator

![ts-paginator](./assets/Screenshot%202023-03-17%20at%2012.27.49.png)

> ### `ts-paginator` is a TypeScript pagination hook for React or NextJS

## Args

Instantiate `tsPaginator` with the following arguments

| arg                | Description                               |
| ------------------ | ----------------------------------------- |
| `totalRecordCount` | The total count of records                |
| `rowsPerPage`      | The current rows per page selection       |
| `currentPage`      | The current page selection (zero indexed) |

## UI/UX Functions

| function                           | Description                          | Args                     | Return Type | Example Returns                    |
| ---------------------------------- | ------------------------------------ | ------------------------ | ----------- | ---------------------------------- |
| `determinePaginationMessage`       | Calculates the pagination message    | options?: {verb: string} | string      | `Displaying 1 to 10 of 10 records` |
| `determineRowsPerPageOptions`      | Calculates the rows per page options |                          | number[]    | `[10]`                             |
| `determinePaginationDisabledState` | The current page selection           |                          | boolean     | `true`                             |

## State Altering Functions

| function                       | Description                    | Args                           | Return Type | Example Returns                    |
| ------------------------------ | ------------------------------ | ------------------------------ | ----------- | ---------------------------------- |
| `handleChangeTotalRecordCount` | Changes the total record count | Changes the total record count | void        | `Displaying 1 to 10 of 10 records` |
| `handleChangeRowsPerPage`      | Changes the rows per page      | Changes the rows per page      | void        | void                               |
| `handleChangePage`             | Changes the current page       | Changes the rows per page      | void        | void                               |

## Example

`npm i --save ts-paginator`

```js
import useTsPaginator from 'ts-paginator';

function MyComponent() {
  const {
    totalRecordCount,
    rowsPerPage,
    currentPage,
    determinePaginationMessage,
    determinePaginationDisabledState,
    determineRowsPerPageOptions,
    handleChangeTotalRecordCount,
    handleChangeRowsPerPage,
    handleChangePage,
  } = useTsPaginator(20, 10, 0);

  const message = determinePaginationMessage({ verb: 'Showing' }); // Showing 1 to 10 of 10 records

  return <p>{message}</p>;
}
```

<img alt="GitHub last commit (by committer)" src="https://img.shields.io/github/last-commit/wnortier/ts-paginator">
