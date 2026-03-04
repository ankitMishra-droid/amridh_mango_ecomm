<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

**Product descriptions**
To support extended, per-product details (like Amazon/Flipkart), the `products` table now
includes an optional `details` column. Store a JSON array of strings here; the UI will
render each entry as a bullet point below the main description. You can also include
multiple paragraphs in `description` separated by newlines.


View your app in AI Studio: https://ai.studio/apps/0fa30627-ad31-4130-8585-d18db956c088

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
