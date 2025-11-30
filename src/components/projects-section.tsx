'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projects as initialProjects, type Project } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Bot, Download, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

type RepoOwner = {
  login: string;
};

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  owner: RepoOwner;
  fork: boolean;
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [visibleRepoCount, setVisibleRepoCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('https://api.github.com/users/ZarScape/repos');
        const data: Repo[] = await response.json();
        const staticProjectUrls = initialProjects.map(p => p.githubUrl?.toLowerCase());
        
        const filteredRepos = data.filter(repo => 
          !staticProjectUrls.includes(repo.html_url.toLowerCase()) && 
          !repo.fork
        );

        setAllRepos(filteredRepos);
      } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
      }
    }
    fetchRepos();
  }, []);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newVisibleCount = Math.min(visibleRepoCount + 3, allRepos.length);
      const reposToAdd = allRepos.slice(0, newVisibleCount);

      const newProjects: Project[] = reposToAdd.map(repo => ({
        title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: repo.description || 'No description available.',
        image: {
          id: `repo-${repo.id}`,
          description: `Open Graph image for ${repo.name}`,
          imageUrl: `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
        },
        tags: repo.topics || [],
        githubUrl: repo.html_url,
      }));

      const combinedProjects = [...initialProjects, ...newProjects];
      const uniqueProjects = Array.from(new Map(combinedProjects.map(p => [p.githubUrl || p.title, p])).values());

      setProjects(uniqueProjects);
      setVisibleRepoCount(newVisibleCount);
      setIsLoading(false);
    }, 500);
  };

  const canLoadMore = visibleRepoCount < allRepos.length;

  return (
    <section id="projects" className="relative w-full py-16 md:py-24 lg:py-32">
      <div className="container relative z-10 px-4 md:px-6 [perspective:1000px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">My Work</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my projects that demonstrate my passion for development and design.
            </p>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={project.githubUrl || index} className="liquid-glass-ui flex flex-col overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 animate-in fade-in zoom-in-95">
              <div className="h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)]">
                <CardHeader className="p-0">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow p-6">
                  <CardTitle className="text-xl font-bold mb-2">{project.title}</CardTitle>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="border-primary/50 text-primary bg-primary/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex justify-end gap-2">
                    {project.downloadUrl && (
                       <Button variant="default" size="sm" asChild>
                        <Link href={project.downloadUrl} target="_blank" className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                       <Button variant="outline" size="sm" asChild className="border-white/20 bg-white/10 hover:bg-white/20">
                        <Link href={project.githubUrl} target="_blank" className="flex items-center">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                    {project.liveUrl && (
                       <Button variant="default" size="sm" asChild>
                        <Link href={project.liveUrl} target="_blank" className="flex items-center">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                     {project.inviteUrl && (
                       <Button variant="default" size="sm" asChild>
                        <Link href={project.inviteUrl} target="_blank" className="flex items-center">
                          <Bot className="mr-2 h-4 w-4" />
                          Invite
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        
        {canLoadMore && (
          <div className="mt-12 text-center">
            <Button onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
