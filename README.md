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

Add your gmail address and password. Then sign into your Google Analytics account and go to Admin > Custom Definitions. Copy the URL and set it as the value for ga4Url.

```
gmailUsername="yourname@gmail.com"
password="1234"
ga4Url="https://analytics.google.com/analytics/web/#/.../admin/customdefinitions/hub"
```

### 4. Run

```
npm start
```

Right now this will just sign into google and create a new test dimension.
