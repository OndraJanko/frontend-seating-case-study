Documentation, comments and other information about the project

## Used Technologies

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zod
- Tanstack Query
- Axios
- Redux
- Shadcn/ui
- React Hook Form

## User Auth

I chose local storage for user sessions to keep the project simple and focused on frontend development, avoiding unnecessary backend complexity.

## API Calls

I used Axios to make API calls to the backend and utilized Zod to validate the data sent to the backend.

## Seat Map

I used the useZoom hook from the @/hooks/useZoom.ts file to manage the zoom level of the seat map. The handleZoomIn, handleZoomOut, and handleResetZoom functions update the zoom level based on user interactions with the seat map.

## Prefetching

In this project, I used ReactQuery's prefetching capabilities to fetch data on the server side before rendering components.
