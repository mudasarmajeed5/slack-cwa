export type EmojiPickerClick = {
    id?: string,
    name?: string,
    native: string,
    unified?: string,
    keywords?: string[]
    shortcodes?: string,
    emoitcons?: string[]
}

// {
//     "id": "smiley",
//     "name": "Grinning Face with Big Eyes",
//     "native": "😃",
//     "unified": "1f603",
//     "keywords": [
//         "smiley",
//         "happy",
//         "joy",
//         "haha",
//         ":D",
//         ":)",
//         "smile",
//         "funny"
//     ],
//     "shortcodes": ":smiley:",
//     "emoticons": [
//         ":)",
//         "=)",
//         "=-)"
//     ]
// }