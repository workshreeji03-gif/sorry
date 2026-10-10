# The Words I Forgot To Say ❤️

A cinematic, interactive romantic website dedicated to **Prapti**, built with React, Vite, TypeScript, Tailwind CSS, Motion for React, and Lucide React.

---

## 🌹 The Story Behind This Website

On the festive night of Navratri, Prapti dressed up beautifully, but her boyfriend forgot to say the most obvious compliment she deserved to hear without asking. 

This website was handcrafted to make her feel cherished, appreciated, and loved, unfolding like an intimate, expensive romantic short film.

---

## ✨ Features & Cinematic Scenes

1. **Scene 1: The Opening**
   - Deep midnight atmosphere with a gently pulsing burgundy heart.
   - Timed emotional dialogue reveals leading to the gesture-initiated music start ("Open my heart ❤️").

2. **Scene 2: The Photo Reveal**
   - Soft golden embers and stardust floating in the dark.
   - Smooth cinematic zoom & subtle parallax framing of her Navratri photograph.
   - Preserves her full outfit and face without awkward cropping.
   - Lightbox modal with full-screen zoom on tap.

3. **Scene 3: The Video Moment**
   - Custom cinematic video player preserving original aspect ratio (portrait & landscape compatible).
   - Audio ducking engine: Background music smoothly ducks to a whisper when she plays her video, and swells back up when paused/ended.
   - Native-friendly controls, time scrubber, fullscreen toggle, and graceful fallback.

4. **Scene 4: Seven Things I Should Have Said**
   - 7 interactive glowing golden hearts in an elegant constellation.
   - Each touch blooms into a golden card revealing one specific compliment.
   - Live unlock progress counter ("X of 7 hearts unlocked") with smooth non-blocking progression.

5. **Scene 5: My Letter To You**
   - Luxury wax-sealed envelope with a burgundy heart seal.
   - Smooth 3D opening animation unfolding into an intimate handwritten letter in Cormorant/Caveat script.
   - Perfectly readable on mobile and desktop.

6. **Scene 6: The Ending Choice**
   - "Can I make it up to you?" with gentle, non-pressuring buttons ("Yes, baby ❤️" & "I'm still angry 😤").
   - If she forgives: A subtle golden/rose heart explosion via canvas particles.
   - If she is still upset: A warm, patient, and loving response ("That's okay, baby. Take your time. I'm still here, and I'll do better.").

7. **Scene 7: Final Cinematic Callback**
   - Cinematic fade to black with her Navratri photograph returning in a warm halo.
   - Emotional closing lines and "Experience from the beginning ✨" replay button.

---

## 🎨 Design Palette

- `#10080D` — Midnight Black
- `#4A1228` — Deep Burgundy
- `#B76E79` — Dusty Rose
- `#D7B47C` — Champagne Gold
- `#FFF0E8` — Soft Ivory

---

## 📁 Media Asset Structure

```
public/
  media/
    prapti-photo.jpg     # Navratri photograph
    prapti-video.mp4     # Video moment
    romantic-song.mp3    # Background music
```

### Changing Text & Assets

Everything is centralized in a single configuration file:
👉 **[`src/config/siteConfig.ts`](./src/config/siteConfig.ts)**

You can update any sentence, name, compliments, letter paragraphs, or media file paths directly in that file without touching component code.

---

## 🚀 How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🌐 Deploying to Vercel

The project includes a ready-to-deploy [`vercel.json`](./vercel.json).

### Method 1: Using the Vercel CLI
```bash
npm i -g vercel
vercel
```

### Method 2: Via GitHub / Vercel Dashboard
1. Push this folder to a GitHub repository.
2. In [Vercel](https://vercel.com), click **Add New Project** and import the repo.
3. Framework Preset: **Vite** (detected automatically).
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**!
