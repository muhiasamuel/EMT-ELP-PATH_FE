# ELP PATH

The System Name is a web-based application developed using Angular JS for the frontend. It provides a user portal where users can register, update their profiles, join hubs, share posts, connect with friends, apply for jobs, register for events, and receive notifications. The backend of the system is built using Java Spring Boot.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)

## Features
- User Registration: Users can create an account by providing their personal information and employment details.
- Profile Management: Users can update their academic and career information, as well as manage their profile picture and social media profiles.
- Hub Membership: Users can join hubs (groups/communities) based on their interests.
- Post Feed: Users can create and view posts, like, comment, and share posts.
- Connection with Friends: Users can follow and connect with friends to receive updates from their feeds.
- Job Application: Users can search and apply for jobs within the system.
- Event Registration: Users can register for events organized within the system.
- Notifications: Users receive notifications about new job postings, event updates, and interactions with their posts.
- Admin Roles: Admins have additional privileges to manage users, events, hubs, and job postings.

## Installation
1. Clone the repository: `git clone https://github.com/username/repo.git`
2. Navigate to the project directory: `cd project-directory`
3. Install dependencies: `npm install`

## Usage
1. Start the development server: `ng serve`
2. Access the application in a web browser at `http://localhost:4200`

## Configuration

1. Configure the backend API endpoint in the `environment.ts` file. Replace `YOUR_API_ENDPOINT` with the actual API endpoint.
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'YOUR_API_ENDPOINT'
   };
   ```

2. Make sure the backend server is running and accessible.

## Technologies
- Angular Js: Frontend JavaScript library for building user interfaces.
- Java Spring Boot: Backend framework for building robust and scalable applications.
- HTML5: Markup language for structuring the web pages.
- CSS3: Stylesheet language for enhancing the visual appearance.
- JavaScript: Programming language for implementing interactive elements.
- RESTful APIs: Communication protocol for connecting frontend and backend.
- Database: Storage system for persisting user data and system information.

