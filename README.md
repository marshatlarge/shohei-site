# Pittsburgh Pirates JS Exercise and Ohtani Application

## [Live Demo of Ohtani Data Application](http://pirates-data-vis.s3-website-us-east-1.amazonaws.com/)

[**View the Live Ohtani Application Here**](http://pirates-data-vis.s3-website-us-east-1.amazonaws.com/)

## Introduction

This repository contains a JS exercise "groupBy.js" (meant to be run in Node) and code for a web-based application that visualizes pitches from Ohtani's regular season in 2022-2023. The application provides various visual representations of the pitch data and batted balls.

Information on how to run everything at the bottom of this README.

## Notes

I focused on building a good UI/UX as fast as possible. Because of this, I make some tradeoffs with features and code quality. The filters and CSS got especially out of hand when I went and made small tweaks to enhance UX. Given more time, here are some things I would implement (starting with an immediate refactor):

- **Refactoring**: Refactoring the codebase for modularity and maintainability (especially the filters tab), alongside adding unit tests with Jest and the React Testing Library.
- **Advanced Metrics**: Integrating more complex analytics, such as a stuff plus model, would offer deeper insights into pitch effectiveness.
- **Performance Optimizations**: The large amount of data works on desktop, but the app runs a bit slow when changing views to see visuals where you are looking at all the pitches at once. Implementing memoization and doing other small optimizations may help with this. The scope of the project would have grown a lot if I had to take the time to dig into other data vis libraries that solve this.
- **User Experience Improvements**: Enhancing the filters tab to incorporate multi-select dropdowns for certain filters would enhance UX.

## Application Features

- **Interactive Charts**: Utilized Chart.js and React-Chartjs-2 to create dynamic visualizations, including Table Views, Spray Charts, Movement Profile Charts, Pitch Usage Charts, Release Point Charts, and Zone Charts.
- **Responsive Design**: Tailored the application for mobile and desktop usage, ensuring accessibility on various devices.
- **Advanced Filtering**: Implemented a robust filtering mechanism, allowing users to narrow down the data based on specific criteria, enhancing the user experience and usefulness of the application.

## Screenshots

![Application Screenshot 1](/public/photo1.png)

![Application Screenshot 2](/public/photo2.png)

![Application Screenshot 3](/public/photo3.png)

![Application Screenshot 4](/public/photo4.png)

## Technology Stack

### Frontend

- **React (v18.2.0)**: Chosen for ability to easily handle state, as well as its component-based architecture, enabling modular and reusable UI components.
- **Vite (v5.1.4)**: Utilized as the build tool for its fast, hot module replacement.
- **Tailwind CSS (v3.4.1)**: Employed for styling due to its utility-first approach.
- **Chart.js (v4.4.2) & React-Chartjs-2 (v5.2.0)**: These libraries were used to render the various charts and visualizations. IN the past I've used recharts, but recharts couldn't handle the large number of pitches as well as chart.js, so I opted for this instead.
- **FontAwesome (v6.5.1)**: Provided icons used across the application, specifically the filter icon on the mobile viewport.

### Deployment and Testing

- **Amazon S3**: The application was deployed to an S3 bucket, enabling static web hosting with high availability and scalability. [View the Live Ohtani Application Here.](http://pirates-data-vis.s3-website-us-east-1.amazonaws.com/)

- **Google Chrome**: This application was primarily developed using Google Chrome and Chrome Dev Tools. I tested it of safari on my IPhone afterwards and it appears to work well.

## Running the JS exercsie and data application.

- **groupBy.js**: Download or copy and paste the code into a code editor. Run using node, and the response will be logged into the console.

- **Ohtani Data Application** I deployed it so you don't have to download and run it. [View the Live Ohtani Application Here.](http://pirates-data-vis.s3-website-us-east-1.amazonaws.com/).

If you all do want to run it, clone the repo, install the dependencies with npm install and then run "npm run dev" to spin up a local development server. Note, I modified the rc-slider package directly in node_modules for styling purposes. A better approach would involve creating a custom wrapper component, but I didn't do that. So, the styling will be messed up for the sliders in the filters section if you run it locally.
