# **_Coeus System Inc API._**

**Check-Out the API at:**
[Coeus-System-Inc](https://coeus-system-inc.herokuapp.com/inventory).

For access to the API repo of Coeus System Inc. click on [Coeus-System-Inc_API](https://github.com/tchang46343/coeus-api-backend.git).

##API Methods:##

- **Returns json data about a single user.**

`/inventory/:id`

- **Method:**

`GET`

##URL Params:##

- **Required:**
  `id=[integer]`

- **Data Params:**
  `None`

- **Sucess Response:**
  - Code:200
    COntent: `{ vendor:"Apple", item_name:"Iphone", description:"Flagship product", price:"$1000.00", availbility:"Yes" }`
- **Error Response:**

  - Code:404 Not Found
    COntent: `{ error : "User doesn't exist" }`

- Sample Call:

  `app.get("/inventory/:id", (req, res) => { db("newvendor") .where({ id: req.params.id }) .select() .then(data => { res.send(data); }); });`

- **User can POST data into the Database.**

`/inventory`

- **Method:**

`POST`

##URL Params:##

- **Required:**
  `vendor=[vendor name]`
  `item_name:[Iphone]`
  `description:[Flagship product]`
  `price:[$1000.00]`
  `availbility:[Yes]`

* **Data Params:**
  Application/JSON Format

* **Sucess Response:**

  - Code:200
    Content: `{vendor:"LG", item_name:"C9BUA 65'OLED TV", description:"Flagship product TV", price:"$2100.00", availbility:"Yes" }`

* **Error Response:**
  - Code:404 Not Found
    Content: `{ error : Missing '${key}' in request body }`

## Coeus System Inc API Summary:

As a result, the benefit of using Coeus System Inc is to provide a single point inventory management system. As an added benefit the application data exists in the cloud, which in turn lets the customers have complete visibility to their products. The API hosting platform is all done through Heroku. Heroku is the key to the data base for production.

## Technology Languages Used:

- POSTGRESQL
- Javascript
- NODE
- MIDDLEWARE FRAMEWORKS: (EXPRESS, MORGAN, MOCHA, CHAI)
- Postgrator
