# Universal Downloader - Design Guidelines

## Design Approach
**Reference-Based**: Anime/Cyberpunk aesthetic inspired by Vocaloid themes, combining futuristic UI elements with playful anime styling. Think Cyberpunk 2077 meets Hatsune Miku - neon accents, holographic effects, and animated character elements.

## Core Design Principles
1. **Functional Elegance**: Utility-first with delightful anime-themed enhancements
2. **Kinetic Energy**: Subtle animations and glowing effects without overwhelming
3. **Accessibility in Style**: Cyberpunk aesthetics that remain highly usable

## Layout System

**Spacing**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 (p-4, m-8, gap-6, etc.)

**Main Layout Structure**:
- Single-page application with centered content
- Max width: `max-w-4xl` for main content area
- Full viewport height with Miku dancing animation as fixed background
- Floating glass-morphism container for main functionality

## Typography

**Font Families**:
- Primary: 'Inter' (Google Fonts) - clean, modern sans-serif
- Accent: 'Orbitron' (Google Fonts) - futuristic headings and labels
- Mono: 'JetBrains Mono' (Google Fonts) - for URLs and technical text

**Hierarchy**:
- Hero Title: Orbitron, 3xl-4xl, bold, with neon glow text effect
- Section Headers: Orbitron, xl-2xl, semibold
- Body Text: Inter, base-lg, regular
- Labels: Inter, sm, medium, uppercase tracking-wide
- URLs/Technical: JetBrains Mono, sm, regular

## Component Library

### Hero/Main Container
- Glass-morphism card: backdrop-blur-xl, semi-transparent background
- Neon border glow effect (cyan/pink gradient)
- Floating above Miku animation background
- Centered vertically and horizontally: `min-h-screen flex items-center justify-center`
- Padding: p-8 lg:p-12

### URL Input Section
- Large prominent input field with neon underline
- Placeholder: "Paste video URL from TikTok, YouTube, Instagram..."
- Icon prefix showing supported platform logos
- Submit button: Holographic gradient with glow effect
- Auto-platform detection badge appears below input

### Miku Dancing Animation (Background)
- Fixed position, full viewport coverage
- Canvas or video element with Miku dancing loop
- Z-index: -1 (behind all content)
- Opacity: 0.6-0.8 for visibility balance
- Particle effects overlay (optional floating musical notes/stars)

### Music Player Controls
- Fixed bottom-right corner: `fixed bottom-8 right-8`
- Circular floating buttons with glass-morphism
- Play/Pause toggle button (larger, primary control)
- Volume slider: Vertical slider that appears on hover
- Mute/Unmute toggle button
- Icons: Music note, speaker, volume indicators
- Background: backdrop-blur-md with neon accent border
- Size: Controls grouped in compact panel, ~120px width

### Download Results Card
- Appears after URL submission with slide-up animation
- Glass-morphism container with neon accent border
- Grid layout for metadata:
  - Thumbnail: Large preview image (16:9 aspect ratio)
  - Title: Orbitron font, truncated with ellipsis
  - Platform badge: Small pill with platform icon/name
  - Duration: Displayed with clock icon
- Quality selector: Horizontal pill buttons (480p, 720p, 1080p, etc.)
- Download button: Large, prominent, holographic gradient with pulse animation

### Platform Support Grid
- Displayed on initial state (before URL input)
- 6-column grid on desktop, 3-4 on tablet, 2 on mobile
- Each platform: Icon + name, hover glow effect
- Icons: Use Font Awesome or Heroicons
- Platforms: TikTok, YouTube, Instagram, Twitter, Facebook, Pinterest, Google Drive, Douyin, Xiaohongshu, SnackVideo, Cocofun, CapCut, Spotify, SoundCloud, MediaFire

### Loading States
- Cyberpunk spinner: Rotating hexagon or circuit pattern
- Loading text: "Fetching data..." with typing animation effect
- Progress indicator with neon glow

### Error/Success Messages
- Toast notifications: Fixed top-center
- Glass-morphism background
- Icon prefix (checkmark/warning)
- Auto-dismiss after 3-4 seconds
- Slide-down entrance animation

## Visual Effects & Animations

**Neon Glow Effects**:
- Text shadows with cyan/pink/purple colors
- Border glows: `box-shadow: 0 0 20px rgba(0, 255, 255, 0.5)`
- Pulse animation on interactive elements

**Glass Morphism**:
- `backdrop-filter: blur(20px)`
- Semi-transparent backgrounds: `bg-opacity-10` to `bg-opacity-20`
- Subtle border with gradient

**Hover States**:
- Buttons: Scale up slightly (1.05), increase glow intensity
- Cards: Lift effect with stronger shadow
- Links: Neon underline animation

**Transitions**:
- All interactions: `transition-all duration-300 ease-in-out`
- Keep animations smooth and purposeful

## Responsive Behavior

**Mobile (< 768px)**:
- Stack all elements vertically
- Music player: Bottom-center instead of bottom-right
- Platform grid: 2 columns
- Reduce Miku animation opacity to 0.4 for content readability

**Tablet (768px - 1024px)**:
- 3-4 column platform grid
- Maintain glass-morphism effects
- Music player remains bottom-right

**Desktop (> 1024px)**:
- Full 6-column platform grid
- Maximum container width: 1280px
- Enhanced particle effects

## Icons
**Library**: Font Awesome (via CDN)
- Download: `fa-download`
- Play/Pause: `fa-play`, `fa-pause`
- Volume: `fa-volume-up`, `fa-volume-mute`
- Platforms: Use branded icons (`fa-tiktok`, `fa-youtube`, etc.)
- Loading: `fa-spinner fa-spin`

## Images

**Miku Dancing Animation**:
- Video file or animated GIF/WebM of Hatsuke Miku dancing
- Recommended: Looped 10-15 second clip
- Placement: Full-screen background, centered
- Add subtle motion blur or glow effects for integration

**Platform Icons**:
- Use Font Awesome branded icons instead of custom images
- Fallback: 32x32px SVG logos for each platform

**Video Thumbnails**:
- Fetched from API response
- Display at 16:9 aspect ratio
- Add subtle neon border glow on hover

No large hero image - the Miku animation serves as the dynamic background element.