# Cloudflare Pages Deployment Guide

This guide will help you deploy your Sasslight affiliate marketing app to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account (free tier works)
2. Node.js installed on your machine
3. Git installed and configured

## Step 1: Install Cloudflare Adapter

Run the following command to install the Cloudflare Next.js adapter:

```bash
npm install @cloudflare/next-on-pages
```

## Step 2: Update package.json Scripts

Add these scripts to your `package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "prod": "next build && next start",
  "pages:build": "npx @cloudflare/next-on-pages",
  "pages:dev": "npx wrangler pages dev",
  "pages:deploy": "npm run pages:build && npx wrangler pages deploy"
}
```

## Step 3: Configure wrangler.toml

The `wrangler.toml` file has been created with your email configuration. Update the following:

- Change `your-domain.com` to your actual domain (if you have one)
- Keep the email environment variables as configured

## Step 4: Build for Cloudflare Pages

Run the build command:

```bash
npm run pages:build
```

This will create a `.vercel/output` directory with your optimized build.

## Step 5: Deploy to Cloudflare Pages

### Option A: Using Wrangler CLI

```bash
npm run pages:deploy
```

Follow the prompts to create a new Cloudflare Pages project or deploy to an existing one.

### Option B: Using Cloudflare Dashboard

1. Log in to your Cloudflare dashboard
2. Go to Pages > Create a project
3. Connect your Git repository (GitHub, GitLab, etc.)
4. Configure build settings:
   - **Build command:** `npm run pages:build`
   - **Build output directory:** `.vercel/output`
5. Add environment variables from your `.env.local` file
6. Click "Save and Deploy"

## Step 6: Configure Environment Variables

In Cloudflare Pages dashboard, add these environment variables:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=jerryalex10000@gmail.com
EMAIL_PASSWORD=zdjp xkps dfad xpgc
EMAIL_FROM=jerryalex10000@gmail.com
EMAIL_TO=jerryalex10000@gmail.com
```

## Important Notes

### API Routes
Your API routes (`/api/products`, `/api/contact`, `/api/upload`) will work on Cloudflare Pages using the adapter.

### Image Uploads
The image upload functionality uses local file storage. On Cloudflare Pages, you may need to:
- Use Cloudflare R2 for file storage
- Or use a third-party service like AWS S3, Cloudinary, or Vercel Blob

### Static Assets
All static assets will be automatically optimized and served from Cloudflare's CDN.

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check that Node.js version is compatible (Node.js 18+ recommended)

### Email Not Working
- Verify environment variables are set correctly in Cloudflare Pages
- Check that Gmail app password is correct
- Ensure 2FA is enabled on your Google account

### Image Upload Issues
- Consider using Cloudflare R2 for production file storage
- Update the upload API route to use R2 instead of local filesystem

## Custom Domain (Optional)

1. In Cloudflare Pages dashboard, go to Custom Domains
2. Add your domain
3. Update DNS records as instructed
4. Update `wrangler.toml` with your domain name

## Monitoring

Cloudflare Pages provides:
- Real-time analytics
- Error logs
- Deployment history
- Webhooks for build notifications

Access these from your Cloudflare Pages dashboard.
