# Train_Scheduler

Deployed Page: https://thomwint.github.io/Train_Scheduler/

I created a train schedule application that incorporates Firebase to host arrival and departure data. My app will retrieve and manipulate this information with Moment.js. The website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

The app suits the following basic specs:

When adding trains, administrators should be able to submit the following:
Train Name
Destination 
First Train Time -- in military time
Frequency -- in minutes
Code this app to calculate when the next train will arrive; this should be relative to the current time.
Users from many different machines must be able to view same train times.

This was mainly a mathematical understanding of how moment.js works and understanding if the time frames set for train departure and arrivals works correctly. Manipulated the table to update each time a instance is requested.  Made sure that all users can see the information stored in firebase.
