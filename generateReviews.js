import fs from 'fs';

const firstNames = ["Mike", "Jake", "David", "Ryan", "Chris", "Alex", "Jordan", "Tyler", "Sam", "Daniel", "Luke", "Anthony", "Kevin", "Justin", "Brandon", "Eric", "Aaron", "Adam", "Nathan", "Evan", "Jason", "Brian", "Carlos", "Luis", "Diego", "Marcus", "Tony", "Tommy", "Omar", "Hassan", "Ali", "Zack", "Victor", "Sean", "Ian", "Derek", "Cody", "Kyle", "Mark", "Paul", "Stephen", "Kenneth", "Josh"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson"];

const sentiments = [
    "Honestly the best gloves I've ever owned.",
    "Switched to Vontrex and I'm not going back.",
    "Padding is incredible for heavy bag work.",
    "The wrist support is a game changer.",
    "Took a few heavy shots in sparring and the headgear absorbed it perfectly.",
    "Very premium feel compared to other brands.",
    "Fits snug and feels broken-in from day one.",
    "Quality of the leather is 10/10.",
    "Can't believe the price for this level of quality.",
    "Super fast delivery and the gear is flawless.",
    "Been boxing for 5 years and these are my favorite gloves.",
    "Bought the Heritage series, they look as good as they hit.",
    "Maximum protection for my knuckles. Highly recommended.",
    "The face-saver headgear is exactly what I needed.",
    "Stealth gloves look stealthy and hit like bricks.",
    "Customer service was great and the product is even better.",
    "These hold up so well compared to my old pair.",
    "The grip bar inside the glove is positioned perfectly.",
    "No more wrist pain after hook combos.",
    "Absolutely beautiful craftsmanship.",
    "Feels incredibly balanced when throwing fast combinations.",
    "I train 5 days a week and they still look brand new.",
    "Worth every single penny.",
    "Professional grade gear right here.",
    "The stitching and finish is immaculate."
];

function getRandomDate() {
    const start = new Date(2025, 8, 1); // Sept 1, 2025
    const end = new Date(); // Today
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const reviews = [];

// Prepare ratings: 20 (4-star), 40 (5-star)
const ratings = [
    ...Array(20).fill(4),
    ...Array(40).fill(5)
];

// Shuffle ratings for randomness
for (let i = ratings.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ratings[i], ratings[j]] = [ratings[j], ratings[i]];
}

for (let i = 1; i <= 60; i++) {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    const initial = first.charAt(0);
    
    // Pick 1 or 2 random sentiments to combine
    let text = sentiments[Math.floor(Math.random() * sentiments.length)];
    if (Math.random() > 0.5) {
        let secondSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        while (secondSentiment === text) {
            secondSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        }
        text += " " + secondSentiment;
    }

    reviews.push({
        id: i,
        author: `${first} ${last.charAt(0)}.`,
        initial: initial,
        date: getRandomDate(),
        rating: ratings[i-1],
        text: text
    });
}

// Sort by date descending (rough sort by parsing date string)
reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

const fileContent = `export const testimonialsData = ${JSON.stringify(reviews, null, 4)};`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/testimonials.js', fileContent);

console.log('Successfully generated 60 reviews in src/data/testimonials.js');
