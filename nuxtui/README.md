![nuxt-ui-dashboard-social-card](https://github.com/nuxt-ui-pro/dashboard/assets/739984/f785284b-7db2-4732-af0e-2cb3c0bd7ca2)

# Nuxt UI Pro - Dashboard template

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com/pro)

- [Live demo](https://dashboard-template.nuxt.dev/)
- [Play on Stackblitz](https://stackblitz.com/github/nuxt-ui-pro/dashboard)
- [Documentation](https://ui.nuxt.com/pro/getting-started)

## Quick Start

```bash [Terminal]
npx nuxi init -t github:nuxt-ui-pro/dashboard
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.


## OpenApi client i.c.m. axios
VITE_API_BASE_URL=http://localhost:8004
/utils/apiClient.ts is de custom axios instance
utils/client/core/request.ts de axios import vervangen met de custom client


# Axios Client Differences

This document highlights the key differences between two files that handle API requests using Axios.

## 1. Axios Instance Import:

- **First File**: Uses `axios` directly for the Axios instance.

```ts
import axios from 'axios'
```

- **Second File**: Uses a custom apiClient from ~/utils/api-client for the Axios instance.
```ts
import { apiClient } from '~/utils/api-client'
```

## 2. Axios Client Usage:
- **First File**: The default Axios instance is used in the request method.
```ts
axiosClient: AxiosInstance = axios
```

- **Second File**: The custom apiClient instance is used as the default client in the request method.
```ts
axiosClient: AxiosInstance = apiClient
```

