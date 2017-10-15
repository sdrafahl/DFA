# DFA Tester

This is a tester that will allow you to put in a transition table for a DFA with up to 26 states and
unlimited transitions. Once you have submitted the transition table you can enter the string you would
like tested. This string must be of the alphabet used by the DFA wich would be [1,2,3-...].

## Starting The Project

After you have cloned the project first setup mysql with the provided db.sql file.  

```
mysql -u username -p < db.sql

```

Now you will need to install Node.js.

```
sudo apt-get install nodejs

```

Just to be safe install some node packages.

```
sudo npm install -g

```
To start the project.

```
sudo npm start

```
