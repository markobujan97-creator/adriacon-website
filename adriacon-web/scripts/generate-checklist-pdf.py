#!/usr/bin/env python3
"""
Erzeugt die druckfertige PDF-Checkliste für die Steuererklärung.

Quelle der Inhalte: config/tax-checklist.json
Ausgabe:            public/downloads/adriacon-checkliste-steuererklaerung.pdf

Verwendung (aus dem Projektstammverzeichnis):
    pip install reportlab
    python3 scripts/generate-checklist-pdf.py

Nach jeder Änderung an config/tax-checklist.json erneut ausführen, damit die
Website und die PDF-Datei denselben Stand zeigen.
"""

import json
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "config", "tax-checklist.json")
LOGO = os.path.join(ROOT, "public", "brand", "adriacon-signet.png")
OUT_DIR = os.path.join(ROOT, "public", "downloads")
OUT = os.path.join(OUT_DIR, "adriacon-checkliste-steuererklaerung.pdf")

# Adriacon Markenfarben
SKY = (0.549, 0.792, 0.933)   # #8CCAEE
BLUE = (0.220, 0.518, 0.765)  # #3884C3
NAVY = (0.071, 0.192, 0.290)  # #12314A
INK = (0.310, 0.392, 0.451)   # #4F6473
LINE = (0.867, 0.902, 0.925)  # #DDE6EC

PAGE_W, PAGE_H = A4
MARGIN = 20 * mm
COL_GAP = 8 * mm
COL_W = (PAGE_W - 2 * MARGIN - COL_GAP) / 2


def draw_header(c):
    y = PAGE_H - MARGIN
    if os.path.exists(LOGO):
        c.drawImage(ImageReader(LOGO), MARGIN, y - 15 * mm, width=15 * mm, height=15 * mm,
                    mask="auto", preserveAspectRatio=True)
    c.setFillColorRGB(*NAVY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN + 19 * mm, y - 6 * mm, "ADRIACON")
    c.setFillColorRGB(*BLUE)
    c.setFont("Helvetica", 6.5)
    c.drawString(MARGIN + 19 * mm, y - 10 * mm, "T R E U H A N D")

    c.setFillColorRGB(*INK)
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_W - MARGIN, y - 6 * mm, "Adriacon Treuhand GmbH")
    c.drawRightString(PAGE_W - MARGIN, y - 10 * mm, "Taefernstrasse 4, 5405 Baden-Daettwil")
    c.drawRightString(PAGE_W - MARGIN, y - 14 * mm, "info@adriacon.ch  ·  +41 76 541 40 08")

    c.setStrokeColorRGB(*SKY)
    c.setLineWidth(1.6)
    c.line(MARGIN, y - 20 * mm, PAGE_W - MARGIN, y - 20 * mm)
    return y - 20 * mm


def draw_footer(c, page_no):
    c.setStrokeColorRGB(*LINE)
    c.setLineWidth(0.6)
    c.line(MARGIN, MARGIN + 8 * mm, PAGE_W - MARGIN, MARGIN + 8 * mm)
    c.setFillColorRGB(*INK)
    c.setFont("Helvetica", 7)
    c.drawString(MARGIN, MARGIN + 4 * mm, "www.adriacon.ch  ·  Wir halten Sie auf Kurs.")
    c.drawRightString(PAGE_W - MARGIN, MARGIN + 4 * mm, f"Seite {page_no}")


def wrap(c, text, font, size, max_w):
    c.setFont(font, size)
    words, lines, cur = text.split(" "), [], ""
    for w in words:
        probe = (cur + " " + w).strip()
        if c.stringWidth(probe, font, size) <= max_w:
            cur = probe
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def main():
    with open(DATA, encoding="utf-8") as fh:
        data = json.load(fh)

    os.makedirs(OUT_DIR, exist_ok=True)
    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle("Adriacon Checkliste Steuererklaerung")
    c.setAuthor("Adriacon Treuhand GmbH")
    c.setSubject("Unterlagen fuer die Steuererklaerung")

    page = 1
    top = draw_header(c)

    # Titel
    y = top - 12 * mm
    c.setFillColorRGB(*NAVY)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(MARGIN, y, data["title"])
    y -= 7 * mm

    c.setFillColorRGB(*INK)
    for line in wrap(c, data["intro"], "Helvetica", 9, PAGE_W - 2 * MARGIN):
        c.setFont("Helvetica", 9)
        c.drawString(MARGIN, y, line)
        y -= 4.6 * mm

    y -= 5 * mm

    # Zwei Spalten
    col_x = [MARGIN, MARGIN + COL_W + COL_GAP]
    col_y = [y, y]
    col = 0
    bottom_limit = MARGIN + 18 * mm

    for group in data["groups"]:
        needed = 9 * mm + len(group["items"]) * 5.6 * mm
        if col_y[col] - needed < bottom_limit:
            if col == 0:
                col = 1
            else:
                draw_footer(c, page)
                c.showPage()
                page += 1
                top = draw_header(c)
                col_y = [top - 12 * mm, top - 12 * mm]
                col = 0

        x = col_x[col]
        cy = col_y[col]

        c.setFillColorRGB(*BLUE)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x, cy, group["title"].upper())
        cy -= 2.5 * mm
        c.setStrokeColorRGB(*SKY)
        c.setLineWidth(1.2)
        c.line(x, cy, x + COL_W, cy)
        cy -= 5.5 * mm

        for item in group["items"]:
            # Kontrollkaestchen
            c.setStrokeColorRGB(*BLUE)
            c.setLineWidth(0.8)
            c.rect(x, cy - 0.9 * mm, 3.4 * mm, 3.4 * mm, stroke=1, fill=0)

            c.setFillColorRGB(*NAVY)
            lines = wrap(c, item, "Helvetica", 9, COL_W - 6 * mm)
            for k, line in enumerate(lines):
                c.setFont("Helvetica", 9)
                c.drawString(x + 6 * mm, cy, line)
                if k < len(lines) - 1:
                    cy -= 4.4 * mm
            cy -= 5.6 * mm

        col_y[col] = cy - 4 * mm

    # Hinweis
    y = min(col_y) - 2 * mm
    if y < bottom_limit + 20 * mm:
        draw_footer(c, page)
        c.showPage()
        page += 1
        y = draw_header(c) - 14 * mm

    c.setFillColorRGB(*SKY)
    c.rect(MARGIN, y - 14 * mm, PAGE_W - 2 * MARGIN, 14 * mm, stroke=0, fill=1)
    c.setFillColorRGB(*NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(MARGIN + 4 * mm, y - 5.5 * mm, "Hinweis")
    c.setFont("Helvetica", 8)
    for i, line in enumerate(wrap(c, data["note"], "Helvetica", 8, PAGE_W - 2 * MARGIN - 8 * mm)):
        c.drawString(MARGIN + 4 * mm, y - 9.5 * mm - i * 3.6 * mm, line)

    draw_footer(c, page)
    c.save()
    print(f"PDF erstellt: {OUT}")


if __name__ == "__main__":
    main()
