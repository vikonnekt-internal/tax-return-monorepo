# Tax ID Return API

The Tax ID Return API documentation

## Version: 1.0

### /income-sources

#### GET

##### Parameters

| Name       | Located in | Description | Required | Schema |
| ---------- | ---------- | ----------- | -------- | ------ |
| taxYear    | query      |             | Yes      | number |
| incomeType | query      |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

### /income-sources/{id}

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PUT

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /income-sources/taxpayer

#### GET

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| taxYear | query      |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /housing-loans

#### GET

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| taxYear | query      |             | Yes      | number |
| skip    | query      |             | Yes      | number |
| take    | query      |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

### /housing-loans/{id}

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PUT

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /housing-loans/taxpayer/{taxpayerId}

#### GET

##### Parameters

| Name       | Located in | Description | Required | Schema |
| ---------- | ---------- | ----------- | -------- | ------ |
| taxpayerId | path       |             | Yes      | string |
| taxYear    | query      |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /other-debts

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

#### GET

##### Parameters

| Name       | Located in | Description | Required | Schema |
| ---------- | ---------- | ----------- | -------- | ------ |
| taxpayerId | query      |             | Yes      | string |
| taxYear    | query      |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /other-debts/{id}

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PATCH

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /real-estates

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

#### GET

##### Parameters

| Name       | Located in | Description | Required | Schema |
| ---------- | ---------- | ----------- | -------- | ------ |
| taxpayerId | query      |             | Yes      | string |
| taxYear    | query      |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /real-estates/{id}

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PATCH

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /tax-reports

#### POST

##### Summary:

Create a new tax report

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description                                          |
| ---- | ---------------------------------------------------- |
| 201  | The tax report has been successfully created.        |
| 400  | Invalid input data.                                  |
| 401  | User is not authenticated.                           |
| 403  | User does not have permission to create tax reports. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| JWT-auth        |        |

#### GET

##### Summary:

Get all tax reports with pagination

##### Parameters

| Name   | Located in | Description                                          | Required | Schema |
| ------ | ---------- | ---------------------------------------------------- | -------- | ------ |
| limit  | query      | Number of items to return (max 50)                   | No       | number |
| after  | query      | Cursor for pagination - get items after this cursor  | No       | string |
| before | query      | Cursor for pagination - get items before this cursor | No       | string |

##### Responses

| Code | Description                                        |
| ---- | -------------------------------------------------- |
| 200  | Returns a list of tax reports.                     |
| 401  | User is not authenticated.                         |
| 403  | User does not have permission to view tax reports. |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| JWT-auth        |        |

### /tax-reports/{id}

#### GET

##### Summary:

Get a specific tax report by ID

##### Parameters

| Name | Located in | Description                          | Required | Schema |
| ---- | ---------- | ------------------------------------ | -------- | ------ |
| id   | path       | The ID of the tax report to retrieve | Yes      | number |

##### Responses

| Code | Description                                            |
| ---- | ------------------------------------------------------ |
| 200  | Returns the tax report details.                        |
| 401  | User is not authenticated.                             |
| 403  | User does not have permission to view this tax report. |
| 404  | Tax report with the given ID was not found.            |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| JWT-auth        |        |

#### PATCH

##### Summary:

Update a tax report

##### Parameters

| Name | Located in | Description                        | Required | Schema |
| ---- | ---------- | ---------------------------------- | -------- | ------ |
| id   | path       | The ID of the tax report to update | Yes      | number |

##### Responses

| Code | Description                                              |
| ---- | -------------------------------------------------------- |
| 200  | The tax report has been successfully updated.            |
| 400  | Invalid input data.                                      |
| 401  | User is not authenticated.                               |
| 403  | User does not have permission to update this tax report. |
| 404  | Tax report with the given ID was not found.              |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| JWT-auth        |        |

#### DELETE

##### Summary:

Delete a tax report

##### Parameters

| Name | Located in | Description                        | Required | Schema |
| ---- | ---------- | ---------------------------------- | -------- | ------ |
| id   | path       | The ID of the tax report to delete | Yes      | number |

##### Responses

| Code | Description                                              |
| ---- | -------------------------------------------------------- |
| 200  | The tax report has been successfully deleted.            |
| 401  | User is not authenticated.                               |
| 403  | User does not have permission to delete this tax report. |
| 404  | Tax report with the given ID was not found.              |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| JWT-auth        |        |

### /government-data/taxpayer/{taxpayerId}

#### POST

##### Summary:

Update government data for a taxpayer

##### Parameters

| Name       | Located in | Description                      | Required | Schema |
| ---------- | ---------- | -------------------------------- | -------- | ------ |
| taxpayerId | path       | The ID of the taxpayer to update | Yes      | string |

##### Responses

| Code | Description                                    |
| ---- | ---------------------------------------------- |
| 200  | Government data has been successfully updated. |
| 400  | Invalid input data or taxpayer ID.             |
| 401  | Invalid API key.                               |
| 404  | Taxpayer not found.                            |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| api-key         |        |

### /assets

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

#### GET

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| taxYear | query      |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /assets/{id}

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PATCH

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /debts

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

#### GET

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| taxYear | query      |             | Yes      | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /debts/{id}

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PATCH

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| id   | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |
