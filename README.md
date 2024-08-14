# Classic SPA built using Vite + React Router 6 + Deferred loaders

This is a statically built SPA that can be deployed without requiring a Node app server. The aim is to build a CRUD-style application using out-of-the-box React Router 6 features with deferred loading so we can provide a modern skeleton UI.

Highlights:

- Uses React Router 6 data loaders, actions and lazy loaded routes.
- Deferred API calls for instant page loads and loading UI.
- UI components built using `shadcn/ui` and Radix.
- Support for light and dark mode.
- API mocking in dev mode using `msw`.
- Full set of Playwright tests.
- Storybook.

## Getting started

Run the app in dev mode with a mocked API:

```bash
npm run dev
```

Then point your browser at http://localhost:5173 to see the app in action.

## Notes on the developer experience

In no particular order.

- Moving data fetching to the router - so this happens before your page renders - feels very much like the right pattern to use based on feedback and comments from various React personalities in the business.
- For all intents and purposes this app can be thought of as a Remix SPA. The next major version of `react-router-dom` will effectively be Remix anyway. There is an offical Remix SPA plugin for Vite but to keep it simple I have kept to using `createBrowserRouter`.
- Vite uses `react-refresh` and this can cause `eslint` warnings when exporting plain functions from the same file as React components. I have tweaked the `.eslint.cjs` config to handle exported `loader` and `action` function as co-location of these with the related route is a DX win. But at least one component (`button.tsx`) required the `cva` styles to be moved to a separate file to keep `eslint` happy which is a little annoying. It will definitely catch everyone out.
- Lazy loading of routes is simple enough using `lazy` but this comes with caveats. One of the advantages of route-level data fetching is it can happen in parallel to your code split route from loading. Making this work really requires splitting your `loader` into a separate file that is not code split, which means you lose the advantage of co-location. For this app I have opted for the loaders and actions to be part of the code split route bundle.
- Having the logic around checking if a user is logged in at the route level is an absolute joy. It avoids a potentially messy provider or wrapper. In this app it's a simple check for a session cookie (so not production ready) via a special `privateLoader` wrapper, but you get the idea. Ideally you'd be using fetch interceptors (maybe switching `ky` out for `axios`) to handle authentication errors and token refreshes.
- The React Router 6 documentation is lacking imho, with missing information on some hooks and some vagueness: particularly around `useFetcher` to load data after the route has rendered. For example, what if you wanted to perfrom some form of lookup as you type in a form? The docs imply you can use `useFetcher` to call another loader, but does that mean a virtual route that just exposes a loader? And if so that means no co-location of that looku with the form that needs it. It would be superb if the docs went into more detail on how this is meant to work.
- Correctly typing `useLoaderData` is painful and can be ugly. For this app I have taken some shortcuts here via manual types but it definitely needs improvement.
- Given the app shows off a dashboard, a table with pagination/filtering, a details page with a delete option and a form to add a new vehicle, there is only one `useEffect` hook and three `useState` hooks in the entire app.
- The default Vite `eslint` config is too simple and requires some effort to address.
- Vite uses separate Typescript config files for app-related code and node-related code. This feels like overkill and ensuring config files for other tools lint correctly can be frustrating.
