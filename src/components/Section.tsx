interface SectionProps {
  id: string;
  children: React.ReactNode;
}

export default function Section({ id, children }: SectionProps) {
  return (
    <section 
      id={id}
      className="h-screen w-full flex items-center justify-center snap-start"
    >
      <div className="w-full h-full">
        {children}
      </div>
    </section>
  );
}
