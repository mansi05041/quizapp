# Quiz Application Frontend

This project is the frontend of a quiz application built using React and Bootstrap. The application allows users to create quizzes, play quizzes, and manage questions.

## Table of Contents

1. [Running the Application](#running-the-application)
2. [Functionality Overview](#functionality-overview)
    - [Home Page](#home-page)
    - [Create Quiz Page](#create-quiz-page)
    - [Play Quiz Page](#play-quiz-page)
    - [Question Management Page](#question-management-page)


## Running the Application

To run the application locally:

```bash
npm start
```
The application will be available at ```http://localhost:3000```.

## Functionality Overview

### Home Page
```Location: / ```</br>
The Home Page provides a brief introduction and navigation options 
to other parts of the application.

### Create Quiz Page
```Location: /quiz/create```

The Create Quiz Page allows users to create a new quiz by providing the following details:

- Quiz Title 
- Number of Questions 
- Category (dropdown with all categories and an option for all categories)

</br>Upon submission, the quiz is created, and a success message is displayed.

### Play Quiz Page
```Location: /quiz/play```

The Play Quiz Page allows users to select and play a quiz. The functionalities include:

- A dropdown to select a quiz from the available quizzes.
- Displaying all questions of the selected quiz.
- Answering each question by choosing one of the options.

</br>Submitting the quiz and displaying a success message upon successful submission.

### Question Management Page
```Location: /questions```

The Question Management Page provides functionalities to manage questions. The functionalities include:

- Adding a new question.
- Updating an existing question.
- Deleting a question.
- Viewing all questions with their details.

<strong>Note:
Ensure the backend server is running on port 8080 before starting the frontend server to avoid any connectivity issues.
</strong>
