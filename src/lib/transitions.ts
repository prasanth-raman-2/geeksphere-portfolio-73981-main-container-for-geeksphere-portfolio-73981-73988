import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register all required GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin, ScrollTrigger, SplitText);
}

/**
 * Interface for matrix effect configuration
 * PUBLIC_INTERFACE
 */
export interface MatrixEffectConfig {
  /** Container element reference */
  container: HTMLElement;
  /** Duration of the effect in seconds */
  duration?: number;
  /** Color of the matrix effect */
  color?: string;
  /** Number of columns */
  columns?: number;
  /** Number of rows */
  rows?: number;
}

/**
 * Interface for glitch effect configuration
 * PUBLIC_INTERFACE
 */
export interface GlitchEffectConfig {
  /** Element to apply glitch effect to */
  element: HTMLElement;
  /** Duration of each glitch in seconds */
  duration?: number;
  /** Intensity of the glitch (0-1) */
  intensity?: number;
  /** Color of glitch effect */
  color?: string;
}

/**
 * Creates a matrix-style transition effect
 * PUBLIC_INTERFACE
 */
export function createMatrixTransition(config: MatrixEffectConfig) {
  const {
    container,
    duration = 1.5,
    color = '#2ecc71',
    columns = 50,
    rows = 30
  } = config;

  // Create matrix grid
  const matrixGrid = document.createElement('div');
  matrixGrid.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    pointer-events: none;
    opacity: 0;
  `;

  // Create cells
  const cells: HTMLDivElement[] = [];
  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement('div');
    cell.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
    cell.style.cssText = `
      color: ${color};
      font-family: monospace;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: scale(0);
    `;
    matrixGrid.appendChild(cell);
    cells.push(cell);
  }

  container.appendChild(matrixGrid);

  // Create animation timeline
  const tl = gsap.timeline({
    onComplete: () => {
      matrixGrid.remove();
    }
  });

  // Animate cells
  tl.to(matrixGrid, { opacity: 1, duration: 0.2 })
    .to(cells, {
      opacity: 1,
      scale: 1,
      stagger: {
        amount: duration * 0.5,
        grid: [rows, columns],
        from: "random"
      },
      ease: "power2.out"
    })
    .to(cells, {
      opacity: 0,
      scale: 0,
      stagger: {
        amount: duration * 0.5,
        grid: [rows, columns],
        from: "random"
      },
      ease: "power2.in"
    })
    .to(matrixGrid, { opacity: 0, duration: 0.2 });

  return tl;
}

/**
 * Creates a glitch effect animation
 * PUBLIC_INTERFACE
 */
export function createGlitchEffect(config: GlitchEffectConfig) {
  const {
    element,
    duration = 0.2,
    intensity = 0.5,
    color = '#2ecc71'
  } = config;

  // Create glitch layers
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: relative;
    display: inline-block;
  `;

  const original = element.cloneNode(true) as HTMLElement;
  const glitch1 = element.cloneNode(true) as HTMLElement;
  const glitch2 = element.cloneNode(true) as HTMLElement;

  [glitch1, glitch2].forEach((glitch, index) => {
    glitch.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      transform: translate(0);
      mix-blend-mode: multiply;
      opacity: 0.5;
    `;
    glitch.style.color = color;
  });

  // Replace original element with wrapper
  element.replaceWith(wrapper);
  wrapper.appendChild(original);
  wrapper.appendChild(glitch1);
  wrapper.appendChild(glitch2);

  // Create glitch animation
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 3
  });

  for (let i = 0; i < 3; i++) {
    tl.to([glitch1, glitch2], {
      duration: duration,
      x: () => `${(Math.random() - 0.5) * 10 * intensity}px`,
      y: () => `${(Math.random() - 0.5) * 10 * intensity}px`,
      opacity: () => Math.random(),
      ease: "none",
      stagger: 0.1
    });
  }

  return tl;
}

/**
 * Creates a scroll-triggered reveal animation
 * PUBLIC_INTERFACE
 */
export function createScrollReveal(element: HTMLElement, options: gsap.TweenVars = {}) {
  const defaults: gsap.TweenVars = {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  };

  const finalOptions = { ...defaults, ...options };

  // Set initial state
  gsap.set(element, {
    y: finalOptions.y,
    opacity: 0
  });

  // Create scroll trigger animation
  ScrollTrigger.create({
    trigger: element,
    start: "top bottom-=100",
    end: "top center",
    toggleActions: "play none none reverse",
    animation: gsap.to(element, finalOptions)
  });
}

/**
 * Creates a cyberpunk-style scan line effect
 * PUBLIC_INTERFACE
 */
export function createScanLineEffect(element: HTMLElement) {
  const scanline = document.createElement('div');
  scanline.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      ${gsap.getProperty(element, "color") || "#2ecc71"},
      transparent
    );
    opacity: 0.5;
    pointer-events: none;
  `;
  
  element.style.position = 'relative';
  element.appendChild(scanline);

  gsap.to(scanline, {
    y: element.offsetHeight,
    duration: 2,
    ease: "none",
    repeat: -1
  });
}
