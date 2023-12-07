import { print } from "../lib/mod.ts";

const input = Deno.readTextFileSync("input.txt");

const hands = input.split("\n").map((x) => ({ cards: x.split(" ")[0], bid: parseInt(x.split(" ")[1]) }));

const typesIndex = ["HIGH_CARD", "ONE_PAIR", "TWO_PAIR", "THREE_OF_A_KIND", "FULL_HOUSE", "FOUR_OF_A_KIND", "FIVE_OF_A_KIND"] as const;
const cardIndex = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"] as const;

const count = (str: string, char: string) => {
  return str.split("").filter((x) => x == char).length;
};

const getHandType = (cards: string) => {
  const chars = Array.from(new Set(cards.split("")));

  if (chars.length == 1) {
    return "FIVE_OF_A_KIND";
  }

  if (chars.length == 2) {
    const counts = chars.map((x) => count(cards, x));
    if (counts.includes(4)) {
      return "FOUR_OF_A_KIND";
    }
    return "FULL_HOUSE";
  }

  if (chars.length == 3) {
    const counts = chars.map((x) => count(cards, x));
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

const compareHands = (a: { cards: string; type: (typeof typesIndex)[number]; og: string }, b: { cards: string; type: (typeof typesIndex)[number]; og: string }) => {
  if (a.type == b.type) {
    const aSplit = a.og.split("");
    const bSplit = b.og.split("");

    for (let i = 0; i < aSplit.length; i++) {
      const aChar = aSplit[i];
      const bChar = bSplit[i];

      if (aChar == bChar) {
        continue;
      }

      return cardIndex.indexOf(aChar) > cardIndex.indexOf(bChar) ? 1 : -1;
    }
  }

  return typesIndex.indexOf(a.type) > typesIndex.indexOf(b.type) ? 1 : -1;
};

const getBestHand = (hand: { cards: string; type: (typeof typesIndex)[number] }) => {
  if (hand.cards.includes("J")) {
    const hands = cardIndex
      .filter((c) => c != "J")
      .map((x) => ({ type: getHandType(hand.cards.replace("J", x)) as (typeof typesIndex)[number], cards: hand.cards.replace("J", x) }))
      .map((x) => ({ ...getBestHand(x), og: hand.cards }));

    const sortedHands = hands.toSorted(compareHands);
    // console.log(hands, sortedHands);
    hand = sortedHands.at(-1)!;
    return hand;
  }

  return hand;
};

const sortedHands = hands
  .map((hand) => ({
    ...hand,
    type: getHandType(hand.cards) as (typeof typesIndex)[number],
  }))
  .map((x) => ({ ...getBestHand(x), og: x.cards, bid: x.bid }))
  .toSorted((a, b) => compareHands(a, b));

console.log(sortedHands);

const winnings = sortedHands.reduce((acc, cur, i) => (acc += cur.bid * (i + 1)), 0);
print(winnings);
