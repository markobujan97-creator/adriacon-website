#!/usr/bin/env python3
"""
Erzeugt die Seilbilder aus der Strichzeichnung des Knotens.

Quelle:  scripts/seilknoten-original.png
Ausgabe: public/images/seil-knoten-{dunkel,hell}.png
         public/images/seil-strang-{dunkel,hell}.png          (Kachel links)
         public/images/seil-strang-rechts-{dunkel,hell}.png   (Kachel rechts)

Verwendung (aus dem Projektstammverzeichnis):
    pip install pillow numpy
    python3 scripts/prepare-rope-assets.py

Ablauf:
  1. Aus der Helligkeit eine Alphamaske bilden. Die Strichzeichnung ist dunkel,
     Papier und Karomuster der Vorlage sind hell und werden transparent.
  2. Zweifach hochskalieren (für Bildschirme mit hoher Pixeldichte).
  3. Knoten und zwei Kacheln aus den geraden Seilstücken schneiden.
  4. Kacheln nahtlos machen: der Anfang der linken Kachel wird in die
     Fortsetzung ihres eigenen Endes überblendet, beim rechten Stück umgekehrt.
  5. In zwei Farben ausgeben: Navy für helle Abschnitte, helles Blau für den
     dunklen Abschluss-Abschnitt.

Die Zuschnittwerte gelten für die vorhandene Vorlage. Bei einer anderen Vorlage
müssen Y0, Y1, L, R und P neu bestimmt werden.
"""

import os
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'scripts', 'seilknoten-original.png')
OUT = os.path.join(ROOT, 'public', 'images')

S = 2                 # Hochskalierung
Y0, Y1 = 12 * S, 132 * S   # senkrechtes Fenster, in dem alle Bilder liegen
L, R = 76 * S, 260 * S     # linker und rechter Schnitt des Knotens
P = 16 * S            # Breite einer Kachel (Abstand der Schraffur)
B = 6 * S             # Breite der Überblendung

NAVY = (18, 49, 74)        # #12314A – für helle Abschnitte
SKY_LIGHT = (199, 229, 246)  # #C7E5F6 – für den dunklen Abschnitt


def colorize(a: np.ndarray, rgb: tuple[int, int, int]) -> Image.Image:
    h, w = a.shape
    out = np.zeros((h, w, 4), np.uint8)
    out[..., 0], out[..., 1], out[..., 2] = rgb
    out[..., 3] = np.clip(a * 255, 0, 255).astype(np.uint8)
    return Image.fromarray(out)


def main() -> None:
    src = Image.open(SRC).convert('RGB')
    lum = np.asarray(src).astype(float).mean(2)
    alpha = np.clip((200 - lum) / 80, 0, 1)

    big = Image.fromarray((alpha * 255).astype(np.uint8)).resize(
        (src.width * S, src.height * S), Image.LANCZOS
    )
    band = np.asarray(big).astype(float)[Y0:Y1] / 255.0

    left = band[:, L - P:L].copy()
    for i in range(B):
        w = i / B
        left[:, i] = (1 - w) * band[:, L + i] + w * band[:, L - P + i]

    right = band[:, R:R + P].copy()
    for i in range(B):
        w = i / B
        j = P - B + i
        right[:, j] = (1 - w) * band[:, R + j] + w * band[:, R - B + i]

    knot = band[:, L:R]

    os.makedirs(OUT, exist_ok=True)
    for tag, rgb in [('dunkel', NAVY), ('hell', SKY_LIGHT)]:
        for arr, name in [
            (knot, f'seil-knoten-{tag}.png'),
            (left, f'seil-strang-{tag}.png'),
            (right, f'seil-strang-rechts-{tag}.png'),
        ]:
            path = os.path.join(OUT, name)
            img = colorize(arr, rgb)
            img.save(path, optimize=True)
            print(f'{name}: {img.size}')


if __name__ == '__main__':
    main()
