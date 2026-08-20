/**
 * Curated image manifest.
 *
 * Every entry names a real file on Wikimedia Commons that was inspected by hand.
 * `scripts/fetch-images.mjs` re-checks the licence of each file at download time and
 * refuses anything that is not demonstrably reusable, so this list cannot silently
 * drift into copyright-risky territory.
 *
 * alt: describes what the photograph actually shows. It never claims a photo depicts
 *      work in progress, a specific shop, or anything the image does not contain.
 */
export const WIDTHS = [480, 960, 1600]

export const images = [
  /* ---------- hero ---------- */
  { slug: 'hero-challenger-rt', folder: 'hero', file: '1970 Dodge Challenger R-T.jpg',
    alt: 'An orange 1970 Dodge Challenger R/T with a black bonnet stripe, photographed from the front three-quarter angle on a show field.' },
  { slug: 'hero-mustang-wide', folder: 'hero', file: '1967 Ford Mustang 5.0L 1.jpg',
    alt: 'A black 1967 Ford Mustang fastback on polished five-spoke wheels, photographed in a wide, low rear three-quarter view.' },
  { slug: 'hero-belair-station', folder: 'hero', file: '1957 Chevrolet Bel Air Sport Sedan Sunoco Station Putney VT October 2017.jpg',
    alt: 'A turquoise and white 1957 Chevrolet Bel Air parked on the forecourt of a filling station, seen from the front three-quarter angle.' },

  /* ---------- mustang ---------- */
  { slug: 'mustang-67-fastback', folder: 'mustang', file: '1967 Ford Mustang Fastback (15403550467).jpg',
    alt: 'A 1967 Ford Mustang fastback in Dark Moss Green, photographed from the front three-quarter angle on a show field.' },
  { slug: 'mustang-67-gt-lime', folder: 'mustang', file: '1967 Ford Mustang GT Fastback (14182200538).jpg',
    alt: 'A Lime Gold 1967 Ford Mustang GT fastback with styled wheels, photographed from the front three-quarter angle.' },
  { slug: 'mustang-65-convertible', folder: 'mustang', file: 'Ford Mustang Convertible 1965.jpg',
    alt: 'A red 1965 Ford Mustang convertible with the top lowered, photographed from the front three-quarter angle at a car show.' },
  { slug: 'mustang-67-shelby-gt500', folder: 'mustang', file: '1967 Shelby Mustang GT500 Fastback (10463404776).jpg',
    alt: 'A red 1967 Shelby GT500 fastback with white centre stripes, photographed from the front three-quarter angle.' },

  /* ---------- corvette ---------- */
  { slug: 'corvette-66-coupe', folder: 'corvette', file: '1966 Chevrolet Corvette Coupe.jpg',
    alt: 'A blue 1966 Chevrolet Corvette Sting Ray coupe with knock-off style wheels, photographed from the front three-quarter angle.' },
  { slug: 'corvette-66-convertible', folder: 'corvette', file: '1966 Chevrolet Corvette Convertible (16336776839).jpg',
    alt: 'A red 1966 Chevrolet Corvette convertible on wire-style wheels, photographed from the front three-quarter angle at an outdoor show.' },
  { slug: 'corvette-53-early', folder: 'corvette', file: '1953 Corvette (6871665589).jpg',
    alt: 'A Polo White 1953 Chevrolet Corvette on display indoors, seen from the rear three-quarter angle showing its rounded tail and chrome exhaust tips.' },

  /* ---------- camaro ---------- */
  { slug: 'camaro-69-rs', folder: 'camaro', file: 'Flickr - DVS1mn - 69 Chevrolet Camaro RS.jpg',
    alt: 'A pale blue 1969 Chevrolet Camaro RS with a white roof, photographed from the rear three-quarter angle on a street.' },
  { slug: 'camaro-z28', folder: 'camaro', file: 'Flickr - DVS1mn - Chevrolet Camaro Z-28.jpg',
    alt: 'A green first-generation Chevrolet Camaro being driven slowly through a car-show parking area.' },
  { slug: 'camaro-68-front', folder: 'camaro', file: '1968 Chevrolet Camaro first Generation front.jpg',
    alt: 'A dark first-generation Chevrolet Camaro with bonnet stripes and a competition number in the windscreen, photographed at a drag strip.' },

  /* ---------- muscle cars ---------- */
  { slug: 'charger-69-green', folder: 'muscle-cars', file: '1969 Dodge Charger green R.jpg',
    alt: 'A green 1969 Dodge Charger seen from the rear three-quarter angle, showing the full-width recessed taillamp panel and flying-buttress roofline.' },
  { slug: 'charger-daytona-69', folder: 'muscle-cars', file: '1969 Dodge Charger Daytona (14881861774).jpg',
    alt: 'An orange 1969 Dodge Charger Daytona seen from the rear three-quarter angle, showing the tall rear wing that defined the aero-car era.' },
  { slug: 'charger-68-rt', folder: 'muscle-cars', file: '68 Dodge Charger R T (13175016164).jpg',
    alt: 'The interior of a 1968 Dodge Charger R/T, showing the four-pod instrument cluster, wood-rimmed steering wheel, console shifter and black bucket seats.' },
  { slug: 'challenger-70-rt', folder: 'muscle-cars', file: '1970 Dodge Challenger R-T (17007180851).jpg',
    alt: 'A close view of the Challenger R/T badge and bodyside stripe on a 1970 Dodge Challenger finished in a bright lime green.' },
  { slug: 'challenger-70-rt-front', folder: 'muscle-cars', file: '1970 Dodge Challenger R-T (17006702592).jpg',
    alt: 'The front corner of a lime green 1970 Dodge Challenger R/T, showing its quad headlamps, bumper and bodyside stripe.' },
  { slug: 'gto-66-hardtop', folder: 'muscle-cars', file: '1966 Pontiac GTO Hardtop.jpg',
    alt: 'A turquoise 1966 Pontiac GTO hardtop seen from the front three-quarter angle, showing its stacked headlamps and split grille.' },
  { slug: 'gto-67-hardtop', folder: 'muscle-cars', file: '1967 Pontiac GTO Hardtop (21203098388).jpg',
    alt: 'A white 1967 Pontiac GTO hardtop photographed from the front three-quarter angle on a show field.' },
  { slug: 'cuda-70-badge', folder: 'muscle-cars', file: "1970 Plymouth 'Cuda (5164789004).jpg",
    alt: "A close view of the 'cuda 440-6 fender badge on the deep orange paintwork of a 1970 Plymouth Barracuda." },
  { slug: 'roadrunner-69-hemi', folder: 'muscle-cars', file: '1969 Plymouth Road Runner Hemi va-f.jpg',
    alt: 'A white 1969 Plymouth Road Runner with a Hemi engine, photographed head-on showing its twin hood scoops and blacked-out grille.' },
  { slug: 'chevelle-70-ss454', folder: 'muscle-cars', file: '1970 Chevrolet Chevelle SS454 Sports Coupe.jpg',
    alt: 'A red 1970 Chevrolet Chevelle SS 454 sports coupe with white bonnet stripes, photographed from the front three-quarter angle on grass.' },

  /* ---------- other classic cars ---------- */
  { slug: 'belair-57-convertible', folder: 'classic-cars', file: '1957 Chevrolet Bel Air Convertible (33342361716).jpg',
    alt: 'A light blue and white 1957 Chevrolet Bel Air convertible with the top down, showing its tailfins, hood ornaments and chrome side spear.' },
  { slug: 'belair-57-sedan', folder: 'classic-cars', file: '1957 Chevrolet Bel Air 2 door Sedan (32987044060).jpg',
    alt: 'A green and white 1957 Chevrolet Bel Air two-door photographed from the front three-quarter angle on grass.' },
  { slug: 'thunderbird-56-blue', folder: 'classic-cars', file: '1956 Ford Thunderbird Blue.jpg',
    alt: 'A turquoise 1956 Ford Thunderbird two-seater with its porthole hardtop fitted, parked at a car show.' },
  { slug: 'thunderbird-56-side', folder: 'classic-cars', file: '1956 Ford Thunderbird (24168937219).jpg',
    alt: 'A pale blue 1956 Ford Thunderbird with a continental spare wheel at the rear, photographed from the front three-quarter angle.' },
  { slug: 'barracuda-69-front', folder: 'classic-cars', file: 'Plymouth barracuda 440 1969 front.jpg',
    alt: 'A yellow 1969 Plymouth Barracuda fastback with 440 hood badging and black bodyside stripe, photographed from the front three-quarter angle.' },
  { slug: 'riviera-65', folder: 'classic-cars', file: '1965 Buick Riviera pic1.JPG',
    alt: 'A white 1965 Buick Riviera photographed from the front three-quarter angle, showing its sharp-edged body lines and hidden headlamp doors.' },
  { slug: 'riviera-65-side', folder: 'classic-cars', file: 'Buick Riviera 1965.jpg',
    alt: 'A pale green 1965 Buick Riviera on wire wheels, photographed in wide side profile on grass, showing its long hood and short deck proportions.' },

  /* ---------- engine ---------- */
  { slug: 'engine-gto-389-tripower', folder: 'engine', file: '1964 Pontiac GTO 389 Tri-Power engine.JPG',
    alt: 'The engine bay of a 1964 Pontiac GTO showing a 389 cubic inch V8 with a Tri-Power three-carburettor setup.' },
  { slug: 'engine-chevelle-454', folder: 'engine', file: '2014 Rolling Sculpture Car Show 47 (1970 Chevrolet Chevelle SS 454 engine).jpg',
    alt: 'The engine compartment of a 1970 Chevrolet Chevelle SS, showing the big-block 454 V8 with its round air cleaner, orange heater hose and factory-style firewall fittings.' },
  { slug: 'engine-amx-290', folder: 'engine', file: '1968 AMC AMX with 290 and 4-speed finished in black at 2025 meet 3of6.jpg',
    alt: 'The engine bay of a 1968 AMC AMX showing a turquoise-painted 290 cubic inch V8 with black air cleaner, ignition wiring and radiator hose.' },
  { slug: 'engine-chevy-210-fi', folder: 'engine', file: '1957 Chevrolet 210 two-door sedan with fuel injection at 2015 Macungie show 3of4.jpg',
    alt: 'The engine bay of a 1957 Chevrolet 210 showing a period Rochester mechanical fuel-injection unit mounted on a red small-block V8.' },

  /* ---------- interior ---------- */
  { slug: 'interior-firebird-67', folder: 'interior', file: '1967 Pontiac Firebird Interior.jpg',
    alt: 'The interior of a 1967 Pontiac Firebird showing black bucket seats, a console shifter, wood-rimmed steering wheel and wood-grain instrument panel.' },
  { slug: 'interior-rambler-770', folder: 'interior', file: '1964 Rambler Classic 770 hardtop interior at Rambler Ranch.jpg',
    alt: 'The red interior of a 1964 Rambler Classic 770 hardtop, showing pleated upholstery, painted metal dashboard and slim-rimmed steering wheel.' },
  { slug: 'interior-corvette-53', folder: 'interior', file: '1953 Corvette Interior (6871668035).jpg',
    alt: 'Looking down into the cockpit of a 1953 Chevrolet Corvette, showing its red interior, wraparound dashboard and central gauge cluster.' },

  /* ---------- paint & finish ---------- */
  { slug: 'paint-cuda-orange', folder: 'paint', file: '1970 Plymouth Cuda (9627321336).jpg',
    alt: "A 1970 Plymouth 'Cuda in a metallic gold finish, photographed in side profile in bright daylight." },
  { slug: 'paint-cadillac-59', folder: 'paint', file: 'Cadillac Eldorado 59 red.jpg',
    alt: 'A red 1959 Cadillac Eldorado convertible on grass, showing its tall tailfins, heavy chrome bumpers and expanses of brightwork.' },
  { slug: 'paint-impala-63', folder: 'paint', file: 'Flickr - DVS1mn - 63 Chevrolet Impala (3).jpg',
    alt: 'A blue 1963 Chevrolet Impala with a deep gloss finish, photographed from the front three-quarter angle.' },

  /* ---------- restoration subjects ---------- */
  { slug: 'restoration-old-car-city', folder: 'restoration', file: 'Old Car City, White GA.jpg',
    alt: 'The roadside entrance to Old Car City in White, Georgia, with its hand-painted sign standing above rows of weathered American cars parked behind a fence.' },
  { slug: 'restoration-hotrod-32', folder: 'restoration', file: '1932 Ford 3 Window Coupe Hot Rod (2).jpg',
    alt: 'A black 1932 Ford three-window coupe hot rod with an exposed chrome-topped engine and open front suspension, parked on grass.' },
  { slug: 'restoration-f100-56', folder: 'restoration', file: '1956 Ford F100 Pickup.jpg',
    alt: 'A restored red 1956 Ford F-100 pickup with whitewall tyres, photographed from the front three-quarter angle at a show.' },
  { slug: 'restoration-torino-68', folder: 'restoration', file: '1968 Ford Torino GT Fastback.jpg',
    alt: 'A turquoise 1968 Ford Torino GT fastback on a show field, photographed from the front three-quarter angle.' },
  { slug: 'restoration-firebird-68', folder: 'restoration', file: '1968 Pontiac Firebird 400, Dutch licence registration DM-57-71 p2.jpg',
    alt: 'A red 1968 Pontiac Firebird 400 photographed from the front three-quarter angle on grass.' },

  /* ---------- garage & storage ---------- */
  { slug: 'garage-service-bay', folder: 'garage', file: 'Service Bay.jpg',
    alt: 'A wide view inside a filling-station service bay, with the roller door open onto the forecourt.' },
  { slug: 'garage-hotrod-roadster', folder: 'garage', file: '1932 Ford Roadster Hot Rod (2).jpg',
    alt: 'A dark 1932 Ford roadster hot rod with an exposed chrome intake and open front wheels, parked on grass at a gathering.' },
  { slug: 'garage-elcamino-70', folder: 'garage', file: '1970 Chevrolet El Camino SS396.jpg',
    alt: 'A white 1970 Chevrolet El Camino SS with black bonnet stripes, parked in a paved lot and photographed from the front three-quarter angle.' },

  /* ---------- history (public domain archival) ---------- */
  { slug: 'history-dc-street', folder: 'history', file: 'Washington DC corner H and 9 streets LOC fsa.8d33564.jpg',
    alt: 'A 1940s black-and-white photograph of a street corner in Washington, D.C., showing a Gulf filling station, period American automobiles and pedestrians.' },
  { slug: 'history-filling-station-1943', folder: 'history', file: 'Charlotte, North Carolina - Gasoline truck making a delivery at a filling station March 1943 crop.jpg',
    alt: 'A gasoline tanker making a delivery to a filling station in Charlotte, North Carolina, photographed in March 1943.' },
  { slug: 'history-riverbank-ca', folder: 'history', file: 'Riverbank, San Joaquin Valley, California. Newly-built store and trading center typical of new shack . . . - NARA - 521694.jpg',
    alt: 'A roadside Norwalk filling station photographed in the 1930s, with hand-painted price boards advertising gasoline at fifteen cents.' },
  { slug: 'history-auto-shop-1914', folder: 'history', file: 'Two men and a child in front of an auto shop, Lake George, c. 1914 - DPLA - 4a82b3f10372c0eaa7d403e14af58665.jpg',
    alt: 'Two men and a child standing outside an early automobile repair shop in Lake George, New York, photographed around 1914.' },
  { slug: 'history-plymouth-1935', folder: 'history', file: '1935 Plymouth sedan, Art Gallery of New South Wales, Sydney, February 1937 - Sam Hood (3565636830).jpg',
    alt: 'A 1935 Plymouth sedan photographed head-on in 1937, showing its upright grille, freestanding headlamps and chrome bumper.' },

  /* ---------- community ---------- */
  { slug: 'community-garage-tour', folder: 'community', file: '1956 Cadillac Coupe de Ville (1).jpg',
    alt: 'A 1956 Cadillac Coupe de Ville photographed during a Classic Car Club of America garage tour.' },
  { slug: 'community-armed-forces-show', folder: 'community', file: 'Car show revs up Armed Forces Day 120519-A-WW110-002.jpg',
    alt: 'Classic cars parked on grass at an Armed Forces Day car show, with spectators walking between them beneath a United States flag.' },
  { slug: 'community-street-show', folder: 'community', file: '2011 Rolling Sculpture Car Show 11.jpg',
    alt: 'A red Dodge compact with its bonnet open, parked with other classic cars along a closed city street during the Rolling Sculpture Car Show in Ann Arbor, Michigan.' },

  /* ---------- blog heroes ---------- */
  { slug: 'blog-first-restoration', folder: 'blog', file: '1968 Ford Torino GT Hardtop.jpg',
    alt: 'A white 1968 Ford Torino GT hardtop on a show field, photographed from the front three-quarter angle.' },
  { slug: 'blog-rust-inspection', folder: 'blog', file: '1956 Ford F-100 (4797946902).jpg',
    alt: 'An unrestored 1956 Ford F-100 pickup with faded red paint, surface rust and a dented front bumper, parked at the kerb.' },
  { slug: 'blog-frame-off', folder: 'blog', file: '1932 Ford 5 Window Coupe Hot Rod (2).jpg',
    alt: 'A purple 1932 Ford five-window coupe hot rod with exposed engine, open front suspension and separate chassis rails visible beneath the body.' },
  { slug: 'blog-budget', folder: 'blog', file: '1971 Ford Torino GT Convertible.jpg',
    alt: 'A white 1971 Ford Torino GT convertible with a black soft top raised and a gold bodyside stripe, parked on grass.' },
  { slug: 'blog-muscle-importance', folder: 'blog', file: '1969 Plymouth Road Runner blue conv va-f.jpg',
    alt: 'A blue 1969 Plymouth Road Runner convertible with its bonnet raised, showing the engine bay at an outdoor gathering.' },
  { slug: 'blog-documentation', folder: 'blog', file: '1963 Chevrolet Impala Super Sport Convertible.JPG',
    alt: 'A red 1963 Chevrolet Impala Super Sport convertible displayed indoors with its bonnet open behind a rope barrier.' },
  { slug: 'blog-parts', folder: 'blog', file: 'Flickr - DVS1mn - 63 Chevrolet Impala (4).jpg',
    alt: 'A turquoise and white 1963 Chevrolet Impala seen from the rear three-quarter angle, showing its triple round taillamps and rear trim.' },
  { slug: 'blog-storage', folder: 'blog', file: '1965 Ford Mustang convertible at Ölands motordag 2012.jpg',
    alt: 'A red 1965 Ford Mustang convertible with the top down, parked on grass at an outdoor motoring event.' },
  { slug: 'blog-mistakes', folder: 'blog', file: '1970 Dodge Charger R T Hardtop (45628045231).jpg',
    alt: 'A green 1970 Dodge Charger R/T with 440 hood badging, photographed from the front three-quarter angle on grass.' },
  { slug: 'blog-paint-systems', folder: 'blog', file: '1966 Chevrolet Corvette Convertible.jpg',
    alt: 'A silver 1966 Chevrolet Corvette convertible on wire wheels, its paintwork reflecting the sky, photographed from the front three-quarter angle.' },
  { slug: 'blog-interior-restoration', folder: 'blog', file: '1964 Rambler Classic 550 all-original 4-door sedan in Woodside Green 01of12.jpg',
    alt: 'An unrestored, all-original 1964 Rambler Classic 550 four-door sedan in pale green, parked on grass.' },
  { slug: 'blog-v8-inspection', folder: 'blog', file: '1957 Chevrolet 210 two-door sedan with fuel injection at 2015 Macungie show 2of4.jpg',
    alt: 'A close view of a red Chevrolet small-block V8 with a Chevrolet script rocker cover and a mechanical fuel-injection unit fitted.' },
  { slug: 'blog-electrical', folder: 'blog', file: '1968 Chevrolet Camaro first Generation rear.jpg',
    alt: 'A black first-generation Chevrolet Camaro photographed from the rear three-quarter angle, showing its taillamps and rear valance.' },
  { slug: 'blog-road-trip', folder: 'blog', file: '1959 Cadillac Eldorado Biarritz convertible in Warsaw.jpg',
    alt: 'A black 1959 Cadillac Eldorado Biarritz convertible with the top down being driven along a city street in modern traffic.' },
  { slug: 'blog-photography', folder: 'blog', file: '1967 Ford Mustang GT Fastback (23158324064).jpg',
    alt: 'A dark green 1967 Ford Mustang GT fastback photographed in even outdoor light from a low front three-quarter angle.' },
]
