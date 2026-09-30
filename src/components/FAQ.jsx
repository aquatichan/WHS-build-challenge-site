import { useId, useState } from 'react';
import { FAQ as ITEMS } from '../content.js';
import { SectionHeader } from './SectionHeader.jsx';

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className={`faq__item ${open ? 'is-open' : ''}`}>
      <h3 className="faq__q">
        <button
          type="button"
          className="faq__button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={() => setOpen((o) => !o)}
        >
          <span>{q}</span>
          <span className="knob" aria-hidden="true">
            <span className="knob__cap" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className="faq__panel"
        inert={!open}
      >
        <div className="faq__panel-inner">
          <p>{a}</p>
        </div>
      </div>
    </li>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="container faq">
        <SectionHeader index="09" eyebrow="FAQ" id="faq-title">
          Questions, <em>answered.</em>
        </SectionHeader>
        <ul className="faq__list">
          {ITEMS.map((it) => (
            <Item key={it.q} {...it} />
          ))}
        </ul>
      </div>
    </section>
  );
}
