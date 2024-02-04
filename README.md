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

1. **Clone the Repository**

   Clone the repo to your local machine using:

   ```bash
   git clone https://github.com/kaikrmen/tasks-frontend.git
   cd tasks-frontend-main
   
   ```

