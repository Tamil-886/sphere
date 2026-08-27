import math
import os
from PIL import Image, ImageDraw

def create_svg():
    svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E40AF" />
      <stop offset="60%" stop-color="#1E3A8A" />
      <stop offset="100%" stop-color="#0F766E" />
    </linearGradient>
    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#EA580C" />
    </linearGradient>
    <linearGradient id="treeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F0FDFA" />
    </linearGradient>
    <linearGradient id="treeShade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.35" />
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Squircle Badge -->
  <rect width="512" height="512" rx="118" fill="url(#bgGrad)" />

  <!-- Subtle Inner Border Highlight -->
  <rect x="8" y="8" width="496" height="496" rx="110" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-opacity="0.15" />

  <!-- Warm Summer Sun / Adventure Compass Spark -->
  <g filter="url(#glow)">
    <circle cx="372" cy="140" r="46" fill="url(#sunGrad)" />
    <!-- Sun Rays / Star Spark -->
    <path d="M 372 74 L 377 122 L 420 120 L 383 140 L 416 166 L 377 156 L 372 206 L 367 156 L 328 166 L 361 140 L 324 120 L 367 122 Z" fill="#FDE047" opacity="0.3" />
  </g>

  <!-- Camp Mountain Silhouette in background -->
  <polygon points="170,380 290,250 410,380" fill="#0D9488" opacity="0.25" />
  <polygon points="290,250 320,282 290,285 275,270" fill="#FFFFFF" opacity="0.2" />

  <!-- Iconic Camp Pine Tree -->
  <g filter="url(#dropShadow)">
    <!-- Tree Trunk -->
    <rect x="232" y="380" width="48" height="60" rx="8" fill="#D97706" />
    
    <!-- Tree Layer 3 (Bottom) -->
    <path d="M 256 280 L 396 385 C 390 392 378 392 370 392 L 142 392 C 134 392 122 392 116 385 Z" fill="url(#treeGrad)" />
    <!-- Right side shading for 3D depth -->
    <path d="M 256 280 L 396 385 C 390 392 378 392 370 392 L 256 392 Z" fill="#E2E8F0" opacity="0.35" />

    <!-- Tree Layer 2 (Middle) -->
    <path d="M 256 195 L 364 290 C 358 296 348 296 340 296 L 172 296 C 164 296 154 296 148 290 Z" fill="url(#treeGrad)" />
    <!-- Right side shading -->
    <path d="M 256 195 L 364 290 C 358 296 348 296 340 296 L 256 296 Z" fill="#E2E8F0" opacity="0.35" />

    <!-- Tree Layer 1 (Top Peak) -->
    <path d="M 256 105 L 332 198 C 327 203 318 203 310 203 L 202 203 C 194 203 185 203 180 198 Z" fill="url(#treeGrad)" />
    <!-- Right side shading -->
    <path d="M 256 105 L 332 198 C 327 203 318 203 310 203 L 256 203 Z" fill="#E2E8F0" opacity="0.35" />
    
    <!-- Star on top of tree / campfire sparkle -->
    <circle cx="256" cy="102" r="10" fill="#F59E0B" />
  </g>
