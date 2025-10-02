interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section 
      id={id}
      className={`min-h-[80vh] md:min-h-screen w-full flex items-center justify-center ${className}`}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </section>
  );
}
