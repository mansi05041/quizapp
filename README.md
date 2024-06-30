# QUIZ APP

## Table of contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Modules and Packages](#modules-and-packages)
- [API Documentation](#api-documentation)
- [Continued development](#continued-development)
- [Useful resources](#useful-resources)

## Overview
This project is a Java backend application built using the Spring Boot framework and PostgreSQL database. It provides a set of RESTful APIs for managing.

### Technologies Used
- **Spring Boot:** A framework for building Java applications.
- **PostgreSQL:** A powerful, open-source relational database system.
- **Maven/Gradle:** Dependency management and build tools.
- **JPA/Hibernate:** ORM for database interactions.


### Prerequisites

- Java JDK 11+
- Maven/Gradle
- PostgreSQL
- IDE (IntelliJ IDEA, Eclipse, etc.)

### Modules and Packages

- **com.quizWhiz.quizapp.controller** : REST controllers.
- **com.quizWhiz.quizapp.service** : Service layer.
- **com.quizWhiz.quizapp.repository** : Repository layer.
- **com.quizWhiz.quizapp.modal** : Entity classes.

## API Documentation

### Endpoints

- **Get question/allQuestions** : Retrieve all Questions
- **Get question/category/{category}** : Retrieve all questions based on the categories
- **Post question/addQuestion** : Add the question in the database
- **Delete question/deleteQuestion/{id}** : Delete the question by id
- **Update question/updateQuestion/{id}** : Update the question by id
- **Post quiz/createQuiz** : Take quiz title, number of questions and category as parameter to create the quiz from the given question database
- **Get quiz/getQuiz/{id}** : Get the all questions for that quiz that is asked by id.
- **Post quiz/submit/{id}** : Take the response as question-id and the choose option and calculate the result.


### Continued development
Need to come up with frontend Part

### Useful resources
- [Spring Boot Project for Beginners](https://youtu.be/vlz9ina4Usk?si=hLb1H9JGG84mwwGQ) - YouTube tutorial helps me to understand this project.
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)


