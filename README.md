# Flesch-Kincaid Calc

This simple library provides two functions, `getGradeLevel` and `getReadingEase`, to allow you to calculate the grade level and reading ease using the [Flesch-Kincaid method](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests).

Run the examples with `node example.js`.

## Usage

```js
const fk = require("flesch-kincaid-calc");

const THREE_LITTLE_PIGS = `Once upon a time there was an old mother pig who had three little pigs and not enough food to feed them. So when they were old enough, she sent them out into the world to seek their fortunes. The first little pig was very lazy. He didn't want to work at all and he built his house out of straw. The second little pig worked a little bit harder but he was somewhat lazy too and he built his house out of sticks. Then, they sang and danced and played together the rest of the day.`

fk.getGradeLevel(THREE_LITTLE_PIGS); //4.947989690721649485
fk.getReadingEase(THREE_LITTLE_PIGS); //88.38253436426116838
```