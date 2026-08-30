// Content model for the LA Grinding homepage.
// Transcribed verbatim from renderVals() in design-source/LA Grinding Homepage.dc.html.

const U = "https://lagrinding.com/wp-content/uploads/";
const UP = "uploads/";
const L = U + "2025/12/";
const SHOP = "https://lagrinding.com/shop/?swoof=1&";

export const IMG = {
  tree: U + "2026/05/lag-tree-industry-hdr_new.webp",
  chipper: U + "2026/03/Brush-Chipper-Knife.jpg",
  stump: U + "2026/03/stump-grinder-teeth.jpg",
  freud: U + "2026/05/blade_diablo_freud.webp",
  gran: U + "2026/05/granulators-slide-bg02.webp",
  paper: U + "2026/05/paper-knives-slide-1.webp",
  shear: U + "2026/05/bgslide_01-1.webp",
  shearMachine: U + "2026/05/lag-bottom01.webp",
  bandsaw: U + "2026/05/lag-bottom02.webp",
  accessories: U + "2026/05/image002.webp",
  bladeStack: U + "2026/05/lag-bottom04.webp",
  tires: U + "2026/05/lag-bottom05.webp",
  ice: U + "2022/03/AZ-IceRinks.png",
  iceKnives: U + "2022/03/knives-ice-rinks.png"
};

const cats = [
  { name: "Circular Saw Blades", href: SHOP + "product_cat=circular-saw-blades", img: "uploads/12-x-96-teeth-saw-blade-for-medium-aluminum-600x600-61cfc156.jpg" },
  { name: "Granulators", href: "https://lagrinding.com/product-category/granulators/", img: "uploads/granulator.jpg" },
  { name: "Ice Rink", href: "https://lagrinding.com/product-category/ice-rinks/", img: IMG.ice },
  { name: "LA Grinding Catalog", href: "https://lagrinding.com/shop/", img: "uploads/download-1.jpg" },
  { name: "Oscillating Multi-Tool Blades", href: SHOP + "product_cat=oscillating-multi-tool-blades", img: "uploads/3-pc-universal-fit-carbide-oscillating-blade-set-3-piece-600x600.jpg" },
  { name: "Paper Knife Accessories", href: "https://lagrinding.com/product-category/la-grinding-catalog/paper-knife-cutters-accessories/", img: "uploads/A753-300x300.webp" },
  { name: "Reciprocating Blades", href: SHOP + "product_cat=reciprocating-blades", img: "uploads/9-5-7-tpi-amped-demo-demon-carbide-teeth-reciprocating-saw-blade-for-nail-embedded-woodd-600x600.jpg" },
  { name: "Router Bits", href: SHOP + "product_cat=router-bits", img: "uploads/1-11-16-dia-premier-adjustable-rail-stile-bit-bevel-600x600.jpg" },
  { name: "Sanding", href: SHOP + "product_cat=sanding", img: "uploads/2-3-4-x-5-assorted-sandnet-reusable-sanding-sheets-10-piece-600x600.jpg" },
  { name: "Saw Blades", href: SHOP + "product_cat=saw-blades", img: "uploads/12-x-96-teeth-saw-blade-for-medium-aluminum-600x600.jpg" },
  { name: "Screwdriving Bits", href: SHOP + "product_cat=screwdriving-bits", img: "uploads/1-4-hex-to-1-2-square-socket-adapter-600x600.jpg" },
  { name: "Serrated Tape Knives", href: "https://lagrinding.com/product-category/cutoff-knives/", img: "uploads/tree-care.png" },
  { name: "Shear Blades", href: SHOP + "product_cat=shear-blades", img: "uploads/shear-blades.png" },
  { name: "Tools", href: SHOP + "product_cat=tools", img: "uploads/W74-300x300.webp" },
  { name: "Tree Care", href: SHOP + "product_cat=tree-care", img: IMG.chipper }
];

