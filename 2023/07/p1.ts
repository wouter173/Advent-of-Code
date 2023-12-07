import { print } from "../lib/mod.ts";

const input = Deno.readTextFileSync("input.txt");

const hands = input.split("\n").map((x) => ({ hand: x.split(" ")[0], bid: parseInt(x.split(" ")[1]) }));

const typesIndex = ["HIGH_CARD", "ONE_PAIR", "TWO_PAIR", "THREE_OF_A_KIND", "FULL_HOUSE", "FOUR_OF_A_KIND", "FIVE_OF_A_KIND"];
const cardIndex = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

const count = (str: string, char: string) => {
  return str.split("").filter((x) => x == char).length;
};

const getHandType = (hand: string) => {
  const chars = Array.from(new Set(hand.split("")));

  if (chars.length == 1) {
    return "FIVE_OF_A_KIND";
  }

  if (chars.length == 2) {
    const counts = chars.map((x) => count(hand, x));
    if (counts.includes(4)) {
      return "FOUR_OF_A_KIND";
    }
    return "FULL_HOUSE";
  }

  if (chars.length == 3) {
    const counts = chars.map((x) => count(hand, x));
    if (counts.includes(3)) {
      return "THREE_OF_A_KIND";
    }
    return "TWO_PAIR";
  }

  if (chars.length == 4) {
    return "ONE_PAIR";
  }

  return "HIGH_CARD";
};

const compareHands = (a: string, b: string) => {
  const aType = getHandType(a);
  const bType = getHandType(b);

  if (aType == bType) {
    const aSplit = a.split("");
    const bSplit = b.split("");

    for (let i = 0; i < aSplit.length; i++) {
      const aChar = aSplit[i];
      const bChar = bSplit[i];

      if (aChar == bChar) {
        continue;
      }

      return cardIndex.indexOf(aChar) > cardIndex.indexOf(bChar) ? 1 : -1;
    }
  }

  return typesIndex.indexOf(aType) > typesIndex.indexOf(bType) ? 1 : -1;
};

console.log(hands.map((x) => x.hand + ", " + getHandType(x.hand)));
const sortedHands = hands.toSorted((a, b) => {
  return compareHands(a.hand, b.hand);
});

console.log(sortedHands);

const winnings = sortedHands.reduce((acc, cur, i) => (acc += cur.bid * (i + 1)), 0);
print(winnings);
