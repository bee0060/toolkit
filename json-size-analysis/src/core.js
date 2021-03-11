// const byteSize = require('./utils/byteSize');
// const byteLength = require('./utils/byteLength');
const byteLength = str => Buffer.byteLength(str);
const byteSize = str => new Blob([str]).size;

const getByteLength = typeof window !== 'undefined' ? byteSize : byteLength;

function sizeBase(parentSize, selfSize) {
  return {
    __size__: selfSize,
    __percentage__: (parentSize > 0 ? selfSize / parentSize : 1) * 100
  };
}

function jsonSizeAnalysis(json, parentSize = 0) {
  if (typeof json === 'undefined' || json === null) {
    return sizeBase(parentSize, 0);
  }

  if (typeof json !== 'object') {
    return sizeBase(parentSize, getByteLength(json + '')) ;
  }

  const selfSize = getByteLength(JSON.stringify(json));
  const result = sizeBase(parentSize, selfSize);
  return Object.entries(json).reduce((acc, [key, value]) => {
    acc[key] = jsonSizeAnalysis(value, selfSize);
    return acc
  }, result)
}

// module.exports = {
//   jsonSizeAnalysis: jsonSizeAnalysis
// }