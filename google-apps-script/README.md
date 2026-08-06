# Google Apps Script Deployment Guide (Database Backend)

This Google Apps Script turns your Google Sheet into a secure, serverless database for **Innovatrium '26**.

---

## 1. Setup Instructions

1. Open **[Google Sheets](https://sheets.new)** and create a new spreadsheet named `Innovatrium '26 Registrations`.
2. In the top menu, go to **Extensions** $\rightarrow$ **Apps Script**.
3. Delete any default code in `Code.gs` and replace it with the code from [`google-apps-script/Code.gs`](./Code.gs).
4. Click the **Save** icon (Floppy disk).

---

## 2. Deploy as Web App

1. In the top-right corner of Google Apps Script editor, click **Deploy** $\rightarrow$ **New deployment**.
2. Click the **gear icon (Select type)** and select **Web app**.
3. Configure the following **strictly**:
   - **Description**: `Innovatrium 26 Production API`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial so attendees can submit without requiring Google login)*
4. Click **Deploy**.
5. Authorize access if prompted (Click *Advanced* $\rightarrow$ *Go to Innovatrium 26 (unsafe)* $\rightarrow$ *Allow*).
6. Copy the **Web App URL** (Format: `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## 3. Connect to the Frontend

Create or update `.env` in the root of your `Innovatrium-26` project:

```env
VITE_REGISTRATION_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec
```

---

## 4. Built-in Security Features

* **Anti-Race-Condition**: Uses `LockService` to handle simultaneous registrations without corrupting rows.
* **Duplicate UTR Prevention**: Checks column 12 to reject re-used payment reference numbers.
* **Formula Injection Immunity**: Neutralizes `=, +, -, @` characters so coordinators are safe when viewing the spreadsheet.
* **Zero-Trust Pricing**: Calculates the exact fee on the server side based on IEEE status.
* **Non-Sequential IDs**: Generates randomized IDs like `INV26-B81D3FE2`.
