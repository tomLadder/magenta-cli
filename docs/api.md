# Magenta Telekom API Documentation

This document describes the unofficial Magenta Telekom API endpoints discovered via browser network inspection.

## Base URL

```
https://onewebbff.svc.magenta.at
```

## Common Headers

```
Accept: application/json, text/plain, */*
Content-Type: application/json
Authorization: <API_KEY or Bearer token>
Origin: https://www.magenta.at
Referer: https://www.magenta.at/
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...
x-request-session-id: <UUID>
x-request-tracking-id: <UUID>
```

## Authentication

Magenta uses password-based authentication with RSA-OAEP encryption.

### Configuration

Before login, fetch the RSA public key from the configuration endpoint:

```
GET https://www.magenta.at/angular/selfcare/global.config.json
```

**Response contains:**
- `api_key`: Static API key for Authorization header
- `rsa_pub`: RSA public key for password encryption
- `bff_domain`: BFF API base URL

### Login

Authenticate with username and encrypted password.

```
POST /v1/login/usernamepassword
```

**Request Headers:**
```
Authorization: <API_KEY>
x-request-session-id: <UUID>
x-request-tracking-id: <UUID>
```

**Request Body:**
```json
{
  "username": "user@example.com",
  "password": "<RSA-OAEP encrypted password, base64 encoded>",
  "deviceId": "<UUID, persisted per device>"
}
```

**Response:**
```json
{
  "token": {
    "accessToken": "<access-token-uuid>",
    "accessExpiresIn": 900,
    "refreshToken": "<refresh-token-uuid>",
    "refreshExpiresIn": 1209600,
    "recoveryToken": null
  },
  "validUsername": true,
  "isValidUsername": true
}
```

### Logout

```
POST /v1/logout
```

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

## Profile

### Get Profile

```
GET /v2/profile/manage-profile
```

**Response:**
```json
{
  "id": "<profile-uuid>",
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-01",
  "username": "user@example.com",
  "passwordExist": true,
  "contactPhoneNo": "43699XXXXXXXX",
  "contactEmailAddress": "user@example.com",
  "editableFields": ["contactEmailAddress", "contactPhoneNo"]
}
```

## Dashboard / Assets

### Get Dashboard

Returns user's assets (tariffs/contracts).

```
GET /v1/dashboard
```

**Response:**
```json
{
  "assets": [
    {
      "id": "<asset-uuid>",
      "name": "Internet L",
      "label": "Internet L",
      "customerNumber": "1.12345678",
      "category": "FIXED_INTERNET",
      "status": "Active"
    }
  ],
  "profileId": "<profile-uuid>",
  "profileStatus": "VALIDATED",
  "profileType": "PROFILE"
}
```

## Invoices

### List Invoices

```
GET /v2/customer-bills
```

**Response:**
```json
{
  "customerBills": [
    {
      "billId": "TMA.123456789012",
      "billNo": "123456789012",
      "billStatus": "IN_PROCESS",
      "billPeriod": "2026-03",
      "billDate": "2026-03-05",
      "amountDue": {
        "units": "EUR",
        "amount": 39.9
      },
      "paymentDueDate": "2026-03-18",
      "billingAccount": {
        "id": "1.12345678",
        "name": "Account Name",
        "isEBillActive": true
      },
      "stateDescription": "Payment description...",
      "relatedPartyName": "Customer Name",
      "downloadLinks": [
        {
          "name": "Rechnung 20260305",
          "url": "/documents/PEH.123456789012/attachments/bill_2026-03_123456789012.pdf"
        }
      ]
    }
  ],
  "billingAccountsToActivate": [],
  "showEbillActivation": true
}
```

### Download Invoice PDF

Note: The URL from `downloadLinks` needs `/v1` prepended.

```
GET /v1/documents/{documentId}/attachments/{filename}.pdf
```

Example:
```
GET /v1/documents/PEH.123456789012/attachments/bill_2026-02_123456789012.pdf
```

**Response:** Binary PDF file

## Bill Status Values

| Status | Description |
|--------|-------------|
| `IN_PROCESS` | Payment pending/processing |
| `SETTLED` | Paid |
| `OPEN` | Open/unpaid |

## Asset Categories

| Category | Description |
|----------|-------------|
| `FIXED_INTERNET` | Fixed line internet |
| `MOBILE` | Mobile phone contract |

## Session Management

- Access tokens expire after ~15 minutes (`accessExpiresIn` in seconds)
- Refresh tokens last ~14 days (`refreshExpiresIn` in seconds)
- Use `x-request-session-id` (same for session) and `x-request-tracking-id` (unique per request)
- Device ID should be persisted and reused

## Password Encryption

Password must be encrypted using RSA-OAEP:

```javascript
import forge from 'node-forge';

const publicKey = forge.pki.publicKeyFromPem(RSA_PUBLIC_KEY);
const encrypted = publicKey.encrypt(forge.util.encodeUtf8(password), 'RSA-OAEP');
const base64Password = forge.util.encode64(encrypted);
```

## Notes

- All authenticated endpoints require `Bearer <accessToken>` in Authorization header
- The API may change without notice as it's unofficial
- UUIDs should be generated client-side (crypto.randomUUID())
