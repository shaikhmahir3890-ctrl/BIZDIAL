# BIZDIAL 🚀

A modern, fast, and responsive local business directory built with Next.js and TypeScript. 

BIZDIAL helps users discover local businesses, read reviews, and explore services in their area. We built this focusing on a smooth UI, optimized performance, and a clean codebase.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Custom CSS (Vanilla)
- **Data:** Mock data for development/demo (deterministic hydration-safe random generation)

## ✨ Features

- **Dynamic Business Listings:** Auto-generated deterministic mock data showcasing different businesses, categories, and reviews.
- **Search & Filtering:** Easily look up businesses by category or name.
- **Optimized Images:** Uses Next.js `<Image />` component with configured remote patterns (`loremflickr.com`) for fast loading and zero layout shift.
- **SEO Ready:** Semantic HTML and Next.js built-in SEO capabilities.
- **Responsive Design:** Looks great on mobile, tablet, and desktop.

## 🚀 Getting Started

To get the app running locally, follow these steps:

1. **Clone the repo**
   ```bash
   git clone https://github.com/shaikhmahir3890-ctrl/BIZDIAL.git
   cd BIZDIAL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Head over to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `src/app/` - Next.js App Router pages (Home, Search, Business Details, Auth, etc.)
- `src/components/` - Reusable React components (Header, Footer, CookieConsent)
- `src/lib/` - Utilities and mock data logic (`mock-data.ts`, `i18n.tsx`)
- `public/` - Static assets and icons

## 🤝 Contributing

Feel free to fork this project, submit pull requests, or open issues if you spot any bugs. All contributions are welcome!

## 📝 License

This project is open-source and available under the MIT License.
