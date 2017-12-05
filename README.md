# Bar Chart Data Visualization
This project was my submission for a recruitment coding exercise for an internship.

## Instructions
>Build and deploy a NodeJS server, which renders an HTML page with an interactive bar chart data visualization of public open data.

>You will use the public data API from Marin County. The dataset contains information about contracts (department, amount, date, id, ...) in the County from July 1, 2016 to June 30, 2017.

>Link to the dataset page: https://data.marincounty.org/County-Government/Delegated-Contracts/rp6f-b7dy/

>API URL: https://data.marincounty.org/resource/mw3d-ud6d.json
>Parameters to use: month_and_year

>This API gives back an Array of JSON. The relevant JSON fields for the exercise are ‘department’ and ‘amount’.

>Display the total sum amount by department in a bar chart. The user must be able to choose the month_and_year filter value with a Month picker widget. The widget and chart must be interactive. When the user changes the Month picker value, the chart has to update and display the new data.

## Additional Information
Since the use of NodeJS was mandatory despite the fact that this project did not necessitate a lot of backend (considering the provided API), I decided to make the most out of it and to process the data in the backend. It might not be particularly relevant for a small database like this one, but for a bigger one it could greatly decrease the amount of information sent from the backend to the frontend.

I also chose not to use a frontend framework like Angular because it would have been overkill in my opinion.

[Here is the Heroku link for this project.](https://afternoon-retreat-74426.herokuapp.com) 
