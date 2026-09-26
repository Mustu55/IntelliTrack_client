function generateHash(input, prefix = "0x") {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  const hex2 = Math.abs(hash * 31 | 0).toString(16).padStart(8, "0");
  const hex3 = Math.abs(hash * 53 | 0).toString(16).padStart(8, "0");
  const hex4 = Math.abs(hash * 97 | 0).toString(16).padStart(8, "0");
  return `${prefix}${hex}${hex2}${hex3}${hex4}`.slice(0, 66);
}
function computeMerkleRoot(leaves) {
  if (leaves.length === 0) return "0x0000000000000000000000000000000000000000000000000000000000000000";
  let currentLevel = [...leaves];
  while (currentLevel.length > 1) {
    const nextLevel = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      if (i + 1 < currentLevel.length) {
        nextLevel.push(generateHash(currentLevel[i] + currentLevel[i + 1]));
      } else {
        nextLevel.push(currentLevel[i]);
      }
    }
    currentLevel = nextLevel;
  }
  return currentLevel[0];
}
const calculateMerkleRoot = computeMerkleRoot;
export {
  calculateMerkleRoot,
  computeMerkleRoot,
  generateHash
};
