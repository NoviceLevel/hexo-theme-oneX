export function hexToRgba(hex: string, alpha: number): string {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  let color = hex.toLowerCase();

  if (color && reg.test(color)) {
    if (color.length === 4) {
      let newColor = '#';
      for (let i = 1; i < 4; i++) {
        newColor += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = newColor;
    }
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color;
}
