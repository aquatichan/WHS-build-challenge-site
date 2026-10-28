// Club crest. Lives in /public so the same file also serves as the favicon.
const SRC = `${import.meta.env.BASE_URL}logo.webp`;

export function LogoMark({ size = 32 }) {
  return (
    <img
      className="logo-mark"
      src={SRC}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      decoding="async"
      draggable="false"
    />
  );
}
