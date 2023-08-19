# Invoice Creator
## A Scrimba Bootcamp Project

This project involved creating an application where you could enter in a specific task and assign a price to it. 
Those tasks would then be listed and their totals calculated. It also allows for the removal of any particular item 
from the list. Clicking the 'Send Invoice' button would then reset the list so you could start over and add new items. 
I have added many new stretch goals to the project of my own, including using React to build the app and Firebase to store the data.

## Table of Contents
- [Programming](#programming-languages-used)
- [Screenshots](#screenshots)
- [Links](#links)
- [Project Requirements](#project-requirements)
- [Future Goals](#future-goals)
- [Resources](#resources)

## Programming Languages Used
  - HTML
  - CSS
  - JavaScript
  - React
  - Firebase

## Screenshots
<img src="https://github.com/KeithPetr/Invoice-Creator-React/assets/91621041/8284c61a-406b-46b9-86bd-2cba29d1ded5" height="450" width="375" />
<img src="https://github.com/KeithPetr/Invoice-Creator-React/assets/91621041/3c378ded-82b8-4b9c-8567-91173a1b72d0" height="450" width="375" />
<img src="https://github.com/KeithPetr/Invoice-Creator-React/assets/91621041/c05bf795-c409-462d-8347-b1a799ea67e1" height="450" width="375" />

## Links
 [Live Demo](https://invoice-creator-react.netlify.app/)

## Project Requirements
There were 6 main requirements for this project. The first was I needed to create an array to hold all of the tasks that were entered onto the list. 
I created states within the TaskList component to hold and update this data. The second requirement was to create a button that would add each task to 
this array. The third was displaying the array data and making sure that it changed as the array was updated. In order to do this within React, I used 
the useEffect hook to watch for changes within the taskList array dependancy. The fourth requirement was to ensure that the same item could not be 
added twice to the list. The fifth was updating the total amount by keeping track of the price assigned to each task as it was added or removed. The 
last requirement was to have the 'Send Invoice' button reset the entire list. I changed this to store the invoice in history instead.

## This project includes the following 'stretch goals':
  - Allow users to input any task or number
  - Create a Dark Mode toggle button
  - View past invoice history
  - Store the data using Firebase

## Future Goals
  - Add more options to each invoice such as invoice numbers, personal and company information, and notes
  - Style the invoices to better show the most important information

### Resources:
  - [Scrimba](https://scrimba.com/)