const shopIndustries = [
  { name: "Construction", href: "https://lagrinding.com/woodworking-and-construction/", icon: "uploads/icon-woodworking.png", menuIcon: "uploads/menu-construction.png" },
  { name: "Corrugated Knives & Accessories", href: "https://lagrinding.com/corrugated/", icon: "uploads/icon-corrugated.png", menuIcon: "uploads/menu-corrugated.png" },
  { name: "Food Processing & Packaging", href: "https://lagrinding.com/packaging/", icon: "uploads/icon-food.png", menuIcon: "uploads/menu-food.png" },
  { name: "Ice Rink Operations", href: "https://lagrinding.com/ice-rinks-products/", icon: "uploads/icon-icerink.png", menuIcon: "uploads/menu-icerink.png" },
  { name: "Metal Industry", href: "https://lagrinding.com/shear-blades-for-metal-fabrication/", icon: "uploads/icon-metal.png", menuIcon: "uploads/menu-metal.png" },
  { name: "Plastic", href: "https://lagrinding.com/granulators-for-recycling-plastic/", icon: "uploads/icon-paper.png", menuIcon: "uploads/menu-plastic.png" },
  { name: "Printing & Bindery", href: "https://lagrinding.com/printing-and-bindery/", icon: "uploads/icon-printing.png", menuIcon: "uploads/menu-printing.png" },
  { name: "Recycling & Waste Management", href: "https://lagrinding.com/recycling-plastic-industry/", icon: "uploads/icon-plastic.png", menuIcon: "uploads/menu-recycling.png" },
  { name: "Tree Care", href: "https://lagrinding.com/tree-care-industry/", icon: "uploads/icon-treecare.png", menuIcon: "uploads/menu-treecare.png" },
  { name: "Woodworking & Construction", href: "https://lagrinding.com/woodworking-and-construction/", icon: "uploads/icon-woodworking.png", menuIcon: "uploads/menu-woodworking.png" }
];

const brands = [
  { name: "Freud", meta: "Official distributor", logo: UP + "logo_freud.webp", href: SHOP + "pa_main-brand=freud" },
  { name: "Diablo", meta: "Official distributor", logo: UP + "diablo-logo.webp", href: SHOP + "pa_main-brand=diablo" },
  { name: "Wysong & Miles", meta: "56 products", logo: UP + "wysong-clean.png", href: SHOP + "pa_brand=wysong-miles" },
  { name: "Accurshear", meta: "36 products", logo: UP + "Accurshear.png", href: SHOP + "pa_brand=accurshear" },
  { name: "Pexto", meta: "30 products", logo: UP + "Pexto-hammertone-blue-140x.png", href: SHOP + "pa_brand=pexto" },
  { name: "Tennsmith", meta: "22 products", logo: UP + "tennsmith-clean.png", href: SHOP + "pa_brand=tennsmith" },
  { name: "Niagara", meta: "15 products", logo: UP + "NIAGARA%20.png", href: SHOP + "pa_brand=niagara" },
  { name: "Roper Whitney", meta: "15 products", logo: UP + "Roper-Whitney-Logo-Brands-You-Know-Trust-150x38.png", href: SHOP + "pa_brand=roper-whitney" },
  { name: "Di-Acro Elga", meta: "15 products", logo: UP + "diacro-clean.png", href: SHOP + "pa_brand=di-acro-elga" },
  { name: "Atlantic/Haco", meta: "14 products", logo: UP + "ATLANTIC%3AHACO.png", href: SHOP + "pa_brand=atlantic-haco" },
  { name: "Famco", meta: "12 products", logo: UP + "famco-dark.png", href: SHOP + "pa_brand=famco" },
  { name: "Amada", meta: "11 products", logo: UP + "amada-clean.png", href: SHOP + "pa_brand=amada" },
  { name: "Pearson", meta: "8 products", logo: UP + "PEARSON.png", href: SHOP + "pa_brand=pearson" },
  { name: "Summit", meta: "8 products", logo: UP + "summit-clean.png", href: SHOP + "pa_brand=summit" },
  { name: "Durma", meta: "7 products", logo: UP + "DURMA%20%3A%20DURMAZLAR.png", href: SHOP + "pa_brand=durma" },
  { name: "Dreis & Krump", meta: "5 products", logo: UP + "CHICAGO%20DREIS%20%26%20KRUMP.jpg", href: SHOP + "pa_brand=dreis-krump" },
  { name: "Adira", meta: "4 products", logo: UP + "adira-dark.png", href: SHOP + "pa_brand=adira" },
  { name: "Edwards - Besco", meta: "4 products", logo: UP + "Edwards%20-%20Besco.png", href: SHOP + "pa_brand=edwards-besco" }
];

const brandLogos = [
  { name: "Freud", img: L + "logo_freud.webp" },
  { name: "Diablo", img: L + "diablo-logo.webp" },
  { name: "Accurshear", img: L + "logo-AccurShear.webp" },
  { name: "Bobst", img: L + "logo-BOBST.webp" },
  { name: "Challenge Machinery", img: L + "logo-Challenge-Machinery.webp" },
  { name: "Cumberland", img: L + "logo-cumberladns-plastics.webp" },
  { name: "FS Tool", img: L + "logo-fs-tool.webp" },
  { name: "Herbold USA", img: L + "logo-herbold-usa.webp" },
  { name: "Lenox", img: L + "logo-lenox.webp" },
  { name: "Multivac", img: L + "logo-multivac.webp" },
  { name: "National Equipment", img: L + "logo-national-equipment.webp" },
  { name: "Polar Mohr", img: L + "logo-polar-mohr.webp" },
  { name: "Reiser", img: L + "logo-reiser-packaging.webp" },
  { name: "Tidland", img: L + "logo-tidland-slitter.webp" },
  { name: "Eldan Recycling", img: L + "unnamed.webp" },
  { name: "Columbus McKinnon", img: L + "unnamed_1.webp" },
  { name: "Barclay Shredders", img: L + "unnamed_2.webp" },
  { name: "Granutech Saturn", img: L + "unnamed_3.webp" }
];

