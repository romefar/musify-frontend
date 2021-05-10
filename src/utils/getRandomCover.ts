import cover1 from '../assets/covers/cover1.jpg';
import cover2 from '../assets/covers/cover2.jpg';
import cover3 from '../assets/covers/cover3.jpg';
import cover4 from '../assets/covers/cover4.jpg';
import cover5 from '../assets/covers/cover5.jpg';

const covers = [
  cover1,
  cover2,
  cover3,
  cover4,
  cover5,
];

const randomInterval = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const getRandomCover = () => {
  const index = randomInterval(0, covers.length - 1);

  return covers[index];
}
