type ProjectCoverProps = {
  project: {
    slug: string;
    name: string;
    image: string;
  };
  className?: string;
};

export const ProjectCover = ({ project, className = "" }: ProjectCoverProps) => {
  return (
    <img
      src={project.image}
      alt={`${project.name} product interface`}
      className={`h-full w-full object-cover ${className}`}
      loading="lazy"
    />
  );
};
