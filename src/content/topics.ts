import type { Topic } from './types'

/** The six restoration disciplines featured on the homepage. Each expands inline. */
export const topics: Topic[] = [
  {
    slug: 'body-and-rust',
    title: 'Body & Rust Restoration',
    image: 'restoration-old-car-city',
    summary:
      'Structural steel decides whether a project is viable. Rust repair is the single largest variable in almost every American classic car restoration budget.',
    facts: [
      'Unibody cars carry their structure in the floors, rockers and torque boxes — not a separate frame.',
      'Surface rust sits on the paint side; perforation means the section has already been lost.',
      'Replacement panels vary enormously in stamping quality between suppliers.',
    ],
    detail: [
      {
        t: 'p',
        text:
          'Almost every decision in a restoration flows downstream from the condition of the bodyshell. Paint, trim and interior work are all predictable: they take a known number of hours and a known quantity of material. Rust repair is not predictable, because you cannot see the full extent of it until the car is stripped, and sometimes not until a panel is cut away.',
      },
      {
        t: 'p',
        text:
          'The useful distinction is between cosmetic corrosion and structural corrosion. Cosmetic corrosion lives on outer skins — lower fenders, door bottoms, the leading edge of a hood. It is unpleasant but bounded. Structural corrosion affects the parts of the car that carry load: floor pans, rocker panels, torque boxes, frame rails, shock towers, and the areas where suspension mounts to the body. On a unibody car those areas are the chassis.',
      },
      {
        t: 'h3',
        text: 'Where American classics rust first',
      },
      {
        t: 'ul',
        items: [
          'Lower rear quarter panels, particularly behind the wheel opening where road debris collects.',
          'Floor pans under the front footwells, where windshield and cowl leaks drain.',
          'Cowl and plenum areas — a notorious problem on 1960s GM and Ford products with cowl vents.',
          'Trunk floors and spare wheel wells, where a failed trunk seal traps water for decades.',
          'Rocker panels and the inner structure behind them, which is often ignored until it is critical.',
          'Frame rails and torque boxes at their forward and rearward mounting points.',
        ],
      },
      {
        t: 'callout',
        kind: 'caution',
        title: 'Judge the car, not the paint',
        text:
          'Fresh paint on an unrestored car should raise questions rather than confidence. Filler and a coat of colour can hide perforation for years. A magnet, a torch and a careful look from underneath will tell you more than the panel gaps ever will.',
      },
      {
        t: 'p',
        text:
          'Repair method matters as much as repair extent. Welded-in replacement sections that duplicate the original spot-weld pattern restore the shell close to how it left the factory. Panels bonded in with adhesive, or lapped and seam-sealed over the top of existing rusted steel, will look acceptable for a season and then telegraph through the paint. If you are commissioning the work, ask specifically how the panel will be attached and how the back side of the seam will be sealed.',
      },
    ],
    guideLinks: ['rust-inspection', 'body-panel-repair', 'frame-inspection'],
  },
  {
    slug: 'engine-restoration',
    title: 'Engine Restoration',
    image: 'engine-chevelle-454',
    summary:
      'A rebuild is a measuring exercise before it is an assembly exercise. Most engine failures after restoration trace back to a step that was skipped, not a part that was cheap.',
    facts: [
      'Machine shop work usually costs more than the parts that go into the engine.',
      'Casting numbers and date codes establish whether a block is original to the car.',
      'Bearing clearance and ring gap are measured on assembly, never assumed from the box.',
    ],
    detail: [
      {
        t: 'p',
        text:
          'An engine rebuild is best understood as three distinct phases that happen to involve the same lump of iron: inspection and measurement, machining, and assembly. Enthusiasts tend to think of it as one job and budget for it as one job, which is why engine work so often runs over.',
      },
      {
        t: 'p',
        text:
          'The inspection phase determines whether the block and heads are usable at all. Cracks in cylinder walls, in the valve seats, or between the seat and the water jacket can end the discussion. So can a block that has already been bored to its practical limit by a previous owner. This is also where you establish provenance: casting numbers, casting dates and the machined pad on the block will tell you what the engine actually is, which matters enormously if the car is being restored to a documented specification.',
      },
      {
        t: 'h3',
        text: 'What a competent machine shop actually does',
      },
      {
        t: 'ul',
        items: [
          'Hot-tanks or thermally cleans the block and heads so measurements are taken on clean metal.',
          'Magnafluxes or pressure-tests for cracks before any money is spent on machining.',
          'Bores and hones cylinders to suit the specific pistons being fitted, with the correct crosshatch for the ring package.',
          'Checks and corrects deck and head surfaces for flatness, which governs head gasket sealing.',
          'Aligns and hones main bearing bores so the crankshaft turns without bind.',
          'Balances the rotating assembly if the engine is being built for sustained use.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Originality has a cost',
        text:
          'Keeping the numbers-matching block in a car often means accepting a more expensive repair — sleeving a cylinder, for instance — rather than replacing the block outright. Whether that is worth doing depends on the car and on what you intend to do with it. It is a decision worth making deliberately rather than by default.',
      },
      {
        t: 'p',
        text:
          'Assembly is where care shows. Bearing clearances are measured with plastigauge or a bore gauge on the actual parts being used. Ring end gaps are checked in the bore each ring will run in, and filed to specification where needed. Fasteners that stretch — rod bolts especially — are torqued to a stretch figure rather than a torque figure where the manufacturer specifies it. None of this is exotic, but all of it takes time, and it is what separates an engine that lasts from one that comes apart again.',
      },
    ],
    guideLinks: ['engine-rebuild-basics', 'transmission-restoration', 'original-vs-reproduction-parts'],
  },
  {
    slug: 'paint-and-finishing',
    title: 'Paint & Finishing',
    image: 'paint-cadillac-59',
    summary:
      'Ninety per cent of a paint job happens before any colour is sprayed. The finish you see is a direct readout of the bodywork underneath it.',
    facts: [
      'Original factory finishes on 1950s and 1960s American cars were lacquer or enamel, not modern basecoat/clearcoat.',
      'Block sanding, not spraying, is what produces a flat reflection.',
      'Panel-by-panel refinishing rarely matches an aged existing finish.',
    ],
    detail: [
      {
        t: 'p',
        text:
          'It is worth being blunt about what paint can and cannot do. Paint is a thin film. It follows the shape of whatever is beneath it, and it will reveal every wave, every low spot and every sanding scratch that was not removed before it went on. A flawless finish over poor bodywork is not achievable at any budget.',
      },
      {
        t: 'p',
        text:
          'A well-executed refinish runs roughly like this: strip to bare metal so you know what you have; repair metal properly; apply epoxy primer for corrosion protection and adhesion; apply high-build primer-surfacer; block sand it flat with progressively finer grades and guide coat, repeating until the panel reads straight under a light; seal; then colour and, on a modern system, clear. The blocking stage is where the hours go and where the result is decided.',
      },
      {
        t: 'h3',
        text: 'Matching the era, not just the colour code',
      },
      {
        t: 'p',
        text:
          'Concours-oriented restorations sometimes deliberately reproduce the characteristics of the original finish: the slightly softer gloss of a single-stage enamel, the visible orange peel that factory production lines actually produced, correct overspray patterns in the engine bay and underbody. A mirror-flat modern clearcoat can be technically superior and still be wrong for the car. Decide which you are aiming for before the first primer goes on, because the two paths diverge early.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Isocyanates are not a normal workshop hazard',
        text:
          'Two-pack primers, hardeners and clearcoats contain isocyanates, which can cause permanent respiratory sensitisation. A dust mask offers no protection. Spraying these materials safely requires supplied-air breathing equipment and a properly extracted booth. This is a reasonable point at which to use a professional shop rather than a home garage.',
      },
    ],
    guideLinks: ['paint-preparation', 'body-panel-repair', 'chrome-restoration'],
  },
  {
    slug: 'interior-restoration',
    title: 'Interior Restoration',
    image: 'interior-firebird-67',
    summary:
      'The interior is the part of the car an owner actually inhabits, and the part where sympathetic repair often beats wholesale replacement.',
    facts: [
      'Reproduction upholstery kits are widely available for high-volume models and scarce for everything else.',
      'Seat foam degrades even in cars that look well preserved.',
      'Original dash pads and door cards are frequently harder to source than sheet metal.',
    ],
    detail: [
      {
        t: 'p',
        text:
          'Interior work rewards patience and punishes haste in a way that is immediately visible. A crooked seam or a poorly stretched cover sits at eye level for the life of the car. It is also the area where the gap between a good reproduction part and a poor one is most obvious: grain patterns, stitch spacing, and the exact shade of a colour are all things owners notice.',
      },
      {
        t: 'h3',
        text: 'Sequence matters',
      },
      {
        t: 'ol',
        items: [
          'Photograph everything before disassembly, including how clips, retainers and wiring are routed.',
          'Remove seats, then trim panels, then carpet, then any sound-deadening material.',
          'Address the floor beneath — this is when floor pan corrosion is found, and it changes the plan.',
          'Repair or replace insulation and sound deadening before anything soft goes back in.',
          'Fit headliner first, since it needs access that later components block.',
          'Then carpet, then door and quarter trim, then seats, then the dashboard components.',
        ],
      },
      {
        t: 'p',
        text:
          'On seats specifically, replacing the cover without replacing degraded foam is a false economy. New material stretched over collapsed foam takes on the shape of the collapse. Foam kits for common models are inexpensive relative to the labour of taking a seat apart twice.',
      },
      {
        t: 'callout',
        kind: 'note',
        title: 'Preserve what you can',
        text:
          'An original, intact interior in a survivor car is worth more than a new one in most collector contexts. Cleaning, careful repair and conservation are legitimate outcomes. Replacing an original dash pad that has one small crack is a decision you cannot reverse.',
      },
    ],
    guideLinks: ['interior-restoration', 'glass-and-weatherstripping', 'documentation-and-photography'],
  },
  {
    slug: 'electrical-systems',
    title: 'Electrical Systems',
    image: 'blog-electrical',
    summary:
      'Six decades of splices, add-on accessories and corroded grounds are the real electrical problem in most classic cars — rarely the original design.',
    facts: [
      'Most 1950s American cars used 6-volt positive-earth systems; the industry moved to 12-volt through that decade.',
      'Poor earth connections cause a large share of apparently mysterious faults.',
      'Original wiring insulation becomes brittle and can fail without any external sign.',
    ],
    detail: [
      {
        t: 'p',
        text:
          'Classic car electrical systems are simple by modern standards: a charging circuit, a starting circuit, lighting, ignition, and a handful of accessories, mostly protected by a small fuse block. What makes them difficult is not the design but the accumulated history. Sixty years of previous owners adding radios, fog lamps, alarms and trailer sockets leaves behind a layer of splices, scotch-locks and taped joints that no wiring diagram describes.',
      },
      {
        t: 'h3',
        text: 'The case for a new harness',
      },
      {
        t: 'p',
        text:
          'Reproduction harnesses for popular American models are made to original patterns with correct colour coding and connectors. Where the original loom is brittle, previously butchered, or has suffered a bay fire, replacement is usually both safer and faster than chasing faults through material that will keep failing. Where the loom is genuinely sound and the car is being preserved rather than restored, careful repair of specific circuits is the better choice.',
      },
      {
        t: 'ul',
        items: [
          'Clean every earth point back to bright metal and protect it — this fixes an extraordinary number of faults.',
          'Check that the fusing actually matches the circuits, particularly where accessories were added.',
          'Confirm the polarity and voltage of the system before connecting anything, especially on pre-1957 cars.',
          'Replace brittle-insulated wiring rather than taping over it.',
        ],
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Batteries and fuel do not mix with guesswork',
        text:
          'Disconnect the battery before working on wiring, and disconnect the earth lead first. Lead-acid batteries vent hydrogen and can produce enough current through a dropped spanner to start a fire. Any electrical work near fuel lines or a fuel tank deserves particular care — and where you are unsure, an auto electrician is a sensible expense.',
      },
    ],
    guideLinks: ['classic-car-electrical-systems', 'engine-rebuild-basics', 'preparing-for-road-use'],
  },
  {
    slug: 'suspension-and-brakes',
    title: 'Suspension & Brakes',
    image: 'restoration-hotrod-32',
    summary:
      'These are the systems where a restoration stops being cosmetic and starts carrying consequences. They are also the systems most commonly deferred.',
    facts: [
      'Rubber bushings, hoses and seals degrade with age regardless of mileage.',
      'Single-circuit master cylinders were standard on many American cars before the late 1960s.',
      'Original drum brakes can work well when correctly restored and adjusted.',
    ],
    detail: [
      {
        t: 'p',
        text:
          'A car that has been sitting for twenty years has an entirely rubber-based problem. Flexible brake hoses perish internally and can act as one-way valves, holding pressure at a caliper long after the pedal is released. Suspension bushings harden and crack. Wheel cylinder and caliper seals take a set and then tear when the piston finally moves. None of this is visible from outside, and all of it matters the first time the car needs to stop.',
      },
      {
        t: 'h3',
        text: 'Restoring versus upgrading',
      },
      {
        t: 'p',
        text:
          'There is a genuine debate here, and it is worth resolving deliberately. A correctly restored original drum system, with new shoes, cylinders, hoses, correctly turned drums and proper adjustment, is capable of stopping the car as well as it did when new. That may be entirely adequate for occasional use and is the right answer for a car being preserved to original specification. A front disc conversion, or a dual-circuit master cylinder in place of a single-circuit one, gives more margin in modern traffic — at the cost of originality, and sometimes of value.',
      },
      {
        t: 'callout',
        kind: 'safety',
        title: 'Brakes are the wrong place to economise',
        text:
          'Brake and suspension work carries direct safety consequences for you and for everyone else on the road. Vehicles must be supported on rated axle stands, never on a jack alone. If you have any doubt about your ability to complete brake work correctly, or to verify it afterwards, have it done and inspected by a qualified professional. Modifications may also affect what your local roadworthiness regulations and your insurer will accept.',
      },
    ],
    guideLinks: ['brake-system-restoration', 'suspension-restoration', 'frame-inspection'],
  },
]

export const getTopic = (slug: string) => topics.find((t) => t.slug === slug)
