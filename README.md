# Eternal Love Story — how to make it yours

This is a template. Nothing personal is in it yet — that's the point, so you can
drop in your own things safely. Everything lives in 3 files + 1 folder:

```
index.html   → all the words, and where each photo/video/audio file is linked
style.css    → all the visual design (colors, fonts, spacing) — rarely needs edits
script.js    → all the animations/interactions — no edits needed
assets/
  images/    → put your photos here
  videos/    → put your video clips here
  audio/     → put your voice note recordings here
  music/     → put your background song here
```

## 1. Add your photos
Drop image files into `assets/images/` (jpg or png work best).
Open `index.html`, search for `placeholder-photo.svg`, and change each one to
your filename, e.g.:
```html
<img src="assets/images/placeholder-photo.svg" ...>
```
becomes
```html
<img src="assets/images/first-date.jpg" ...>
```
There's one image slot per timeline chapter and six in the polaroid gallery —
add more `<figure class="polaroid">` blocks (copy/paste one) for more photos.

## 2. Add your videos
Drop clips into `assets/videos/`. In `index.html` search for `card-video-wrap`
(timeline clips) and `film-card` (the video gallery), and change the
`<source src="...">` paths to your filenames.

## 3. Add voice notes
Drop mp3/m4a recordings into `assets/audio/`. Search for `voice-note` in
`index.html`, update each `<source src="...">`, and give each one a title in
the `.voice-title` paragraph.

## 4. Add your background song
Drop one audio file into `assets/music/` and name it `our-song.mp3` (or update
the `<source>` path in the `#bgMusic` element to match your filename).
Browsers block music from autoplaying, so a small player sits in the bottom
right corner — the person opening the site presses play themselves.

## 5. Edit the words
Every headline, date, and paragraph is plain text inside `index.html`.
The letter section uses one block of text (look for `data-full="..."` on the
`#letterText` paragraph) — edit that, keep blank lines for paragraph breaks,
and it will "handwrite" itself on screen.

## Previewing it
Just open `index.html` in a browser. For videos/audio to load correctly in
most browsers, it's best to preview through a local server rather than
double-clicking the file — e.g. in a terminal in this folder run:
```
python3 -m http.server 8000
```
then visit `http://localhost:8000` in your browser.

## Deploying it (to send as a link)
Free options that work well for a one-page site like this: Netlify Drop,
Vercel, GitHub Pages, or Cloudflare Pages — all let you drag-and-drop this
folder and get a private link back in a minute or two.
