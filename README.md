# pages-lab

This is a statically generated blog website powered by Next.js.

## Project Structure

- `/app`
  - Contains the main layout (`layout.tsx`) and the home page (`page.tsx`) of the website.
- `/content/posts`
  - Markdown files managed with the Pages CMS (a Git-based CMS) that hold the blog post content.

## Features

- Static site generation for fast performance and SEO.
- Blog posts managed with markdown files via Git-based CMS.
- Login functionality that, when authenticated, exposes a chat interface within the website.

## Usage

- To add a new blog post, create a markdown file in the `/content/posts` directory.
- The site layout and content structure can be customized in the `/app` directory.

## Technologies

- Next.js (with app directory support for routing and layouts)
- React
- Git-based CMS for managing blog post content

Feel free to contribute or raise issues for improvements!