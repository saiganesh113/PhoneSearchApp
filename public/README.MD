                                                    ->PhotoSearch App<-
                                                    --------------------
Overview
--------
The PhotoSearch app allows users to search for photos using the Unsplash API. Users can search for photos, view them in a grid, click on an image to see more details, and download the image if desired. It also includes a user information section where users can submit and view their name and email.

Features
--------
Search Photos: Enter a search term to find photos from Unsplash.
View Photo Details: Click on a photo to view a larger image and its description.
Download Photos: Download the selected photo directly.
User Info: Click on the user icon to submit and view user details.

Technologies Used
-----------------
React: For building the user interface.
Bootstrap: For styling and layout.
Axios: For making HTTP requests to the Unsplash API.
React-Bootstrap: For using Bootstrap components in React.

Installation
------------
To get started with the project locally, follow these steps:

->Clone the Repository:

git clone https://github.com/saiganesh113/PhoneSearchApp.git


->Navigate to the Project Directory:

cd image-serach-app-reactjs-main


->Install Dependencies:

npm install
This will install all the necessary packages listed in package.json.

->Run the App:

npm start
This will start the development server and open the app in your default web browser.

Usage
-----
Search for Photos:

Enter a keyword in the search bar and click "Search" to find photos.
The results will be displayed in a grid.

->View Photo Details:

Click on any photo to open a modal with a larger view and description.
You can also download the photo by clicking the "Download" button in the modal.

->User Info:
Click on the user icon to open a form where you can enter your name and email.
Submit the form to see your details displayed on the screen.

->Components
PhotoSearch: Main component that handles photo searching, displaying results, and showing the photo details modal.
UserInfo: Component that displays the user form and user details.

->API
The app uses the Unsplash API to fetch photos. You will need a valid Unsplash API key. Replace the placeholder key in the PhotoSearch component with your own.

->License
This project is licensed under the MIT License - see the LICENSE file for details.