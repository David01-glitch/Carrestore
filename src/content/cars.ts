import type { CarProfile } from './types'

/**
 * Vehicle reference profiles.
 *
 * These are editorial overviews written for restorers. They deliberately avoid stating
 * current market values: prices vary by region, condition and date, and a figure written
 * once would mislead readers later. Where value is discussed it is described in relative
 * terms only, with a pointer to live auction data and marque clubs.
 */
export const cars: CarProfile[] = [
  {
    slug: 'ford-mustang',
    metaDescription:
      'Ford Mustang restoration reference: generations, cowl and torque box rust, parts availability and how to verify a car against Ford production records.',
    name: 'Ford Mustang',
    maker: 'Ford',
    years: '1964½–1973 (first generation)',
    dek: 'The car that created the pony car class, and the most comprehensively supported restoration subject in America.',
    image: 'mustang-67-fastback',
    gallery: ['mustang-67-fastback', 'mustang-67-gt-lime', 'mustang-65-convertible', 'mustang-67-shelby-gt500'],
    intro: [
      'The Mustang arrived in April 1964 and reset expectations for what an affordable American car could be. Ford built it on existing Falcon underpinnings, which kept costs down, then wrapped it in a long-hood short-deck body and offered an options list deep enough that buyers could configure anything from a six-cylinder secretary\'s car to a genuinely quick V8 fastback. Demand was extraordinary and the format was widely imitated.',
      'For restorers, the first-generation Mustang occupies an unusual position: it is simultaneously one of the most common classic American cars and one of the most rewarding to work on. The parts supply is the deepest of any classic American vehicle. Sheet metal, trim, interiors, wiring and mechanical components are all available new, and the volume of published reference material means very few questions are genuinely unanswered.',
      'That accessibility shapes the market. Ordinary six-cylinder and small-V8 cars are plentiful, which caps what a restored example will return, while genuine high-performance and Shelby variants sit in an entirely different tier — and are correspondingly worth verifying carefully before purchase.',
    ],
    generations: [
      { label: 'Early cars', years: '1964½–1966', text: 'The original body, lightly revised for 1965 and 1966. Hardtop, convertible and, from late 1964, the fastback. These are the simplest cars of the run and, with the best parts support of any classic, an excellent first restoration.' },
      { label: 'Restyled', years: '1967–1968', text: 'Larger, wider and heavier, with a bigger engine bay that accommodated big-block V8s. The 1967–68 fastback in particular has become one of the most recognisable American shapes of the era. Mechanically similar to the earlier cars but with more variation in trim and options.' },
      { label: 'Longer and lower', years: '1969–1970', text: 'Longer again, with quad headlamps in 1969 returning to twin lamps for 1970. This period brought the widest spread of performance variants of the first generation, along with substantially more model-specific trim.' },
      { label: 'Final first-generation cars', years: '1971–1973', text: 'The largest of the first-generation cars, with a distinctly flatter fastback roofline. Long undervalued relative to earlier models, and correspondingly a reasonable entry point, though model-specific trim is less widely reproduced.' },
    ],
    restoration: [
      { heading: 'Body and structure', text: 'Check the torque boxes, floor pans, front frame rails and shock towers first — these carry the structure on a unibody Mustang. Cowl leaks are a known weak point and drain directly onto the front floors, so a wet carpet is a structural warning rather than a nuisance. Lower rear quarters, the area behind the front wheels, and the trunk floor around the drop-offs are the other habitual problem areas.' },
      { heading: 'Engine bay', text: 'The 1964½–66 cars are tight around a V8; later cars have more room. Confirm what the car actually left the factory with by decoding the VIN and reading casting numbers, particularly on cars represented as high-performance variants. Engine swaps within the family are extremely common and not always disclosed.' },
      { heading: 'Interior', text: 'Reproduction interiors are comprehensive and generally good. Dash pads, instrument bezels and console components vary more in quality between suppliers than seat covers and carpet do. Check the condition of the seat frames and the floor beneath the carpet before ordering anything.' },
      { heading: 'Rust-prone areas to inspect closely', text: 'Cowl and plenum, front floor pans, torque boxes, rear frame rails, lower quarter panels, wheel arch lips, trunk floor and drop-offs, door bottoms, and the shock towers. On convertibles, additionally inspect the reinforced floor structure and rocker areas that compensate for the missing roof.' },
    ],
    partsAvailability:
      'The best of any classic American car without qualification. Complete body shells are manufactured under licence for some years, and effectively every panel, trim item and mechanical component is available new. This depth means restoration cost is dominated by labour rather than parts availability, and it makes the Mustang a sensible choice for a first project.',
    documentation:
      'The VIN carries model year, assembly plant, body style and original engine code. The door data plate adds body, colour, trim, date of manufacture, district and axle and transmission codes. Marti Auto Works holds a licence to Ford production records for certain years and can supply build reports, which have become the standard evidence for verifying a car\'s original specification — particularly important for high-performance and Shelby claims.',
    ownership:
      'Parts, specialist knowledge and club support are all abundant, which makes ownership straightforward. The main risk in the market is misrepresentation: because a base car can be dressed to resemble a valuable variant, documentation matters more here than on almost any other classic. Verify before you buy, not afterwards.',
    commonIssues: [
      'Cowl and plenum corrosion, causing wet front floors and hidden structural rust',
      'Torque box and front frame rail deterioration, especially on convertibles',
      'Shock tower cracking and corrosion around the upper suspension mounts',
      'Rear quarter panel and wheel arch rust that has been filled rather than repaired',
      'Base cars altered to imitate higher-specification variants',
      'Non-original drivetrains presented without disclosure',
    ],
    faq: [
      { q: 'Is a first-generation Mustang a sensible first restoration?', a: 'It is among the most sensible choices available. Parts availability is unmatched, the mechanical layout is conventional, published reference material is extensive, and club and forum support means most problems you meet have been solved and documented by someone else.' },
      { q: 'How do I confirm a Mustang is what the seller claims?', a: 'Decode the VIN and the door data plate, and compare them against the car in front of you. For cars sold as high-performance or Shelby variants, a Marti Report drawn from Ford production records is the standard verification, and its absence on an expensive car is worth asking about.' },
      { q: 'Which years are the least expensive to get into?', a: 'The 1971–73 cars have historically traded below earlier models, and six-cylinder and base V8 hardtops are more plentiful than fastbacks and convertibles. Values change over time and by region, so check current auction results rather than relying on a figure published anywhere, including here.' },
    ],
  },
  {
    slug: 'chevrolet-corvette',
    metaDescription:
      'Chevrolet Corvette restoration reference: C1 to C3 generations, fibreglass body assessment, frame and birdcage corrosion, and originality documentation.',
    name: 'Chevrolet Corvette',
    maker: 'Chevrolet',
    years: '1953–1982 (C1 to C3)',
    dek: 'America\'s longest-running sports car, and a restoration subject with its own distinct discipline because of the fibreglass body.',
    image: 'corvette-66-coupe',
    gallery: ['corvette-66-coupe', 'corvette-66-convertible', 'corvette-53-early', 'interior-corvette-53'],
    intro: [
      'The Corvette went on sale in 1953 as a fibreglass-bodied roadster with a six-cylinder engine and an automatic transmission, and very nearly failed. The introduction of a V8 for 1955, and a comprehensive redesign for 1956, established the car as a genuine sports car rather than a styling exercise, and it has remained in production ever since.',
      'For restorers the Corvette is a specialist subject, because the body is not steel. Fibreglass does not rust, which removes the single largest variable in most American restorations, but it introduces its own: stress cracking, delamination, previous repairs of wildly varying quality, and a bonded structure that must be assessed differently from a welded one.',
      'What does rust on a Corvette is the steel structure underneath — the birdcage, the frame, and the various brackets and reinforcements. That is where inspection effort belongs.',
    ],
    generations: [
      { label: 'C1', years: '1953–1962', text: 'The original solid-axle cars. Early 1953–55 examples are historically significant and rare. From 1956 the styling matured considerably, and 1961–62 brought the ducktail rear that previewed the next generation.' },
      { label: 'C2 Sting Ray', years: '1963–1967', text: 'Independent rear suspension, a new chassis, and one of the most admired shapes ever produced in America. The 1963 coupe\'s split rear window ran for a single year. These are the most sought-after Corvettes of the classic era and command corresponding attention to authenticity.' },
      { label: 'C3', years: '1968–1982', text: 'The long-running Coke-bottle generation. Earlier chrome-bumper cars are generally the most desirable within the run; later cars are the most affordable route into Corvette ownership and are increasingly appreciated on their own terms.' },
    ],
    restoration: [
      { heading: 'The body is fibreglass — inspect it accordingly', text: 'Look for stress cracks radiating from mounting points, around door edges and at body seams. Check for previous repairs by looking at the underside and inside the wheel wells where finish work is usually less careful. Bonding strips, which join body panels internally, can separate and are a genuine structural finding rather than a cosmetic one.' },
      { heading: 'The frame does rust', text: 'On C2 and C3 cars, the rear frame kick-ups over the axle are a well-known corrosion point, as are the areas around the body mounts. Frame repair sections are available, but the work requires the body to be lifted, which changes the scale of a project considerably.' },
      { heading: 'The birdcage', text: 'The steel structure surrounding the passenger compartment — the windshield frame, A-pillars and door hinge areas — is a critical inspection point on C2 and C3 cars. Corrosion here is expensive to repair because access requires removing the body. Check carefully around the windshield frame and at the door hinge mounting points.' },
      { heading: 'Drivetrain and originality', text: 'Corvettes are documented and judged with unusual rigour. Casting numbers, date codes and stamping pads matter, and the difference in value between a numbers-matching car and an equivalent car with a replacement engine is significant. Verify before purchase.' },
    ],
    partsAvailability:
      'Excellent for mechanical components, interiors and trim across all three early generations, supported by a large and knowledgeable specialist industry. Body panels are available, though fitting fibreglass correctly is a different skill from fitting steel. Some early C1 trim items remain genuinely scarce.',
    documentation:
      'The National Corvette Restorers Society maintains detailed judging standards and reference material for originality, and its published specifications are the working reference for many restorers. Trim tags, casting numbers and date codes together establish what a car originally was. A tank sticker, where one survives, records the original build specification and is prized evidence.',
    ownership:
      'Corvette ownership is well supported by clubs, specialists and reference literature. The area demanding most care is authenticity: because originality drives value so strongly in this market, verification of the drivetrain and documentation deserves real effort before purchase.',
    commonIssues: [
      'Frame corrosion at the rear kick-ups and around body mounts on C2 and C3 cars',
      'Birdcage rust in the windshield frame and door hinge areas',
      'Fibreglass stress cracking around mounting points and body seams',
      'Separated or previously repaired bonding strips between panels',
      'Poor-quality earlier fibreglass repairs hidden under paint',
      'Replacement drivetrains presented as original',
    ],
    faq: [
      { q: 'Do Corvettes rust?', a: 'The body panels do not, because they are fibreglass. The steel frame, the birdcage structure around the passenger compartment, and various brackets and reinforcements certainly do — and those are the expensive areas to repair because access usually means separating the body from the frame.' },
      { q: 'Is fibreglass repair harder than steel repair?', a: 'It is different rather than harder, but it is a distinct skill and most general body shops are better with steel. Correct repair involves proper preparation, matched materials and attention to structural bonding — not simply filling and painting over a crack.' },
      { q: 'What makes a C2 more valuable than a C3?', a: 'Production volumes, the standing of the Sting Ray design, and demand. Within any generation, engine specification, transmission, documentation and originality all matter substantially. Consult current auction results and the marque clubs rather than any fixed figure.' },
    ],
  },
  {
    slug: 'chevrolet-camaro',
    metaDescription:
      'Chevrolet Camaro restoration reference: first and second generation differences, subframe and rocker corrosion, and how to verify option packages.',
    name: 'Chevrolet Camaro',
    maker: 'Chevrolet',
    years: '1967–1981 (first and second generation)',
    dek: 'General Motors\' answer to the Mustang, and a car whose first generation has become one of the most valuable of the pony car era.',
    image: 'camaro-69-rs',
    gallery: ['camaro-69-rs', 'camaro-z28', 'camaro-68-front'],
    intro: [
      'Chevrolet arrived late to the pony car market and responded thoroughly. The Camaro launched for 1967 on a new platform shared with the Firebird, using a front subframe bolted to a unibody rear structure, and offered an options list that ranged from a mild six through to serious high-performance V8 configurations.',
      'The first generation ran only three years, and that brevity has shaped its standing. The 1969 cars in particular, with their distinctive body creases, are among the most recognisable American cars of the period and are restored in very large numbers.',
      'The second generation, introduced for 1970, ran through 1981 and is a longer and more varied story. Early second-generation cars have their own strong following; later ones remain among the more accessible ways into classic Chevrolet ownership.',
    ],
    generations: [
      { label: 'First generation', years: '1967–1969', text: 'Three model years, each visually distinct. The 1967 and 1968 cars share a body with detail differences; the 1969 restyle is the most widely recognised. Extensive option packages mean two apparently identical cars can differ substantially underneath.' },
      { label: 'Second generation, early', years: '1970–1973', text: 'A longer, lower European-influenced body. The chrome-bumper cars of this period are increasingly appreciated and have strong parts support.' },
      { label: 'Second generation, later', years: '1974–1981', text: 'Revised bumpers to meet new regulations and, through the decade, reduced engine output. Substantially more affordable, and a reasonable entry to the marque for anyone prioritising driving over investment.' },
    ],
    restoration: [
      { heading: 'Subframe and mounting points', text: 'The bolted front subframe is a defining feature. Inspect the subframe itself, the body mounting points where it attaches, and the bushings between them. Corrosion or damage here affects both structure and geometry, and it is a common finding on cars that have lived in salted regions.' },
      { heading: 'Floors, rockers and trunk', text: 'Front footwell floors, rocker panels and their inner structure, and the trunk floor with its drop-offs are the usual corrosion sites. As with most unibody cars, floor rust is structural rather than cosmetic.' },
      { heading: 'Verifying option packages', text: 'Camaros were built with a large number of appearance and performance packages, and cars are routinely modified to resemble higher-specification variants. The cowl tag and VIN, read together and interpreted with a good reference, establish what a car actually was. Take particular care with cars presented as rare performance models.' },
      { heading: 'Reproduction support', text: 'Parts availability for first-generation cars is very strong, second only to the Mustang. Complete body shells are manufactured for some years. Quality between suppliers varies, especially in sheet metal stamping accuracy, so ask the model-specific communities before ordering.' },
    ],
    partsAvailability:
      'Very strong for the first generation and good for the second. Sheet metal, interior kits, trim and mechanical components are all readily available new. Certain 1967-only components and some rare option-specific trim remain harder to find and correspondingly expensive.',
    documentation:
      'The VIN and the cowl tag together give model year, assembly plant, body style, paint and trim, and build date. Interpretation requires a good marque reference, and it is worth noting that GM cowl tags do not encode engine or option packages in the way some buyers assume — which is exactly why misrepresentation is possible. Original documentation such as a build sheet, window sticker or protect-o-plate substantially strengthens a car\'s provenance.',
    ownership:
      'A well-supported car with an active community and deep reference material. The single most important discipline in this market is verification: because the visual differences between an ordinary car and a valuable one are largely cosmetic, paperwork and careful tag interpretation matter a great deal.',
    commonIssues: [
      'Front subframe corrosion and deteriorated body mount bushings',
      'Rocker panel and inner rocker structural rust',
      'Trunk floor and drop-off corrosion from failed seals',
      'Rear frame rail rust where it meets the floor structure',
      'Base cars converted cosmetically to imitate performance variants',
      'Variable stamping quality in reproduction sheet metal',
    ],
    faq: [
      { q: 'Which first-generation year is best to restore?', a: 'All three are well supported. The 1969 cars are the most recognisable and generally the most sought after; 1967 cars have some year-specific parts that are harder to source. If you are choosing on ease of restoration rather than style, 1968 sits comfortably in the middle.' },
      { q: 'How do I tell a genuine performance model from a tribute?', a: 'Read the VIN and cowl tag with a reliable marque reference, and understand what those tags do and do not encode. Supporting documentation — a build sheet, dealer paperwork or a protect-o-plate — is what turns a claim into evidence. A car sold as a rare variant without documentation warrants caution.' },
      { q: 'Are second-generation cars worth restoring?', a: 'For driving and enjoyment, yes — they are considerably more affordable to buy and are well supported by parts suppliers. Whether a full restoration returns its cost depends on the specific car and the market at the time, which is a question for current auction data rather than a fixed answer.' },
    ],
  },
  {
    slug: 'dodge-charger',
    metaDescription:
      'Dodge Charger restoration reference: 1966 to 1974 generations, frame rail and rear window corrosion, parts supply and broadcast sheet documentation.',
    name: 'Dodge Charger',
    maker: 'Dodge',
    years: '1966–1974',
    dek: 'A full-size fastback that became, in its 1968 form, one of the defining shapes of American performance.',
    image: 'charger-69-green',
    gallery: ['charger-69-green', 'charger-68-rt', 'charger-daytona-69'],
    intro: [
      'The Charger began in 1966 as a fastback derivative of the Coronet, with a full-width grille and a distinctive four-bucket interior. It sold moderately. The 1968 redesign changed everything: a coke-bottle body with recessed grille, flying-buttress rear pillars and a tunnelled back window produced a shape that has been imitated and celebrated ever since.',
      'The Charger also carries an unusual chapter of racing history. To make the body competitive in NASCAR superspeedway racing, Dodge produced the Charger 500 and then the Charger Daytona, the latter with an extended nose cone and a very tall rear wing. These aerodynamic specials were built in small numbers to satisfy homologation requirements and are now among the most collectable American cars of the era.',
      'For restorers, the Charger is a rewarding but demanding subject: parts support is good but not at Mustang levels, and the market rewards documentation heavily.',
    ],
    generations: [
      { label: 'First generation', years: '1966–1967', text: 'The original fastback with hidden headlamps and a full-length interior console. Distinctive and comparatively rare, with some model-specific interior components that are difficult to source.' },
      { label: 'Second generation', years: '1968–1970', text: 'The definitive Charger. 1968 and 1969 differ in grille and taillamp treatment; 1970 added a full-width front bumper loop. This generation includes the Charger 500 and Daytona aero specials.' },
      { label: 'Third generation', years: '1971–1974', text: 'A larger, more rounded body with a very different character. Long overlooked and correspondingly accessible, with a growing following of its own.' },
    ],
    restoration: [
      { heading: 'Unibody structure', text: 'Chrysler B-body cars carry their load in the floor pans, frame rails and torque boxes. Inspect the front frame rails where they run under the footwells, the torque boxes at both ends, and the rear rails over the axle. Corrosion in these areas is structural and expensive.' },
      { heading: 'The usual rust sites', text: 'Lower rear quarters and wheel arches, floor pans, trunk floor and the rear window channel. The tunnelled rear window on 1968–70 cars collects debris and water in a way that leads to corrosion in the surrounding structure, so inspect that area specifically rather than assuming.' },
      { heading: 'Trim and interior', text: 'Some Charger-specific trim, particularly on first-generation cars and on the aero specials, is difficult to find and correspondingly expensive. Establish availability for the exact year before committing to a project that is missing significant trim.' },
      { heading: 'Verifying performance variants', text: 'Chrysler VINs of this era encode the original engine, which is genuinely useful. Broadcast sheets — the build documents that were often left inside seats, under carpet or above the headliner — are the strongest supporting evidence and are worth searching for during disassembly.' },
    ],
    partsAvailability:
      'Good and improving for second-generation cars, with sheet metal, interior kits and mechanical parts widely reproduced. First-generation and third-generation specific trim is harder to source. Genuine parts for the Charger 500 and Daytona are in a different category entirely, given how few cars were built.',
    documentation:
      'The VIN encodes body, engine and model year, which makes initial verification more straightforward than on some contemporaries. The fender tag adds paint, trim, options and build date. Broadcast sheets, when found, provide detailed build specification. For high-value variants, provenance research through recognised marque registries is the accepted standard.',
    ownership:
      'An enthusiastically supported car with strong club activity. The chief consideration for buyers is that the value gap between an ordinary Charger and a documented high-performance variant is very wide, which creates a real incentive for misrepresentation. Verification is not optional in this market.',
    commonIssues: [
      'Front and rear frame rail corrosion under the floor structure',
      'Torque box deterioration at both ends of the body',
      'Rust in and around the tunnelled rear window channel on 1968–70 cars',
      'Lower quarter panel and wheel arch corrosion',
      'Scarcity of model-specific trim on first-generation cars',
      'Cars re-badged or restyled to imitate valuable variants',
    ],
    faq: [
      { q: 'What makes the 1968–70 Charger so sought after?', a: 'A combination of the design itself, its prominence in film and television, and its motorsport history. Within that generation, engine specification, documentation and originality drive the differences in value.' },
      { q: 'What is a broadcast sheet and why does it matter?', a: 'It is the build document that travelled with the car down the assembly line, specifying its exact configuration. Copies were frequently left inside the vehicle — under carpet, inside seat springs, above the headliner. Finding one provides direct factory evidence of a car\'s original specification, which is why disassembly should be done carefully rather than quickly.' },
      { q: 'Is a third-generation Charger a reasonable project?', a: 'For an owner who wants a large, comfortable American car of the period and is not focused on resale, yes. They are more affordable to buy, and parts support for mechanical components is reasonable, though some body-specific trim is harder to find than for the earlier cars.' },
    ],
  },
  {
    slug: 'pontiac-gto',
    metaDescription:
      'Pontiac GTO restoration reference: from option package to model, shared GM A-body parts, Endura bumper issues and verifying a genuine car.',
    name: 'Pontiac GTO',
    maker: 'Pontiac',
    years: '1964–1974',
    dek: 'Widely credited with starting the muscle car era by putting a large engine in an intermediate body.',
    image: 'gto-66-hardtop',
    gallery: ['gto-66-hardtop', 'gto-67-hardtop', 'engine-gto-389-tripower'],
    intro: [
      'The GTO began in 1964 as an option package on the Pontiac Tempest, fitting a 389 cubic inch V8 into an intermediate body at a time when General Motors policy discouraged exactly that. It sold far beyond expectations, became a model in its own right for 1966, and is generally regarded as the car that established the muscle car formula the rest of the industry then followed.',
      'The GTO\'s significance is as much commercial as mechanical. It demonstrated that a large, affordable performance car aimed at younger buyers was a viable product, and every American manufacturer responded within a few years.',
      'For restorers, the GTO shares its underlying structure with other GM A-body intermediates, which helps enormously with mechanical and structural parts, while GTO-specific trim and identification require more care.',
    ],
    generations: [
      { label: 'The original option package', years: '1964–1965', text: 'A Tempest with the GTO package. Stacked headlamps arrived for 1965. These early cars have particular historical standing as the origin of the class.' },
      { label: 'A model in its own right', years: '1966–1967', text: 'The GTO became a separate model with a curvier body. The 1966 cars are widely admired; 1967 brought a revised grille and, notably, the 400 cubic inch engine replacing the 389.' },
      { label: 'Endura era', years: '1968–1970', text: 'A restyled body with the body-coloured Endura front bumper, a genuine innovation at the time. The Judge appearance and performance package appeared in 1969.' },
      { label: 'Final years', years: '1971–1974', text: 'Declining output through the period, and for 1974 the GTO returned to option-package status on a compact body. Historically the least expensive route into GTO ownership.' },
    ],
    restoration: [
      { heading: 'Shared A-body structure', text: 'The GTO shares its platform with other GM intermediates of the period, which means structural sheet metal, floor pans and many mechanical parts are widely reproduced and reasonably priced. This is a significant practical advantage over lower-volume cars.' },
      { heading: 'GTO-specific components', text: 'Grilles, badging, specific interior trim, hood assemblies and the Endura bumper on 1968–70 cars are model-specific and harder to source. Endura bumpers in particular deteriorate and are expensive to replace or restore properly.' },
      { heading: 'Corrosion sites', text: 'Front and rear floor pans, trunk floor, lower quarters, wheel arches and the rear window channel are the usual areas. As with all GM A-bodies of the era, check the frame where it passes under the rear axle and at the body mounts.' },
      { heading: 'Verifying a genuine GTO', text: 'Because the GTO began as an option package on a common body, cars built from Tempest or LeMans donors do exist. Pontiac identification uses the VIN together with the cowl tag, and interpretation requires a proper reference. Original documentation such as a build sheet or dealer invoice materially strengthens a claim.' },
    ],
    partsAvailability:
      'Good, helped considerably by the shared GM A-body platform for structural and mechanical parts. GTO-specific trim, grilles and Endura bumper components are the constraint, and prices for them reflect that. Engine internals and driveline parts are widely available.',
    documentation:
      'The VIN and cowl tag together establish model, year, plant, body style, paint and trim. Pontiac Historic Services has provided documentation drawn from surviving factory records for many cars, and the Pontiac Owners Association and marque registries maintain further reference material. Build sheets found during disassembly are valuable supporting evidence.',
    ownership:
      'A well-supported and historically significant car with an engaged community. Buyers should treat verification seriously, since the option-package origin makes convincing replicas straightforward to build and the value gap is substantial.',
    commonIssues: [
      'Floor pan and trunk floor corrosion typical of GM A-bodies',
      'Frame rust at the rear kick-up and around body mounts',
      'Endura bumper deterioration on 1968–70 cars, expensive to rectify',
      'Scarcity and cost of GTO-specific grilles and trim',
      'Tempest and LeMans cars presented as genuine GTOs',
      'Non-original engines in cars sold on their drivetrain specification',
    ],
    faq: [
      { q: 'Was the GTO really the first muscle car?', a: 'It is the car most commonly credited with starting the class, and the credit is reasonable: it established the formula of a large engine in an intermediate body marketed to younger buyers, and its commercial success prompted the industry to follow. Earlier cars combined large engines with lighter bodies, so the claim is about the category and the marketing rather than about being first in every technical sense.' },
      { q: 'How can I verify a GTO is genuine?', a: 'Read the VIN and cowl tag with a good Pontiac reference. Because the GTO started as an option package, documentation matters: build sheets, dealer paperwork or factory records obtained through recognised services turn a claim into evidence.' },
      { q: 'What is the hardest part of a GTO restoration?', a: 'Usually sourcing correct model-specific trim, and on 1968–70 cars, dealing with the Endura front bumper. Structural and mechanical work benefits from the shared GM platform and is comparatively straightforward.' },
    ],
  },
  {
    slug: 'chevrolet-bel-air',
    metaDescription:
      'Chevrolet Bel Air restoration reference: the 1955 to 1957 Tri-Five cars, body-on-frame advantages, cowl corrosion and the real cost of brightwork.',
    name: 'Chevrolet Bel Air',
    maker: 'Chevrolet',
    years: '1950–1975 (1955–57 "Tri-Five" most collected)',
    dek: 'The 1955–57 cars are among the most recognisable American automobiles ever built, and the best supported pre-1960 restoration subject.',
    image: 'belair-57-convertible',
    gallery: ['belair-57-convertible', 'belair-57-sedan', 'hero-belair-station', 'engine-chevy-210-fi'],
    intro: [
      'The Bel Air name ran for a quarter of a century, but for collectors it means the 1955, 1956 and 1957 cars — the "Tri-Five" Chevrolets. These three model years brought Chevrolet a modern V8, a thoroughly contemporary body, and styling that became shorthand for 1950s America.',
      'The 1955 car introduced the small-block V8 that would go on to be produced in enormous numbers for decades. The 1957, with its tailfins and gold anodised trim, is the most instantly recognisable of the three and generally the most sought after.',
      'For restorers, the Tri-Five occupies a similar position among 1950s cars to the Mustang among 1960s ones: parts support is exceptional, the community is large, and almost nothing is genuinely unknown.',
    ],
    generations: [
      { label: '1955', years: '1955', text: 'A new body and the introduction of the small-block V8. Cleaner and less ornamented than the two years that followed, with its own strong following.' },
      { label: '1956', years: '1956', text: 'A full-width grille and revised trim. Often the most accessible of the three to buy while sharing most of the mechanical advantages.' },
      { label: '1957', years: '1957', text: 'Tailfins, anodised trim and the most recognisable styling of the three. Also the year fuel injection became available on Chevrolet passenger cars, an option that is rare and heavily documented.' },
      { label: 'Later Bel Airs', years: '1958–1975', text: 'The name continued on progressively larger cars, eventually moving down the range as a base model. Much more affordable, well supported mechanically, and a legitimate route into 1960s full-size Chevrolet ownership.' },
    ],
    restoration: [
      { heading: 'Body-on-frame construction', text: 'Unlike the unibody cars of the following decade, Tri-Five Chevrolets have a separate frame. That is a genuine advantage: a rotten body on a sound frame is a bounded problem, and the frame itself can be restored independently. Inspect the frame along its full length, particularly at the rear kick-up and around body mounts.' },
      { heading: 'Corrosion sites', text: 'Floor pans, trunk floor, lower rear quarters, rocker panels, and the areas beneath the rear window and around the windshield. Cowl corrosion is a known issue on these cars and drains onto the front floors, so wet carpet is a warning to investigate rather than dry out.' },
      { heading: 'Trim is the character', text: 'The brightwork defines these cars visually, and there is a great deal of it. Anodised aluminium trim must be polished and re-anodised, not plated. Stainless is polished. Budget for brightwork realistically and early, because it is easy to underestimate and expensive to correct late.' },
      { heading: 'Reproduction support', text: 'Complete reproduction bodies are manufactured for these cars, and effectively every panel, trim item, interior component and mechanical part is available new. This makes the Tri-Five one of the few 1950s cars that can be restored largely from catalogue parts.' },
    ],
    partsAvailability:
      'Exceptional for a car of this age, and comparable to the best-supported 1960s models. Complete bodies, all sheet metal, full interior kits, trim, glass and mechanical components are reproduced. The one area requiring care is correct anodised trim and genuinely rare option-specific parts such as fuel injection components.',
    documentation:
      'The VIN identifies model, year, plant and body. The cowl tag records body style, paint, trim and build date. Documentation from this era is less comprehensive than for later cars, and surviving original paperwork — dealer invoices, owner\'s manuals, protect-o-plates — carries proportionally more weight because of that scarcity.',
    ownership:
      'Straightforward, well supported and highly social — Tri-Five ownership comes with one of the most active enthusiast communities in the hobby. Mechanically the cars are simple, and the small-block V8 is among the best understood engines ever made.',
    commonIssues: [
      'Cowl corrosion leading to wet and rotted front floor pans',
      'Rocker panel and lower quarter rust',
      'Frame corrosion at the rear kick-up and body mount points',
      'Trunk floor rust from failed seals',
      'Cost and complexity of correct anodised trim restoration',
      'Six-cylinder cars converted to V8 without disclosure',
    ],
    faq: [
      { q: 'Why are 1955–57 Chevrolets called Tri-Five?', a: 'It is enthusiast shorthand for the three consecutive model years — 1955, 1956 and 1957 — that share the same basic platform and are collected together as a group.' },
      { q: 'Are they easier to restore than 1960s cars?', a: 'In some respects yes. Body-on-frame construction means body and chassis can be addressed separately, the mechanical systems are simpler, and parts support is exceptional. The offsetting factor is the sheer quantity of brightwork, which is time-consuming and expensive to restore correctly.' },
      { q: 'Is a Bel Air a good first project?', a: 'It is one of the better choices among 1950s cars, precisely because of the parts support and the size of the community. Expect the trim to take longer and cost more than you first estimate.' },
    ],
  },
  {
    slug: 'ford-thunderbird',
    metaDescription:
      'Ford Thunderbird restoration reference: two-seat and four-seat generations, frame and floor corrosion, and budgeting for the power accessories.',
    name: 'Ford Thunderbird',
    maker: 'Ford',
    years: '1955–1966 (early generations)',
    dek: 'Ford\'s personal luxury car, which chose comfort over outright sport and created a category of its own.',
    image: 'thunderbird-56-blue',
    gallery: ['thunderbird-56-blue', 'thunderbird-56-side'],
    intro: [
      'The Thunderbird arrived for 1955 as a two-seat convertible with a V8, launched in response to the Corvette but positioned quite differently. Ford described it as a personal car rather than a sports car, and equipped it accordingly: wind-up windows, a comfortable cabin, and an emphasis on refinement rather than lap times.',
      'That positioning worked. The two-seat cars of 1955–57 outsold the contemporary Corvette substantially. When Ford replaced them for 1958 with a larger four-seat car, sales grew again — and the personal luxury segment the Thunderbird had defined became one of the most profitable in the American industry.',
      'For restorers, the two-seat "Little Birds" and the four-seat "Square Birds" and "Bullet Birds" are quite different propositions in cost, complexity and parts support.',
    ],
    generations: [
      { label: 'Two-seat, "Little Bird"', years: '1955–1957', text: 'The original two-seat cars. 1955 and 1956 are closely related, with the 1956 gaining the continental spare and porthole hardtop option; 1957 brought a longer rear deck. The most collected of the Thunderbirds.' },
      { label: 'Four-seat, "Square Bird"', years: '1958–1960', text: 'A larger unibody four-seat car with squared styling. Commercially far more successful than the two-seaters and considerably more affordable to buy today.' },
      { label: '"Bullet Bird"', years: '1961–1963', text: 'A rounded, aircraft-influenced design with a distinctive interior. Increasingly appreciated, and well priced relative to the earlier cars.' },
      { label: '"Flair Bird"', years: '1964–1966', text: 'Crisper styling and, in 1965, sequential rear indicators — a period technical flourish. Comfortable, well equipped and among the more affordable classic Fords.' },
    ],
    restoration: [
      { heading: 'Two-seat cars', text: 'Body-on-frame construction. Inspect the frame thoroughly, along with floor pans, rocker panels and the trunk floor. Because these cars are highly collected, parts support is genuinely good, and reproduction sheet metal and trim are available. The removable hardtop, where fitted, is a valuable item — check its condition and completeness carefully.' },
      { heading: 'Four-seat cars', text: 'The 1958 and later cars are unibody, which changes the inspection priorities: floor pans, rockers and structural rails become critical rather than merely cosmetic. These cars are also heavier and more complex, with more powered accessories to restore.' },
      { heading: 'Power accessories', text: 'Thunderbirds were well equipped, and that equipment is part of the restoration. Power windows, power seats, convertible top mechanisms and, on later cars, retractable hardtop systems all need to work. These are frequently the most time-consuming and expensive items on an otherwise straightforward car.' },
      { heading: 'Trim and brightwork', text: 'Substantial on all generations, and a significant budget item. Sort by material before quoting: plated steel, die-cast, anodised aluminium and stainless all require different treatment.' },
    ],
    partsAvailability:
      'Very good for the 1955–57 two-seat cars, which are supported by dedicated specialists. Good for 1958–66 mechanical and structural components. Model-specific trim on the four-seat cars, and components for power accessories, are the areas most likely to require patience.',
    documentation:
      'VIN and data plate identify model, plant, body, colour and trim. Thunderbird clubs and registries maintain reference material for correct specifications by year, which is particularly useful given how much year-to-year detail variation there is across these generations.',
    ownership:
      'Comfortable, usable classics with strong club support. The two-seat cars carry a premium; the four-seat generations offer a great deal of car for comparatively modest outlay, with the caveat that their power accessories need to be budgeted for properly.',
    commonIssues: [
      'Frame corrosion on two-seat cars, particularly at body mounts',
      'Floor pan and rocker rust across all generations',
      'Failed or incomplete power window and power seat mechanisms',
      'Convertible top and, on 1957–59 retractable hardtop cars, complex mechanism faults',
      'Missing or damaged removable hardtops on two-seat cars',
      'Extensive brightwork requiring costly restoration',
    ],
    faq: [
      { q: 'Was the Thunderbird a competitor to the Corvette?', a: 'It was launched in response to it, but positioned differently. Ford marketed the Thunderbird as a personal luxury car emphasising comfort and refinement rather than sporting performance, and it outsold the contemporary Corvette by a wide margin.' },
      { q: 'Which generation is most affordable to restore?', a: 'Generally the four-seat cars from 1958 onward, which are less expensive to buy and well supported mechanically. Factor in the power accessories, which add both cost and complexity relative to a simpler car.' },
      { q: 'Are the power accessories worth restoring properly?', a: 'Yes. They are central to what these cars were sold as, and a Thunderbird with non-functioning windows and seats presents poorly regardless of how good the paint is. Budget for them from the start rather than treating them as an afterthought.' },
    ],
  },
  {
    slug: 'plymouth-barracuda',
    metaDescription:
      'Plymouth Barracuda restoration reference: three generations, E-body structure shared with the Challenger, and verifying high-specification cars.',
    name: 'Plymouth Barracuda',
    maker: 'Plymouth',
    years: '1964–1974',
    dek: 'Launched weeks before the Mustang, overshadowed for years, and transformed by the 1970 E-body redesign.',
    image: 'barracuda-69-front',
    gallery: ['barracuda-69-front', 'cuda-70-badge', 'paint-cuda-orange'],
    intro: [
      'The Barracuda reached showrooms in April 1964, a fortnight before the Mustang. It was based on the compact Valiant and distinguished chiefly by a very large wraparound rear window — striking, but not enough to compete with what Ford launched immediately afterwards.',
      'The car improved considerably through its second generation and was then completely reconceived for 1970 on Chrysler\'s new E-body platform, shared with the Dodge Challenger. That third-generation car, particularly in \'Cuda specification, is the one collectors pursue: wide, aggressive, and available with the full range of Chrysler performance engines.',
      'Production ended in 1974. The short run of the E-body cars, combined with strong demand, has made well-documented examples among the most valuable American cars of the period.',
    ],
    generations: [
      { label: 'First generation', years: '1964–1966', text: 'Valiant-based with the distinctive wraparound rear window. Affordable, comparatively simple, and increasingly appreciated as an early pony car in its own right.' },
      { label: 'Second generation', years: '1967–1969', text: 'A more distinct body offered as fastback, notchback and convertible, with genuinely capable performance options by the end of the run. Better resolved than the first generation and still reasonably accessible.' },
      { label: 'Third generation, E-body', years: '1970–1974', text: 'A new platform shared with the Challenger. Wider and lower, with the full Chrysler engine range available. The 1970 and 1971 cars are the most sought after, and high-specification variants are among the most valuable American cars of the era.' },
    ],
    restoration: [
      { heading: 'E-body structure', text: 'Unibody with front frame rails and torque boxes. Inspect the rails under the footwells, the torque boxes at both ends, floor pans, and the rear rails over the axle. Corrosion here is structural. Lower quarter panels and wheel arches are the usual visible rust sites.' },
      { heading: 'Shared platform advantages', text: 'The E-body Barracuda and the Dodge Challenger share a great deal of structure, which means structural sheet metal and many mechanical parts serve both cars and are correspondingly better supported than either would be alone.' },
      { heading: 'Model-specific trim', text: 'Barracuda-specific grilles, badging, interior trim and the distinctive hood treatments are model-specific and can be expensive. First and second generation trim is harder to source than E-body trim.' },
      { heading: 'Verification matters here more than most', text: 'The value gap between an ordinary Barracuda and a documented high-specification \'Cuda is very large, which creates strong incentives for misrepresentation. Chrysler VINs encode the original engine, which helps. Fender tags and broadcast sheets provide further evidence, and for the most valuable variants, provenance research through recognised registries is the accepted standard.' },
    ],
    partsAvailability:
      'Good for E-body cars, supported by the shared platform with the Challenger and by strong enthusiast demand. First and second generation parts are more limited, particularly model-specific trim and interior components. Correct high-performance drivetrain parts are available but expensive.',
    documentation:
      'Chrysler VINs of this period encode car line, body, engine and model year, making preliminary verification more direct than on some contemporaries. The fender tag records paint, trim, options and build date. Broadcast sheets found in the car during disassembly are the strongest supporting evidence and are worth actively searching for.',
    ownership:
      'A rewarding and well-regarded car with an engaged community. Buyers of E-body cars should expect to do genuine verification work, and should be sceptical of expensive high-specification claims that are not supported by documentation.',
    commonIssues: [
      'Front frame rail and torque box corrosion',
      'Floor pan and trunk floor rust',
      'Lower quarter panel and wheel arch corrosion',
      'Scarce and costly trim on first and second generation cars',
      'Base cars converted to imitate high-specification variants',
      'Non-original drivetrains in cars sold on engine specification',
    ],
    faq: [
      { q: 'Did the Barracuda really come before the Mustang?', a: 'Yes — it went on sale in April 1964, about two weeks before the Mustang. It did not have anything like the same commercial impact, and the Mustang defined the class in the public mind.' },
      { q: 'What is the difference between a Barracuda and a \'Cuda?', a: 'On the 1970–74 E-body cars, \'Cuda designated the performance-oriented variant with the higher-output engine options and associated equipment, sitting above the standard Barracuda. The distinction matters considerably for value, which is why documentation is important.' },
      { q: 'Are earlier Barracudas worth restoring?', a: 'They are far more affordable to buy and are genuinely interesting cars with a legitimate claim to being among the first of the class. Parts support is thinner, particularly for trim, so establish availability for the specific year before committing.' },
    ],
  },
  {
    slug: 'dodge-challenger',
    metaDescription:
      'Dodge Challenger restoration reference: the five-year E-body run, frame and quarter panel corrosion, and why documentation decides value here.',
    name: 'Dodge Challenger',
    maker: 'Dodge',
    years: '1970–1974',
    dek: 'Chrysler\'s late and short-lived entry into the pony car class, and now one of its most collected.',
    image: 'challenger-70-rt',
    gallery: ['challenger-70-rt', 'challenger-70-rt-front', 'hero-challenger-rt'],
    intro: [
      'The Challenger arrived for 1970, six years after the Mustang and three after the Camaro. It shared the new E-body platform with the redesigned Barracuda but rode a slightly longer wheelbase and was pitched marginally upmarket, with a broader range of trim and comfort options.',
      'Its timing was poor. Within two years, rising insurance costs for high-performance cars, tightening emissions regulation and changing buyer priorities had undermined the entire class. Production ended in 1974 after a run of only five model years, with the highest-performance variants built in very small numbers.',
      'That scarcity, combined with the design\'s standing, has made the Challenger one of the most valuable American cars of its period — and one where documentation carries unusual weight.',
    ],
    generations: [
      { label: 'Launch years', years: '1970–1971', text: 'The most sought-after cars, with the widest engine range and the full spread of high-impact colours. The 1970 and 1971 cars differ in grille and taillamp treatment.' },
      { label: 'Final years', years: '1972–1974', text: 'Reduced engine availability and revised front-end styling as the performance era ended. Considerably more affordable, and the practical entry point for most buyers wanting an E-body.' },
    ],
    restoration: [
      { heading: 'Shared E-body structure', text: 'Structurally very close to the E-body Barracuda, which helps parts supply considerably. Inspect front frame rails, torque boxes at both ends, floor pans, trunk floor and the rear rails over the axle. These are structural findings on a unibody car.' },
      { heading: 'Corrosion sites', text: 'Lower rear quarters and wheel arches are the visible ones. Less obvious are the areas around the rear window, the trunk floor extensions, and the front frame rails where they pass beneath the footwells.' },
      { heading: 'Colour and trim', text: 'The high-impact colours of 1970 and 1971 are central to these cars\' identity, and correct colour matching matters to informed buyers. Model-specific trim, hood treatments and interior components are reproduced but can be expensive.' },
      { heading: 'Documentation is decisive', text: 'The value difference between a base Challenger and a documented high-performance car is enormous. Chrysler VINs encode the original engine. Fender tags record paint, trim and options. Broadcast sheets, when they survive inside the car, are the strongest evidence available. For the most valuable configurations, registry-level provenance research is standard practice and its absence should prompt questions.' },
    ],
    partsAvailability:
      'Good, and helped substantially by the shared platform with the E-body Barracuda. Sheet metal, interiors and mechanical parts are well supported. Correct high-performance drivetrain components and some model-specific trim are available but command significant prices.',
    documentation:
      'VIN, fender tag and broadcast sheet together establish original specification. Because the market rewards rare configurations so heavily, recognised marque registries and provenance research play a larger role in this segment than in most, and serious buyers use them.',
    ownership:
      'A short production run and strong demand make this an expensive segment with real misrepresentation risk. For owners who want the car rather than the investment, later-year cars offer the same body and much of the character at a fraction of the cost.',
    commonIssues: [
      'Front frame rail and torque box corrosion',
      'Rear quarter panel and wheel arch rust',
      'Trunk floor and rear window channel corrosion',
      'Base cars restyled and re-badged as high-performance variants',
      'Incorrect or approximated high-impact colour matching',
      'Replacement drivetrains presented as original',
    ],
    faq: [
      { q: 'Why was the Challenger produced for only five years?', a: 'It launched in 1970, just as the market for high-performance cars was contracting. Rising insurance costs for performance models, tightening emissions regulation and shifting buyer preferences reduced demand across the whole class, and Chrysler ended production after 1974.' },
      { q: 'How closely related is it to the Barracuda?', a: 'Very. Both use Chrysler\'s E-body platform, though the Challenger rides a slightly longer wheelbase and was positioned a little more upmarket. The shared structure is a practical benefit for restorers, since many parts serve both cars.' },
      { q: 'What should I check before buying an expensive Challenger?', a: 'Verify the VIN against the claimed configuration, read the fender tag with a reliable reference, and ask for documentation. For a car being sold on the strength of a rare drivetrain, expect registry-level provenance. Treat the absence of documentation on a high-value claim as a reason for caution.' },
    ],
  },
  {
    slug: 'buick-riviera',
    metaDescription:
      'Buick Riviera restoration reference: 1963 to 1973 generations, structural inspection, and the model-specific trim that constrains most projects.',
    name: 'Buick Riviera',
    maker: 'Buick',
    years: '1963–1973 (early generations)',
    dek: 'A personal luxury coupe whose first-generation design is among the most admired American shapes of the 1960s.',
    image: 'riviera-65',
    gallery: ['riviera-65', 'riviera-65-side'],
    intro: [
      'The Riviera arrived for 1963 as Buick\'s entry into the personal luxury market, and it made an immediate impression. The design — sharp-edged, tightly proportioned, with a long hood and short deck — was widely praised at the time and has aged unusually well. It is regularly cited among the best-resolved American designs of the decade.',
      'The 1965 model added hidden headlamps behind clamshell doors, completing the look. For 1966 the car moved to a new platform with a more flowing body, and in 1971 Buick introduced the striking boat-tail design that remains the most divisive Riviera of all.',
      'For restorers, the Riviera is a comparatively overlooked car: well built, mechanically conventional, and generally less expensive than more famous contemporaries — with the trade-off that model-specific trim requires more searching.',
    ],
    generations: [
      { label: 'First generation', years: '1963–1965', text: 'The original sharp-edged design, with hidden headlamps arriving for 1965. Widely regarded as the high point of the model and the most collected.' },
      { label: 'Second generation', years: '1966–1970', text: 'A larger, more flowing body on a shared GM platform. Comfortable and well equipped, and among the more affordable ways into a 1960s personal luxury coupe.' },
      { label: 'Boat-tail', years: '1971–1973', text: 'The distinctive tapered rear deck. Controversial when new and still divisive, which has kept prices moderate relative to the design\'s significance.' },
    ],
    restoration: [
      { heading: 'Structure', text: 'Inspect the frame, floor pans, trunk floor and lower body in the usual way. These are substantial, heavy cars, and corrosion in structural areas is correspondingly consequential. Check body mount condition and the frame around the rear axle.' },
      { heading: 'Trim availability is the real constraint', text: 'Riviera-specific brightwork, grilles, interior components and, on 1965 cars, the hidden headlamp mechanism are the parts that will slow a project. Reproduction support is thinner than for high-volume models, so used originals and marque specialists become important. Establish what is available before buying an incomplete car.' },
      { heading: 'Power accessories and interiors', text: 'These were well-equipped cars, and power windows, seats and climate controls all need to work for the car to present properly. Interior trim is often model-specific and can be difficult to source in correct patterns.' },
      { heading: 'Mechanically conventional', text: 'The good news: Buick V8s and GM transmissions of the period are well understood and reasonably supported. Mechanical restoration is generally straightforward relative to the body and trim work.' },
    ],
    partsAvailability:
      'Mixed. Mechanical and structural parts benefit from shared GM components and are reasonably available. Riviera-specific trim, grilles, interior components and headlamp mechanisms are the constraint, and sourcing them relies more on marque specialists, clubs and used originals than on catalogue reproduction.',
    documentation:
      'VIN and cowl tag establish model, plant, body, paint and trim. The Riviera Owners Association and Buick clubs maintain reference material on correct specifications by year, which is particularly valuable given the thinner published literature compared with higher-volume models.',
    ownership:
      'An underrated car offering a great deal of design and engineering for the money. The main practical consideration is parts sourcing for model-specific trim — buy the most complete car you can find, because filling gaps later takes time.',
    commonIssues: [
      'Frame and floor pan corrosion typical of large GM cars of the period',
      'Trunk floor rust from failed seals',
      'Scarcity of Riviera-specific brightwork and grilles',
      'Hidden headlamp mechanism faults on 1965 cars',
      'Power accessory failures across all generations',
      'Model-specific interior trim difficult to source in correct patterns',
    ],
    faq: [
      { q: 'Why is the Riviera less expensive than comparable cars?', a: 'Chiefly recognition rather than merit. It was produced in smaller numbers than mainstream models and has never had the cultural profile of the pony cars or the Tri-Five Chevrolets, which keeps demand — and therefore prices — more moderate. Many enthusiasts regard it as one of the better-value classic American cars for exactly that reason.' },
      { q: 'What is the hardest part of a Riviera restoration?', a: 'Sourcing model-specific trim and, on 1965 cars, the hidden headlamp mechanism. Structural and mechanical work is conventional; it is the unique parts that require patience and good club connections.' },
      { q: 'Is the boat-tail worth considering?', a: 'If you like the design, yes — it remains one of the most distinctive American cars of the 1970s and prices have stayed moderate because opinion is divided. Parts support is thinner than for the first generation, so condition and completeness matter more.' },
    ],
  },
]

export const getCar = (slug: string) => cars.find((c) => c.slug === slug)
