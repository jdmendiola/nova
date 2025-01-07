import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import Header from '../components/Header';

export default function DynamicLinks() {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const links = [
    { href: '#', text: 'the first short link' },
    { href: '#', text: 'second short link' },
    {
      href: '#',
      text: 'A longer link',
    },
    { href: '#', text: 'third normal link' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkOverflow = () => {
      // Create a temporary measurement div
      const measureDiv = document.createElement('div');
      measureDiv.style.cssText = `
        display: inline-block;
        visibility: hidden;
        position: absolute;
        left: -9999px;
        width: auto;
      `;

      // Create and style the measurement list
      const ul = document.createElement('ul');
      ul.style.cssText = `
        display: inline-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin: 0;
        padding: 0;
        width: auto;
      `;

      // Add the links
      links.forEach((link, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = link.text;
        a.style.whiteSpace = 'nowrap';
        li.appendChild(a);
        if (index < links.length - 1) {
          const separator = document.createElement('span');
          separator.textContent = '|';
          separator.style.padding = '0 8px';
          li.appendChild(separator);
        }
        ul.appendChild(li);
      });

      measureDiv.appendChild(ul);
      document.body.appendChild(measureDiv);

      const containerWidth = container.clientWidth;
      const contentWidth = ul.getBoundingClientRect().width;

      console.log(
        'Container width:',
        containerWidth,
        'Content width:',
        contentWidth,
      );

      document.body.removeChild(measureDiv);
      setIsOverflowing(contentWidth > containerWidth);
    };

    // Initial check with a small delay to ensure proper rendering
    const timeoutId = setTimeout(checkOverflow, 0);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(checkOverflow);
    });

    resizeObserver.observe(container);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [links]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? links.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === links.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Header />
      <section className="container">
        <div id="columns">
          <div id="tile-column">
            <div id="tile-column-box" className="tile-column-scroll">
              <h2 id="tileHeader">Dynamic Links</h2>
              <p>
                Dynamic links are a list of links that visually show side by
                side separated by a separator element
              </p>

              <div className="dynamic-link-container" ref={containerRef}>
                {isOverflowing ? (
                  <div className="carousel-container">
                    <button
                      onClick={handlePrevious}
                      className="carousel-button"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <ul className="carousel-list">
                      <li>
                        <a href={links[currentIndex].href}>
                          {links[currentIndex].text}
                        </a>
                      </li>
                    </ul>
                    <button onClick={handleNext} className="carousel-button">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                ) : (
                  <ul>
                    {links.map((link, index) => (
                      <li key={index}>
                        <a href={link.href}>{link.text}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
