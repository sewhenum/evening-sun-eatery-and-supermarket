import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type LazyExoticComponent,
} from 'react';

interface DeferredSectionProps {
  id: string;
  component: LazyExoticComponent<ComponentType>;
}

export function DeferredSection({ id, component: Section }: DeferredSectionProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '800px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div id={id} ref={sectionRef} className="min-h-[42rem]">
      <Suspense
        fallback={
          <div
            className="flex min-h-[42rem] items-center justify-center bg-background"
            aria-busy="true"
            aria-label="Loading section"
          >
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        }
      >
        {shouldLoad ? <Section /> : null}
      </Suspense>
    </div>
  );
}