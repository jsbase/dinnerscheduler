export const pairPeople = (persons) => {
  const pairings = buildPairIndexes(persons.length);
  const pairIxToPerson = (i) => persons[(i + 1) % persons.length];
  return pairings.map((pairing) =>
    pairing.map((pair) => pair.map(pairIxToPerson))
  );
};

const buildPairIndexes = (n) => {
  if (n % 2 !== 0) {
    throw new Error(`${n} is an odd number`);
  }
  const pairings = [];
  const max = n - 1;
  for (let i = 0; i < max; i++) {
    const pairing = [[max, i]];
    for (let k = 1; k < n / 2; k++) {
      pairing.push([(i + k) % max, (max + i - k) % max]);
    }
    pairings.push(pairing);
  }
  return pairings;
};
