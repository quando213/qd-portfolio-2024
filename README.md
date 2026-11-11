# quando.dev

Personal portfolio of Quan Do. Next.js 16 (App Router, static export) + Tailwind CSS 4 and TypeScript 7, deployed to GitHub Pages.

## Develop

Requires Node 26 (see `.nvmrc`).

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm run type-check
```

## Editing content

- `src/content/profile.ts`: intro, about text, experience.
- `src/content/projects.ts`: selected work and the other-work list. Case study pages are switched off:
  to bring them back, set `showCaseStudies` to `true` there and rename `src/app/_work` to `src/app/work`.
  Set `hidden: true` to keep a project out of the build.
- Screenshots go in `public/images/work/<slug>/` and are listed in the project's `images` array.
  A project with no images shows a tinted placeholder. Keep images around 1800px wide, JPEG or WebP.

## Deploy

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which builds and publishes `./out`.
If the site is served from `<user>.github.io/<repo>/` instead of a custom domain, set `BASE_PATH=/<repo>` for the build step.
