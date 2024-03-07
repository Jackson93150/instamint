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

## Authentication

### Retrieve Current User

This route allows retrieving information about the currently authenticated user.

- **URL:** `/auth/me`
- **Method:** `GET`
- **Authentication:** Requires a valid JWT token in the request headers.

### User Login

This route allows users to log in by providing their email and password.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**

  | Parameter | Type   | Description       |
  | --------- | ------ | ----------------- |
  | `email`   | string | Email of the user |
  | `password`| string | Password of the user|