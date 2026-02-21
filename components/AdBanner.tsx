
import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
    code?: string;
    className?: string;
    id?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ code, className = "", id }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!code || !containerRef.current) return;

        // Clear previous content
        containerRef.current.innerHTML = '';

        // Create a range to parse the HTML string and execute scripts
        const range = document.createRange();
        range.selectNode(containerRef.current);
        const documentFragment = range.createContextualFragment(code);

        // Append the fragment (this executes any scripts inside it)
        containerRef.current.appendChild(documentFragment);
    }, [code]);

    if (!code) return null;

    return (
        <div
            id={id}
            className={`ad-container overflow-hidden flex items-center justify-center transition-all duration-500 ease-in-out bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 min-h-[90px] w-full max-w-4xl mx-auto my-6 ${className}`}
        >
            <div ref={containerRef} className="w-full flex justify-center" />
        </div>
    );
};

export default AdBanner;