</svg>'''
    return svg_content

def draw_high_res_icon(size=1024):
    """Draw a supersampled icon using Pillow for crisp antialiasing."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    scale = size / 512.0

    # Draw rounded rectangle background
    rx = int(118 * scale)
    # Background gradient
    # We can create a gradient mask or compute gradient per pixel/row
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    
    # Create smooth diagonal linear gradient
    c1 = (30, 64, 175)   # #1E40AF Royal Sapphire Blue
    c2 = (15, 118, 110)  # #0F766E Teal
    
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2.0 * size)
            r = int(c1[0] * (1 - t) + c2[0] * t)
            g = int(c1[1] * (1 - t) + c2[1] * t)
            b = int(c1[2] * (1 - t) + c2[2] * t)
            # Check if inside rounded rect
            bg.putpixel((x, y), (r, g, b, 255))
            
    # Mask rounded rect
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=rx, fill=255)
    
    # Apply mask
    badge = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    badge.paste(bg, (0, 0), mask)
    
    # Inner border
    b_draw = ImageDraw.Draw(badge)
    border_inset = int(8 * scale)
    border_width = max(1, int(4 * scale))
    border_rx = int(110 * scale)
    b_draw.rounded_rectangle(
        [border_inset, border_inset, size - border_inset, size - border_inset],
        radius=border_rx,
        outline=(255, 255, 255, 40),
        width=border_width
    )
    
    # Sun / warm accent in top right (cx=372, cy=140, r=46)
    sun_cx = int(372 * scale)
    sun_cy = int(140 * scale)
    sun_r = int(46 * scale)
    
    # Sun glow
    glow_r = int(60 * scale)
    sun_overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    sun_draw = ImageDraw.Draw(sun_overlay)
    
    # Sun circle with gradient
    for r in range(sun_r, 0, -1):
        t = 1.0 - (r / sun_r)
        # Gold to orange
        sr = int(253 * (1 - t) + 234 * t)
        sg = int(224 * (1 - t) + 88 * t)
        sb = int(71 * (1 - t) + 12 * t)
        sun_draw.ellipse([sun_cx - r, sun_cy - r, sun_cx + r, sun_cy + r], fill=(sr, sg, sb, 255))
        
    badge = Image.alpha_composite(badge, sun_overlay)
    
    # Mountain in background
    mount_overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mount_draw = ImageDraw.Draw(mount_overlay)
    m_pts = [(int(170 * scale), int(380 * scale)), (int(290 * scale), int(250 * scale)), (int(410 * scale), int(380 * scale))]
    mount_draw.polygon(m_pts, fill=(13, 148, 136, 70))
    badge = Image.alpha_composite(badge, mount_overlay)
    
    # Tree drawing
    tree_overlay = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    t_draw = ImageDraw.Draw(tree_overlay)
    
    # Trunk
    tx1, ty1 = int(232 * scale), int(380 * scale)
    tx2, ty2 = int(280 * scale), int(440 * scale)
    t_draw.rounded_rectangle([tx1, ty1, tx2, ty2], radius=int(6 * scale), fill=(217, 119, 6, 255))
    
    # Layer 3 (Bottom)
    l3_pts = [(int(256 * scale), int(280 * scale)), (int(396 * scale), int(388 * scale)), (int(116 * scale), int(388 * scale))]
    t_draw.polygon(l3_pts, fill=(255, 255, 255, 255))
    # Layer 3 shadow half
    l3_shade = [(int(256 * scale), int(280 * scale)), (int(396 * scale), int(388 * scale)), (int(256 * scale), int(388 * scale))]
    t_draw.polygon(l3_shade, fill=(226, 232, 240, 90))
    
    # Layer 2 (Middle)
    l2_pts = [(int(256 * scale), int(195 * scale)), (int(364 * scale), int(294 * scale)), (int(148 * scale), int(294 * scale))]
    t_draw.polygon(l2_pts, fill=(255, 255, 255, 255))
    # Layer 2 shadow half
    l2_shade = [(int(256 * scale), int(195 * scale)), (int(364 * scale), int(294 * scale)), (int(256 * scale), int(294 * scale))]
    t_draw.polygon(l2_shade, fill=(226, 232, 240, 90))

    # Layer 1 (Top)
    l1_pts = [(int(256 * scale), int(105 * scale)), (int(332 * scale), int(202 * scale)), (int(180 * scale), int(202 * scale))]
    t_draw.polygon(l1_pts, fill=(255, 255, 255, 255))
    # Layer 1 shadow half
    l1_shade = [(int(256 * scale), int(105 * scale)), (int(332 * scale), int(202 * scale)), (int(256 * scale), int(202 * scale))]
    t_draw.polygon(l1_shade, fill=(226, 232, 240, 90))
    
    # Star / Dot at the peak
    star_cx, star_cy = int(256 * scale), int(102 * scale)
    star_r = int(11 * scale)
    t_draw.ellipse([star_cx - star_r, star_cy - star_r, star_cx + star_r, star_cy + star_r], fill=(245, 158, 11, 255))
    
    # Merge
    badge = Image.alpha_composite(badge, tree_overlay)
    return badge

def main():
    target_dir = r"c:\Users\Tamil D\Downloads\Simple project\assets\images"
    root_dir = r"c:\Users\Tamil D\Downloads\Simple project"
    os.makedirs(target_dir, exist_ok=True)
    
    # 1. Save SVG
    svg_data = create_svg()
    svg_path = os.path.join(target_dir, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_data)
    print(f"Saved SVG to {svg_path}")
    
    # 2. Render master 1024x1024 image for downscaling
    master_img = draw_high_res_icon(size=1024)
    
    # 3. Generate PNGs with high quality Lanczos filter
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }
    
    generated_images = {}
    for filename, s in sizes.items():
        resized = master_img.resize((s, s), Image.Resampling.LANCZOS)
        out_path = os.path.join(target_dir, filename)
        resized.save(out_path, format="PNG", optimize=True)
        generated_images[s] = resized
        print(f"Saved {filename} ({s}x{s})")
        
    # 4. Generate multi-resolution favicon.ico (16, 32, 48)
    ico_img_16 = generated_images[16]
    ico_img_32 = generated_images[32]
    ico_img_48 = generated_images[48]
    
    # Save favicon.ico to assets/images/
    assets_ico_path = os.path.join(target_dir, "favicon.ico")
    ico_img_48.save(
        assets_ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[ico_img_32, ico_img_16]
    )
    print(f"Saved {assets_ico_path}")
    
    # Save favicon.ico to root directory as well
    root_ico_path = os.path.join(root_dir, "favicon.ico")
    ico_img_48.save(
        root_ico_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[ico_img_32, ico_img_16]
    )
    print(f"Saved {root_ico_path}")

if __name__ == "__main__":
    main()
