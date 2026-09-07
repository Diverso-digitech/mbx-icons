export type MbxIconName = "scissors" | "razor" | "clipper" | "comb" | "neck-brush" | "hair-dryer" | "spray-bottle" | "shaving-brush" | "shave-cream" | "towel" | "cape" | "mirror" | "barber-pole" | "barber-chair" | "wash-basin" | "pomade" | "beard-oil" | "aftershave" | "haircut" | "beard-trim" | "shave" | "fade" | "kids-cut" | "braids" | "locs" | "twists" | "hair-wash" | "hair-color" | "line-up" | "mustache" | "eyebrows" | "hot-towel" | "add-on" | "booking" | "reschedule" | "cancel" | "walk-in" | "no-show" | "confirmed" | "pending" | "schedule" | "reminder" | "review" | "favorite" | "portfolio" | "message" | "location" | "shop" | "qr-code" | "wallet" | "tip" | "deposit" | "cash" | "card" | "tap-to-pay" | "receipt" | "refund" | "earnings" | "bank" | "alert" | "ticket" | "extra-saver" | "shield" | "pto" | "referral" | "barber" | "client" | "block" | "report";
export type MbxCategory = "tools" | "services" | "booking" | "money" | "programs";
export interface MbxElement { tag: 'path' | 'circle' | 'rect' | 'line'; attrs: Record<string, string>; }
export declare const GRID: number;
export declare const STROKE_WIDTH: number;
export declare const ROOT_ATTRS: string;
export declare const CATEGORIES: Record<MbxCategory, string>;
export declare const ELEMENTS: Record<MbxIconName, MbxElement[]>;
export declare const META: Record<MbxIconName, { category: MbxCategory; keywords: string[] }>;
export declare const names: MbxIconName[];
export declare function body(name: MbxIconName): string;
export declare function svg(name: MbxIconName, attrs?: string): string;
