import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create PDF document
const doc = new PDFDocument({
  size: 'A4',
  margin: 50,
});

// Set up document
doc.font('Helvetica');

// Title
doc.fontSize(24).font('Helvetica-Bold').text('Ralph Stock', { align: 'left' });
doc.fontSize(12).font('Helvetica').text('Curriculum Vitae', { align: 'left' });
doc.moveDown(0.5);

// Contact info
doc.fontSize(10).text('Karlsruhe, Germany', { align: 'left' });
doc.text('2002 — Member of the Professional Association of Visual Artists Karlsruhe (BBK)', { align: 'left' });
doc.text('Lives and works in Karlsruhe', { align: 'left' });
doc.moveDown(1);

// Section: Exhibitions
doc.fontSize(12).font('Helvetica-Bold').text('SOLO AND GROUP SHOWS (SELECTION)', { align: 'left' });
doc.moveDown(0.5);

const shows = [
  { year: '2016', venue: 'Art Forum Forst' },
  { year: '2015', venue: 'Regional Council Karlsruhe — "Stadtgeburtstag Karlsruhe 2015"' },
  { year: '2015', venue: 'Artist Association Speyer' },
  { year: '2014', venue: 'Gallery Art Association Opera Halle' },
  { year: '2013', venue: 'Château Oberschwappach, Knetzgau' },
  { year: '2009', venue: 'Art Fair Baden-Württemberg, Stuttgart' },
  { year: '2009', venue: 'BBK Showcase, Karlsruhe' },
  { year: '2005', venue: 'Gallery Elisabethenhof, Bad Wimpfen' },
  { year: '2005', venue: 'Art Fair Baden-Württemberg, Stuttgart' },
  { year: '2004', venue: '"Bogenraum", Business Park Karlsruhe' },
  { year: '2002', venue: 'City Hall Durlach, Karlsruhe' },
  { year: '2001', venue: 'Hotel "Kaiserhof Lindner", Landshut' },
  { year: '2000', venue: '"Andreas Art Award 2000", Sankt Andreasberg' },
  { year: '2000', venue: '"Art in historical buildings", Landshut' },
  { year: '1998', venue: 'Art Gallery Karlsruhe' },
  { year: '1997', venue: 'Gallery obArt Company, Karlsruhe' },
  { year: '1997', venue: 'Gallery Artothek Lilo Hillens art-contact, Karlsruhe' },
];

doc.fontSize(10).font('Helvetica');
shows.forEach(show => {
  doc.text(`${show.year}  ${show.venue}`, { align: 'left' });
});

doc.moveDown(1);
doc.fontSize(12).font('Helvetica-Bold').text('PUBLIC ACQUISITIONS', { align: 'left' });
doc.moveDown(0.5);

const acquisitions = [
  { year: '2009', venue: 'Regional Council Karlsruhe' },
  { year: '2004', venue: 'Regional Council Karlsruhe' },
];

doc.fontSize(10).font('Helvetica');
acquisitions.forEach(item => {
  doc.text(`${item.year}  ${item.venue}`, { align: 'left' });
});

doc.moveDown(1);
doc.fontSize(12).font('Helvetica-Bold').text('AWARDS', { align: 'left' });
doc.moveDown(0.5);
doc.fontSize(10).font('Helvetica').text('2016  Stollwork Award for Painting', { align: 'left' });

// Pipe to file
const pdfPath = path.join(publicDir, 'Ralph_Stock_CV.pdf');
doc.pipe(fs.createWriteStream(pdfPath));
doc.end();

console.log(`PDF generated at ${pdfPath}`);
