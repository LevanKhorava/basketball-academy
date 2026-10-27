// ---------------------------------------------------------------------------
// ოფიციალური ფოტოები / Official imagery slots.
// Web-optimized copies live in src/assets/ (the untouched originals are in
// src/assets/originals/, kept out of git). To swap a visual, just point the
// slot at another import — no component changes needed. A `null` slot makes
// the component fall back to its built-in branded placeholder.
// ---------------------------------------------------------------------------

import heroPhoto from "../assets/dwight-entrance.jpg";
import aboutPhoto from "../assets/dwight-smile.jpg";
import registerPhoto from "../assets/dwight-court.jpg";

export interface ImageSlots {
  /** Hero visual (portrait, ~4:5): Dwight Howard's entrance. */
  hero: string | null;
  /** Academy intro section photo. */
  about: string | null;
  /** Registration section side photo (desktop only). */
  register: string | null;
}

export const images: ImageSlots = {
  hero: heroPhoto,
  about: aboutPhoto,
  register: registerPhoto,
};
