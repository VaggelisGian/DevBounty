# DevBounty

A web application that aggregates paid coding opportunities from GitHub into a single searchable platform. Find bounties, get paid for your code!

**Currently aggregating 2,700+ open bounty issues from GitHub!** New opportunities posted daily.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173 to see the app.

## Features

- **GitHub Bounty Aggregator**: Searches 2,700+ issues with bounty labels
- **Smart Filtering**: Filter by programming language, minimum bounty amount, and difficulty
- **Opportunity Display**: Shows bounty amounts, tech stacks, competition indicators
- **Responsive Design**: Mobile-friendly interface with clean, professional UI
- **Fast & Efficient**: Client-side caching (5-minute cache) to minimize API calls
- **Sort Options**: Sort by newest, highest paying, or least competition
- **Zero Cost**: Runs entirely on free tier services (no backend needed!)

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **API**: GitHub REST API v3
- **Hosting**: Deployable to Netlify, Vercel, GitHub Pages, or Cloudflare Pages

## How It Works

DevBounty searches GitHub for open issues with the `bounty` label and displays them in an easy-to-browse interface. You can:

1. **Browse** all available bounties
2. **Filter** by your preferred language (JavaScript, Python, Rust, etc.)
3. **Sort** to find the best opportunities
4. **Click** through to GitHub to apply

The app uses the GitHub API to fetch real-time data and caches results locally to stay within API rate limits.

## Deployment

### Option 1: Netlify (Recommended)
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository → Deploy
5. Done! (Settings auto-detected from `netlify.toml`)

### Option 2: Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import repository
4. Deploy (auto-detects Vite configuration)

### Option 3: GitHub Pages
1. Push code to GitHub
2. Go to Settings → Pages
3. Select "GitHub Actions" as source
4. Workflow file already included in `.github/workflows/deploy.yml`

### Option 4: Cloudflare Pages
1. Push code to GitHub  
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Create project → Connect Git
4. Build command: `npm run build`
5. Output directory: `dist`

## GitHub API Rate Limits

The app uses the public GitHub API:
- **Without auth**: 60 requests/hour
- **With auth**: 5,000 requests/hour

The app caches results for 5 minutes to stay within limits.

**Optional**: To increase limits, add a GitHub token:
1. Create a token at https://github.com/settings/tokens
2. Add to environment variables: `VITE_GITHUB_TOKEN=your_token`
3. Update `src/services/github.js` to include the token in headers

## Project Structure

```
DevBounty/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # App header
│   │   ├── FilterBar.jsx    # Search and filters
│   │   ├── OpportunityCard.jsx   # Individual opportunity
│   │   └── OpportunityList.jsx   # List with sorting
│   ├── services/
│   │   └── github.js        # GitHub API integration
│   ├── utils/
│   │   └── helpers.js       # Helper functions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + Tailwind
├── public/                  # Static assets
├── .github/workflows/       # GitHub Actions for deployment
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
├── netlify.toml             # Netlify deployment config
└── vercel.json              # Vercel deployment config
```

## Search Query

The app searches GitHub with:
```
is:issue is:open label:bounty
```

This finds all open GitHub issues tagged with the `bounty` label. You can also use the search box to find specific technologies or keywords.

## Development

### Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production  
- `npm run preview` - Preview production build

### Making Changes

The codebase is organized by feature:
- Modify UI in `src/components/`
- Update API logic in `src/services/github.js`
- Add utilities in `src/utils/helpers.js`
- Style with Tailwind classes (no custom CSS needed)

## Troubleshooting

**No results showing?**
- Check browser console (F12) for errors
- Verify GitHub API is accessible
- Clear localStorage cache: `localStorage.clear()`
- Try removing all filters

**Build fails?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js 18+ is installed

**Rate limit exceeded?**
- Wait 1 hour for limits to reset
- Add a GitHub token (see API Rate Limits section)
- Increase cache duration in `src/services/github.js`

## Roadmap

Future enhancements planned:
- [ ] HackerNews "Who's Hiring" scraper
- [ ] Reddit job posts (r/forhire, r/cofounder)
- [ ] Email alerts for new opportunities
- [ ] Additional bounty platforms (Gitcoin, IssueHunt)
- [ ] Browser extension
- [ ] User preferences persistence

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Built with the GitHub REST API
- Inspired by ProductHunt and HackerNews aesthetics
- Created to help developers find paid opportunities easily

---

**Happy bounty hunting!**

Built with React, Vite, and Tailwind CSS.
