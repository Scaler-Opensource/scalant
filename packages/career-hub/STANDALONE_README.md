# JobsPage Standalone App

This directory contains a standalone version of the JobsPage component that can be run as a separate application.

## Files Created

- `standalone.html` - Main HTML entry point for the standalone app
- `src/standalone/main.jsx` - React entry point that sets up Redux store and renders JobsPage
- `vite.standalone.config.js` - Vite configuration for standalone app mode

## Prerequisites

Make sure you have all dependencies installed:

```bash
npm install
# or
yarn install
```

## Running the Standalone App

### Option 1: Using Vite directly with the standalone config

```bash
npx vite --config vite.standalone.config.js
```

### Option 2: Add a script to package.json (Recommended)

Add this script to your `package.json`:

```json
{
  "scripts": {
    "dev:standalone": "vite --config vite.standalone.config.js"
  }
}
```

Then run:

```bash
npm run dev:standalone
# or
yarn dev:standalone
```

The app will open automatically at `http://localhost:3000`

## Building for Production

To build the standalone app for production:

```bash
npx vite build --config vite.standalone.config.js
```

The built files will be in the `dist-standalone` directory.

## API Configuration

The app is configured to use `http://localhost:8000` as the base URL for API calls. Make sure:

1. Your backend API is running on `http://localhost:8000`
2. Or update the base URL in `src/services/baseService.js`:

```javascript
let baseUrl = 'http://your-api-url:port';
```

## Mock Data

The standalone app uses mock data from:
- `src/components/JobsPage/userProfileData.json` - User profile data

You can modify this file or pass different props to `JobsPage` in `src/standalone/main.jsx`.

## Customization

To customize the standalone app:

1. **Change process counts**: Edit the `processCounts` object in `src/standalone/main.jsx`
2. **Change user profile data**: Modify `userProfileData.json` or pass different props
3. **Add custom header**: Uncomment and modify the header div in `standalone.html`
4. **Change API base URL**: Update `baseUrl` in `src/services/baseService.js`

## Troubleshooting

### Port already in use

If port 3000 is already in use, you can change it in `vite.standalone.config.js`:

```javascript
server: {
  port: 3001, // Change to any available port
  open: true,
}
```

### API not connecting

1. Make sure your backend API is running
2. Check CORS settings on your backend
3. Verify the base URL in `src/services/baseService.js`

### Styles not loading

1. Make sure Ant Design CSS is imported in `src/standalone/main.jsx`
2. For Ant Design v5, try: `import 'antd/dist/reset.css'`
3. For Ant Design v4, use: `import 'antd/dist/antd.css'`
4. Make sure the SCSS preprocessor is working. Check that all SCSS dependencies are installed
5. If styles still don't load, check the browser console for CSS import errors

### CORS errors

The Vite config includes a proxy to handle CORS. Make sure:
1. Your backend API is running on `http://localhost:8000`
2. The proxy configuration in `vite.standalone.config.js` matches your API paths
3. If using a different API URL, update both the proxy target and `setBaseUrl()` in `src/standalone/main.jsx`

## Notes

- The standalone app uses the same Redux store structure as the main app
- All filters, saved jobs, and other state management features work the same way
- URL query parameters for filters and job_ids are supported
- The app expects the Redux state to be under `scalantCareerHub` key
