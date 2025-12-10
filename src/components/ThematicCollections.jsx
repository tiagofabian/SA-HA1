import { useState, useEffect, useRef } from "react";
import { data } from "@/lib/thematic-collection"

const spineWidth = 65;
const totalSpines = 4;

const ThematicCollections = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const containerRef = useRef(null);
  const viewAreaRef = useRef(null);
  const spineRefs = useRef([]);

  // Función para actualizar layout
  const updateLayout = (index) => {
    if (!containerRef.current || !viewAreaRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    const leftSpines = index + 1;
    const rightSpines = totalSpines - leftSpines;

    const leftMargin = leftSpines * spineWidth;
    const rightMargin = rightSpines * spineWidth;

    viewAreaRef.current.style.left = `${leftMargin}px`;
    viewAreaRef.current.style.right = `${rightMargin}px`;

    // Posicionar lomos
    spineRefs.current.forEach((spine, i) => {
      if (!spine) return;

      if (i <= index) {
        spine.style.transform = `translateX(${i * spineWidth}px)`;
      } else {
        const relativePos = i - (index + 1);
        const position = containerWidth - rightMargin + relativePos * spineWidth;
        spine.style.transform = `translateX(${position}px)`;
      }
    });
  };

  // Seleccionar espina
  const selectSpine = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  // Efecto inicial + resize
  useEffect(() => {
    updateLayout(activeIndex);

    const handleResize = () => updateLayout(activeIndex);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <div className="thematic-collections flex justify-center items-center min-h-screen p-5 bg-gray-100">
      <div
        className="app-container relative w-full max-w-[1200px] h-[600px] bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        ref={containerRef}
      >
        {/* Lomos */}
        <div className="spines-wrapper absolute w-full h-full z-10">
          {data.map((item, i) => (
            <div
              key={i}
              ref={(el) => (spineRefs.current[i] = el)}
              className={`book-spine absolute top-0 w-[65px] h-full border-2 border-black shadow-inner cursor-pointer overflow-hidden transition-transform duration-500 ${
                i === activeIndex
                  ? "border-[3px] shadow-[inset_0_0_8px_rgba(0,0,0,0.4),0_0_15px_rgba(0,0,0,0.3)]"
                  : "hover:scale-[1.03] hover:z-[15] hover:shadow-[inset_0_0_5px_rgba(0,0,0,0.3),0_0_10px_rgba(0,0,0,0.2)]"
              }`}
              style={{ left: 0 }}
              onClick={() => selectSpine(i)}
            >
              <img
                className="spine-img w-full h-full object-cover block border border-black box-border"
                src={item.imgSpine}
                alt={`Lomo ${i + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Área de vista */}
        <div
          className="view-area absolute top-0 h-full flex items-center justify-center p-[1px] bg-white z-5"
          ref={viewAreaRef}
        >
          {data.map((item, i) => (
            <div
              key={i}
              className={`book-page flex flex-col items-center justify-center w-full h-full transition-opacity duration-500 ${
                i === activeIndex ? "flex" : "hidden"
              }`}
            >
              <img
                className="page-image max-w-full max-h-[75%] object-contain rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.1)] border border-gray-200 mb-4"
                src={item.imgPage}
                alt={`Contenido ${i + 1}`}
              />
              <div className="page-title text-2xl font-bold text-gray-800 text-center mb-1">
                {item.title}
              </div>
              <div className="page-description text-sm text-gray-500 text-center max-w-[70%]">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThematicCollections;
