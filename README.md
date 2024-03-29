# Focus App

Focus App is a web application designed to help users find and focus on high-quality images using the Pexels API. It serves as a personal project aimed at improving productivity and providing a visually appealing experience.

- All components are custom made, with tailwind and typescript safety
- For folder structure, I went with the feature folder structure
- For infinite rendering and fetching, I used react router with axios, and react-infinite-scroll-component for infinite scrolling.
- I used a local storage hook to save liked items

## Live website
[https://focus-two-tau.vercel.app/](https://focus-two-tau.vercel.app/)

## Technologies Used

- React for building the user interface
- TypeScript for type safety
- Tailwind CSS for styling
- Pexels API for fetching images

## Demo
[![Focus youtube demo](https://img.youtube.com/vi/9yxqZmBt5j8/0.jpg)](https://www.youtube.com/watch?v=9yxqZmBt5j8)

## Features

- View pictures with infinite loading for seamless browsing
  
https://github.com/yowger/focus/assets/106136772/b0e50d46-f2e4-41be-8e37-599da62b764b

- Search with filters (e.g., by category, color, orientation)
  
https://github.com/yowger/focus/assets/106136772/9f67a92f-97d2-4f0e-8c48-bd3ee361fd84

- Photo modal with next and previous navigation
  
https://github.com/yowger/focus/assets/106136772/6b2cffd9-91e4-4759-9717-146159ab7742

- Save favorite images for later viewin

https://github.com/yowger/focus/assets/106136772/3314a364-ea4e-453c-962c-ae2017c3989d

- Download pictures
  
https://github.com/yowger/focus/assets/106136772/4c4919d9-a7c9-4be2-81b2-41a24b20d196

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory of the project.
4. Add the following environment variables to the `.env` file:
```
  VITE_PEXELS_API_URL=https://api.pexels.com/v1
  VITE_PEXELS_API_KEY=your_pexels_api_key_here
```
 Replace `VITE_PEXELS_API_URL` and `VITE_PEXELS_API_KEY` with your actual Pexels API key. 
 (note: You must register an account on the Pexels website to obtain a key.)
5. Start the development server using `npm start`.

## Usage

- Search for images using the search bar.
- Click on an image to view it in full size.
- Use the heart button to save images for later viewing.
- Use the download button to save images to computer

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
