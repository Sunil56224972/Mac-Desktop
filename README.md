# 🖥️ Mac Desktop — Interactive Portfolio

A personal portfolio website built as a fully interactive **macOS desktop experience** — right in your browser.

![Mac Desktop Preview](public/background.jpg)

## ✨ Features

- 🪟 **Draggable Windows** — Open, move, minimize, and maximize app windows
- 🐚 **Interactive Terminal** — Type real commands like `whoami`, `skills`, `projects`
- 📝 **TextEdit** — An editable document window with markdown content
- 🗂️ **Finder** — Browse a simulated file system
- 🎵 **macOS Dock** — With hover animations and running-app indicators
- 🕐 **Live Menu Bar** — Real-time clock, battery, wifi indicators
- 🌊 **Glassmorphism UI** — Frosted glass effects throughout

## 🛠️ Tech Stack

| Layer      | Technology                             |
|------------|----------------------------------------|
| Framework  | [Next.js 14](https://nextjs.org/) (App Router) |
| Language   | TypeScript                             |
| Styling    | Tailwind CSS + custom CSS              |
| Animation  | CSS transitions + custom keyframes     |
| Deployment | Vercel                                 |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Sunil56224972/Mac-Desktop.git
cd Mac-Desktop

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Entry point → renders Desktop
│   └── globals.css      # Global styles + animations
├── components/
│   ├── Desktop.tsx      # Main desktop orchestrator
│   ├── Window.tsx       # Reusable draggable window
│   ├── MenuBar.tsx      # Top menu bar with live clock
│   ├── Dock.tsx         # App dock with bounce animations
│   ├── Finder.tsx       # Finder window
│   ├── Terminal.tsx     # Interactive terminal
│   ├── TextEdit.tsx     # Editable markdown document
│   └── AboutModal.tsx   # About me window
└── types.ts             # Shared TypeScript types
```

## 🎮 Terminal Commands

Once you open the Terminal app, try these commands:

| Command    | Description              |
|------------|--------------------------|
| `whoami`   | About Sunil              |
| `skills`   | Technical skill stack    |
| `projects` | Notable projects         |
| `contact`  | How to get in touch      |
| `ls`       | List files               |
| `clear`    | Clear the terminal       |

## 📄 License

MIT © Sunil
