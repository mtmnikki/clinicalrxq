# ClinicalRxQ Website

A modern React website for clinical pharmacy training and resources.

## Features

- 🏥 Clinical pharmacy training programs
- 👥 Member authentication and access control
- 📚 Resource library with downloadable materials
- 🎯 Success stories and testimonials
- 📱 Fully responsive design
- 🔐 Secure member portal integration

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Authentication:** JWT + Airtable
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Deployment:** Vercel

## Quick Start

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd clinicalrxq-website
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `AIRTABLE_BASE_ID`: Your Airtable base ID
- `AIRTABLE_API_KEY`: Your Airtable API key
- `JWT_SECRET`: A secure random string
- `SITE_URL`: Your production URL

### 3. Development
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## Deployment on Vercel

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Airtable Setup

Create an Airtable base with a "Members" table containing:
- Email (Single line text)
- Name (Single line text)  
- Membership Level (Single select: basic, premium, enterprise)
- Accessible Programs (Multiple select)
- Is Active (Checkbox)
- Join Date (Date)

## Member Management

Members are managed through Airtable. The system supports:
- Different membership levels (basic, premium, enterprise)
- Program-specific access control
- Active/inactive member status
- Integration with JotForm for registration

## File Management

- Files stored in Google Drive
- Access controlled via Airtable member database
- Automatic permission management
- Training materials organized by program

## Support

For questions about implementation or customization, contact your development team.