export const data = {
  showMobile: true,
  showCaptions: true,

  cats,
  mobileCats: cats.slice(12).concat(cats.slice(0, 4)),
  shopIndustries,
  brands,
  menuBrands: brands.slice(0, 14),
  brandLogos,

  techCards: [
    { name: "Chipper Knife Fitting", img: "uploads/tree-care.png", href: "https://lagrinding.com/tree-care-industry/" },
    { name: "Wood Chipper Knives", img: IMG.bandsaw, href: "https://lagrinding.com/wood-chipper-knives/" },
    { name: "Brush Chipper Knives", img: IMG.bladeStack, href: "https://lagrinding.com/brush-chipper-knives/" }
  ],

  heroCards: [
    { name: "Shop Brush Chipper Knives", img: IMG.chipper, href: SHOP + "product_cat=brush-chipper-knives" },
    { name: "Shop Mulcher Teeth", img: "uploads/mulcher-teeth-nologo.png", href: SHOP + "product_cat=mulcher-teeth" },
    { name: "Shop Stump Grinder Teeth", img: IMG.stump, href: SHOP + "product_cat=stump-grinding-teeth" }
  ],

  popularSearches: [
    { label: "Brush chipper knives", href: SHOP + "product_cat=brush-chipper-knives" },
    { label: "Stump grinder teeth", href: SHOP + "product_cat=stump-grinding-teeth" },
    { label: "Shear blades", href: SHOP + "product_cat=shear-blades" },
    { label: "Granulator knives", href: "https://lagrinding.com/product-category/granulators/" },
    { label: "Paper knives", href: "https://lagrinding.com/paper-knife-cutters-accessories/" },
    { label: "Freud & Diablo", href: SHOP + "pa_main-brand=diablo%2Cfreud" },
    { label: "Ice rink parts", href: "https://lagrinding.com/product-category/ice-rinks/" }
  ],

  partnerCards: [
    {
      kicker: "Order online",
      title: "Tree care parts, shipping nationwide",
      body: "Brush Chipper Knives, Mulcher Teeth, Stump Grinder Teeth and more — precision ground exact match OEM replacement parts.",
      cta: "Shop Tree Care",
      img: IMG.chipper,
      href: SHOP + "product_cat=tree-care"
    },
    {
      kicker: "Professional sharpening & services",
      title: "Sharpening held to OEM tolerances",
      body: "L.A. Grinding has the product knowledge and the state-of-the-art equipment necessary to provide professional grade sharpening, with pickup and delivery across CA, NV and AZ.",
      cta: "Explore services",
      img: "uploads/8-dial-a-width-stacked-dado-sets-300x300.jpg",
      href: "https://lagrinding.com/sharpening/"
    },
    {
      kicker: "Official distributor",
      title: "Freud & Diablo cutting tools",
      body: "We are proud distributors of Freud & Diablo's high-quality woodworking tools including saw blades, router bits, shaper cutters, abrasives, power tool accessories and more.",
      cta: "Order now",
      img: "uploads/shopping.webp",
      href: SHOP + "pa_main-brand=diablo%2Cfreud"
    }
  ],

  industryTiles: [
    { name: "Corrugated Cardboard", note: "Male & female slotters, razor slitters", img: "uploads/LA-Corrugated-1.webp", href: "https://lagrinding.com/corrugated/" },
    { name: "Food Processing and Packaging", note: "Knives, punches and blades", img: "uploads/LA-Packaging-1.webp", href: "https://lagrinding.com/packaging/" },
    { name: "Metal", note: "Shear blades up to 14'", img: "uploads/LA-MetalIndustry-1.webp", href: "https://lagrinding.com/shear-blades-for-metal-fabrication/" },
    { name: "Paper Converting Label Manufacturing", note: "Paper knives & cutter accessories", img: "uploads/LA-Paper-1.webp", href: "https://lagrinding.com/paper-knife-cutters-accessories/" },
    { name: "Printing & Bindery", note: "Stitching wire, cutting sticks, parts", img: "uploads/LA-Printing-1.webp", href: "https://lagrinding.com/printing-and-bindery/" },
    { name: "Recycling Plastic Industry", note: "Granulator & shredder knives", img: "uploads/LA-plastic-1.webp", href: "https://lagrinding.com/recycling-plastic-industry/" },
    { name: "Ice Rink Products", note: "Edger blades & resurfacing knives", img: "uploads/LA-IceRinks.webp", href: "https://lagrinding.com/ice-rinks-products/" },
    { name: "Tree Care Industry", note: "Chipper knives, mulcher & stump teeth", img: "uploads/LA-TreeCare.webp", href: "https://lagrinding.com/tree-care-industry/" },
    { name: "Woodworking & Construction", note: "Bandsaw fitting, carbide saw blades", img: "uploads/lag-home-construction.webp", href: "https://lagrinding.com/woodworking-and-construction/" },
    { name: "Sharpening", note: "Scheduled pickup & delivery routes", img: "uploads/lag-home-sharpening.webp", href: "https://lagrinding.com/sharpening/" }
  ],

  services: [
    { name: "Professional Sharpening", body: "Experience and the ability to maintain tight tolerances and OEM specifications have been proven to outlast our competition.", cta: "Learn more", img: "uploads/sharpening.png", href: "https://lagrinding.com/sharpening/" },
    { name: "Paper Knives", body: "Our product specialist can supply you with the proper knife for specific cutting requirements and cutting conditions.", cta: "Learn more", img: "uploads/paper-knives.png", href: "https://lagrinding.com/paper-knife-cutters-accessories/" },
    { name: "Shear Blades", body: "We can sharpen any shear blades up to 14' within the same precision tolerances as new knives to maintain high productivity and quality cuts.", cta: "Learn more", img: "uploads/shear-blades.png", href: "https://lagrinding.com/arizona-grinding/shear-blades-for-metal-fabrication/" },
    { name: "Granulators", body: "High-performance granulator knives manufactured to exact tolerances and machined to specific OEM specifications, made from D-2 12% chrome material.", cta: "Learn more", img: "uploads/granulators.png", href: "https://lagrinding.com/granulators/" },
    { name: "Tree Care", body: "Replacement knives and sharpening for brush chippers, mulchers and stump grinders, on weekly, biweekly or monthly service routes.", cta: "Learn more", img: "uploads/tree-care.png", href: "https://lagrinding.com/tree-care-industry/" }
  ],

  featured: [
    { cat: "Tree Care", name: "Brush Chipper Knives — precision ground OEM match", img: IMG.chipper, href: SHOP + "product_cat=brush-chipper-knives" },
    { cat: "Tree Care", name: "Stump Grinder Teeth — replacement options", img: IMG.stump, href: "https://lagrinding.com/product-category/tree-care/stump-grinding-teeth/" },
    { cat: "Saw Blades", name: "Freud & Diablo Carbide Tipped Saw Blades", img: IMG.freud, href: SHOP + "pa_main-brand=freud%2Cdiablo&product_cat=saw-blades" }
  ],

  quickLinks: [
    { name: "Arizona Grinding", href: "https://lagrinding.com/arizona" },
    { name: "Packaging", href: "https://lagrinding.com/packaging/" },
    { name: "Metal", href: "https://lagrinding.com/metal/" },
    { name: "Shear Blades", href: "https://lagrinding.com/shear-blades-for-metal-fabrication/" },
    { name: "Paper Knife Cutter Accessories", href: "https://lagrinding.com/paper-knife-cutters-accessories/" },
    { name: "Diablo", href: SHOP + "pa_main-brand=diablo" },
    { name: "Freud", href: SHOP + "pa_main-brand=freud" },
    { name: "Brush Chippers", href: SHOP + "product_cat=brush-chipper-knives" },
    { name: "Granulators", href: "https://lagrinding.com/product-category/granulators/" },
    { name: "Ice Rink Products", href: "https://lagrinding.com/product-category/ice-rinks/" },
    { name: "Stump Grinder Teeth", href: SHOP + "product_cat=stump-grinding-teeth" },
    { name: "Shop Shear Blades", href: SHOP + "product_cat=shear-blades" },
    { name: "Contact", href: "https://lagrinding.com/contact/" }
  ],

  caCities: ["Anaheim", "Bakersfield", "Bay Area", "Fresno", "Inland Empire", "Long Beach", "Los Angeles", "Modesto", "Orange County", "Sacramento", "San Diego", "Santa Ana", "Stockton", "Riverside County"],
  azCities: ["Goodyear", "Mesa", "Phoenix", "Scottsdale", "Tempe", "Tucson"],
  nvCities: ["Carson City", "Fernley", "Henderson", "Las Vegas", "Sparks", "Reno"]
};
