export type MbxIconName = "scissors" | "razor" | "clipper" | "comb" | "neck-brush" | "hair-dryer" | "spray-bottle" | "shaving-brush" | "shave-cream" | "towel" | "cape" | "mirror" | "barber-pole" | "barber-chair" | "wash-basin" | "pomade" | "beard-oil" | "aftershave" | "haircut" | "beard" | "shave" | "fade" | "kids-cut" | "braids" | "locs" | "twists" | "hair-wash" | "hair-color" | "line-up" | "mustache" | "eyebrows" | "hot-towel" | "add-on" | "hair" | "hair-styling" | "hair-treatments" | "hair-extensions" | "cornrows" | "box-braids" | "knotless-braids" | "perm" | "head-shave" | "hair-design" | "scalp-micropigmentation" | "house-call" | "lashes" | "brows-lashes" | "nails" | "manicure" | "pedicure" | "acrylic-nails" | "gel-nails" | "skin-face" | "facials" | "waxing" | "body-waxing" | "body" | "massage" | "makeup" | "tattoo" | "piercing" | "booking" | "reschedule" | "cancel" | "walk-in" | "no-show" | "confirmed" | "pending" | "schedule" | "reminder" | "review" | "favorite" | "portfolio" | "message" | "location" | "shop" | "qr-code" | "wallet" | "tip" | "deposit" | "cash" | "card" | "tap-to-pay" | "receipt" | "refund" | "earnings" | "bank" | "alert" | "ticket" | "extra-saver" | "shield" | "pto" | "referral" | "barber" | "client" | "block" | "report";
export type MbxCategory = "tools" | "services" | "booking" | "money" | "programs";
export interface MbxElement { tag: 'path' | 'circle' | 'rect' | 'line'; attrs: Record<string, string>; }
export declare const GRID: number;
export declare const STROKE_WIDTH: number;
export declare const ROOT_ATTRS: string;
export declare const CATEGORIES: Record<MbxCategory, string>;
export declare const ELEMENTS: Record<MbxIconName, MbxElement[]>;
export declare const META: Record<MbxIconName, { category: MbxCategory; keywords: string[] }>;
export declare const names: MbxIconName[];
export type MbxCategoryPath = "hair" | "hair/haircut" | "hair/hair-styling" | "hair/hair-color" | "hair/braids" | "hair/braids/box-braids" | "hair/braids/knotless-braids" | "hair/braids/cornrows" | "hair/locs" | "hair/hair-extensions" | "hair/hair-treatments" | "beard-shave" | "brows-lashes" | "nails" | "nails/manicure" | "nails/pedicure" | "nails/acrylic-nails" | "nails/gel-nails" | "skin-face" | "skin-face/facials" | "skin-face/face-waxing" | "body" | "body/massage" | "body/body-waxing" | "makeup" | "tattoo-piercing" | "kids";
export declare const CATEGORY_ICONS: Record<MbxCategoryPath, MbxIconName>;
export declare function categoryIcon(path: string | null | undefined, fallback?: MbxIconName): MbxIconName;
export declare function body(name: MbxIconName): string;
export declare function svg(name: MbxIconName, attrs?: string): string;
