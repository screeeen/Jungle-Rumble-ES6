"use strict";

let cardsStack = [
  "fight",
  "fight",
  "fight",
  "fight",
  "fight",
  "fight",
  "fight",
  "fight",
  "fight",
  "fight",
  "fight",
  "life",
  "life",
  "life",
  "hole",
  "hole"
];
let newCardsStack = [
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "fight", isUsed: false },
  { value: "hole", isUsed: false },
  { value: "hole", isUsed: false },
  { value: "life", isUsed: false },
  { value: "life", isUsed: false },
];

let newRooms = [
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
  {value: "closed", visited: false},
];

// var visitedBackgrounds = [
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0,
//   0
// ]
