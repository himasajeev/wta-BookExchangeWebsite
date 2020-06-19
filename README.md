# wta-BookExchangeWebsite
We intend to eliminate the intermediary processes involved in
selling and buying books, making it easier to transfer books
directly from owner to recipient by developing a platform for
transfer of books.

 # Methodology

Creating a database for storing details of books, book owners and all users. Mysql database was used.

Using the stored information of the database for retrieval of records by querying, on search made by users. We used Sequelize ORM as an interface for querying.

Develop the system which is more user-friendly with proper user interface and providing better user experience. Frontend part was developed using React.

Validation and authentication to be maintained keeping security issues as a matter of concern. PassportJS was used to maintain session based authentication on the backend while on the frontend  user-session was maintained by storing information on localstorage.

A unique profile page is created for every user with valid credentials containing information of that particular user activity.

Pages for adding and searching books are created which are indeed connected to the database.

 
