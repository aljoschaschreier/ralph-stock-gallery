#!/usr/bin/env python3
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import os

# Ensure public directory exists
os.makedirs("public", exist_ok=True)

# Create PDF
pdf_path = "public/Ralph_Stock_CV.pdf"
doc = SimpleDocTemplate(pdf_path, pagesize=letter, topMargin=0.75*inch, bottomMargin=0.75*inch)

# Styles
styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=24,
    textColor=colors.black,
    spaceAfter=6,
    alignment=TA_CENTER,
    fontName='Helvetica-Bold'
)

heading_style = ParagraphStyle(
    'CustomHeading',
    parent=styles['Heading2'],
    fontSize=12,
    textColor=colors.black,
    spaceAfter=8,
    spaceBefore=12,
    fontName='Helvetica-Bold',
    borderPadding=0
)

normal_style = ParagraphStyle(
    'CustomNormal',
    parent=styles['Normal'],
    fontSize=10,
    textColor=colors.black,
    spaceAfter=4,
    leading=12
)

# Content
story = []

# Title
story.append(Paragraph("Ralph Stock", title_style))
story.append(Paragraph("Contemporary Painter", normal_style))
story.append(Spacer(1, 0.2*inch))

# Bio Section
story.append(Paragraph("BIOGRAPHY", heading_style))
bio_data = [
    ["Born:", "Karlsruhe, Germany"],
    ["Status:", "Member of the Professional Association of Visual Artists Karlsruhe (BBK)"],
    ["Location:", "Lives and works in Karlsruhe"]
]
bio_table = Table(bio_data, colWidths=[1.2*inch, 4.3*inch])
bio_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 2),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
]))
story.append(bio_table)
story.append(Spacer(1, 0.15*inch))

# Solo & Group Shows
story.append(Paragraph("SOLO AND GROUP SHOWS (Selection)", heading_style))
shows_data = [
    ["2023", "Kunstverein Speyer"],
    ["2022", "Schloss Oberschwappach"],
    ["2021", "Kunstforum Forst"],
    ["2020", "Galerie am Markt, Karlsruhe"],
    ["2019", "Künstlerbund Speyer"],
    ["2018", "Kulturzentrum Karlsruhe"],
]
shows_table = Table(shows_data, colWidths=[0.8*inch, 4.7*inch])
shows_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 3),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
]))
story.append(shows_table)
story.append(Spacer(1, 0.15*inch))

# Public Acquisitions
story.append(Paragraph("PUBLIC ACQUISITIONS", heading_style))
acq_data = [
    ["2020", "Karlsruhe Municipal Collection"],
    ["2019", "City of Karlsruhe Art Fund"],
    ["2017", "Baden-Württemberg State Collection"],
]
acq_table = Table(acq_data, colWidths=[0.8*inch, 4.7*inch])
acq_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 3),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
]))
story.append(acq_table)
story.append(Spacer(1, 0.15*inch))

# Awards
story.append(Paragraph("AWARDS", heading_style))
awards_data = [
    ["2016", "Stollwork Prize for Painting"],
]
awards_table = Table(awards_data, colWidths=[0.8*inch, 4.7*inch])
awards_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 3),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
]))
story.append(awards_table)

# Build PDF
doc.build(story)
print(f"CV PDF generated successfully at {pdf_path}")
