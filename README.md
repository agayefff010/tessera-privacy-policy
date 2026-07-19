# Tessera — Official Website & Legal Pages

Production-ready static website for **Tessera**, the online fashion shopping application by **Pixora**. Designed for Google Play Console and Apple App Store listings, with Privacy Policy, Terms & Conditions, and Account Deletion pages.

## Features

- Premium Linear-inspired UI with dark / light mode
- Sticky glass navigation, scroll animations, and responsive layout
- Original Privacy Policy suitable for store review
- Original Terms & Conditions
- Account deletion instructions (email-based pathway)
- SEO meta tags, Open Graph tags, semantic HTML, accessibility basics
- Zero build step — deploy static files as-is

## Project structure

```
privacy-policy/
├── index.html              # Marketing homepage
├── privacy-policy.html     # Privacy Policy (use this URL in store consoles)
├── terms.html              # Terms & Conditions
├── account-deletion.html   # Account deletion instructions
├── styles.css              # Design system & layout
├── script.js               # Theme, nav, animations
├── favicon.svg             # Brand mark
└── README.md
```

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 5173

# Node
npx serve .
```

Then visit `http://localhost:5173`.

## Deploy to Vercel

1. Push this repository to GitHub (or import the `privacy-policy` folder).
2. In [Vercel](https://vercel.com), create a new project.
3. Set the **Root Directory** to `privacy-policy` (if the folder sits inside a larger repo).
4. Framework Preset: **Other** (no build command required).
5. Deploy.

After deployment, update canonical / Open Graph URLs in each HTML file from `https://tessera.app` to your real domain.

## Store console URLs

After deploying to `https://your-domain.com`, use:

| Purpose | URL |
| --- | --- |
| Privacy Policy | `https://your-domain.com/privacy-policy.html` |
| Terms | `https://your-domain.com/terms.html` |
| Account deletion | `https://your-domain.com/account-deletion.html` |
| Support email | `tesseraapptessera@gmail.com` |

### Google Play Console

1. Open your app → **Policy** → **App content**.
2. Set Privacy Policy URL to `.../privacy-policy.html`.
3. Complete **Data safety** using the data categories listed in the Privacy Policy.
4. For account deletion, link `.../account-deletion.html` where Play asks for deletion instructions.

### Apple App Store Connect

1. Add Privacy Policy URL in App Information.
2. Complete App Privacy nutrition labels consistent with collected data.
3. Ensure account deletion pathway is documented (this site’s Account Deletion page).

## App & developer details

| Field | Value |
| --- | --- |
| App name | Tessera |
| Developer | Pixora |
| Support email | tesseraapptessera@gmail.com |
| Contact person | Ulvi Agayev |
| Contact email | ulviagayev2107@gmail.com |
| Backend | Node.js |
| Database | MongoDB |
| Hosting | Railway |
| Auth | JWT access + refresh tokens |
| Passwords | bcrypt |
| HTTPS | Enabled |

## Data Tessera collects

- Full name
- Email address
- Phone number
- Password (bcrypt hash only)
- Gender
- Delivery address
- Profile photo (optional upload)

## Not included in Tessera

- No AI features
- No payment system
- No push notifications
- No ads
- No analytics
- No third-party advertising SDKs

## Photo access statement

Tessera only uploads the image the user selects (profile photo or optional review image). The app never scans or accesses other photos on the device.

## Account deletion

Users cannot delete accounts inside the app yet. Requests go to **tesseraapptessera@gmail.com**. After identity verification, the account and associated personal data are permanently deleted unless legal retention applies.

## License

All site content © Pixora. Tessera is a product of Pixora.
