import socialLinks from './assets/json/social_links.json';
import projects from './assets/json/projects.json';
import css3Icon from './assets/icons/CSS3.svg';
import discordJsIcon from './assets/icons/Discord.js.svg';
import expressIcon from './assets/icons/Express.svg';
import gitIcon from './assets/icons/Git.svg';
import githubIcon from './assets/icons/GitHub.svg';
import html5Icon from './assets/icons/HTML5.svg';
import javascriptIcon from './assets/icons/JavaScript.svg';
import jsonIcon from './assets/icons/JSON.svg';
import mongodbIcon from './assets/icons/MongoDB.svg';
import nodeJsIcon from './assets/icons/Node.js.svg';
import reactIcon from './assets/icons/React.svg';
import tailwindIcon from './assets/icons/Tailwind-CSS.svg';
import typescriptIcon from './assets/icons/TypeScript.svg';
import vscodeIcon from './assets/icons/Visual-Studio-Code-(VS-Code).svg';

export const skills = [
  { name: 'CSS3', icon: css3Icon },
  { name: 'Discord.js', icon: discordJsIcon },
  { name: 'Express', icon: expressIcon },
  { name: 'Git', icon: gitIcon },
  { name: 'GitHub', icon: githubIcon },
  { name: 'HTML5', icon: html5Icon },
  { name: 'JavaScript', icon: javascriptIcon },
  { name: 'JSON', icon: jsonIcon },
  { name: 'MongoDB', icon: mongodbIcon },
  { name: 'Node.js', icon: nodeJsIcon },
  { name: 'React', icon: reactIcon },
  { name: 'Tailwind CSS', icon: tailwindIcon },
  { name: 'TypeScript', icon: typescriptIcon },
  { name: 'Visual Studio Code', icon: vscodeIcon }
];

export const socials = socialLinks;
export const featuredProjects = projects;
export const heroGalleryImages = skills.map((skill) => ({
  src: skill.icon,
  alt: skill.name
}));

export const testimonials = [
  {
    name: 'Venom',
    content: 'he is one of the og dev i have seen'
  },
  {
    name: 'HyperStorm',
    content: 'Seller was great!'
  }
];