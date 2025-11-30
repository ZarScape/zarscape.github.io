import { Github, Linkedin, type LucideIcon, BrainCircuit, Code, Youtube, Instagram, Mail, Download } from 'lucide-react';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TypescriptIcon, ReactIcon, NodejsIcon, TailwindcssIcon, NextjsIcon, DiscordjsIcon, MongoDbIcon, JsonIcon, JavaScriptIcon, Css3Icon, Html5Icon, XIcon, FiverrIcon, WhatsappIcon, TiktokIcon, DiscordIcon, RedditIcon, MailIcon } from '@/components/skill-icons';
import React from 'react';

const getImage = (id: string): ImagePlaceholder => {
    const image = PlaceHolderImages.find(img => img.id === id);
    if (!image) {
        // Fallback or error
        return {
            id: 'fallback',
            description: 'Fallback image',
            imageUrl: 'https://picsum.photos/seed/fallback/600/400',
        }
    }
    return image;
};

type SocialLink = {
    name: string;
    url: string;
    icon: LucideIcon | React.ComponentType<{ className?: string }>;
};

export type Project = {
    title: string;
    description: string;
    image: ImagePlaceholder;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
    inviteUrl?: string;
    downloadUrl?: string;
};

export type Skill = {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    children?: Skill[];
};

export const aboutData = {
  name: 'Muhammad Abuzar',
  titles: ['ZarScape', 'Full Stack Developer', '...', 'Discord bot developer', 'Discord app developer'],
  bio: "I'm a Developer with a passion for creating clean, scalable, and high-performance software with beautiful, modern user experiences.",
  aboutMe: "Hello! I'm Muhammad Abuzar, a full-stack developer who loves building things for the web. My journey into programming started with a fascination for how websites worked, which quickly grew into a full-blown passion. I specialize in the MERN stack (MongoDB, Express, React, Node.js) and Next.js, and I'm always excited to learn new technologies. When I'm not coding, you can find me exploring new open-source projects, or contributing to the developer community.",
  profilePicture: getImage('profile-picture'),
  heroBackground: getImage('hero-background'),
  details: {
    location: 'Islamabad, Pakistan',
    availability: 'Available for freelance',
    email: 'ZarScape@hotmail.com',
  },
  socials: [
    { name: 'YouTube', url: 'https://www.youtube.com/@ZarScape', icon: Youtube },
    { name: 'Fiverr', url: 'https://www.fiverr.com/zarscape', icon: FiverrIcon },
    { name: 'WhatsApp', url: 'https://whatsapp.com/channel/0029VbBd46y3gvWgF6BH1m34', icon: WhatsappIcon },
    { name: 'X', url: 'https://x.com/ZarScape', icon: XIcon },
    { name: 'GitHub', url: 'https://github.com/ZarScape', icon: Github },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/ZarScape', icon: Linkedin },
    { name: 'Instagram', url: 'https://www.instagram.com/ZarScapee', icon: Instagram },
    { name: 'TikTok', url: 'https://www.tiktok.com/@ZarScape', icon: TiktokIcon },
    { name: 'Discord', url: 'https://discord.gg/6YVmxA4Qsf', icon: DiscordIcon },
    { name: 'Reddit', url: 'https://reddit.com/u/ZarScape', icon: RedditIcon },
    { name: 'Email', url: 'mailto:ZarScape@hotmail.com', icon: MailIcon },
  ] as SocialLink[],
};

export const projects: Project[] = [
  {
    title: 'Zarco',
    description: 'Zarco is Ultimate Discord Companion. Always by Your Side. A multipurpose discord app packed with everything you need to enhance a discord server',
    image: getImage('project-1'),
    tags: ['discord', 'discordbot', 'nodejs'],
    inviteUrl: 'https://discord.com/oauth2/authorize?client_id=1345820519827636295',
  },
  {
    title: 'Zar Browser',
    description: 'A simple, lightweight and fast web browser with features: Tabbed browsing, Navigation, Home, Search, Window Controls etc',
    image: getImage('project-2'),
    tags: ['app', 'zarbrowser', 'zar'],
    downloadUrl: 'https://github.com/ZarScape/ZarBrowser/releases/latest/download/ZarBrowserSetup.zip',
    githubUrl: 'https://github.com/ZarScape/ZarBrowser',
  },
  {
    title: 'Discord.js v14 with V2 Components Template',
    description: 'A full-featured Discord bot template built with Discord.js v14 and the new Components V2 system. This template demonstrates modern command and event handling, modular slash commands, media galleries, file components, and container-based layouts.',
    image: getImage('project-3'),
    tags: ['discord', 'discordjs', 'bot-template', 'zarscape'],
    downloadUrl: 'https://github.com/ZarScape/discord.js-v14-v2-template/archive/refs/heads/main.zip',
    githubUrl: 'https://github.com/ZarScape/discord.js-v14-v2-template',
  },
];

export const skills: Skill[] = [
    { 
        name: 'Full Stack', 
        icon: BrainCircuit,
        children: [
            { name: 'HTML5', icon: Html5Icon },
            { name: 'CSS3', icon: Css3Icon },
            { name: 'JavaScript', icon: JavaScriptIcon },
            { name: 'React', icon: ReactIcon },
            { name: 'Next.js', icon: NextjsIcon },
            { name: 'Tailwind CSS', icon: TailwindcssIcon },
            { name: 'Node.js', icon: NodejsIcon },
            { name: 'TypeScript', icon: TypescriptIcon },
            { name: 'Discord.js', icon: DiscordjsIcon },
            { name: 'JSON', icon: JsonIcon },
            { name: 'MongoDB', icon: MongoDbIcon },
        ]
    }
];
