import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid';


const initFonts = () => fontawesome.library.add(brands, faCheckSquare, faCoffee);

export default initFonts;
