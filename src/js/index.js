import "../styles/styles.css";
import Draw from './Draw';


const draw = new Draw(document.getElementById('canvas'), document.getElementById('canvas1'), document.querySelector('.outher_poly'), document.getElementById('root'));

document.querySelector(".controllers-container__inner_clip_button").addEventListener('click', () => draw.setInnerMode())
document.querySelector(".controllers-container__outher_clip_button").addEventListener('click', () => draw.setOutherMode());



