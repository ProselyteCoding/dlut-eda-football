interface SectionProps {
  id: string;
  children: React.ReactNode;
}

export default function Section({ id, children }: SectionProps) {
  return (
    <section 
      id={id}
      className="min-h-screen w-full flex items-center justify-center"
    >
      <div className="w-full h-full">
        {children}
      </div>
    </section>
  );
}
