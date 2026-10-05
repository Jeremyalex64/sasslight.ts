# Cloudflare R2 Setup Guide

This guide will help you set up Cloudflare R2 for image storage in your Sasslight application.

## Step 1: Install AWS SDK

Run the following command to install the AWS SDK for R2:

```bash
npm install @aws-sdk/client-s3
```

## Step 2: Create R2 Bucket

1. Log in to your Cloudflare dashboard
2. Go to R2 > Create Bucket
3. Name your bucket: `sasslight-uploads`
4. Select a region (or leave as default)
5. Click "Create bucket"

## Step 3: Get R2 API Credentials

1. In Cloudflare dashboard, go to R2 > Manage R2 API Tokens
2. Click "Create API Token"
3. Give it a name (e.g., "sasslight-uploads")
4. Select permissions: Object Read & Write
5. Select the bucket: `sasslight-uploads`
6. Click "Create API Token"
7. Copy the Access Key ID and Secret Access Key

## Step 4: Get R2 Endpoint

1. In Cloudflare dashboard, go to R2 > your bucket
2. Click "Settings"
3. Copy the "Public" endpoint URL (this will be your R2_PUBLIC_URL)
4. The endpoint format is: `https://<account-id>.r2.cloudflarestorage.com`

## Step 5: Configure Environment Variables

Add these variables to your `.env.local` file:

```
R2_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<your-access-key-id>
R2_SECRET_ACCESS_KEY=<your-secret-access-key>
R2_BUCKET_NAME=sasslight-uploads
R2_PUBLIC_URL=https://<your-account-id>.r2.cloudflarestorage.com/sasslight-uploads
```

Replace the placeholders with your actual values.

## Step 6: Enable Public Access (Optional)

If you want images to be publicly accessible:

1. In Cloudflare dashboard, go to R2 > your bucket
2. Click "Settings"
3. Scroll to "Public Access"
4. Click "Enable Public Access"
5. This will allow images to be accessed via the public URL

## Step 7: Test Upload

After configuration, test the image upload in your admin dashboard to ensure it works correctly.

## Important Notes

- **Security:** Never commit your `.env.local` file to version control
- **Bucket Name:** Ensure the bucket name matches exactly in your configuration
- **Region:** R2 uses a single global region, so you don't need to specify regions
- **Costs:** R2 offers free tier with generous limits (10GB storage, 10 million class A operations/month)

## Troubleshooting

### Upload Fails with 403 Error
- Check that your API token has the correct permissions
- Verify the bucket name matches exactly
- Ensure the endpoint URL is correct

### Images Not Loading
- Verify public access is enabled on the bucket
- Check that the R2_PUBLIC_URL is correct
- Ensure the bucket name is included in the public URL

### CORS Errors
- You may need to configure CORS rules in your R2 bucket settings
- Go to R2 > your bucket > Settings > CORS
- Add a rule allowing GET requests from your domain

## Cloudflare Pages Deployment

When deploying to Cloudflare Pages, add these environment variables in the Pages dashboard:

```
R2_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<your-access-key-id>
R2_SECRET_ACCESS_KEY=<your-secret-access-key>
R2_BUCKET_NAME=sasslight-uploads
R2_PUBLIC_URL=https://<your-account-id>.r2.cloudflarestorage.com/sasslight-uploads
```

Also add the email variables from your `.env.local` file.
