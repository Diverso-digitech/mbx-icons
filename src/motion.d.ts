import type {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  HTMLAttributes,
} from 'react';

export interface MbxMotionProps {
  /** Barber pole: height in px (width follows the aspect ratio). Scissors/clipper: the SVG side length. */
  size?: number | string;
  /** Override the loop duration, e.g. "1.2s" or "600ms". */
  speed?: string;
}

export type BarberPoleMotionProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> &
  RefAttributes<HTMLSpanElement> &
  MbxMotionProps;

export type MbxMotionSvgProps = Omit<SVGProps<SVGSVGElement>, 'ref' | 'color'> &
  RefAttributes<SVGSVGElement> &
  MbxMotionProps;

/** Spinning barber pole — a brand accent for page / route loading states. */
export declare const BarberPoleMotion: ForwardRefExoticComponent<BarberPoleMotionProps>;
/** Snipping scissors — a hover micro-interaction for Book buttons. */
export declare const ScissorsSnip: ForwardRefExoticComponent<MbxMotionSvgProps>;
/** Buzzing hair clipper — icon liveliness for empty / tool states. */
export declare const ClipperBuzz: ForwardRefExoticComponent<MbxMotionSvgProps>;
