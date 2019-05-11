# Gym Tracker
This is a NativeScript-Vue application for tracking exercise progress in the gym. 

## Usage
 To quickly try the application on your phone, start by installing the Nativescript Playground and Preview apps and run the following:
``` bash
# Install dependencies
npm install

# Build, watch for changes and run on your phone using the NativeScript App
tns debug <platform> --bundle
```
To work in a proper development environment, first follow the full instructions [here](https://docs.nativescript.org/start/quick-setup#full-setup). These instructions include installing Android Studio in order to install an emulator. Then run the following:
``` bash
# Build, watch for changes in an emulator
# First, install
tns run <platform> --bundle
```
The main entry points to the application are in [main.js](https://github.com/TheDro/gym-tracker/blob/master/app/main.js) and [App.vue](https://github.com/TheDro/gym-tracker/blob/master/app/components/App.vue).

## Main Purpose of Gym Tracker

The two main reasons I'm building this are: 
- To learn NativeScript-Vue
- To save time in the gym and track my progress

I've tried other gym applications but none of them do exactly what I want. Some I find too bloated with built in workouts and others just don't display all the information I want in a single locations. The workflow I'm looking to build with this application is this:
 1. Arrive at the gym.
 2. On the Exercises page, select the exercises that I want to do today and add them to my Workout.
 3. On the Workout page, I can see a list of the exercises I have planned for today, and for each a history of the amount of reps and weight I've done in the past. This way I can quickly figure out how much to lift without navigating to another menu.
 4. When I complete my sets, enter what I've done and how well it went.
 
 Additional features:
 
 - On the Calendar page, I can see when I've worked out in the past.
 - On the Calendar page, I can select a date and edit my workout for that day.
 
 If you're interested in following my progress, see my Trello board here: https://trello.com/b/VqmbTgK4/gym-tracker
