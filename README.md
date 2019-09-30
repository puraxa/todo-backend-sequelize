## Configuration
After cloning repository you will need to install dependencies
```
    nmp install
    npm start
```
If you want to change which port server should use, you will need to provide port number as parameter  
```
PORT=3000 npm start
```
Change 3000 with port you want to use.  
You will need to create `.env` file on root. After creation enter following
```
DATABASE=/database name/
USERNAME=/username/
PASSWORD=/password/
HOSTNAME=/hostname/
SECRETKEY=/secret key for jwt/
```
and save.

# Usage
All post requests should have header 'Content-type' set to 'application/json'.  
Token is json web token you get when you succesfully log in.


## USER


Method | Endpoint | Req headers | Req body | Response |
--- | --- | --- | --- | --- |
POST | user/login | {} | {email: string, password: string} | {token: string} | 
POST | user/register | {} | {email:string, password} | {message: string} | 
GET | user/check-auth | {'Authorization': token} | {} | {} |
GET | user/logout | {'Authorization': token} | {} | {} |

## TODO


Method | Endpoint | Req headers | Req body | Response |
--- | --- | --- | --- | --- |
GET | todo/ | {'Authorization': token} | {} | [{id: string, name_of_list: string, date_created: Date }] | 
POST | todo/ | {'Authorization': token} | {name: string} | {} |
GET | todo/:id | {'Authorization': token} | {} | {_id: string, user_id: string, date_created: Date, name_of_list: string, items: [{_id: string, dateCreated: Date, dateCompleted: Date, isCompleted: boolean, value: string}]} |
DELETE | todo/:id | {'Authorization': token} | {} | {message:string} | 
DELETE | todo/:id/item/:id | {'Authorization': token} | {} | {} |
POST | todo/:id | {'Authorization': token} | {value: string} | {message: string} |
PATCH | todo/:id/item/:id/edit | {'Authorization': token} | {value: string} | {} |
PATCH | todo/:id/item/:id/complete | {'Authorization': token} | {} | {} |