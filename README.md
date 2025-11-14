# Bloom’s stAIrcase – Interactive Tool (Starter)

This repo contains a lightweight, accessible, static website you can host on **GitHub Pages**. It implements:
- A hex-tile style selector (one choice per category) for **Cognitive Process**, **Knowledge Dimension**, and **AI Literacy Focus**
- Hover previews + click-to-select with descriptions appearing **below** each list
- A **Continue** flow with sample actions, a **Customization Form**, and a **Prompt Builder**
- Buttons to copy the generated prompt and open a chosen AI tool in a new tab
- An **Explore Activities** page with basic filtering and CSV export
- **Attribution** and **licensing** in the footer and on a dedicated page

---

## 📁 Project Structure
```
/assets/cc-by-sa.svg
about.html
accessibility.html
activities.json
app.js
data.json
explore.html
index.html
styles.css
```

- `index.html` – Interactive tool (home)
- `data.json` – Content for the three categories + AI tool buttons
- `activities.json` – Sample rows for Explore Activities
- `explore.html` – Filterable table view
- `about.html` – Purpose, how-to, frameworks, AI statement
- `accessibility.html` – Accessibility commitments + licensing
- `app.js` – Interaction logic
- `styles.css` – Styles

---

## ▶️ Local Preview
Open `index.html` directly in a browser, or serve locally:
```bash
# Python 3
python -m http.server 8080
# then visit http://localhost:8080/
```

---

## 🌐 Publish on GitHub Pages (recommended)
1. Create a new repo (public is fine).
2. Upload all files in this folder to the root of the repo.
3. In the repo: **Settings → Pages → Build and deployment → Source = Deploy from a branch**, choose `main` and `/ (root)`.
4. Wait for the green check → Your site is live at `https://<username>.github.io/<repo>/`.

---

## 🧩 Customize
- Edit `data.json` to tweak labels, descriptions, and AI tool links.
- Add more sample activities in `activities.json`.
- Replace `#` in `explore.html` activity links with your real URLs, or link back to the interactive tool sections.

---

## ♿ Accessibility
- Buttons with `aria-pressed` indicate selection.
- Description panels use `aria-live="polite"` to announce updates.
- Focus is visible; minimum hit targets ~44×44 px.
- Color contrast meets or exceeds 4.5:1.
- Modal dialog uses `role="dialog"` and can be closed via **Close** button.

---

## 🧾 Attribution
- **AI Literacy Framework** © Dr. Kara Kennedy, CC BY 4.0 – <https://kennedyhq.com/wp/2023/12/21/ai-literacy-framework/>
- **Revised Bloom’s Taxonomy / Model of Learning Objectives** © Rex Heer (Iowa State University), CC BY-SA 4.0 – <https://www.celt.iastate.edu/teaching/effective-teaching-practices/revised-blooms-taxonomy/>

Unless otherwise noted, new site content © 2025 Nicole Baker & BM — **CC BY-SA 4.0**.

---

## ✅ Notes
- This starter intentionally uses **vanilla HTML/CSS/JS** so it’s trivial to host and maintain.
- You can swap the rounded tiles for true hex shapes with an SVG sprite or `clip-path` later.
- Drag-and-drop is intentionally omitted in favor of a simpler, more accessible **click-to-select** interaction.
