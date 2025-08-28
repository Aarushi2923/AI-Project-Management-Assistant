import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

/**
 * Exports a given DOM node to a paginated PDF.
 * The whole app (including Recharts canvas/SVG) is captured.
 */
export async function exportNodeToPDF(node, filename = 'AI-PM-Plan.pdf'){
  const scale = 2 // crisp
  const canvas = await html2canvas(node, { scale, useCORS: true, backgroundColor: null })
  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF('p', 'pt', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  // fit width, maintain aspect
  const imgWidth = pageWidth
  const imgHeight = canvas.height * (imgWidth / canvas.width)

  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
  heightLeft -= pageHeight

  while (heightLeft > 0){
    position = heightLeft * -1
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
    heightLeft -= pageHeight
  }

  pdf.save(filename)
}