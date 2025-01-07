import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import Header from '../components/Header';
import debounce from 'lodash/debounce';

export default function DynamicLinks() {
  const links = [
    { href: '#', text: 'the first short link' },
    { href: '#', text: 'second short link' },
    { href: '#', text: 'A longer link' },
    { href: '#', text: 'third normal link' },
  ];

  const containerRef = useRef(null);
  const ulRef = useRef(null);
  const childRefs = useRef([]);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dynamicLinks, setDynamicLinks] = useState(links);

  const checkOverflow = useCallback(() => {
    const ul = ulRef.current;
    if (!ul) return;

    const { scrollWidth, clientWidth } = ul;
    let hasOverflow = scrollWidth > clientWidth;

    // Calculate total width of all children including separators
    const totalWidth = Array.from(ul.children).reduce((widthSum, li) => {
      return widthSum + li.getBoundingClientRect().width;
    }, 0);

    // Add a small buffer (10% of container width) to prevent tight fits
    const buffer = clientWidth * 0.1;

    console.log(
      'Total width:',
      totalWidth,
      'Client width:',
      clientWidth,
      'Scroll width:',
      scrollWidth,
    );

    // Set overflow state
    setIsOverflowing(hasOverflow && totalWidth + buffer > clientWidth);
  }, []);

  const debouncedCheckOverflow = debounce(checkOverflow, 50);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Watch for changes in the link text content
    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        const updatedLinks = Array.from(container.querySelectorAll('a')).map(
          (a) => ({
            href: a.getAttribute('href'),
            text: a.textContent,
          }),
        );
        setDynamicLinks(updatedLinks);
        debouncedCheckOverflow();
      });
    });

    observer.observe(container, {
      subtree: true,
      characterData: true,
      childList: true,
    });

    // Watch for resize
    const resizeObserver = new ResizeObserver(debouncedCheckOverflow);
    resizeObserver.observe(container);

    // Initial check
    debouncedCheckOverflow();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      debouncedCheckOverflow.cancel();
    };
  }, [debouncedCheckOverflow]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dynamicLinks.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === dynamicLinks.length - 1 ? 0 : prev + 1,
    );
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
              <p>
                The links are displayed in a carousel when the container is
                overflowing this ensures that links are not cut off and are
                visible to the user
              </p>
              <h2 id="tileHeader">Example:</h2>

              <div className="dynamic-link-container" ref={containerRef}>
                {isOverflowing ? (
                  <div className="carousel-container">
                    <button
                      onClick={handlePrevious}
                      className="carousel-button"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <div className="carousel-list">
                      <ul>
                        <li>
                          <a href={dynamicLinks[currentIndex].href}>
                            {dynamicLinks[currentIndex].text}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <button onClick={handleNext} className="carousel-button">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                ) : (
                  <ul ref={ulRef}>
                    {dynamicLinks.map((link, index) => (
                      <li
                        key={index}
                        ref={(el) => (childRefs.current[index] = el)}
                      >
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
