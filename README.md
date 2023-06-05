# GA4 Puppeteer

Import/export custom definitions in Google Analytics 4 properties

## How to use

### 1. Clone repo

```
git clone https://github.com/Brandon-Spicer/ga4-puppeteer.git
cd ga4-puppeteer
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

Add your gmail address and password. Sign into your Google Analytics account, select the property from which to copy settings, and go to Admin > Custom Definitions. Copy the URL and set it as the value for importFromUrl. Do the same for the destination property and set it as the value for exportToUrl.

```
gmailUsername="yourname@gmail.com"
password="1234"
importFromUrl="https://analytics.google.com/analytics/web/#/.../admin/customdefinitions/hub"
exportFromUrl="https://analytics.google.com/analytics/web/#/.../admin/customdefinitions/hub"
```

### 4. Run

```
npm start
```

Currently, this will only copy over custom dimensions, not metrics or custom events.
