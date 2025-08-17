# Ideal Expressions

A simple React store with Products, Cart, and Checkout. Payment options:
- **PayPal (Sandbox redirect)**
- **Cash on Delivery (COD)**

## Colors
- `#FFDDE2` • `#EFD6D2` • `#FF8CC6` • `#DE369D`

## Run Locally
```bash
npm install
npm start
```

## Replace PayPal Business Email
Edit `src/components/Checkout.js` and set:
```js
const business = 'your-paypal-business-email@example.com';
```

> Note: Current link uses **PayPal Sandbox** so you can test it free.

## Free Hosting

### 1) GitHub Pages
- Create a repo, push the project.
- In repo Settings → Pages → Build from **GitHub Actions**.
- Add a workflow with `actions/setup-node` and `npm run build`, then upload `build/` as artifact and deploy with Pages.
- Your site will be at: `https://<user>.github.io/<repo>/`.

### 2) Netlify
- Go to Netlify → Add new site → Import from Git.
- Build command: `npm run build`
- Publish directory: `build`
- URL will be like: `yourbrand.netlify.app`

### 3) Vercel
- Import the GitHub repo on Vercel.
- Framework preset: **Create React App**
- Build command: `npm run build`
- Output directory: `build`
- URL will be like: `yourbrand.vercel.app`

## Project Structure
```
ideal-expressions/
├─ public/
│  ├─ index.html
│  └─ images/   # product images
├─ src/
│  ├─ App.js
│  ├─ index.js
│  ├─ styles.css
│  ├─ components/
│  │  ├─ Navbar.js
│  │  ├─ ProductCard.js
│  │  ├─ Cart.js
│  │  └─ Checkout.js
│  └─ data/
│     └─ products.js
├─ package.json
└─ README.md
```

### Notes
- COD saves the last order in `localStorage` and clears your cart.
- For Stripe, you can add a **Payment Link** button to redirect customers (no code needed).
