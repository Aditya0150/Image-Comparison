
export const createImageData = (id, file, url, dimensions, size, format, name) => ({
  id,
  file,
  url,
  dimensions,
  size,
  format,
  name
});

export const createComparisonData = (variantA = null, variantB = null) => ({
  variantA,
  variantB
});