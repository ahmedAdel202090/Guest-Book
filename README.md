# Guest Book

# use cases based on requirements and Assumptions
- user can login and register
- user can create Guest Book
- invite friends to join
- any user can create , update , delete his messages
- Guest Book owner the only one can delete any message
- user can reply to any message

# choices made
- in case user registration, password will be hashed in database to increase security
- in case user login , use JWT and save generated token in cookie.

# Run Application
- npm install at './' path
- npm start at './' path
- Note: make sure mongodb activated.