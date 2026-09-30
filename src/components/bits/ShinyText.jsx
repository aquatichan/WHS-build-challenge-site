/**
 * Text with a light sweep passing over it (CSS only).
 * Pattern adapted from React Bits' "Shiny Text" (https://reactbits.dev).
 */
export function ShinyText({ as: Tag = 'span', className = '', children }) {
  return <Tag className={`shiny-text ${className}`}>{children}</Tag>;
}
