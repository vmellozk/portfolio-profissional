export interface Technology {
  title: string;
  image: string;
  imageScale?: number;
}

export interface ProjectShine {
  primary: string;
  secondary: string;
  angle: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string[];
  repoLink: string;
  shine: ProjectShine;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  highlightColumns?: 1 | 2;
  highlights: string[];
}
