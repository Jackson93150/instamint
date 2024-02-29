# API Documentation

## Minter

### Create Minter

This route allows creating a new minter.

- **URL:** `/minter`
- **Method:** `POST`
- **Request Body:**

  | Parameter | Type   | Description          |
  | --------- | ------ | -------------------- |
  | `username`| string | Username of the minter|
  | `email`   | string | Email of the minter   |
  | `password`| string | Password of the minter|