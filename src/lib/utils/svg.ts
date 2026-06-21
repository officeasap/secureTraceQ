export const svgUtils = {
  // Create SVG element
  create: (width: number, height: number, viewBox?: string): SVGElement => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
    if (viewBox) svg.setAttribute('viewBox', viewBox);
    return svg;
  },

  // Add rectangle
  addRect: (svg: SVGElement, x: number, y: number, width: number, height: number, options?: Partial<SVGRectElement>): SVGRectElement => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x.toString());
    rect.setAttribute('y', y.toString());
    rect.setAttribute('width', width.toString());
    rect.setAttribute('height', height.toString());
    
    Object.entries(options || {}).forEach(([key, value]) => {
      rect.setAttribute(key, value.toString());
    });
    
    svg.appendChild(rect);
    return rect;
  },

  // Add text
  addText: (svg: SVGElement, x: number, y: number, text: string, options?: Partial<SVGTextElement>): SVGTextElement => {
    const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', x.toString());
    textElement.setAttribute('y', y.toString());
    textElement.textContent = text;
    
    Object.entries(options || {}).forEach(([key, value]) => {
      textElement.setAttribute(key, value.toString());
    });
    
    svg.appendChild(textElement);
    return textElement;
  },

  // Add circle
  addCircle: (svg: SVGElement, cx: number, cy: number, r: number, options?: Partial<SVGCircleElement>): SVGCircleElement => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx.toString());
    circle.setAttribute('cy', cy.toString());
    circle.setAttribute('r', r.toString());
    
    Object.entries(options || {}).forEach(([key, value]) => {
      circle.setAttribute(key, value.toString());
    });
    
    svg.appendChild(circle);
    return circle;
  },

  // Serialize SVG to string
  serialize: (svg: SVGElement): string => {
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svg);
  },

  // Download SVG
  download: (svg: SVGElement, filename: string): void => {
    const svgData = svgUtils.serialize(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  },
};