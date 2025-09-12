# TaskBoard  — Node/SBA Express Server Application 

A small Node + Express application showing a **RESTful API**, **custom middleware**, **EJS views**, **HTML form → API** flow, static **CSS**, and clean code organization.  
Topic: a simple “boards & tasks” tracker with **Users**, **Boards**, and **Tasks**.


✅ SBA Requirements — Mapping
Create a server application with Node and Express
✔ src/app.mjs + routes/controllers.

Create a RESTful API using Express
✔ /api/users, /api/boards, /api/tasks with GET/POST/PATCH/DELETE.

Create & use at least two pieces of custom middleware
✔ requestTime, requireJson (+ responseTimer, apiVersion).

Create & use error-handling middleware
✔ globalERR.mjs.

Use at least three data categories
✔ users, boards, tasks in db.json.

Utilize reasonable data structuring practices
✔ controllers/, routes/, middleware/, utils/, views/, public/.

Create GET routes for all data exposed to the client
✔ List endpoints + GET by id.

Create POST routes as appropriate (at least one creatable)
✔ POST /api/tasks, /api/users, /api/boards.

Create PATCH/PUT routes (at least one editable)
✔ PATCH on all resources (e.g., /api/tasks/:id).

Create DELETE routes (at least one deletable)
✔ DELETE on all resources.

Include query parameters for data filtering
✔ /api/tasks?status=&assignee=&boardId=&q=&minPoints=&maxPoints=.

Utilize route parameters
✔ /:id across resources + RegExp route /api/users/@:name.

Adhere to REST principles
✔ Clear resources, nouns, proper verbs, status codes.

Create and render at least one view using a template engine
✔ EJS pages (index, boards, board).

Serve simple CSS
✔ public/css/style.css.

Include a form within a rendered view that interacts with your API
✔ Form in board.ejs posting to /boards/:id/tasks (server writes & redirects).

Reasonable code organization
✔ Clean folders and separation of concerns.

Program runs without errors
✔ Centralized handler + 404 pages, simple health route.

Commit frequently + README
✔ Suggested 15+ commits + this README.

Level of effort / creativity
✔ Extras: RegExp route, CSV export, client filter, health, headers.





🧠 Reflection
## Were there any requirements that were difficult to implement?

- Balancing RESTful design with speed: keeping routes/handlers clean while moving fast was tricky. Avoiding tight coupling (e.g., controllers directly touching view logic) required discipline.

- Validation vs. simplicity: lightweight validation (status enum, points ≥ 0) was enough for the SBA, but edge cases can grow quickly.

- Consistent error handling: making the API return JSON errors while pages render EJS required a coherent handler and a consistent 404 strategy.

## What would make them easier in future projects?
- Early routing plan: sketch all endpoints + payloads before coding (nouns, verbs, status codes).

- Define validation upfront: list required fields and constraints per resource; add a tiny validator.

## What would you add or change if given more time?
- Auth + sessions: basic login with roles (viewer/user/admin) and route guards.

- Pagination & sorting on list endpoints.

- Better UI: status badges, inline editing, delete buttons hitting the API, flash messages after form submit.

- Automated tests & CI: for the main endpoints and a smoke test for pages.

## Notes for future-me (lessons learned)
- Keep controllers thin and pure: parse input → validate → read/write → return.

- Add one error handler early; don’t duplicate try/catch behavior in routes.

- Commit small and often; each commit should compile and run.

- When the UI touches the API, prefer HTML form → server handler → redirect for simplicity (JS can come later).

