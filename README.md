Frontend :

• Index Page: This will list the meals in my database (route “/”) 
• Create Page/View: A form to create a meal (route: “/meals/new”) 
• Detail Page/View: A page to actually see the details of a meal with links to view a meal and to possibly delete it (route: “meals/:id/details) 
• Edit Page/View: A page to edit an athlete in the database (route “meals/:id/edit) 
Components (1): Reused -Form: The form that we will use on the create page and the edit page

Backend : 

Get request: “/api/meals: return all meals in the database
Post request: “/api/meals”: create a new meal
Get request: “/api/meals/:id”: retrieve a specific meal
Put request: “/api/meals/:id”: update a specific meal
Delete request: “/api/meals/:id”: delete a specific meal
