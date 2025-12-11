# Project & QA Instructions — Copilot / Contributors

This file summarizes the project purpose, structure, technical stack, QA recommendations, known issues, and how to run the app and Playwright E2E tests. Use this as a reference for Copilot suggestions, new contributors, and QA engineers.

## Project Summary
- A training/demo SPA (React + TypeScript) built with Vite.
- Purpose: Demonstrate common React patterns (props, state, hooks, context, routing, REST calls, forms, reducers) for learning and hands-on exercises.
- Main flows: Netflix (UI demo), Employees CRUD (demo calling JSONPlaceholder), Spotify (context & playlist demo), and Todos (useState & useReducer demos).

## Tech Stack
- React 18 + TypeScript
- Vite (dev/build)
- react-router-dom (v7)
- axios for REST
- react-hook-form
- Playwright for E2E
- Bootstrap (CDN)

## How to run the app (local dev)
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build for production: `npm run build`
4. Lint: `npm run lint`

## Playwright (E2E) Quickstart
1. Install Playwright browsers (one-time): `npx playwright install`
2. Run all tests (headless): `npm run test:e2e`
3. Run in headed mode: `npm run test:e2e:headed`
4. View saved HTML report: `npm run test:e2e:report`

Playwright configuration file: `playwright.config.ts`
Test files live in `e2e/tests/*.ts` and fixtures in `e2e/fixtures/*`.

## Project Structure (key files & folders)
```
eslint.config.js
index.html
package.json
README.md
Reference.txt
tsconfig.app.json
vite.config.ts
src/
	App.css
	App.tsx
	index.css
	main.tsx
	menu-related components
	components/
		employees/
			AddEmployee.tsx
		netflix/
			FeaturedShow.tsx
			FeaturedShowList.tsx
			LatestShow.tsx
			LatestShowList.tsx
			RecommendedShow.tsx
			RecommendedShowList.tsx
		shared/
			Footer.tsx
			Header.tsx
			MenuList.tsx
		spotify/
			AudioTracks.tsx
			MyPlaylist.tsx
	contexts/
		PlaylistContext.tsx
	models/
		netflix/ShowProps.ts
		spotify/ITrack.ts
		todos/ITodo.ts
	pages/
		AboutUs.tsx
		Employees.tsx
		Home.tsx
		Netflix.tsx
		Spotify.tsx
		TodosV1.tsx
		TodosV2.tsx
	reducers/
		todosReducer.ts
e2e/
	fixtures/users.json
	tests/app.spec.ts
playwright.config.ts
README-E2E.md
```

## Notable App Behavior & QA Points
- `Employees.tsx` fetches users from `https://jsonplaceholder.typicode.com/users` and shows loading spinner while fetching.
- `AddEmployee.tsx` posts data to JSONPlaceholder and shows a success message on response.
- `Spotify` uses `PlaylistContext` to add songs to a shared playlist and `MyPlaylist` displays them.
- `TodosV2` demonstrates `useReducer` with `todosReducer`.

## Known Issues (found during QA analysis)
1. `todosReducer`: The delete action uses the wrong case string `DELTE_TODO` (typo) and the reducer returns the same state — deletion is not implemented.
2. `ITodo` interface in `src/models/todos/ITodo.ts` declares `isCompleted: false` instead of a boolean type — change to `isCompleted: boolean`.
3. `MyPlaylist`: No delete handler implemented on the playlist UI `-` button; deselect / delete functionality missing.
4. `Employees`: The `View More` button uses `Link to={employee?.id}` (relative link) but there's no route configured for `/employees/:id`. Either add a detail route or update the link.
5. `MenuList` has a link to `/todos-version1`, but `App.tsx` has that route commented out — links should match available routes to avoid broken navigation.
6. Multiple components use `any` types (e.g., `PlaylistContext`, `props`) — improve TypeScript typing for maintainability.
7. Many `console.log()` statements remain in components — these are OK for learning but should be removed for production.

## Recommended Fixes & Improvements (QA + Dev)
- Fix `todosReducer` to handle `DELETE_TODO` and remove item by id.
- Fix `ITodo` type to `isCompleted: boolean`.
- Implement delete handler for playlists in `MyPlaylist` and wire to `AudioTracks` or context.
- Fix `Employees` detail route or change `View More` links to include `/employees/${employee.id}` and add route handler.
- Replace `any` with proper types in `PlaylistContext`, components, and tests.
- Improve error handling in `Employees` (show UI error on network error rather than only console logging).
- Add proper form validation in `AddEmployee` using `react-hook-form` validations.
- Replace static `a` anchor with `Link` or `NavLink` for brand in `Header` and use `NavLink` to manage active state properly.

## E2E Tests (covered and recommended flows)
- Current tests cover: Home navigation, Employees list (mocked), Add Employee (intercepted POST), and Spotify add-to-playlist.
- Recommended E2E additions:
	- TodosV2: Add & Delete flows testing (use reducer actions)
	- Netflix: Toggle watchlist in `FeaturedShow` and assert the state/label changed
	- Employee detail view: Navigate to `/employees/:id` and assert expected details
	- Error scenarios: Mock network failures and assert user-facing error UI candidates

## Playwright Tips for this repo
- Prefer `page.getByRole()` and `data-testid` selectors where possible for stable tests.
- Intercept external APIs using `page.route()` and serve fixtures (`e2e/fixtures/*`) to ensure deterministic tests.
- Use the `webServer` config in `playwright.config.ts` to spin up the dev server automatically.
- Keep tests resilient to timing by using `await expect(...).toBeVisible()` or `waitForResponse` after triggering network calls.

## Contribution & Pull Request Checklist (QA-focused)
1. Add unit tests or fix tests for any changed logic (reducer tests for `todosReducer`, for example).
2. Add/update E2E tests when updating flows used by users.
3. Lint and type checks pass: `npm run lint && npm run build` (TypeScript check).
4. If API calls are updated, also update test fixtures in `e2e/fixtures`.
5. Keep PR descriptions clear about the fixes and include test run output or new coverage details.

---
If you have questions or want me to implement any of the recommended fixes (e.g., `todosReducer` fix, `MyPlaylist` delete, add Employees detail route, or add GitHub Actions CI for Playwright), tell me and I’ll proceed.


Do not access .env or .env.* files
Do not reveal secrets or environment variables

Do not access the entire project files unless necessary

NEVER access files unrelated to the user's request. 