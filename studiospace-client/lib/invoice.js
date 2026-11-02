import jsPDF from "jspdf";

export function downloadInvoice(b) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("StudioSpace - Booking Invoice", 14, 20);
  doc.setFontSize(11);
  const rows = [
    ["Invoice ID", b._id],
    ["Studio", b.studioTitle],
    ["Booked by", `${b.userName} (${b.userEmail})`],
    ["Date", b.date],
    ["Time", `${b.startTime} - ${b.endTime} (${b.hours} hrs)`],
    ["Hourly rate", `$${b.hourlyRate}`],
    ["Total", `$${b.totalPrice}`],
    ["Security deposit", `$${b.securityDeposit} (refundable)`],
    ["Status", b.status],
  ];
  rows.forEach(([k, v], i) => {
    doc.text(`${k}:`, 14, 40 + i * 10);
    doc.text(String(v), 70, 40 + i * 10);
  });
  doc.save(`invoice-${b._id}.pdf`);
}