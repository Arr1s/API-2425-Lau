# API-2425-Lau

## Introduction
Welcome to the **API-2425-Lau** project! This application is designed to [insert a brief description of what the app does]. It provides [key features or functionality] to help users [specific purpose or goal]. Whether you're a beginner or an experienced developer, this project is a great starting point for exploring modern web development.

## Packages Used
This project leverages the following key packages:
- **dotenv**: For managing environment variables.
- **cors**: To enable Cross-Origin Resource Sharing.
- **nodemon**: For automatic server restarts during development.
- [Add any other packages used in the project.]

## Installation Guide
To get started as a developer, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/API-2425-Lau.git
    cd API-2425-Lau
    ```

2. **Install Dependencies**:
    Ensure you have Node.js installed on your system. Then, run:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and configure the required environment variables. For example:
    ```
    PORT=3000
    DATABASE_URL=your-database-url
    ```

## Running the Program
To start the development server, use the following command:
```bash
npm run dev
```
This will launch the application in development mode with live reloading enabled.

## Contributing
Feel free to fork the repository, make changes, and submit a pull request. Contributions are always welcome!

## License
This project is licensed under the [MIT License](LICENSE).

## Purpose
The purpose of this app is to serve as a **Valorant strategy tool**, Valorant is an FPS shooter game I've played for a while, inspired by [ValoPlant](https://valoplant.gg/). The development journey has been both challenging and rewarding.

## Progress

### Learning Liquid and Backend Development
This project marked my first experience using **Liquid** templates, which required a steep learning curve. Additionally, I transitioned from relying heavily on client-side JavaScript to implementing more functionality on the server side using Node.js. This shift allowed for better performance and a more dynamic application.

### Challenges with Saving Markers
One of the most difficult challenges was implementing the feature to save markers on the backend. This required significant effort to design and debug, but it was ultimately a valuable learning experience. In order to create markers that wil be saved with the help of **lowdb**, use the input fields below the map. Although there are no labels attached to the input fields, here is the order from right to left:
1. MarkerID:
This is the ID of the marker, and has to be done manually for now, but could to be automated in the future.

2. Ability type (optional):
Here you can choose which ability from the agent you want. The format is "Ability" + (number of the ability). So, for instance, if you want to use the "Wingman" of "Gekko", you'd type: "Ability1". 

3. X coordinates: 
If think this one is self explantory, it is the coordinate on the X-axis, from the bottom upwards. 

4. Y coordinates: 
If think this one is self explantory, it is the coordinate on the Y-axis, from the left to right. 

5. AgentID: 
This is the ID of the agent from the valorantAPI. You can simply copy paste it.  

Once you're done, press on the button "save" in order to save the marker. 

### Styling and Time Constraints
Due to the time spent on backend development, styling was deprioritized and remains a work in progress. While functional, the current design could benefit from further refinement to improve the user experience.

### Current Status
The app is functional, with core features implemented, but there is still room for improvement in both styling and additional features.