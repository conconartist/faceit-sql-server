# faceit-sql-server

This API is to be used with this version of the FaceIt application: https://github.com/conconartist/face-it


Deployed on heroku: https://faceit-server.herokuapp.com/

**Endpoints:**

| Purpose                 | URL                    | Verb   | Request Body | Sample Success Response                          |
| ----------------------- | ---------------------- | ------ | ------------ | ------------------------------------------------ |
| Get all products        | `/products`            | GET    | N/A          | An array of objects: `{products: [{}, {}, ...]}` |
| Save a new product      | `/products`            | POST   | `{brand: <String>, name: <String>, price: <Number>, price_sign: <String>, currency: <String>, image_link: <String>, product_link: <String>, website_link: <String>, description: <String>, product_type: <String>, cruelty_free: <Boolean>, fair_trade: <Boolean>, organic: <Boolean>, vegan: <Boolean>, zero_waste: <Boolean>}` | New product added to database: `{"id": 5, "brand": "raw elements", "name": "Tinted Face Moisturizer SPF 30", "price": "17.99", "price_sign": "$", "currency": null, "image_link": "https://cdn.shopify.com/s/files/1/0387/4965/products/SnowPeachSWATCH_1024x1024.jpg?v=1571439561", "product_link": "https://www.rootpretty.com/collections/makeup/products/snow-peach-pressed-eyeshadow-pigment", "website_link": "https://www.rootpretty.com", "description": "Snow Peach is a soft shimmery peach, perfect for highlighting your brow bone & inner tear duct. But don\\'t stop there - Snow Peach makes a beautiful lid shade, too!", "product_type": "eyeshadow", "cruelty_free": 1, "fair_trade": 0, "organic": 0, "vegan": 1, "zero_waste": 1}` |
| Update existing product | `/products/:productId` | PUT    | `{brand: <String>, name: <String>, price: <Number>, price_sign: <String>, currency: <String>, image_link: <String>, product_link: <String>, website_link: <String>, description: <String>, product_type: <String>, cruelty_free: <Boolean>, fair_trade: <Boolean>, organic: <Boolean>, vegan: <Boolean>, zero_waste: <Boolean>}` | Product by ID updated in database: `{"id": 5, "brand": "raw elements", "name": "Tinted Face Moisturizer SPF 30", "price": "17.99", "price_sign": "$", "currency": null, "image_link": "https://cdn.shopify.com/s/files/1/0387/4965/products/SnowPeachSWATCH_1024x1024.jpg?v=1571439561", "product_link": "https://www.rootpretty.com/collections/makeup/products/snow-peach-pressed-eyeshadow-pigment", "website_link": "https://www.rootpretty.com", "description": "Snow Peach is a soft shimmery peach, perfect for highlighting your brow bone & inner tear duct. But don\\'t stop there - Snow Peach makes a beautiful lid shade, too!", "product_type": "eyeshadow", "cruelty_free": 1, "fair_trade": 0, "organic": 0, "vegan": 1, "zero_waste": 1}` |
| Delete single product   | `/products/:productId` | DELETE | N/A         | `Product was deleted successfully.` |
| Delete all products     | `/products`            | DELETE | N/A         | `All products were deleted successfully.` |


6/17/21- Install npm package for MySQL 2

6/20/21- Fix connection error, reinstall npm packages for MySQL, complete connection between database and table with Postman

6/22-6/23- Successfully connect server to front end

6/24/21- Fix bugs and refactor front end code to display data with new database. Refactor styling! 

7/7/21- Update endpoints