#TODO:

References:
https://typeorm.io/#/delete-query-builder
https://gist.github.com/arielweinberger/a6ccf45fb7501fd1bd15bd5632ea9056

https://jwt.io/

- Create the next entities with the mentioned criteria:

1. TaskSchedules

- Columns:
  taskId (fk)
  createdBy
  updatedBy
  scheduleDate
  currentStatus
- foreingkey to tasks and user entities

2. SchedulesChangesHistory

- Columns:
  ScheduleId (fk)
  previousStatus
  newStatus
  changedBy (fk)
  date

---

3. create a raw query and execute with typeORM
4. Learn how to implement Husky and Prettier

### Functionality and packages to integrate:

- Run crown job that execute a general report each specific time
- stablis a operations loggin mecanism
- Configure snowflakes connection
- configure swagger
- configure caching module "redis"
- configure commitizen
- configure compodoc
- configure husky
