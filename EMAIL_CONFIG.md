# Email Configuration for Contact Form

To enable email sending for the contact form, you need to configure the following environment variables in a `.env.local` file in your project root.

## Environment Variables

Create a file named `.env.local` in your project root and add the following:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com
```

## For Gmail Users

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App Passwords
4. Generate a new app password
5. Use the app password as `EMAIL_PASSWORD`

## For Other Email Providers

- **Outlook/Hotmail:**
  - EMAIL_HOST=smtp-mail.outlook.com
  - EMAIL_PORT=587
  - EMAIL_SECURE=false

- **Yahoo Mail:**
  - EMAIL_HOST=smtp.mail.yahoo.com
  - EMAIL_PORT=587
  - EMAIL_SECURE=true

- **Custom SMTP:**
  - Use your provider's SMTP settings

## Installation

Run the following command to install nodemailer:

```bash
npm install nodemailer @types/nodemailer
```

## Testing

After configuration, test the contact form on your website to ensure emails are being sent successfully.
