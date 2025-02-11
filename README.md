# Full Stack To do List App with Next.js and Django REST Framework

## Project Overview (Situation)

As a developer looking to enhance my full-stack development skills, I identified the need to create a practical application that demonstrates the integration between a modern frontend framework (Next.js) and a robust backend API (Django REST Framework).

## Technical Challenge (Task)

Build a production-ready Todo application that:

- Implements secure user authentication
- Manages user sessions with JWT tokens
- Creates RESTful APIs with Django REST Framework
- Delivers a responsive UI with Next.js and TailwindCSS
- Handles real-time data updates between the frontend and backend

## Implementation Approach (Action)

### Backend (Django + DRF)

- Set up Django REST Framework for API development
- Implemented JWT authentication for secure user sessions
- Created RESTful endpoints for user management and todo operations
- Applied proper serialization for data handling

### Frontend (Next.js)

- Built responsive components using TailwindCSS
- Implemented protected routes with authentication
- Created custom hooks for API integration
- Managed global state for user sessions

### Integration

- Established secure communication between the frontend and backend
- Implemented error handling and loading states
- Created middleware for token management
- Set up CORS configuration for local development

## Results

- Successfully created a full-stack application showcasing modern web development practices
- Demonstrated practical implementation of JWT authentication
- Built reusable components and API endpoints
- Gained hands-on experience with Next.js and Django REST Framework integration
- Created a foundation for future full-stack projects

## Technologies Used

- **Frontend:** Next.js, TailwindCSS, TypeScript
- **Backend:** Django, Django REST Framework
- **Authentication:** JWT Tokens
- **Styling:** TailwindCSS, Lucide Icons
- **Version Control:** Git

## Key Learnings

- Best practices for Next.js and Django REST Framework integration
- JWT token implementation and management
- API design and implementation
- State management in Next.js applications
- Modern UI development with TailwindCSS

## Future Enhancements

- Real-time updates using WebSockets
- Enhanced todo features (categories, due dates)
- User profile management
- Performance optimizations
- Unit and integration tests

## Getting Started

### Frontend

Go to your frontend core folder and run one of the following commands in your terminal:

```bash
npm run dev  # or
yarn dev  # or
pnpm dev  # or
bun dev
```

Open http://localhost:3000 in your browser to see the result.

### Backend

First, download Docker from https://www.docker.com/. Then, run the following Docker Compose command in your terminal with Docker running:

```bash
docker-compose -f docker-compose.yml up -d --build
```

Open http://localhost:8000 in your browser to see the result.
