# BizDial

BizDial is a simple, fast local business directory built on Next.js. It lets users find nearby services, check out business profiles, and read reviews. 

I'm currently building this out using the Next.js App Router and TypeScript, keeping the styling clean and lightweight with standard CSS. 

## What's working so far

- **Business Listings:** I've wired up some mock data so you can browse different categories and see what the profile cards look like.
- **Search:** Basic search and category filtering is in place.
- **Fast Images:** Hooked up Next.js image optimization (pulling dummy images from unsplash and loremflickr for now).
- **Responsive Layout:** Everything adjusts to fit both your phone and desktop screens.

## Running it locally

If you want to pull this down and run it on your machine, just follow the usual Next.js steps:

1. Clone the project and jump into the directory:
   ```bash
   git clone https://github.com/shaikhmahir3890-ctrl/BIZDIAL.git
   cd BIZDIAL
   ```

2. Install all the required packages:
   ```bash
   npm install
   ```

3. Start up the dev server:
   ```bash
   npm run dev
   ```

After that, just open up `http://localhost:3000` in your browser to see it in action.

## Where things are

If you're poking around the code, here's a quick map:
- `src/app/` is where all the page routing happens.
- `src/components/` holds the reusable pieces like the header, footer, and cards.
- `src/lib/` currently contains the mock data generator so the app isn't empty while in development.

## Contributing

If you want to help out, add a feature, or fix a bug, feel free to open an issue or drop a pull request!
