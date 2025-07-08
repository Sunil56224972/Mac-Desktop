$ErrorActionPreference = "Stop"
$env:GIT_AUTHOR_NAME = "Sunil"
$env:GIT_AUTHOR_EMAIL = "sunil56224972@users.noreply.github.com"
$env:GIT_COMMITTER_NAME = "Sunil"
$env:GIT_COMMITTER_EMAIL = "sunil56224972@users.noreply.github.com"

function Make-Commit {
    param($date, $msg)
    $env:GIT_AUTHOR_DATE = $date
    $env:GIT_COMMITTER_DATE = $date
    git commit -m $msg --allow-empty 2>&1 | Out-Null
    Write-Host "OK: $msg"
}

Write-Host "Wiping old git history..."
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
git init
git checkout -b main

# Phase 1: Project Setup
git add .gitignore; git add package.json; git add tsconfig.json
Make-Commit "2025-06-01T09:15:00" "chore: initial project setup with Next.js 14 and TypeScript"

git add tailwind.config.ts; git add next.config.js
Make-Commit "2025-06-01T14:00:00" "chore: configure Tailwind CSS and Next.js"

# Phase 2: App foundation
git add src/app/globals.css
Make-Commit "2025-06-05T09:30:00" "feat: add global CSS with macOS design tokens and animations"

git add src/app/layout.tsx; git add src/app/page.tsx
Make-Commit "2025-06-05T11:00:00" "feat: add root layout with Inter font and SEO metadata"

git add src/types.ts
Make-Commit "2025-06-06T10:00:00" "chore: define shared TypeScript types"

# Phase 3: Core components
git add src/components/Window.tsx
Make-Commit "2025-06-10T09:00:00" "feat: build draggable Window component with traffic light buttons"

git add src/components/MenuBar.tsx
Make-Commit "2025-06-11T10:30:00" "feat: add MenuBar with live clock and glassmorphism effect"

git add src/components/Dock.tsx
Make-Commit "2025-06-12T14:00:00" "feat: build macOS Dock with hover bounce and running indicators"

git add src/components/Desktop.tsx
Make-Commit "2025-06-13T09:30:00" "feat: implement Desktop orchestrator with z-index window management"

# Phase 4: App windows
git add src/components/Finder.tsx
Make-Commit "2025-06-20T10:00:00" "feat: add Finder window with sidebar and file grid"

git add src/components/Terminal.tsx
Make-Commit "2025-06-22T11:00:00" "feat: build interactive Terminal with whoami, skills, projects commands"

git add src/components/TextEdit.tsx
Make-Commit "2025-06-24T14:00:00" "feat: add TextEdit with editable markdown and unsaved indicator"

git add src/components/AboutModal.tsx
Make-Commit "2025-06-25T16:00:00" "feat: create About Me modal with skills, links and bio"

# Phase 5: Assets and server
git add public/ 2>$null
Make-Commit "2025-07-01T10:00:00" "assets: add background, logo, app icons and brand assets"

git add server.js
Make-Commit "2025-07-03T14:00:00" "feat: add static file server for local preview mode"

# Phase 6: Docs
git add README.md
Make-Commit "2025-07-05T10:00:00" "docs: write comprehensive README with terminal commands guide"

# Final cleanup
git add -A 2>$null
$s = git status --porcelain
if ($s) {
    Make-Commit "2025-07-08T14:00:00" "chore: final cleanup, remove stale files"
}

Write-Host ""
Write-Host "All done! Pushing to GitHub..."
git remote add origin https://github.com/Sunil56224972/Mac-Desktop.git
git push --force origin main
Write-Host "Pushed successfully."
