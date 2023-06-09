# EnglishMentor

![english-mentor-logo](https://github.com/waqifalam/EnglishMentor/assets/41558152/e362366b-7334-45d3-9f64-1b9d06ebe957)

## Description

EnglishMentor is an English learning app built with Next.js that utilizes artificial intelligence (AI) to generate questions and provide error detection for spoken responses. The app aims to assist users in improving their English language skills by engaging them in interactive learning experiences.

EnglishMentor is hosted and available for use at https://englishmentor.io. Feel free to visit the website to experience the app firsthand and enhance your English language skills.

## Features

- Question Generation: The app uses AI algorithms to generate questions dynamically. Each time the user clicks the "Generate Question" button, a new question is presented, ensuring a diverse learning experience.

- Speech Recognition: The app incorporates speech recognition functionality to listen to the user's spoken response. This allows users to practice their English speaking skills in a conversational manner.

- Error Detection: Utilizing AI, the app analyzes the user's spoken response to detect any errors or mistakes. It provides instant feedback to help users identify areas of improvement and refine their pronunciation and grammar.

## Tech Stack

The following technologies were used to develop this app:

- **Next.js**: Next.js is a React framework that enables server-side rendering and provides a fast and efficient development experience. NextJS is used for API and Frontend development.

- **AI Models**: `OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5` was employed to generate questions and perform error detection. This models leverage natural language processing capabilities to understand and analyze text and speech.

- **Speech Recognition API**: The app integrates with a speech recognition API to convert the user's spoken response into text for analysis.

- **Pusher**: The app utilizes Pusher, a web-hosted API that enables real-time updates. It allows for seamless communication between the server and the client, facilitating instant updates to user transcript results.

## Getting Started

To get started with the app on your local machine, follow these steps:

1. Clone the repository:

```
git clone git@github.com:waqifalam/EnglishMentor.git
```

2. Navigate to the project directory:

```
cd english-ui
```

3. Install the dependencies:

```
npm install
```

4. Set up any necessary environment variables. A sample is given below

```
PUSHER_APP_ID=<PUSHER_APP_ID>
PUSHER_KEY=<PUSHER_PUBLIC_KEY>
PUSHER_SECRET=<PUSHER_SECRET>
PUSHER_CLUSTER=<PUSHER_CLUSTER>
NEXT_PUBLIC_PUSHER_KEY=<PUSHER_PUBLIC_KEY>
NEXT_PUBLIC_TIMEINTERVAL=<TIME_TO_LISTEN_TO_USER_RESPONSE>
MONGODB_URI=<MONGO_URI>
HUGGING_FACE_BEARER_TOKEN=<HUGGING_FACE_BEARER_TOKE>
```

5. Start the development server:

```
npm run dev
```

6. Access the app in your browser at http://localhost:3000

## Configuration

Before running the app, ensure that you have the following configuration set up:

- **API Keys**: Make sure to obtain the necessary API keys from HuggingFace, Pusher and your Mongo credentials. Store these keys in the `.env` file if in deployment, or `.env.local` file if in development locally.
- **Mongo**: Spin up a Mongo DB with a collection `transcript` to store all the user transcript.

## Deployment

To deploy the app to a production environment, follow these steps:

1. Build the app:

```
npm run build
```

2. Configure your deployment platform of choice (e.g., Vercel, Heroku, Netlify) according to their specific instructions.
3. Set the required environment variables on the deployment platform.
4. Deploy the app using the appropriate deployment command for your chosen platform.

## Contributions

Contributions to this project are welcome! If you encounter any bugs, have feature requests, or would like to make improvements, please submit an issue and open a pull request on the project's GitHub repository.

When contributing, ensure that you follow best practices, maintain code quality, and adhere to the project's existing coding style. Provide clear and concise descriptions of your changes.

## License

This project is licensed under the MIT License. You are free to modify and distribute the codebase as per the terms of this license.
