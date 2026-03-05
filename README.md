# Psalms Grid Browser (Tehillim)

An interactive web application for browsing all 150 Psalms with a beautiful grid interface and detailed modal view. Perfect for reading Hebrew Scriptures on desktop or mobile.

## Features

- **150-Psalm Grid** — Right-to-left layout with Hebrew letters (א through ץ)
- **Interactive Grid** — Click any Psalm number to open full text
- **Detail View** — Beautiful modal with full Hebrew text, verse-by-verse
- **Simple Navigation** — Previous/Next buttons or return to grid
- **Mobile Friendly** — Fully responsive design works on phone and desktop
- **JSON Upload** — Load your own Psalms JSON file (supports Nikkud and text-only versions)

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/psalms-grid.git
cd psalms-grid
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Usage

1. Open the app in your browser
2. Click "Choose File" and upload your Psalms JSON file
3. The grid will load with all 150 Psalm numbers
4. Click any Psalm number to view the full text
5. Use Previous/Next to navigate, or click "Back to Grid" to return

### JSON Format

The app expects a JSON file with this structure:

```json
{
  "text": [
    [verse1, verse2, verse3...],  // Psalm 1
    [verse1, verse2, verse3...],  // Psalm 2
    ...
  ]
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click "Deploy"
5. Your app will be live at a Vercel URL

### Deploy to Other Platforms

This project can be deployed to any static host (Netlify, GitHub Pages, etc.) after running `npm run build`.

## Design

- **Font**: Garamond serif for elegant readability
- **Theme**: Warm, neutral palette (beige/cream tones)
- **Direction**: Right-to-left (RTL) for Hebrew text
- **Layout**: Centered grid with 10 columns

## Technologies

- **React 18** — UI framework
- **Vite** — Build tool
- **Lucide React** — Icons
- **Vanilla CSS** — Styling

## License

MIT License - feel free to use, modify, and distribute

## Support

For issues or feature requests, please open an issue on GitHub.
