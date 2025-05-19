# Todo API with AWS Infrastructure

A REST API for managing tasks, deployed on AWS EC2 using Terraform for infrastructure provisioning.

## Features

- RESTful API endpoints for task management
- AWS EC2 deployment with Terraform
- PostgreSQL database using Neon.tech
- Express.js backend with Prisma ORM
- Instance metadata integration
- Secure infrastructure with configured security groups

## Tech Stack

- Node.js
- Express.js
- Prisma
- PostgreSQL
- Terraform
- AWS EC2

## API Endpoints

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| GET    | `/api/tasks`                | Get all tasks           |
| GET    | `/api/tasks/:id`            | Get task by ID          |
| POST   | `/api/tasks`                | Create new task         |
| PUT    | `/api/tasks/:id`            | Update task             |
| DELETE | `/api/tasks/:id`            | Delete task             |
| PATCH  | `/api/tasks/:id/complete`   | Mark task as complete   |
| PATCH  | `/api/tasks/:id/uncomplete` | Mark task as incomplete |

## Infrastructure

- Region: ap-southeast-2 (Sydney)
- Instance Type: t2.micro
- Security Group: Custom security group with ports 22 (SSH) and 8000 (API) open
- AMI: Ubuntu Server

## Setup & Deployment

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-api.git
```

2. Install dependencies:

```bash
cd api
npm install
```

3. Set up environment variables:

```bash
PORT=8000
DATABASE_URL=your-postgresql-url
```

4. Deploy infrastructure:

```bash
cd ..
terraform init
terraform apply
```

5. Access the API:
   The application will be available at `http://your-ec2-instance:8000`

## Development

To run the application locally:

```bash
cd api
npm run dev
```

## Project Structure

```
├── api/
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middleware
│   ├── prisma/         # Database schema and migrations
│   ├── routes/         # API routes
│   └── utils/          # Utility functions
```

## License

ISC

## Author

```
Abdul Haseeb
syedabdulhaseeb611@gmail.com
abdul-haseeb123
```
