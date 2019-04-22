# WillCodeForWillToLive
## Project Description

This is an implementation of the Sumerge project for the Software Engineering course 'CSEN601'

-----
## Important:Server heroku Deployment link:https://sumerge-se.herokuapp.com/
## Important:Client heroku Deployment link:https://sumerge-portal.herokuapp.com/
## Contribution
- Clone the repo.
- Check out to your branch ```git checkout <branchname>```.
- Use the branch that correspond to the task you were handed.
- When you're done, push to your branch and at the end create a pull request to the dev branch.
- Please don't edit the .gitignore file unless you tell other members first.
----
## Project Setup
- Clone the repository ```git clone https://github.com/SE-GUC/WillCodeForWillToLive```
- Access the repository directory ```cd WillCodeForWillToLive```
- Check out to the correct branch ```git checkout <branch name>```
- install required pacakges ```npm i```
- Copy .env_example to .env then open it and add the server port number and mongo uri
- To run the server use the command ```npm run dev``` and it will use nodemon to restart the server each time you save
----
## Important: For React
- Clone the repository ```git clone https://github.com/SE-GUC/WillCodeForWillToLive```
- Access the repository directory ```cd WillCodeForWillToLive```
- Check out to the correct branch ```git checkout <branch name>```
- ~~install required pacakges ```npm i```~~
- ~~access the client directory ```cd client```~~
- ~~install required pacakges ```npm i```~~
- ~~go back to repo directory ```cd ..```~~
- pull from react_dev branch ```git pull origin react_dev```
- Run this command ```cp .env_example .env && npm i && cd client && cp .env_example .env && npm i && cd ..``` **If that didn't work:** split the && to lines (ie: type the followinig):
1.```cp .env_example .env```
2.```npm i```
3.```cd client```
4.```cp .env_example .env```
5.```npm i```
6.```cd ..```
- Copy .env_example to .env then open it and add the server port number and mongo uri inside WillCodeForWillToLive (do not add anything to the .env inside client just yet)
- make sure to add a port number besides 3000
- to run both react and and node use the command ```npm run both```
- ~~**For Now** don't edit any files. add your components to client/src/components. you can edit the files in order to test but then please revert any changes besides the added components. this is to prevent unnecessary conflicts for later. Once a common app is set up, this can be ignored~~
----
 **Hint**: You can create a folder called private tests where ever in the project to try anything without affecting the repository (*Check [.gitignore](https://github.com/SE-GUC/WillCodeForWillToLive/blob/master/.gitignore) file*).
