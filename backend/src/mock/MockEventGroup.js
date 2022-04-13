import dummyjson from 'dummy-json';
import fs from 'fs';
import dayjs from 'dayjs';

const colors = [
    'Aquamarine',
    'Beige',
    'Crimson',
    'Deep Blue',
    'Emerald',
    'Fuchsia',
    'Golden',
    'Hickory',
    'Indigo',
    'Jade',
    'Khaki',
    'Lavender',
    'Maroon',
    'Navy Blue',
    'Olive',
    'Peach',
    'Quartz Grey',
    'Ruby',
    'Sapphire',
    'Tangerine',
    'Ultramarine',
    'Violet',
    'White',
    'Xanthic',
    'Yellow',
    'Zucchini'
];
const animals = [
    'Aardvark',
    'Bear',
    'Crab',
    'Duck',
    'Elephant',
    'Frog',
    'Giraffe',
    'Horse',
    'Iguana',
    'Jackyl',
    'Koala',
    'Lion',
    'Monkey',
    'Nighthawk',
    'Ostrich',
    'Panda',
    'Quail',
    'Rabbit',
    'Seal',
    'Tiger',
    'Unicorn',
    'Viper',
    'Wombat',
    'X-Ray Tetra',
    'Yak',
    'Zebra'
];
const myHelpers = {
    articletitle() {
        const rnd = dummyjson.utils.randomInt(0, colors.length - 1);
        return `${colors[rnd]} ${animals[rnd]}`;
    },
    date(min, max) {
        const minTime = dayjs(min).toDate().getTime();
        const maxTime = dayjs(max).toDate().getTime();
        const newTime = dummyjson.utils.randomInt(minTime, maxTime);
        return dayjs(new Date(newTime)).format();
    },
    petname() {
        return dummyjson.utils.randomArrayItem(animals);
    },
    colors() {
        return dummyjson.utils.randomArrayItem(colors);
    }
}
const eventGroupProperty = fs.readFileSync('./src/mock/eventGroup/MockEventGroupProperty.hbs', {encoding: 'utf-8'});
const eventGroupPropertyJson = dummyjson.parse(eventGroupProperty, {helpers: myHelpers});
const eventGroupPropertyDummyData = JSON.parse(eventGroupPropertyJson);

const eventGroup = fs.readFileSync('./src/mock/eventGroup/MockEventGroup.hbs', {encoding: 'utf-8'});
const eventGroupJson = dummyjson.parse(eventGroup, {helpers: myHelpers});
const eventGroupDummyData = JSON.parse(eventGroupJson);



export {
    eventGroupPropertyDummyData,eventGroupDummyData
};
