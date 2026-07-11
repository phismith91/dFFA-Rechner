"""Generate dFFA-Rechner PWA icons (rounded red square + white F glyph).

Draws the "F" from plain rectangles instead of rendering text, so the
output doesn't depend on which fonts happen to be installed on the
machine running this script.
"""
import os

from PIL import Image, ImageDraw

FIRE_RED = (220, 38, 38)  # #DC2626, matches --fire-red in css/styles.css
WHITE = (255, 255, 255)


def make_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = round(size * 0.16)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=FIRE_RED)

    stem = [round(size * 0.30), round(size * 0.22), round(size * 0.42), round(size * 0.78)]
    top_bar = [round(size * 0.30), round(size * 0.22), round(size * 0.70), round(size * 0.34)]
    mid_bar = [round(size * 0.30), round(size * 0.46), round(size * 0.60), round(size * 0.58)]
    draw.rectangle(stem, fill=WHITE)
    draw.rectangle(top_bar, fill=WHITE)
    draw.rectangle(mid_bar, fill=WHITE)
    return img


if __name__ == "__main__":
    os.makedirs("icons", exist_ok=True)
    make_icon(512).save("icons/icon-512.png")
    make_icon(192).save("icons/icon-192.png")
    print("Generated icons/icon-512.png and icons/icon-192.png")
