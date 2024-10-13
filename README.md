# TrackFlow

**TrackFlow** is a simple and efficient job application tracking system. It's a single-page application (SPA) with a clean, user-friendly UI, allowing users to add, track, and manage their job applications with ease. It now includes user authentication and personalized dashboards.

## Features

* **User Authentication**: Secure sign-up and login functionality using Firebase Authentication.
* **Personalized Dashboard**: Each user has their own dashboard to manage their job applications.
* **Profile Dropdown**: Easy access to user email and sign-out functionality.
* **Add Job Applications**: Users can input their job application details (e.g., position, company, status) and track their progress.
* **Track Progress**: Keep track of the status of each application (e.g., applied, interviewed, rejected, etc.).
* **Sort Applications**: Users can sort job applications by `date` or `C.T.C` values.
* **Display Type**: Display applications based on job status, by defaule displays all.
* **CRUD Operations**: Perform full **Create, Read, Update, and Delete** (CRUD) operations on job applications.
* **Local Storage**: All data is automatically stored in the browser's local storage, making it persistent between sessions.
* **Export & Import Data**: Export all application data to a `.json` file and import it back if needed, even after clearing the browser's cache.
* **Beautiful UI**: Designed with Tailwind CSS for a modern and responsive interface with maroon theme.
* **Tabular View**: All job applications are displayed in a table, providing a clear and structured view of the data.
* **Analysis Charts**: Track application insights with visual charts such as Job Status, CTC Distribution, and Location-based stats.

## Analysis Charts

* Added an expandable section to display detailed charts for tracking job application data trends.
* **Charts Added**:
   * **Job Status Pie Chart**: Visual representation of the application status (e.g., Scheduled, Interviewing, Offered, Rejected).
   * **CTC Distribution Bar Chart**: Shows the distribution of CTC for various job applications.
   * **Hiring Process Radar Chart**: Shows the distribution of hiring processes.
   * **Location Pie Chart**: Displays the percentage of applications per location.
* Users can easily toggle the visibility of charts, keeping the main dashboard minimal but offering insights when needed.

## Installation

To run **TrackFlow** locally on your machine, follow these steps:

1. Clone the repository:

```
git clone https://github.com/vivekanand-vr/trackFlow.git
cd trackFlow
```

2. Install the required dependencies:

```
npm install
```

3. Set up Firebase:
   - Create a Firebase project and obtain the configuration details.
   - Add the Firebase configuration to your project (typically in a `.env` file or a config file).

4. Start the development server:

```
npm run dev
```

5. Open your browser and navigate to:

```
http://localhost:5173
```

## Directory Structure
```
TrackFlow
    ├── node_modules
    ├── public
    ├── src
    │     ├── components
    │     |     ├── actionButtons
    |     |            ├── DisplayType.jsx
    |     |            ├── ExportImportData.jsx
    |     |            ├── SortJobs.jsx
    │     │     ├── Charts.jsx
    │     │     ├── JobForm.jsx
    │     │     ├── JobList.jsx
    │     │     ├── SkillsInput.jsx
    │     │     ├── SignIn.jsx
    │     │     └── ProfileDropdown.jsx
    │     ├── pages
    │     │     ├── Dashboard.jsx
    │     │     └── LandingPage.jsx
    │     ├── utils
    │     │     └── Functions.js
    │     ├── context
    │     │     └── userContext.jsx
    │     ├── authentication
    │     │     ├── authMethods.jsx
    │     │     └── firebaseConfig.jsx
    │     ├── App.jsx
    │     ├── index.css
    │     └── main.jsx
    |
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## Usage

1. **Sign Up/Login**: Use the authentication system to create an account or log in.
2. **Add Application**: Click on the "Add Application" button to enter job details such as position, company name, status, and any other relevant info.
3. **Track Applications**: All job applications will be displayed in a table where you can easily see and edit their details.
4. **CRUD**: You can update or delete any application directly from the table.
5. **View Analysis**: Use the "View Analysis" button to expand a section displaying charts for detailed insights into your applications.
6. **Export Data**: To back up your data, click on the "Export" button to download a `.json` file with all your job application details.
7. **Import Data**: To restore data, click the "Import" button and upload the previously exported `.json` file.
8. **Profile Management**: Access your profile information and sign out option from the profile dropdown in the top right corner.

## Authentication

TrackFlow now uses Firebase Authentication for secure user management. This includes:

- Email/password authentication
- Google sign-in option
- Protected routes for authenticated users

## Contribution Guidelines

Contributions are welcome! If you'd like to contribute to **TrackFlow**, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bugfix:

```
git checkout -b feature/your-feature-name
```

3. Make your changes and commit them with a descriptive message.
4. Push to your forked repository:

```
git push origin feature/your-feature-name
```

5. Open a pull request, and your changes will be reviewed.
