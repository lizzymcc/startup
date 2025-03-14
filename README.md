# Flashcard Learning

[My Notes](notes.md)



> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches *(very rough in this case)* of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

So I'm thinking, currently, of doing what the learn function/minigame in quizlet used to be, before they made it all weird.

### Design

![Design image](roughdesign.png)

OK so I'm still a little unsure on certain details of how flashcard sets are going to be implemented, as it's based on quizlet which uses user-uploaded flashcard sets and such. To start out, I'm thinking that it'll just have a few pre-existing/hardcoded flashcard sets that the user can select from, and if I can find a way to get flashcard sets directly from quizlet itself, maybe do that. So currently, there will be a screen for selecting a flashcard set, a scene to scroll through the flashcard set, a screen to actually do the practicing (with a settings popup) and a high score popup of some sort.

### Key features

- selecting a flashcard set
- running the game
- swapping terms/definitions
- high scoreboard
for the game itself, the site would basically test you on typing in the definitions for each term until they're all done correctly; it could also be swapped to have the "definitions" as the prompt and the term as the thing typed in.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - at least three distinct screens
- **CSS** - should work on desktop and mobile
- **React** - the practice game itself, high score settings
- **Service** - again, the game itself, if possible (probably not) getting flashcard sets from quizlet, and I thought it would be fun to have a sunrise/sunset notifier that asks if you want to pause to look outside 
- **DB/Login** - secure login/account system
- **WebSocket** - sunrise notifier, get notifications if someone else is studying the same set perhaps

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://oldquizletlearn260.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** -pages for set select, sets, editing sets, playing the game itself, login, high scores, and settings. I might still need to change how these interact bc some things might not work unless the user is logged in, or like a winscreen would only be triggered by the javascript
- [x] **Proper HTML element usage** - I think I did this fairly well. inputs and navbars and footers and such
- [x] **Links** - Pages link to each other as appropriate, and to github
- [x] **Text** - It's there, not sure what else to say about it
- [x] **3rd party API placeholder** - sunset notification on play screen
- [x] **Images** - back button
- [x] **Login placeholder** - it's there
- [x] **DB data placeholder** - placeholder data for the flashcard sets, high scores, honestly a large percentage of the text in the final thing is going to be from the DB data
- [x] **WebSocket placeholder** - again, sunset notification on play screen, as well as the updating timer for the score and the updating of the placing on the high scoreboard of that time

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - Each page has a header with the title and (home screen excluded) a back button, and a footer with the github link.
- [x] **Navigation elements** - back button, again, links between pages. Login and Settings pages have been moved to overlays within their respective pages of origin (and login might be added to all the other pages once we get into react).
- [x] **Responsive to window resizing** - I can't promise it works on every size (mobile, etc) but it adapts its size when the window is resized on my laptop
- [x] **Application elements** - I mean the javascript isn't in yet (besides the part for the overlays), but the screens and forms are in
- [x] **Application text content** - page titles, etc
- [x] **Application images** - again, fairly minimal but the settings icon has been added and back button updated

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - done!
- [x] **Components** - pages have been moved to functions. the original HTML files are still in the src folder for now, but solely for reference. Also, several on-page components that should be list items  have been made into functions within the file.
- [x] **Router** - Navigation between pages is done through routing. 

Login button and overlay have been moved to all pages though they are not yet functional. The settings overlay also doesn't work with the current setup, but the html for both has been put into the jsx files and made (as far as I can tel0 jsx-friendly. 

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - Yes, though I'm thinking I'm not going to include set editing in the final project unless I find I have extra time. It doesn't appear as an option in the website so the website is fully functional, even if it doesn't have some of the parts it could've.

- [x] **Hooks** - so many hooks. I may have actually overused the usestates.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Scores, login/authentication info, and card set data are all now stored on a separate service
- [x] **Static middleware for frontend** - I... think this just asks if we used express.static? Which I did, it should be using the public folder
- [x] **Calls to third party endpoints** - calls to sunrise/sunset endpoint in sunsetNotifier.jsx
- [x] **Backend service endpoints** - they're there
- [x] **Frontend calls service endpoints** - again, it calls them & gets stuff from them.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
