export const printUtils = {
  // Print element
  printElement: (elementId: string): void => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print - SecureTrace</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .print-only { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${element.innerHTML}
        <script>
          window.print();
          window.close();
        <\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
  },

  // Print current page
  printPage: (): void => {
    window.print();
  },
};