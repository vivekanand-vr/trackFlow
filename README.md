# TrackFlow

**TrackFlow** is a simple and efficient job application tracking system built using **React JS** and **Tailwind CSS**. It's a single-page application (SPA) with a clean, user-friendly UI, allowing users to add, track, and manage their job applications with ease. It stores all the user data in **local storage**, so users can retrieve their application status even after refreshing the page. Additionally, the app provides an **import/export** feature that lets users export their data in a `.json` file and import it later if needed.

## Features

* **Add Job Applications**: Users can input their job application details (e.g., position, company, status) and track their progress.
* **Track Progress**: Keep track of the status of each application (e.g., applied, interviewed, rejected, etc.).
* **CRUD Operations**: Perform full **Create, Read, Update, and Delete** (CRUD) operations on job applications.
* **Local Storage**: All data is automatically stored in the browser's local storage, making it persistent between sessions.
* **Export & Import Data**: Export all application data to a `.json` file and import it back if needed, even after clearing the browser's cache.
* **Beautiful UI**: Designed with Tailwind CSS for a modern and responsive interface with visually appealing colors and layouts.
* **Tabular View**: All job applications are displayed in a table, providing a clear and structured view of the data.

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

3. Start the development server:

```
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

## Usage

1. **Add Application**: Click on the "Add Application" button to enter job details such as position, company name, status, and any other relevant info.
2. **Track Applications**: All job applications will be displayed in a table where you can easily see and edit their details.
3. **CRUD**: You can update or delete any application directly from the table.
4. **Export Data**: To back up your data, click on the "Export" button to download a `.json` file with all your job application details.
5. **Import Data**: To restore data, click the "Import" button and upload the previously exported `.json` file.

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
