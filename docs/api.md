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

### Change Minter Profile Visibility

This route allows changing the visibility of a minter's profile.

- **URL:** `/minter/visibility`
- **Method:** `PATCH`
- **Request Body:**
- **Authentication:** Requires a valid JWT token in the request headers.

  | Parameter   | Type    | Description                                       |
  |-------------|---------|---------------------------------------------------|
  | `id`        | number  | The ID of the minter whose visibility is to be changed. |
  | `isPrivate` | boolean | The new visibility status of the minter's profile. |

### Update Unique URL

This route allows updating the unique URL for a minter's profile.

- **URL:** `/minter/unique-url`
- **Method:** `PUT`
- **Request Body:**
- **Authentication:** Requires a valid JWT token in the request headers.

  | Parameter   | Type    | Description                                                    |
  |-------------|---------|----------------------------------------------------------------|
  | `uniqueUrl` | string  | The new unique URL to be associated with the minter's profile. |

### Delete Minter Account

This route allows deleting a minter's profile.

- **URL:** `/minter`
- **Method:** `DELETE`
- **Request Body:**
- **Authentication:** Requires a valid JWT token in the request headers.

  | Parameter   | Type    | Description                                                    |
  |-------------|---------|----------------------------------------------------------------|
  |    ---      |   --    |                     -----------                                |


## Authentication

### Retrieve Current User

This route allows retrieving information about the currently authenticated user.

- **URL:** `/auth/me`
- **Method:** `GET`
- **Authentication:** Requires a valid JWT token in the request headers.
- **Guard:** Requires the `AuthGuard` with JWT strategy to be applied.

### User Login

This route allows users to log in by providing their email and password.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**

  | Parameter | Type   | Description       |
  | --------- | ------ | ----------------- |
  | `email`   | string | Email of the user |
  | `password`| string | Password of the user|

### Confirm Email

This route allows users to confirm their email address.

- **URL:** `/auth/confirm`
- **Method:** `POST`
- **Authentication:** Requires a valid JWT token in the request headers.
- **Guard:** Requires the `EmailVerificationGuard` to be applied.
- **Request Body:**
  - No request body parameters are required.

## Mail

### Send Verification Email

This route allows sending a verification email to the specified email address.

- **URL:** `/mail/send`
- **Method:** `POST`
- **Request Body:**

  | Parameter | Type   | Description            |
  | --------- | ------ | ---------------------- |
  | `email`   | string | Email address to verify|

## Content

### Create Content with Firebase

This route allows authenticated users to create content and upload it to Firebase storage.

- **URL:** `/content/firebase`
- **Method:** `POST`
- **Authentication:** Requires a valid JWT token in the request headers.
- **Request Body:**

  | Parameter | Type   | Description            |
  | --------- | ------ | ---------------------- |
  | `file`    | file   | Content file to upload |

### Delete Content from Firebase

This route allows authenticated users to delete content from Firebase storage.

- **URL:** `/content/firebase/:name`
- **Method:** `DELETE`
- **Authentication:** Requires a valid JWT token in the request headers.
- **Path Parameter:**
  - `name`: The name of the content to be deleted.

### Get Content by Minter ID

This route allows authenticated users to retrieve content uploaded by a specific minter.

- **URL:** `/content/minter`
- **Method:** `GET`
- **Authentication:** Requires a valid JWT token in the request headers.

## Draft

### Create Draft

This route allows authenticated users to create a draft.

- **URL:** `/draft`
- **Method:** `POST`
- **Authentication:** Requires a valid JWT token in the request headers.
- **Request Body:**
  - JSON object representing the draft entity.

### Get Drafts by Minter ID

This route allows authenticated users to retrieve drafts created by a specific minter.

- **URL:** `/draft/minter`
- **Method:** `GET`
- **Authentication:** Requires a valid JWT token in the request headers.