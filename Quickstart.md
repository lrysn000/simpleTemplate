# 🚀 Procurement Portal – Quick Start Guide

This guide helps you (or your teammates) get the project up and running locally, and explains how to modify the rated device list.

---

## 📦 1. Clone the Repository

```bash
git clone https://github.com/torili1210/procurement-portal.git
cd procurement-portal

---

## ⚙️ 2. Install Dependencies and Run

Make sure you have **Node.js v18+** installed.

```bash
npm install
npm run dev
```

Then open your browser at:

```
http://localhost:5173
```

---

## ✏️ 3. Modify Rated Device Information

### a. Update UI Logic (if needed)

Go to:

```
src/components/RatedCategoryPanel.tsx
```

This file controls how devices are displayed per category.

### b. Update the Device Data

**Do NOT edit `devices.json` directly**, as it is auto-generated.

Instead, update each device's metadata in:

```
public/images/devices/<category>/<deviceId>/
```

Each device folder typically includes:

* `meta.json` → JSON file with `description`, `star`, and `price` fields.
* `Product.jpg` or `Product.jpg.avif` → Main product image.
* `Rating.png` → star badge or icon.

Example `meta.json`:

```json
{
  "description": "Energy-efficient laptop for students",
  "star": 4,
  "price": 899,
  "condition":"Brand New",
  "overallScore": 85,
  "warranty": "3 Years",
  "repairability": "Difficult",
  "modularity": "Low",
  "lifespan": "10+ Years",
  "buildQuality": "High"

}
```

### c. Regenerate the Device Data File

After editing the `meta.json` files, run:

```bash
npm run generate-devices
```

This will regenerate the master device list in:

```
src/data/devices.json
```

---
For live deployment, push to `main` and GitHub Actions will auto-deploy to:

## ✅ Done!

You're now ready to explore, test, and modify the procurement portal.

### 🚀 Deployment Notes

This project uses **GitHub Actions** for automatic deployment.

Whenever you push to the `main` branch, a GitHub Actions workflow will:

- install dependencies
- build the project
- deploy the `dist/` folder to the `gh-pages` branch

No need to run `npm run deploy` manually.

🔗 Production URL: [https://torili1210.github.io/procurement-portal/](https://torili1210.github.io/procurement-portal/)
