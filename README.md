# Tasks Management Web Application

## Description

The Tasks Management Web Application is a comprehensive solution for managing tasks with functionalities to create, read, edit, and delete tasks, along with a special feature to toggle a task's completion status (isDone). Built with Next.js, this application offers a seamless user experience with server-side rendering capabilities for fast loading times and dynamic content updates. It leverages Auth0 for robust user authentication, ensuring secure access to tasks. The application's frontend interacts with an Express backend, requiring Auth0 tokens for accessing task-related operations. Material-UI (MUI) is used to craft a responsive and aesthetically pleasing interface, enhancing user interaction and accessibility.

## Features

- **CRUD Operations**: Create, read, update, and delete tasks.
- **Task Completion Toggle**: Mark tasks as done or pending with a special toggle feature.
- **Secure Authentication**: Utilizes Auth0 for secure user authentication and route protection.
- **Express Backend Integration**: Communicates with an Express backend, passing Auth0 tokens for authenticated requests.
- **Responsive Design**: Employs Material-UI for a modern, responsive design.
- **End-to-End Testing**: Incorporates Cypress for comprehensive testing to ensure application reliability.

## Installation

### Prerequisites

- Node.js (latest stable version recommended)
- An Auth0 account for authentication setup
- An Express backend running with endpoints for task management

### Setup

**Clone the Repository**

   Clone the repo to your local machine using:

   ```bash
   git clone <repository-url>
   cd tasks-app
   ```

### Install Dependencies

- Install the necessary node modules:

   ```bash
   npm install

### Environment Variables

Create a `.env` file in the root directory with the following variables:

- `AUTH0_SECRET`: <Your_Auth0_Secret>
- `AUTH0_BASE_URL`: http://localhost:3000
- `AUTH0_ISSUER_BASE_URL`: <Your_Auth0_Domain>
- `AUTH0_CLIENT_ID`: <Your_Auth0_Client_ID>
- `AUTH0_CLIENT_SECRET`: <Your_Auth0_Client_Secret>
- `AUTH0_AUDIENCE`: : <Your_Auth0_Auth_Audience>


### Run the Development Server

   ```bash
   npm install
   npm run dev
```

- This will launch the app on http://localhost:3000.

## Usage

After logging in through Auth0, users can perform the following actions:

Creating Tasks: Add new tasks through a user-friendly interface.
Viewing Tasks: Browse through a list of tasks.
Editing Tasks: Modify task details as needed.
Deleting Tasks: Remove tasks no longer required.
Toggling Task Status: Mark tasks as done or pending to track completion.
Ensure to pass the Auth0 token to the Express backend for authenticated operations.

Technologies
- Frontend: Next.js for SSR and client-side navigation.
- Authentication: Auth0 for secure access and user management.
- UI Design: Material-UI for responsive layouts and components.
- Backend: Express.js for handling task-related operations.
- Testing: Cypress for end-to-end testing.


## Development
- Linting: Run npm run lint to identify and fix lint issues.
- Testing: Execute npm run cypress:open to run Cypress tests. Ensure the app and backend are running.
- Building for Production: Use npm run build followed by npm start to deploy a production build.

## Contributing
Contributions are welcome. Please fork the repository and submit pull requests for any new features or bug fixes. Follow the project's coding standards and ensure all tests pass before submitting pull requests.

## License
This project is open source and available under MIT License.

## Assets 

<img src="./public/Screenshot 2024-02-04 102719.png">

</br>

<img src="./public/Screenshot 2024-02-04 102735.png">

</br>

<img src="./public/Screenshot 2024-02-04 102816.png">

</br>

<img src="./public/Screenshot 2024-02-04 102831.png">

</br>

<img src="./public/Screenshot 2024-02-04 102846.png">

</br>

<img src="./public/Screenshot 2024-02-04 102908.png">

</br>

<img src="./public/Screenshot 2024-02-04 102923.png">

</br>

<img src="./public/Screenshot 2024-02-04 102936.png">

</br>

<img src="./public/Screenshot 2024-02-04 102949.png">