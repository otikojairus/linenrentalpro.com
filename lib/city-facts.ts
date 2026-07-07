// Real, publicly documented facts about each Ontario municipality the site serves.
// Population figures reflect the most recent Statistics Canada census (2021) and are
// presented as approximations. Used to give every city page genuine local detail
// instead of interchangeable boilerplate.
export type CityFact = {
  population: string;
  neighbourhood: string;
  landmark: string;
  climate: string;
  region: string;
};

export const CITY_FACTS: Record<string, CityFact> = {
  Toronto: {
    population: "approximately 2.79 million residents",
    neighbourhood: "Liberty Village and the Distillery District",
    landmark: "the CN Tower",
    climate: "a humid continental climate moderated by Lake Ontario, which keeps winter cold snaps shorter than inland Ontario",
    region: "the City of Toronto",
  },
  Mississauga: {
    population: "approximately 718,000 residents",
    neighbourhood: "Port Credit and Streetsville",
    landmark: "the Absolute World towers",
    climate: "lake-moderated winters off Lake Ontario, with humid, storm-prone summer afternoons",
    region: "Peel Region",
  },
  Brampton: {
    population: "approximately 656,000 residents",
    neighbourhood: "downtown Brampton near Gage Park",
    landmark: "the Rose Theatre",
    climate: "an inland humid continental climate with heavier lake-effect snow bands than the Toronto waterfront",
    region: "Peel Region",
  },
  Vaughan: {
    population: "approximately 323,000 residents",
    neighbourhood: "Woodbridge and Kleinburg",
    landmark: "Canada's Wonderland",
    climate: "colder overnight winter temperatures than the lakeshore since the city sits well north of Lake Ontario's moderating effect",
    region: "York Region",
  },
  Markham: {
    population: "approximately 338,000 residents",
    neighbourhood: "Unionville's historic main street",
    landmark: "the Flato Markham Theatre",
    climate: "an inland climate with warm, humid summers and consistent winter snow cover through York Region",
    region: "York Region",
  },
  Hamilton: {
    population: "approximately 569,000 residents",
    neighbourhood: "Locke Street and Westdale Village",
    landmark: "Dundurn Castle",
    climate: "escarpment weather patterns that bring more localized snow squalls than nearby shoreline communities",
    region: "the Hamilton–Niagara Peninsula",
  },
  Oakville: {
    population: "approximately 214,000 residents",
    neighbourhood: "Kerr Village and Bronte Village",
    landmark: "the Oakville Harbour waterfront",
    climate: "one of the milder microclimates in the region thanks to direct Lake Ontario exposure",
    region: "Halton Region",
  },
  Burlington: {
    population: "approximately 187,000 residents",
    neighbourhood: "downtown Burlington near Spencer Smith Park",
    landmark: "the Royal Botanical Gardens",
    climate: "lake-moderated conditions from both Lake Ontario exposure and shelter from the Niagara Escarpment",
    region: "Halton Region",
  },
  Scarborough: {
    population: "approximately 632,000 residents",
    neighbourhood: "Agincourt and Guildwood",
    landmark: "the Scarborough Bluffs",
    climate: "lake-effect moderation from Lake Ontario similar to the rest of Toronto's eastern waterfront",
    region: "the City of Toronto",
  },
  "North York": {
    population: "approximately 869,000 residents",
    neighbourhood: "Willowdale and Don Mills",
    landmark: "Mel Lastman Square",
    climate: "a slightly cooler inland pattern than the downtown Toronto waterfront due to distance from Lake Ontario",
    region: "the City of Toronto",
  },
  "Richmond Hill": {
    population: "approximately 202,000 residents",
    neighbourhood: "Oak Ridges and the Yonge Street corridor",
    landmark: "the David Dunlap Observatory lands",
    climate: "higher elevation than the lakeshore, which brings noticeably colder winter mornings across York Region",
    region: "York Region",
  },
  Pickering: {
    population: "approximately 99,000 residents",
    neighbourhood: "Bay Ridges near Frenchman's Bay",
    landmark: "the Petticoat Creek waterfront trails",
    climate: "Lake Ontario shoreline exposure that tempers both summer heat and winter lows",
    region: "Durham Region",
  },
  Ajax: {
    population: "approximately 127,000 residents",
    neighbourhood: "the Pickering Village heritage district",
    landmark: "Ajax Waterfront Park",
    climate: "lakeshore-moderated weather typical of Durham Region's southern communities",
    region: "Durham Region",
  },
  Whitby: {
    population: "approximately 139,000 residents",
    neighbourhood: "historic downtown Whitby and Brooklin",
    landmark: "Whitby Harbour",
    climate: "Lake Ontario proximity that keeps spring and fall temperature swings gentler than inland Durham",
    region: "Durham Region",
  },
  Oshawa: {
    population: "approximately 175,000 residents",
    neighbourhood: "downtown Oshawa near the Oshawa Valley Botanical Gardens",
    landmark: "the Tribute Communities Centre",
    climate: "a shoreline climate with occasional lake-effect squalls carried in off Lake Ontario",
    region: "Durham Region",
  },
  Milton: {
    population: "approximately 133,000 residents",
    neighbourhood: "Old Milton near the Sixteen Mile Creek",
    landmark: "the Mattamy National Cycling Centre",
    climate: "escarpment-influenced weather with cooler nights near the Niagara Escarpment's edge",
    region: "Halton Region",
  },
  Newmarket: {
    population: "approximately 88,000 residents",
    neighbourhood: "historic Main Street Newmarket",
    landmark: "Fairy Lake Park",
    climate: "an inland York Region climate with firmer winter snow cover than the Lake Ontario shoreline",
    region: "York Region",
  },
  Aurora: {
    population: "approximately 62,000 residents",
    neighbourhood: "Aurora Village around Yonge Street",
    landmark: "Hillary House National Historic Site",
    climate: "typical inland York Region winters with reliable snow accumulation from December through March",
    region: "York Region",
  },
  Kitchener: {
    population: "approximately 257,000 residents",
    neighbourhood: "downtown Kitchener near the Kitchener Market",
    landmark: "Victoria Park",
    climate: "a Waterloo Region climate set back from the Great Lakes, with sharper temperature swings than shoreline cities",
    region: "the Region of Waterloo",
  },
  Waterloo: {
    population: "approximately 121,000 residents",
    neighbourhood: "Uptown Waterloo",
    landmark: "the University of Waterloo campus",
    climate: "an inland Waterloo Region climate that trends a few degrees colder overnight than the GTA lakeshore",
    region: "the Region of Waterloo",
  },
  Cambridge: {
    population: "approximately 138,000 residents",
    neighbourhood: "the Galt core along the Grand River",
    landmark: "the Cambridge Mill",
    climate: "a Grand River valley climate with humid summers and steady inland winter snowfall",
    region: "the Region of Waterloo",
  },
  Guelph: {
    population: "approximately 144,000 residents",
    neighbourhood: "downtown Guelph near the Church of Our Lady Immaculate",
    landmark: "the University of Guelph campus",
    climate: "an inland Southwestern Ontario climate with cold, snow-covered winters and warm summers",
    region: "Wellington County",
  },
  Barrie: {
    population: "approximately 148,000 residents",
    neighbourhood: "downtown Barrie along Kempenfelt Bay",
    landmark: "Heritage Park on Lake Simcoe",
    climate: "lake-effect snow squalls off Georgian Bay that can be heavier and more sudden than GTA winters",
    region: "Simcoe County",
  },
  London: {
    population: "approximately 422,000 residents",
    neighbourhood: "Old East Village and Wortley Village",
    landmark: "Western University",
    climate: "a Southwestern Ontario snowbelt climate with lake-effect snowfall pulled in from Lake Huron",
    region: "Southwestern Ontario",
  },
};

export function cityFacts(city: string): CityFact {
  return (
    CITY_FACTS[city] || {
      population: "a growing local business base",
      neighbourhood: "the central business district",
      landmark: "the main commercial corridor",
      climate: "a Southern Ontario humid continental climate with cold winters and warm summers",
      region: "Ontario",
    }
  );
}
