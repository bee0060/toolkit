const byteLength = str => Buffer.byteLength(str);
const byteSize = str => new Blob([str]).size;

const getByteLength = typeof window !== 'undefined' ? byteSize : byteLength;
const QUOTE_SIZE = 2
const COLON_SIZE = 1
const OBJECT_WRAPPER_SIZE = 2

function sizeBase(parentSize, selfSize) {
  return {
    __size__: selfSize,
    __percentage__: (parentSize > 0 ? selfSize / parentSize : 1) * 100
  };
}

function jsonSizeAnalysis(json, parentSize = 0, outerSize = 0) {
  if (typeof json === 'undefined' || json === null) {
    return sizeBase(parentSize, outerSize);
  }

  if (typeof json !== 'object') {
    return sizeBase(parentSize, getByteLength(json + '') + QUOTE_SIZE + outerSize);
  }

  const innerSize = getByteLength(JSON.stringify(json));
  const fullSize = innerSize + outerSize
  const result = sizeBase(parentSize, fullSize);
  return Object.entries(json).reduce((acc, [key, value]) => {
    acc[key] = jsonSizeAnalysis(value, fullSize, key.length + QUOTE_SIZE + COLON_SIZE);
    return acc
  }, result)
}

try {
  module.exports = {
    jsonSizeAnalysis: jsonSizeAnalysis
  }
} catch (ex) {
  console.log('run in browser')
}