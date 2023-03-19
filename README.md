# ts-paginator

![ts-paginator](./assets/Screenshot%202023-03-17%20at%2012.27.49.png)

---

> ### `ts-paginator` is a TypeScript pagination module with helper functions intended for frontend development

## Helper Functions

| function                           | Description                          | Type     | Example                            |
| ---------------------------------- | ------------------------------------ | -------- | ---------------------------------- |
| `determinePaginationMessage`       | Calculates the pagination message    | string   | `Displaying 1 to 10 of 10 records` |
| `determineRowsPerPageOptions`      | Calculates the rows per page options | number[] | `[10]`                             |
| `determinePaginationDisabledState` | The current page selection           | boolean  | `true`                             |

## Args

| arg                | Description                         |
| ------------------ | ----------------------------------- |
| `totalRecordCount` | The total count of records          |
| `rowsPerPage`      | The current rows per page selection |
| `currentPage`      | The current page selection (zero indexed)         |

## Example

`npm i --save ts-paginator`

```js
import tsPaginator from 'ts-paginator';

const paginator = tsPaginator();
const message = paginator.determinePaginationMessage(10, 10, 0); // Displaying 1 to 10 of 10 records
```
