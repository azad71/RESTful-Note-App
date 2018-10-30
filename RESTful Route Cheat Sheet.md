## RESTful Routing Cheat Sheet

| Name   	| URL Path       	| HTTP Verb 	| Purpose                             	| Mongoose Method                	|
|--------	|----------------	|-----------	|-------------------------------------	|--------------------------------	|
| INDEX  	| /home          	| GET       	| Displays all posts                  	| ```Home.find()```              	|
| NEW    	| /home/new      	| GET       	| Shows a new form for new post entry 	|         N/A                    	|
| CREATE 	| /home          	| POST      	| Create a new post                   	| ```Home.create()```            	|
| SHOW   	| /home/:id      	| GET       	| Shows one specified post            	| ```Home.findById()```          	|
| EDIT   	| /home/:id/edit 	| GET       	| Shows edit form for one post        	| ```Home.findById()```          	|
| UPDATE 	| /home/:id      	| PUT       	| Updates a particular post           	| ```Home.findByIdAndUpdate()``` 	|
| DELETE 	| /home/:id      	| DELETE    	| Deletes a particular post           	| ```Home.findByIdAndRemove()``` 	|


<strong>'Home' is a mongoose instance</strong><br>
<strong>':id' is particular post id</strong>
