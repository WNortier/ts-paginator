# ts-paginator
![ts-paginator](./assets/Screenshot%202023-03-17%20at%2012.27.49.png)
***

> ### `ts-paginator` is a TypeScript pagination module with helper functions intended for frontend development

## Methods

| function | Description |
| ------ | ----------- |
| `determinePaginationMessage`   | path to data files to supply the data that will be passed into templates. |
| `determineRowsPerPageOptions` | The current rows per page selection |
| `determinePaginationDisabledState`    | The current page selection |


## Args

| arg | Description |
| ------ | ----------- |
| `totalRecordCount`   | path to data files to supply the data that will be passed into templates. |
| `rowsPerPage` | The current rows per page selection |
| `currentPage`    | The current page selection |


## Example

```js
import tsPaginator from 'ts-paginator'

const paginator = tsPaginator()
const message = paginator.determinePaginationMessage(10, 10, 0) // Displaying 1 to 10 of 10 records
```