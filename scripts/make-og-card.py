"""Builds the 1200x630 social card and favicon.ico from the site's own tokens."""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

PORTRAIT, OUT_DIR = sys.argv[1], sys.argv[2]
W, H = 1200, 630
INK, TEXT, MUTED, ACCENT, ACCENT2 = (8, 9, 12), (233, 236, 242), (154, 161, 178), (110, 147, 255), (155, 123, 255)

B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
R = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
M = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
f_name, f_role, f_tag, f_mono = (
    ImageFont.truetype(B, 74), ImageFont.truetype(B, 34),
    ImageFont.truetype(R, 27), ImageFont.truetype(M, 22),
)

card = Image.new("RGB", (W, H), INK)
d = ImageDraw.Draw(card)

# Faint engineering grid, matching the hero.
for x in range(0, W, 64):
    d.line([(x, 0), (x, H)], fill=(20, 22, 28), width=1)
for y in range(0, H, 64):
    d.line([(0, y), (W, y)], fill=(20, 22, 28), width=1)

# Accent glow behind the portrait.
glow = Image.new("RGB", (W, H), INK)
ImageDraw.Draw(glow).ellipse([W - 560, -200, W + 160, 520], fill=(32, 40, 78))
card = Image.blend(card, glow.filter(ImageFilter.GaussianBlur(110)), 0.85)
d = ImageDraw.Draw(card)

# Portrait, circular, with a two-tone ring.
SIZE, CX, CY = 300, 965, 300
im = Image.open(PORTRAIT).convert("RGB").resize((SIZE, SIZE), Image.LANCZOS)
mask = Image.new("L", (SIZE, SIZE), 0)
ImageDraw.Draw(mask).ellipse([0, 0, SIZE, SIZE], fill=255)
ring = 6
box = [CX - SIZE // 2 - ring, CY - SIZE // 2 - ring, CX + SIZE // 2 + ring, CY + SIZE // 2 + ring]
# pieslice, not a squashed ellipse: two arcs of the same circle, so the ring
# keeps a constant width instead of bulging at the top.
d.pieslice(box, start=200, end=20, fill=ACCENT2)
d.pieslice(box, start=20, end=200, fill=ACCENT)
card.paste(im, (CX - SIZE // 2, CY - SIZE // 2), mask)

# Copy, left column.
x = 80
d.text((x, 150), "Shreyash", font=f_name, fill=TEXT)
d.text((x, 232), "Mokashi", font=f_name, fill=TEXT)
d.text((x, 340), "Software Engineer", font=f_role, fill=TEXT)
d.text((x, 390), "Full-stack  ·  React, Next.js, Node", font=f_tag, fill=MUTED)
d.line([(x, 452), (x + 92, 452)], fill=ACCENT, width=3)
d.text((x, 478), "Travel & booking platforms", font=f_tag, fill=MUTED)
d.text((x, 540), "shreyash-mokashi.github.io", font=f_mono, fill=ACCENT)

card.save(f"{OUT_DIR}/og-card.png", "PNG", optimize=True)

# Favicon from the same portrait: a circular crop at the usual icon sizes.
ico = Image.open(PORTRAIT).convert("RGB").resize((64, 64), Image.LANCZOS)
ico.save(f"{OUT_DIR}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("og-card.png and favicon.ico written")
