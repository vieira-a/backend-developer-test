<p align="center">
  <h5>Technical challenge for Backend Developer</h5>
  <h1>Job posting management</h1>
</p>

<br>

<p align="center">
  <a href="#Project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Resources">Resources</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Methodologies">Methodologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Functionalities">Functionalities</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Samples">Samples</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#How to use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Bonus question">Bonus question</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<br>

# Project

The main objective of this project is to provide an application for managing job postings. Through it it will be possible to create new posts, as well as manage them.

**Backlog**

Please, access the [backlog](https://trello.com/invite/b/W8FrIRWw/ATTI1cf92d52548a235e37f97341200912a6F524AA15/plooral-avaliacao-tecnica-para-desenvolvedor-backend) which I made available for assessment of the execution tasks of this technical test.

# Resources

**Main usecases**

- Create a new job posting: performs a basic registration of job postings with the default status of "draft".
- Update a job posting: updates `title, description, location` fields.
- Delete a job post: functionality to delete a post.
- Publish a job posting: the act of publishing a draft post. Only posts with the status `draft` or `archived` can be published.
- Archive a job post: act of archiving an already published post
- View a feed of published job postings: Loads the job feed through **Redis**, which is updated according to the AWS S3 bucket.

**Accessories usecases**

- Search job posting by ID
- List all companies
- Search company by ID

**Testes unitários**

Unit tests were applied to the application (services) and presentation (controllers) layers.

Unit tests can be run using the `npm run test` command

# Technologies

- NPM
- Node.js
- Nest.js
- Nest Logger
- Nest Global exception filter
- Nest class-validator
- Mudule architecture
- PostgreSQL
- TypeORM
- AWS SQS
- AWS S3
- AWS Lambda
- Jest
- Git
- Swagger
- Express
- ESLint

# Methodologies

Good design and project architecture practices were applied, such as:

- Clean Architecture
- DDD
- TDD
- Conventional Commits
- GitFlow
- Modular Design
- Dependency Diagrams
- Dependency Injection
- Use Cases

The project structure, as well as documentation on use cases and context diagrams, can be seen in the [artifacts](https://github.com/vieira-a/backend-developer-test/tree/andersonvieira/artifacts)

# Functionalities

The main functionality requirements are described in:

[Requeriments](https://github.com/vieira-a/backend-developer-test/blob/master/README.md)

# Samples

- Swagger

<p align="center">
  <img alt="Swagger screenshot image" src="artifacts/swagger_screen.png" width="100%">
</p>

# How to use

**1. Requeriments**

Make sure you have the following items installed:

- [Node.js](https://nodejs.org/en/download)
- [NPM](https://docs.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com)

**2. Clone the repository**

`git@github.com:vieira-a/backend-developer-test.git`

**3. Set environment variables**

- Create a `.env` file in the directory project root according with `.env.example`:

```
API_HOST_DEVELOP=
NODE_ENV=
API_HOST_PRODUCTION=
API_PORT=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_ADMIN_EMAIL=
AWS_SQS_URL=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
AWS_BUCKET_KEY=
REDIS_URL=
REDIS_PORT=
```

This data will be used to create the **PostgreSQL** database container, the database management interface, **pgAdmin**, an instance of **Redis**, and will also be necessary to carry out the integrations with Amazon Web Services - AWS services.

**4. Create and run the necessary containers**

`docker-compose up -d`

**5. Install project dependencies**

`npm install`

**6. Create the table model in the database**

Execute the query contained in _src/infrastructure/database/sql/scripts/models.sql_ to create the tables in the database.

**7. Initialize the application**

`npm run start:dev`

**8. AWS Lambda**

The lambda function example file is located at: `src/infrastructure/aws/lambda/lambda_function.zip`

To execute it, follow the necessary steps:

- Create a new Lambda function in the AWS Lambda environment, observing all necessary role and function configurations;

- Configure the AWS lambda environment variables with the following keys;

```
AWS_SQS_URL=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
DB_CONNECTION_STRING=
```

- Import the _lambda_function.zip_ file into your Lambda function.

**9. Access**

- API: http://localhost:3000/api/v1
- Documentation: http://localhost:3000/api/v1/docs

# Bonus question

To mitigate overload problems, it is necessary to provision resources that provide scalability to the application. For this case, I think scaling horizontally would be the best scenario. To this end, the solutions would be based on a microservices architecture, messaging systems, load balancing and caching. Below is a brief explanation of how the implementations would help scale the application with resilience:

**Microservices Architecture**

It would be possible to divide responsibilities, with each microservice responsible for a specific part of the application, making it easier to scale parts of the application that are under greater demand without having to scale the entire system. Furthermore, microservices can be developed, deployed and scaled independently, allowing quick updates and fault mitigation without affecting the system as a whole.

**Message service**

A messaging service could reduce coupling, as messaging allows application components to communicate asynchronously, reducing direct dependencies between services and improving resilience.

Message queues can act as a buffer for traffic spikes, ensuring that systems are not overloaded and can process requests in a controlled manner. Additionally, with messaging systems, you can add consumers to queues to process messages faster during peak demand, providing effective horizontal scalability.

**Load Balancing**

Intelligent Traffic Distribution: Load balancing contributes to intelligent traffic distribution, handling user requests between different instances or servers, avoiding overload points and optimizing resource usage. Furthermore, it contributes to the detection of failures, being able to redirect traffic from instances with problems to healthy ones, keeping the application accessible.

**Cache**

Distributed Cache: to reduce the load on databases and endpoints.
