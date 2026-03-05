# Caregiver Persona Sampler

## What this website is for

Caregiver Persona Sampler helps teams design better products and services for caregivers.

Instead of relying on fully fictional personas, the website presents caregiver profiles grounded in real survey patterns. You can explore individual caregiver stories and quickly understand the context behind their daily decisions, including:

- caregiving responsibilities
- work-life pressure
- age-group context
- financial and mental-health-related signals

This makes it easier to build with empathy and base early product decisions on realistic user situations.

## What you can do on the site

- Browse caregiver personas one by one.
- Read each persona's bio, behaviors, and core needs.
- Compare caregiving hours and paid work hours.
- View supporting context sections (age groups, care vs. work, and wellbeing-related insights).

## Intended users

- UX/UI designers
- Product managers
- Researchers
- Students and teams working on caregiver-focused concepts

## For developers

### Quick start

```bash
npm install
npm run dev
```

### Build commands

- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

### Data note

`src/Profile.jsx` fetches data in `public/data`.

You can update the data source in `public/data/` or update the fetch path in `src/Profile.jsx` accordingly.
