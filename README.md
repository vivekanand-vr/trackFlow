# TrackFlow

**TrackFlow** is a simple and efficient job application tracking system. It's a single-page application (SPA) with a clean, user-friendly UI, allowing users to add, track, and manage their job applications with ease.

## Features

* **Personalized Dashboard**: Each user has their own dashboard to manage their job applications.
* **Add Job Applications**: Users can input their job application details (e.g., position, company, status) and track their progress.
* **Track Progress**: Keep track of the status of each application (e.g., applied, interviewed, rejected, etc.).
* **Sort Applications**: Users can sort job applications by `date` or `C.T.C` (Both Ways) values.
* **Display Type**: Display applications based on job status, by defaule displays all.
* **CRUD Operations**: Perform full **Create, Read, Update, and Delete** (CRUD) operations on job applications.
* **Local Storage**: All data is automatically stored in the browser's local storage, making it persistent between sessions.
* **Export & Import Data**: Export all application data to a `.json` file and import it back if needed, even after clearing the browser's cache.
* **Analysis Charts**: Track application insights with visual charts such as Job Status, CTC Distribution, and Location-based stats.

## Analysis Charts

* Added an expandable section to display detailed charts for tracking job application data trends.
* **Charts Added**:
   * **Job Status Pie Chart**: Visual representation of the application status (e.g., Scheduled, Interviewing, Offered, Rejected).
   * **CTC Distribution Bar Chart**: Shows the distribution of CTC for various job applications.
* Users can easily toggle the visibility of charts.

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

4. Start the development server:

```
npm run dev
```

5. Open your browser and navigate to:

```
http://localhost:5173
```

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
