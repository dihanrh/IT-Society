# IUBAT IT Society
![login](https://github.com/dihanrh/IT-Society/assets/98779204/6cded61a-87f0-4f97-8068-b2422d5f883d)

**ITS** The system development project aims to create an integrated platform for an educational institution that facilitates various functionalities, including online voting for executive selection, individual mentoring class schedule viewing, and file sharing among specific members. The primary users of the system include students, administrators, and mentors.


## Badges
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

## Acknowledgements

 - IUBAT IT Society



## Installation

Installation and running of this project to the local machine may vary the dependencies. You may follow the Installation process :

1. Copy the URL for the repository. To clone the repository using HTTPS, under "HTTPS", click. To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click SSH, then click.To clone a repository using GitHub CLI, click GitHub CLI, then click .


2. Open Git Bash. 
3. Change the current working directory to the location where you want the cloned directory.
4. Clone the repository to your local machine using the following command:

```bash
  git clone ropo-link

```
5. Press Enter to create your local clone.

6. Go to the project directory

```bash
  cd client

```
7. Install dependencies

```bash
  npm install

```



## Run Locally

 move to client
```bash
  cd client

```
 Checkout the Main Branch
```bash
  git checkout Main

```
 Start the Server
```bash
  npm run dev

```
This will start the development server and it will be accessible at http://localhost:port.
Port may vary from machine to machine.

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## Screenshots
## Student
- Home page
![login](https://github.com/dihanrh/IT-Society/assets/98779204/c005a8b4-6580-4df2-b418-2a8965263aa7)

- Login
![login](https://github.com/dihanrh/IT-Society/assets/98779204/c6462ff6-d30b-4433-a224-4bcf46351af7)


- Registration
![regestration](https://github.com/dihanrh/IT-Society/assets/98779204/93c386c5-01bc-4744-b0a2-1b41c46d5516)

- Student Dashboard
![sdbord](https://github.com/dihanrh/IT-Society/assets/98779204/01addb69-12fd-4377-bc30-b174a42e60b9)

- Show Routine
![showrot](https://github.com/dihanrh/IT-Society/assets/98779204/09460fff-13d7-4340-9818-260422985e54)

- File Shearing
![filleshare](https://github.com/dihanrh/IT-Society/assets/98779204/8cc3721a-ecc3-438e-9b23-7e3819ff5890)

- Voting
![votingwaiting](https://github.com/dihanrh/IT-Society/assets/98779204/ad1c562b-2b05-4675-b215-cde6d8280379)

![votingPage](https://github.com/dihanrh/IT-Society/assets/98779204/4cc3ad1d-e585-4ae3-b7a1-d39276bf84d1)

## Admin
- Admin Dashboard
![admindb](https://github.com/dihanrh/IT-Society/assets/98779204/41de4933-078c-4946-951a-78232ca6ef65)

- Approve member
![approve](https://github.com/dihanrh/IT-Society/assets/98779204/38e6eefd-3e86-4de2-942b-8fab54ca6f8d)

- Create Schedule for class
![creatementoring](https://github.com/dihanrh/IT-Society/assets/98779204/f6e87a70-6780-463f-872f-3617983de35f)

- Election Control
![adminVote](https://github.com/dihanrh/IT-Society/assets/98779204/c7ec9be0-87db-4a08-a6d3-c245c9ff0f04)



## Branches
**Main**
- Main branch is the most stable branch.


## API Reference
- All api is under the MongoDB data retrive.

## Features

## Student Society Management System: IUBAT IT Society

## User Requirement  1: Users want to vote in elections in the executive selection.
![image](https://github.com/dihanrh/IT-Society/assets/98779204/3cca9222-01fe-4fc0-ae3b-24a84eb38fa7)

![image](https://github.com/dihanrh/IT-Society/assets/98779204/7828426d-3e88-42d9-9b9b-5acdf1983712)

## System Requirement: 

After logging in Admin will be redirected to the Admin dashboard. In the dashboard, there will be a button “Vote and Election” on the top middle of the menu bar. Clicking on the button Admin will be redirected to the Voting System page. It contains a top menu bar. The top menu bar contains buttons including Make E-Voting, Current Elections, Disable E-Voting and Publish Result.
Clicking on the Make E-voting will redirect the Admin to a new page named “Create  Election”. The Election page contains the text fields named Election Title, Position Name, Amount of Candidates, and Voting Duration. The Voting Duration button will redirect to a pop-up with the time selection menu. After selecting the time duration, it will be automatically saved.
A button will be named “Save and Next” in the bottom right corner. Clicking on the button, Admin will be redirected to a page named Candidate Information, containing the information of the candidates.
Functional Requirement: If the users do not fill up the text boxes, the “Save    and Next” button will not function.
![image](https://github.com/dihanrh/IT-Society/assets/98779204/ab1b59f7-785a-4dff-9536-a04c65cde0db)

The Candidate Information Page contains the number of the division according to the number of candidates. There is a text field to fill for the Admin. These are Name, ID, Current Semester, Current CGPA, and Motto and there will be a button named Choose Picture.
Clicking on the Choose Picture will redirect the Admin to local storage to browse a picture. After selecting a picture, the picture will be shown in the left corner.
![image](https://github.com/dihanrh/IT-Society/assets/98779204/5c859220-7bfe-4cee-96df-1d700246c291)

There will be a button Save and Proceed at the bottom left corner. Clicking on the button, the information will be saved and the E-Voting page will be accessible for users. Then the Admin will be redirected to the Voting System Page.
- Functional Requirement:
If the candidate holds CGPA under or equal to 2.56, it will show a pop-up message “Not  Eligible Candidate”.
There is a button named Disable E-Voting, clicking the button, the admin can stop the E-voting procedure. Stopping the E-Voting procedure, the E-Voting button will be redirected to Home instead of redirecting to the Voting page. 
After completion of the Create Election procedure, during the period of voting duration, users will see the voting details after clicking the button on the top middle named E-Voting.
![image](https://github.com/dihanrh/IT-Society/assets/98779204/e9476b64-e360-497a-8eb4-1885b03ae75f)

- Functional Requirement:
If it is not voting duration the E-voting button will not function.
Users can select the radio button at the bottom of the candidate name division. 
After checking on the radio button the user will be able to click the Submit button and after clicking the Submit button the user will see a pop-up message regarding vote submission that voting has been successfully submitted.
Functional Requirement: Users can not vote for the next time, and the voting can not be withdrawn or undone after being successfully submitted. 
The user will be redirected to the User's Home Page if the user clicks on the E-Voting for the next time it will again redirect the user to the voting page. If the user checks the radio button and clicks on the Submit button, a pop-up message will be shown regarding the voting policy. 
There will be a  button on the bottom right side named Close, By clicking the button, the user will be redirected to the Home page.
Admin can publish the voting result by clicking on the “Publish Result”. The result will be shown on the E-Voting page.
Users can see the voting result after clicking on the E-voting button.
Functional Requirement: The result will be shown only for the users.
![image](https://github.com/dihanrh/IT-Society/assets/98779204/45a6cffb-11ab-48c0-943f-68f41d44d8d6)


## User Requirement 2: Users want to see their individual mentoring class schedules. 
![image](https://github.com/dihanrh/IT-Society/assets/98779204/44456d67-c682-4b42-90e6-38f8e4f0c56e)

## System Requirements:
![image](https://github.com/dihanrh/IT-Society/assets/98779204/f07bea15-2ce4-4332-886c-96a6cad512be)

There will be a button named “Wings” in the top-middle of the Users Home page. Clicking on the button the user will be redirected to the wing page. Wings name 
will be shown in side-by-side order.

By clicking on academic, the page will redirect and will show two options one is the mentoring class schedule and another one is file sharing.  
By clicking on the mentoring class schedule, In the admin panel, there will be two options: create a schedule and show a routine. Admin can make a routine by clicking on Create a schedule, then choosing a semester from the drop-down menu bar, course name, course code, and mentoring class time. After adding all these things, the admin will click on ADD.  This process will continue until all the courses are added.
After adding the Mentoring Class Schedule, the Delete button will be shown beside the Mentoring Class Title.
From the student panel, they can only see a button Show My Routine.  After selecting Show My Routine, it will be redirected to another page and will show a list of all the scheduled mentoring classes for that individual’s semester.  
On the top right side, there will be a download sign (↓). By clicking that sign, students can download the routine. 
![image](https://github.com/dihanrh/IT-Society/assets/98779204/fe5eb8cf-e2c9-4ede-b202-73c9e1e522e9)



## User Requirement 3: Users want to share files with specific members. 
![image](https://github.com/dihanrh/IT-Society/assets/98779204/891e06f6-d1de-487f-be46-ca0c38204856)

## System Requirements:
By clicking on academic, the page will redirect and will show two options one is the mentoring class schedule and another one is file sharing. 
By clicking on the File-sharing menu from the mentor panel, there will be an option named Share File. After clicking that page will redirect and then it will show a title bar where the mentor can provide the course title. 
There will be another Drop down menu for selecting course code. 
For sharing files there will be an option named choose file by clicking this button page will redirect and the mentor can upload any file from local storage.
At the bottom of the page, there will be a button to share the file if the user clicks this button the file will be uploaded to the system.
Functional Requirement: Maximum File Size is 25 M
Users will see a button name Files after clicking on the Mentoring Class.
Users can see an option called View Files. When they click this option,  they will find an option to select their course code in a drop-down list. 
After Selecting the course code, users will be redirected to the page Mentoring Files.
Users can view and download the files by clicking the down arrow button.
![image](https://github.com/dihanrh/IT-Society/assets/98779204/4fd0a66a-1968-405a-8cf5-7f6a8d7693bb)


**IDE**
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)



 **Testing**
![image](https://github.com/dihanrh/IT-Society/assets/98779204/c2f90bb3-9d91-4259-94ea-e51734621270)

![image](https://github.com/dihanrh/IT-Society/assets/98779204/84cc6e0a-1388-4736-9f2c-7316deb3bc00)

## Authors

- [Rakibul Hasan Dihan](https://github.com/dihanrh)
