// Descriptive, service-specific detail used to generate genuinely different copy per
// service family instead of swapping one keyword into an otherwise identical template.
export type ServiceMeta = {
  audiences: string[];
  items: string[];
  differentiator: string;
  painPoint: string;
  synonym: string;
};

export const SERVICE_META: Record<string, ServiceMeta> = {
  "/commercial-laundry-service": {
    audiences: ["restaurants", "gyms", "salons", "medical offices"],
    items: ["kitchen towels, aprons and mop heads", "shop rags", "bar mops", "microfibre cloths"],
    differentiator: "route timing is built around wash volume rather than a flat weekly pickup",
    painPoint: "running out of clean towels or rags mid-shift",
    synonym: "the laundering route",
  },
  "/uniform-rental-service": {
    audiences: ["auto shops", "warehouses", "food processors", "property maintenance crews"],
    items: ["work shirts, coveralls and cargo pants", "high-visibility vests", "name-tagged polos"],
    differentiator: "sizing and garment swaps are tracked per employee, not just per location",
    painPoint: "staff running short on clean, correctly sized uniforms between shifts",
    synonym: "the uniform program",
  },
  "/restaurant-linen-service": {
    audiences: ["fine dining rooms", "bistros", "banquet halls", "catering kitchens"],
    items: ["tablecloths, cloth napkins and chair sashes", "kitchen aprons", "bar towels"],
    differentiator: "stain-prone dinner service linen gets a different handling process than kitchen textiles",
    painPoint: "mismatched or thinning tablecloths showing up during service",
    synonym: "the dining room linen rotation",
  },
  "/commercial-linen-service": {
    audiences: ["clinics", "day spas", "boutique hotels", "long-term care residences"],
    items: ["flat sheets, pillowcases and blankets", "bath and hand towels", "robes"],
    differentiator: "infection control aware handling is available for sites that need it",
    painPoint: "unexpected linen shortages during high-occupancy weeks",
    synonym: "the linen account",
  },
  "/linen-rental": {
    audiences: ["boutique hotels", "short-term rental operators", "event venues", "bed and breakfasts"],
    items: ["bedsheets and duvet covers", "bath towels and bath mats", "tablecloths"],
    differentiator: "par levels are set so a fully booked week doesn't strain the linen closet",
    painPoint: "guests noticing worn or mismatched bedding",
    synonym: "the rental linen supply",
  },
  "/table-linen-napkin-rental": {
    audiences: ["wedding and event planners", "banquet halls", "restaurants", "corporate caterers"],
    items: ["tablecloths in multiple sizes", "cloth napkins", "table runners and overlays"],
    differentiator: "colour and fabric options can be matched to a event theme instead of settling for plain white",
    painPoint: "scrambling for extra tablecloths before a last-minute event",
    synonym: "the table linen order",
  },
  "/floor-mat-rental-service": {
    audiences: ["warehouses", "retail entrances", "commercial kitchens", "office lobbies"],
    items: ["scraper mats at entrances", "anti-fatigue mats at workstations", "logo mats in lobbies"],
    differentiator: "mat placement is planned by traffic zone, not shipped as one generic size for the whole site",
    painPoint: "worn, curling mats becoming a slip hazard between swaps",
    synonym: "the mat rotation",
  },
  "/gym-fitness-towel-service": {
    audiences: ["fitness studios", "yoga studios", "climbing gyms", "hotel fitness centres"],
    items: ["hand towels for the floor", "shower towels for locker rooms", "yoga mat towels"],
    differentiator: "peak-hour towel volume is planned around class schedules instead of a flat daily count",
    painPoint: "the towel bin running empty during a busy evening class block",
    synonym: "the gym towel rotation",
  },
  "/industrial-uniform-shop-towel-service": {
    audiences: ["machine shops", "auto repair bays", "manufacturing floors", "fleet maintenance garages"],
    items: ["shop towels for wipe-downs", "coveralls", "flame-resistant workwear"],
    differentiator: "heavily soiled shop textiles are processed separately from lighter-duty uniforms",
    painPoint: "grease-heavy towels piling up faster than a small on-site washer can keep up with",
    synonym: "the shop towel account",
  },
  "/healthcare-medical-linen-service": {
    audiences: ["medical clinics", "dental offices", "long-term care homes", "outpatient surgical centres"],
    items: ["patient gowns", "draw sheets and pads", "lab coats"],
    differentiator: "handling follows infection-control expectations rather than standard hospitality laundering",
    painPoint: "linen turnaround lagging behind same-day patient volume",
    synonym: "the clinical linen supply",
  },
  "/hotel-hospitality-linen-service": {
    audiences: ["boutique hotels", "extended-stay properties", "bed and breakfasts", "short-term rental portfolios"],
    items: ["bed sheets and duvet covers", "bath towels and robes", "pool towels"],
    differentiator: "par levels flex around occupancy forecasts instead of a fixed weekly count",
    painPoint: "a fully booked weekend outrunning the linen closet",
    synonym: "the guest linen program",
  },
  "/spa-salon-towel-service": {
    audiences: ["day spas", "hair salons", "nail studios", "wellness clinics"],
    items: ["treatment towels", "hand towels at styling stations", "robes"],
    differentiator: "scent-sensitive clients are accounted for in how the textiles are finished",
    painPoint: "running low on fresh towels between back-to-back appointments",
    synonym: "the treatment towel rotation",
  },
  "/chef-coat-kitchen-uniform-rental": {
    audiences: ["restaurant kitchens", "hotel banquet kitchens", "catering companies", "culinary schools"],
    items: ["chef coats", "aprons", "kitchen pants and skull caps"],
    differentiator: "stain treatment is built for kitchen-grade grease and sauce, not everyday office wear",
    painPoint: "a stained coat being the only clean one left before a shift",
    synonym: "the kitchen uniform rotation",
  },
  "/commercial-laundry-near-me": {
    audiences: ["small restaurants", "independent gyms", "local salons", "neighbourhood clinics"],
    items: ["kitchen and bar towels", "shop rags", "microfibre cloths"],
    differentiator: "routing is matched to whichever depot is actually closest to the pickup address",
    painPoint: "a laundry vendor that is technically regional but rarely nearby",
    synonym: "a nearby laundering route",
  },
  "/uniform-rental-near-me": {
    audiences: ["local trades", "small fleets", "independent shops", "franchise locations"],
    items: ["work shirts and pants", "coveralls", "high-visibility gear"],
    differentiator: "smaller accounts get the same routing attention as multi-site operators",
    painPoint: "a national uniform vendor that treats a small account as an afterthought",
    synonym: "a local uniform program",
  },
  "/floor-mat-rental-near-me": {
    audiences: ["retail storefronts", "small offices", "local restaurants", "neighbourhood gyms"],
    items: ["entrance scraper mats", "anti-fatigue mats", "logo mats"],
    differentiator: "swap frequency is based on foot traffic, not a one-size schedule",
    painPoint: "a worn entrance mat left in place well past its useful life",
    synonym: "a nearby mat rotation",
  },
  "/linen-service-near-me": {
    audiences: ["small hotels", "short-term rentals", "cafes", "local spas"],
    items: ["bed and bath linen", "table linen", "hand towels"],
    differentiator: "pickup windows are set around the property's actual turnover schedule",
    painPoint: "a linen vendor whose delivery day never lines up with turnover day",
    synonym: "a local linen supply",
  },
  "/uniform-rental-cost": {
    audiences: ["small businesses comparing vendors", "multi-location operators", "seasonal employers", "franchise owners"],
    items: ["per-employee garment counts", "swap frequency", "embroidery or branding add-ons"],
    differentiator: "pricing is shaped by garment type and swap frequency more than by headcount alone",
    painPoint: "a quote that does not explain what is actually included",
    synonym: "the program cost",
  },
  "/linen-rental-cost": {
    audiences: ["boutique hotel owners", "restaurant operators", "event planners", "spa managers"],
    items: ["par level per room or table", "fabric grade", "delivery frequency"],
    differentiator: "par levels, not just item price, tend to drive the real monthly total",
    painPoint: "underestimating par levels and paying for rush replacements later",
    synonym: "the rental cost",
  },
  "/floor-mat-rental-cost": {
    audiences: ["warehouse operators", "retail managers", "office administrators", "restaurant owners"],
    items: ["mat size and type", "traffic zone count", "swap frequency"],
    differentiator: "entrance mats and anti-fatigue mats are priced differently because they wear at different rates",
    painPoint: "budgeting for mats without knowing how many traffic zones actually need coverage",
    synonym: "the mat program cost",
  },
};

const FALLBACK_META: ServiceMeta = SERVICE_META["/commercial-laundry-service"];

export function serviceMetaFor(key: string): ServiceMeta {
  return SERVICE_META[key] || FALLBACK_META;
}

export function hashIndex(value: string, mod: number) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}
