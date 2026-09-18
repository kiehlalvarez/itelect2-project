# itelect2-project

**My IT Elective 2 backend web development project in IT3C Section.**

## API TESTING

### GET /api/tasks
Returns all tasks, including the owning user (JOIN).

![GET all tasks](./GET.png)

### GET /api/tasks/:id
Returns a single task with its owning user.

![GET single task](./GET_all_users.png)

### POST /api/tasks
Creates a new task. userId is looked up from real users in the database.

![POST create task](./POST.png)

### PUT /api/tasks/:id
Updates an existing task.

![PUT update task](./PUT.png)

### DELETE /api/tasks/:id
Deletes a task by id.

![DELETE task](./DELETE.png)

### GET /api/users
Returns all users.

![GET all users](./GET_all_users.png)

### Database Verification (pgAdmin)
Confirming seeded data directly in PostgreSQL.

**Users table (3 rows)**
![Users table](./3_USERS.png)

**Tasks table (5 rows)**
![Tasks table](./5_TASKS.png)