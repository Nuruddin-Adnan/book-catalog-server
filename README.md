
# Bookcat server

This is a Book catalog backend  made for assignment 5 programmin hero


## Live Api Link

[https://book-catalog-server-rho.vercel.app/](https://book-catalog-server-rho.vercel.app//)


## Features

* User can Login and logout
* Anyone can see the the books and details of the book with filter and search
* Authenticate user can add new book by clicking add new book button 
* User can delete and update him/her book
* User can add book to wishlist and my reading list
* User can remove book from wishlist
* User can remove book from my reading list and update the status of my reading list





## Installation

Install with yarn

```bash
  yarn 
```

## Settings

settings.json (vs code settings)

```bash
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```
    



## API Reference

#### user

```json
  GET api/v1/users/my-profile  see personal profile
  PATCH api/v1/users/my-profile update the profile information
  PATCH api/v1/users/${id} Admin can update the user
  GET api/v1/users/${id} Admin can see the user profile
  GET api/v1/users/ Admin can see all the users
  DELETE api/v1/users/${id} Admin can delete the user

```


#### Auth

```json
  GET api/v1/auth/login login a user
  POST api/v1/auth/signup signup a user
  POST api/v1/auth/refresh-token generate a new refresh token
```


#### Admin

```json
  POST api/v1/admins/create-admin create an admin by super_admin or another admin
  POST api/v1/admins/login login a admin
  POST api/v1/admins/refresh-token generate a new refresh token
  GET api/v1/admins/my-profile Admin cab see personal profile
  PATCH api/v1/admins/my-profile Admin can update the profile
  DELETE api/v1/admins/:id super_admin can delete the admin
```

#### Book

```json
  POST api/v1/books/ create new book
  GET api/v1/books/ get the books
  GEt api/v1/books?search=sometext&searchFields=somefields&limit=10 Filter and sorting
  PATCH api/v1/books/review/:id give a review by logied in user
  PATCH api/v1/books/:id update book info by authenticate user
  DELETE api/v1/books/:id Delete a book by authenticate user
```

#### Wishlist

```json
  POST api/v1/wishlists/ user can add book into there wishlist
  GET api/v1/wishlists/my-wishlists get specific user wishlists
  DELETE api/v1/wishlists/:id Delete a wishlist by authenticate user
```

#### MyReadinglist

```json
  POST api/v1/my-reading-lists/ user can add book into there reading-list
  GET api/v1/my-reading-lists/my-reading-lists get specific user reading-lists
  PATCH api/v1/my-reading-lists/:id Update the status of  reading-lists by authenticate user
  DELETE api/v1/my-reading-lists/:id Delete book from reading-lists by authenticate user
```


## Author

 [https://github.com/Nuruddin-Adnan](https://github.com/Nuruddin-Adnan)

