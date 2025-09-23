# pages-lab

A minimal Next.js site that statically renders Markdown posts from the /content/posts directory.

Automated updates with n8n + GitHub App
- An n8n workflow is used to trigger content changes (via webhook, schedule, or other events).
- The workflow authenticates using a GitHub App installation and creates commits or pull requests against this repository.
- It updates or adds Markdown files in /content/posts (and optional assets) so the site reflects new content automatically.
- When changes land on main, the Next.js site rebuilds and the new/updated posts are available.

Notes
- Content lives in /content/posts as .md files with frontmatter.
- App routes and layout are in /app.
- This setup lets external systems (forms, CMS, automations) publish to the site through n8n without direct repo access.
