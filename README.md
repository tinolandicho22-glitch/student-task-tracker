# Student Task Tracker

## 1. Application Description
Student Task Tracker is a simple web application that helps students organize their academic tasks. Users can add tasks with due dates, mark tasks as completed, delete tasks, filter tasks, and keep their task list saved in their browser.

## 2. Main Features
- Add tasks with due dates
- Mark tasks as complete or undo completion
- Delete tasks
- Filter all, pending, and completed tasks
- Display task counts
- Save tasks using browser local storage
- Responsive user interface

## 3. Technologies Used
- HTML5
- CSS3
- JavaScript
- Git and GitHub
- Docker and Nginx
- GitHub Actions
- Render

## 4. Run the Application Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/tinolandicho22-glitch/student-task-tracker.git
   ```
2. Open the project folder.
3. Open `index.html` in a browser.

## 5. Docker Instructions
Build the Docker image:

```bash
docker build -t student-task-tracker .
```

Run the container:

```bash
docker run -d --name student-task-tracker -p 8080:80 student-task-tracker
```

Open `http://localhost:8080` in your browser.

To stop and remove the container:

```bash
docker rm -f student-task-tracker
```

## 6. CI/CD Workflow
The GitHub Actions workflow is stored in `.github/workflows/ci-cd.yml`. It runs when code is pushed to the `main` branch or when a pull request targets `main`.

The workflow checks JavaScript syntax, verifies required files, builds the Docker image, runs the container, and tests whether the website responds successfully.

Render is configured separately to host and deploy the application.

## 7. Deployment
Live application: https://student-task-tracker-ysvp.onrender.com

Source code: https://github.com/tinolandicho22-glitch/student-task-tracker

## 8. Version Control
Git is used to track project changes. Meaningful commits record application development, Docker configuration, and subsequent updates. The repository contains the project history.

## 9. Testing
The project includes an automated JavaScript syntax check, required-file checks, a Docker image build, and a website response test in GitHub Actions. The application should also be tested manually in a browser.

## 10. Continuous Update
After the initial deployment, a visible heading change was committed and pushed to GitHub. The deployment must be checked to confirm that the updated heading appears on the live website.

## 11. Conclusion
This project demonstrates a basic DevOps workflow using source control, containerization, automated checks, and cloud hosting. It provides practical experience in maintaining and deploying a web application.
