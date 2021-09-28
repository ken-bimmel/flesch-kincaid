const Decimal = require("decimal.js");

/*
 * Gets caught up on spaced out initials, but not close initials.
 * 
 * For example, "J.R.R. Tolkien wrote The Hobbit." is evaluated as
 * two sentences - "R. Tolkien" and "Hobbit."
 * 
 * However, the "J.R." does not contribute additional sentences as
 * they are followed by letters.
 * 
 * There are possibly other situations I have not anticipated.
 */
const SENTENCE_REGEXP = /[.?!]+(?![A-z0-9])/g

function countSentences(text) {
    return (text.match(SENTENCE_REGEXP) || [null]).length;
}

/*
 * Based on https://codegolf.stackexchange.com/a/47325
 * Seems to consistently miscount ia, ie, and ua as single sylables
 */
const SYLABLE_REGEXP = /[aiouy]+[e]*|e(?!d$|ly).|[td]ed|le$/g

function countSylables(word) {
    const lowerWord = word.toLowerCase();
    return (lowerWord.match(SYLABLE_REGEXP) || [word]).length;
}

function splitText(text) {
    return text.split(" ");
}

const READING_AVG_SENTENCE_LENGTH_CONSTANT = Decimal("1.015");
const READING_AVG_SYLABLE_COUNT_CONSTANT = Decimal("84.6");
const READING_OFFSET_CONSTANT = Decimal("206.835");

const GRADE_AVG_SENTENCE_LENGTH_CONSTANT = Decimal("0.39");
const GRADE_AVG_SYLABLE_COUNT_CONSTANT = Decimal("11.8");
const GRADE_OFFSET_CONSTANT = Decimal("15.59");

function getAverageSentenceLength(text) {
    const wordCount = Decimal(splitText(text).length);
    const sentenceCount = Decimal(countSentences(text))
    return wordCount.dividedBy(sentenceCount);
}

function getAverageSylableCount(text) {
    let sylableCount = 0;
    const words = splitText(text);
    for (let word of words) {
        sylableCount = sylableCount + countSylables(word);
    }

    return Decimal(sylableCount).dividedBy(Decimal(words.length));
}

function getReadingEase(text) {
    return READING_OFFSET_CONSTANT
        .minus(
            READING_AVG_SENTENCE_LENGTH_CONSTANT
                .times(
                    getAverageSentenceLength(text)
                )
        ).minus(
            READING_AVG_SYLABLE_COUNT_CONSTANT
                .times(
                    getAverageSylableCount(text)
                )
        )
}

function getGradeLevel(text) {
    return GRADE_AVG_SENTENCE_LENGTH_CONSTANT
        .times(
            getAverageSentenceLength(text)
        ).plus(
            GRADE_AVG_SYLABLE_COUNT_CONSTANT
                .times(
                    getAverageSylableCount(text)
                )
        ).minus(
            GRADE_OFFSET_CONSTANT
        )
}

exports.getReadingEase = getReadingEase;
exports.getGradeLevel = getGradeLevel;
