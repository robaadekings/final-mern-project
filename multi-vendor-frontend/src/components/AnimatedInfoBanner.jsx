import { useEffect, useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function AnimatedInfoBanner({ slides = [], intervalMs = 4500 }) {
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (slides.length <= 1) return;
        timerRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, intervalMs);
        return () => clearInterval(timerRef.current);
    }, [slides.length, intervalMs]);

    const goTo = (i) => setIndex(i % slides.length);
    const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
    const next = () => setIndex((i) => (i + 1) % slides.length);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
            {/* Slides */}
            <div className="relative h-44 sm:h-56 md:h-64">
                {slides.map((s, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className={`h-full w-full flex items-center justify-between px-5 sm:px-8 ${s.bg || 'bg-gradient-to-r from-fuchsia-500 to-indigo-600'} text-white`}>
                            <div className="max-w-2xl">
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-sm">{s.title}</h3>
                                {s.description && (
                                    <p className="mt-2 text-sm sm:text-base text-white/90">{s.description}</p>
                                )}
                                {s.ctaText && s.ctaLink && (
                                    <a
                                        href={s.ctaLink}
                                        className="inline-block mt-4 bg-white/90 hover:bg-white text-indigo-700 font-semibold px-4 py-2 rounded-full transition"
                                    >
                                        {s.ctaText}
                                    </a>
                                )}
                            </div>
                            {s.sideImage && (
                                <img
                                    src={s.sideImage}
                                    alt="banner"
                                    className="hidden sm:block h-24 sm:h-32 md:h-40 object-contain drop-shadow-md"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white"
                    >
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => goTo(i)}
                            className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default AnimatedInfoBanner;


