/**
 * CampSphere - Full 25 Summer Programs Dataset & Details Engine
 * assets/js/programs-data.js
 */

const CAMPSPHERE_PROGRAMS = {
  "prog-1": {
    id: "prog-1",
    title: "Junior Robotics & Python Coding Camp",
    track: "STEM & Robotics Track",
    badgeClass: "badge-tag-primary",
    age: "Ages 8 – 14",
    price: 395,
    rating: 4.9,
    reviewsCount: 68,
    spotsLeft: "6 Spots Available",
    desc: "Turn curiosity into engineering brilliance. Campers design, build, and program autonomous robots using LEGO® Spike Prime, master Python logic through arcade game coding, and pilot programmable obstacle drones.",
    images: [
      "assets/images/junior_robotics_python_coding.jpeg",
      "assets/images/Junior_Robotics_&_Python_Coding_202608241010.jpeg",
      "assets/images/Junior_Robotics_&_Python_Coding_202608241011.jpeg",
      "assets/images/Junior_Robotics_&_Python_Coding_202608241010%20(2).jpeg"
    ],
    locationBadge: "Pine Innovation Lab #2",
    quickFacts: {
      age: "8 – 14 Years Old",
      hours: "8:30 AM – 4:00 PM",
      ratio: "1:5 Dedicated Ratio",
      skill: "Beginner to Intermediate",
      meals: "Fresh Hot Lunch + 2 Snacks",
      takeHome: "Custom Robot & Game Source"
    },
    pillars: [
      { icon: "bi-cpu-fill", color: "primary", title: "LEGO® Spike Prime Robotics", desc: "Construct dual-motor chassis, gear transmissions, and sensor arrays (ultrasonic, color, force, and gyro)." },
      { icon: "bi-code-slash", color: "accent", title: "Python Coding & Game Dev", desc: "Transition from visual block logic to real text-based Python syntax, loops, conditional statements, and sprite physics." },
      { icon: "bi-controller", color: "secondary", title: "Autonomous Drone Missions", desc: "Code flight paths, hover altitudes, and obstacle ring avoidance routines for micro-drones inside our indoor safety cage." },
      { icon: "bi-trophy-fill", color: "warning", title: "Friday Robo-Tournament", desc: "Compete in the friendly Maze Navigator and Sumo-Bot arena challenge, followed by an open showcase demo for family." }
    ],
    curriculum: [
      { day: "Monday • Day 1", title: "Structural Mechanics & Robotic Chassis", badge: "Foundations", summary: "Campers unbox their Spike Prime kits, learn gear ratios (torque vs speed), assemble an all-terrain rover base, and calibrate optical encoders.", bullets: ["Unboxing, inventory checking, and safety orientation", "Constructing high-traction wheel transmissions", "First autonomous 10-meter loop mission"] },
      { day: "Tuesday • Day 2", title: "Sensor Arrays & Autonomous Path Finding", badge: "Perception & Logic", summary: "Integrating ultrasonic distance sensors and dual-color sensors. Campers code their bots to follow black lines and detect obstacles from 30cm.", bullets: ["Calibrating color reflections and ambient light thresholds", "Implementing Proportional (P) line tracking algorithms", "Timed Maze Navigation qualifying heat"] },
      { day: "Wednesday • Day 3", title: "Python Programming & Arcade Game Dev", badge: "Code Mastery", summary: "Bridging graphical blocks to pure Python. Campers learn variables, if/else conditionals, while loops, and functions by building a retro Space Invaders arcade game.", bullets: ["Python syntax fundamentals and indentation rules", "Sprite rendering, collision detection, and score counters", "Exporting game files for home computer play"] },
      { day: "Thursday • Day 4", title: "Drone Aerodynamics & Flight Physics", badge: "Aviation Tech", summary: "Programming indoor micro-quadcopters. Campers script takeoff altitudes, pitch/yaw maneuvers, flip stunts, and sensor-based landing pads.", bullets: ["Thrust, lift, and aerodynamic stability principles", "Autonomous ring obstacle course scripting", "Pre-tournament robot armor customization"] },
      { day: "Friday • Day 5", title: "Championship Arena & Parent Showcase", badge: "Grand Finale", summary: "The culminating championship day! Morning qualifying rounds followed by a 2:30 PM grand parent showcase, live tournament finals, camper awards, and official STEM medals.", bullets: ["Double-elimination Sumo-Bot & Maze Championship", "Parent Open House & camper live project presentations", "CampSphere STEM Diplomas and take-home project kits"] }
    ],
    instructor: {
      name: "Jessica Vance, M.S.",
      role: "Director of Robotics & STEM Education",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      bio: "Jessica holds a Master's in Computer Science from UC Berkeley and has guided youth STEM education for 6 seasons. She has coached 3 national FIRST LEGO League award-winning teams and specializes in making complex coding accessible and thrilling for young learners.",
      certifications: ["CPR & Pediatric First Aid Certified", "Level 2 Background Checked"]
    },
    reviews: [
      { name: "Marcus Roberts", meta: "Parent of 10-year-old camper • Attended Summer 2025", stars: 5, quote: "My son came in with zero coding experience and built a functioning maze solver by Wednesday! Coach Jessica is phenomenal at inspiring confidence. The live photo updates on the parent app were the highlight of my workdays." },
      { name: "Sarah Lin", meta: "Parent of 12-year-old camper • Attended Summer 2025", stars: 5, quote: "The balance between rigorous robotics and afternoon outdoor swimming was perfect. My daughter wasn't glued to a screen all day—she made great friends and is already asking to sign up for Week 2!" }
    ],
    faqs: [
      { q: "Does my child need prior coding or robotics experience?", a: "No experience required! On Day 1, instructors assess each camper and divide them into matched skill pods (Beginner, Intermediate, Advanced) so every child is appropriately supported." },
      { q: "What hardware and software will my child use?", a: "CampSphere provides dedicated Dell gaming laptops with Python 3, Pygame, and the official LEGO Education Spike app pre-installed. All hardware is included in tuition." },
      { q: "Are hot lunches and snacks included?", a: "Yes! Every camper receives a fresh, hot chef-prepared lunch and two organic fruit/snack breaks daily in our dining hall. We cater to nut-free, dairy-free, gluten-free, and vegan diets." },
      { q: "What is the cancellation and refund policy?", a: "CampSphere offers a 100% full tuition refund up to 14 days before your scheduled session begins. You can also switch session weeks or transfer to another camp elective anytime with zero transfer fees." }
    ],
    related: ["prog-8", "prog-12", "prog-6"]
  },

  "prog-2": {
    id: "prog-2",
    title: "All-Star Sports & Athletics Camp",
    track: "Sports & Athletics Track",
    badgeClass: "badge-tag-accent",
    age: "Ages 7 – 12",
    price: 360,
    rating: 4.8,
    reviewsCount: 84,
    spotsLeft: "4 Spots Available",
    desc: "Energize your summer with high-energy soccer drills, basketball tournaments, track & field dashes, and collaborative teamwork relay challenges on our collegiate sports facilities.",
    images: [
      "assets/images/all_star_sports_athletics.jpeg",
      "assets/images/All-Star_Sports_%26_Athletics_Camp_202608241003.jpeg",
      "assets/images/All-Star_Sports_%26_Athletics_Camp_202608241004.jpeg",
      "assets/images/All-Star_Sports_%26_Athletics_Camp_202608241004%20(1).jpeg"
    ],
    locationBadge: "Lakeside Stadium & Fieldhouse",
    quickFacts: {
      age: "7 – 12 Years Old",
      hours: "8:30 AM – 4:00 PM",
      ratio: "1:6 Coach Ratio",
      skill: "All Athletic Levels",
      meals: "Fresh Hot Lunch + Hydration Bar",
      takeHome: "All-Star Jersey & Skills Card"
    },
    pillars: [
      { icon: "bi-dribbble", color: "accent", title: "Soccer & Ball Mastery", desc: "Dribbling obstacle grids, precision passing triangles, shooting mechanics, and daily World Cup mini-matches." },
      { icon: "bi-trophy", color: "primary", title: "Basketball & Court Agility", desc: "Crossover footwork, layups, free throw mechanics, defensive rebounding, and 3v3 half-court tournaments." },
      { icon: "bi-stopwatch", color: "warning", title: "Track & Field Relays", desc: "Baton exchange technique, 100m sprint timing, agility ladder drills, and teamwork obstacle gauntlets." },
      { icon: "bi-heart-pulse", color: "success", title: "Sportsmanship & Stamina", desc: "Dynamic stretching, injury prevention, positive leadership mindset, and daily All-Star teammate awards." }
    ],
    curriculum: [
      { day: "Monday • Day 1", title: "Soccer Fundamentals & Agility Combines", badge: "Soccer Focus", summary: "Speed ladder drills, ball control coaching, small-sided 4v4 scrimmages, and assigning team color jerseys.", bullets: ["Baseline speed and vertical jump testing", "Dribbling cone mazes and passing accuracy", "Team cheer building and sportsmanship pledge"] },
      { day: "Tuesday • Day 2", title: "Hoops Clinic & Court Shooting", badge: "Basketball Focus", summary: "Jump shot mechanics, defensive slides, fast-break passing, and skills challenge shootouts.", bullets: ["Free throw and layup form breakdown", "Pick-and-roll team offensive sets", "3-Point & Hotspot Skills Competition"] },
      { day: "Wednesday • Day 3", title: "Track, Field & Relay Races", badge: "Athletics Focus", summary: "Sprint biomechanics, hurdle form, distance pacing, and 4x100m team baton handoffs.", bullets: ["Electronic laser timing for 50m dashes", "Long jump and obstacle course runs", "Camper vs Counselor relay sprint"] },
      { day: "Thursday • Day 4", title: "Multi-Sport Tournament Brackets", badge: "Tournament Play", summary: "Double-elimination flag football, kickball championship, and ultimate frisbee tactical games.", bullets: ["Flag football route running and interception drills", "Kickball strategy and base running", "Championship seeding round"] },
      { day: "Friday • Day 5", title: "All-Star Games & Gold Medal Ceremony", badge: "Championship", summary: "Final tournament matches, parent cheer squad games, Camper of the Week MVP awards, and gold medal presentations.", bullets: ["All-Star Championship Finals", "Parent vs Camper penalty kick shootout", "Gold medal awards and skills evaluation report"] }
    ],
    instructor: {
      name: "Marcus Hayes",
      role: "Athletics Director & Head Coach",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      bio: "Coach Marcus is a former NCAA Division 1 soccer athlete and USA Track & Field Level 2 certified youth trainer with 8 years of coaching experience inspiring sportsmanship and joy in young athletes.",
      certifications: ["USATF Level 2 Certified Coach", "CPR & First Aid Certified"]
    },
    reviews: [
      { name: "David Miller", meta: "Parent of 8-year-old camper • Attended Summer 2025", stars: 5, quote: "Coach Marcus brought out the best in my daughter. She was shy about team sports, but by Friday she was volunteering to be team captain!" },
      { name: "Elena Rostova", meta: "Parent of 11-year-old camper • Attended Summer 2025", stars: 5, quote: "Phenomenal coaching staff! They emphasize hustle, kindness, and positive attitude over winning. My son loved the hot lunches too." }
    ],
    faqs: [
      { q: "What should campers wear?", a: "Athletic shorts, t-shirt, and athletic sneakers. Cleats are optional for grass field sessions. Shin guards are recommended for soccer." },
      { q: "How are campers grouped?", a: "Campers are grouped into age brackets (7–9 and 10–12) with matched skill levels to ensure fair, safe, and fun gameplay." },
      { q: "Is swimming included?", a: "Yes! All full-day sports campers enjoy a 75-minute afternoon recreational swim and cool-down in our heated pool under lifeguard supervision." },
      { q: "What if it rains?", a: "We transition seamlessly into our 25,000 sq ft indoor fieldhouse and climate-controlled basketball gymnasium." }
    ],
    related: ["prog-20", "prog-13", "prog-4"]
  },

  "prog-3": {
    id: "prog-3",
    title: "Little Picassos Art & Pottery Studio",
    track: "Creative Arts Track",
    badgeClass: "badge-tag-highlight",
    age: "Ages 5 – 10",
    price: 340,
    rating: 4.9,
    reviewsCount: 52,
    spotsLeft: "3 Spots Available",
    desc: "Unleash vibrant creativity! Campers master acrylic canvas painting, spin ceramic clay on pottery wheels, create tie-dye textile garments, and host a grand Friday parent gallery exhibition.",
    images: [
      "assets/images/Art_and_pottery_studio_202608241021.jpeg",
      "assets/images/Art_and_pottery_studio_202608241021%20(2).jpeg",
      "assets/images/Art_and_pottery_studio_202608241021%20(3).jpeg",
      "assets/images/art_pottery_studio.jpeg"
    ],
    locationBadge: "Sunlight Artisan Studio #4",
    quickFacts: {
      age: "5 – 10 Years Old",
      hours: "8:30 AM – 4:00 PM",
      ratio: "1:5 Artist Ratio",
      skill: "All Levels Welcome",
      meals: "Fresh Hot Lunch + Snacks",
      takeHome: "Ceramic Bowl & Canvas Art"
    },
    pillars: [
      { icon: "bi-palette-fill", color: "warning", title: "Canvas Painting & Color Theory", desc: "Color mixing, palette knife textures, impressionist landscapes, and custom stretched canvas painting." },
      { icon: "bi-circle-square", color: "accent", title: "Ceramic Pottery Wheel", desc: "Throwing clay on motorized pottery wheels, trimming bowls, slab building, and colorful glaze kiln firing." },
      { icon: "bi-brush", color: "primary", title: "Sculpture & Mixed Media", desc: "Paper mache animal masks, mosaic tile coasters, and botanical sun prints using sun-sensitive cyanotype." },
      { icon: "bi-easel2-fill", color: "success", title: "Friday Parent Gallery Gala", desc: "Curating a personalized museum booth complete with artist statement placards and guided parent tours." }
    ],
    curriculum: [
      { day: "Monday • Day 1", title: "Color Theory & Landscape Painting", badge: "Painting", summary: "Mastering the color wheel, blending gradients with acrylics on large canvas boards, and nature scenery studies.", bullets: ["Warm vs cool color mixing", "Impasto texture techniques with palette knives", "Completed 16x20 stretched canvas landscape"] },
      { day: "Tuesday • Day 2", title: "Pottery Wheel Throwing & Clay Sculpting", badge: "Ceramics", summary: "Centering clay on motorized potter's wheels, pulling clay walls into bowls, and sculpting whimsical animal pinch pots.", bullets: ["Wheel safety and hand positioning", "Creating smooth bowls and cups", "Kiln drying and underglazing"] },
      { day: "Wednesday • Day 3", title: "Tie-Dye Textiles & Fabric Printing", badge: "Fiber Arts", summary: "Spiral, bullseye, and accordion fold tie-dye techniques on official camp shirts and canvas tote bags.", bullets: ["Fiber-reactive non-toxic dyeing methods", "Block printing with carved linoleum stamps", "Custom textile wearable fashion creation"] },
      { day: "Thursday • Day 4", title: "Mixed Media & Mosaic Tile Crafting", badge: "Sculpture", summary: "Designing vibrant stained-glass style mosaic mirrors and botanical nature pressings on wood panels.", bullets: ["Tile laying, grouting, and edge smoothing", "Botanical cyanotype sun-exposure art", "Framing artwork for the Friday exhibition"] },
      { day: "Friday • Day 5", title: "Grand Art Gallery Gala & Reception", badge: "Exhibition", summary: "Framing all 6 created masterworks, writing artist biography cards, and hosting parents for a wine-glass sparkling cider art walk.", bullets: ["Curating individual studio display booths", "Artist badge awards and certificate presentation", "Packaging all kiln-fired ceramics and canvas art safely for home"] }
    ],
    instructor: {
      name: "Claire Moreau, M.F.A.",
      role: "Fine Arts Director",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
      bio: "Claire holds an M.F.A. in Visual Arts from Rhode Island School of Design. She has taught youth ceramics and studio arts for over 7 years, fostering joyful self-expression and imaginative confidence in children.",
      certifications: ["Master of Fine Arts (RISD)", "CPR & Child Safety Certified"]
    },
    reviews: [
      { name: "Jennifer Walsh", meta: "Parent of 7-year-old camper • Attended Summer 2025", stars: 5, quote: "The art pieces my daughter brought home look like they belong in a boutique gallery! She was so proud showing us her ceramic bowl." },
      { name: "Robert Kim", meta: "Parent of 9-year-old camper • Attended Summer 2025", stars: 5, quote: "Instructor Claire is magical with children. My son usually gets frustrated when art doesn't look perfect, but she taught him how mistakes turn into creative discoveries." }
    ],
    faqs: [
      { q: "Are art supplies provided?", a: "Yes! 100% of supplies—canvas, acrylics, studio clay, potter's wheels, aprons, and glazing tools—are provided in tuition." },
      { q: "Are the paints and glazes non-toxic and washable?", a: "Yes, all materials are strictly AP-certified non-toxic, lead-free, and skin-safe." },
      { q: "When do ceramic pieces come home?", a: "Pottery is fired in our on-site electric kiln throughout the week and packaged safely in bubble wrap for pickup on Friday afternoon." },
      { q: "What should campers wear?", a: "Comfortable clothes that can get messy! We provide artist smocks, but clothes suitable for paint and clay are best." }
    ],
    related: ["prog-14", "prog-22", "prog-7"]
  },

  "prog-4": {
    id: "prog-4",
    title: "Splash & Swim Water Safari",
    track: "Aquatics & Swim Track",
    badgeClass: "badge-tag-secondary",
    age: "Ages 5 – 10",
    price: 350,
    rating: 4.9,
    reviewsCount: 71,
    spotsLeft: "5 Spots Available",
    desc: "Dive into aquatic safety and confidence! Red Cross certified swim instructors coach stroke mechanics, water safety games, paddleboarding balance, and high-energy water polo relays.",
    images: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=900&auto=format&fit=crop&q=80",
      "assets/images/teen_high_adventure_camp.jpg"
    ],
    locationBadge: "Heated Olympic Pool & Lake Dock",
    quickFacts: {
      age: "5 – 10 Years Old",
      hours: "8:30 AM – 4:00 PM",
      ratio: "1:4 Water Safety Ratio",
      skill: "Beginner to Advanced",
      meals: "Fresh Hot Lunch + 2 Snacks",
      takeHome: "Red Cross Swim Card & Goggles"
    },
    pillars: [
      { icon: "bi-water", color: "secondary", title: "Red Cross Stroke Clinic", desc: "Freestyle breathing rhythm, backstroke rotation, breaststroke kick, and treading water endurance." },
      { icon: "bi-life-preserver", color: "danger", title: "Water Safety & Rescue Skills", desc: "Reaching assists, lifejacket competency, pool depth awareness, and water survival techniques." },
      { icon: "bi-trophy", color: "warning", title: "Aquatic Games & Relays", desc: "Water polo matches, noodle jousting, diving ring hunts, and giant inflatable obstacle courses." },
      { icon: "bi-tsunami", color: "primary", title: "Stand-Up Paddleboard (SUP)", desc: "Lake dock boarding, balance paddling technique, and tandem SUP races across calm waters." }
    ],
    curriculum: [
      { day: "Monday • Day 1", title: "Water Confidence & Stroke Evaluation", badge: "Evaluation", summary: "Swim test classification, shallow-water breath control, freestyle kicking drills, and pool rules orientation.", bullets: ["Skill pod placement (Levels 1 through 4)", "Rotational breathing mechanics with kickboards", "Underwater ring retrieval games"] },
      { day: "Tuesday • Day 2", title: "Backstroke Mastery & Deep Water Treading", badge: "Stroke Dev", summary: "Head alignment, continuous backstroke flutter kicks, and developing relaxed 2-minute water treading endurance.", bullets: ["Flutter kick cadence drills", "Deep-end jump and recover practice", "Water noodle balance races"] },
      { day: "Wednesday • Day 3", title: "Breaststroke & Lifejacket Safety Safari", badge: "Safety Focus", summary: "Whip kick mechanics, synchronized arm recovery, lifejacket jumping, and group huddle safety positions.", bullets: ["Frog kick and gliding coordination", "Coast Guard certified PFD safety drills", "Pool obstacle course relays"] },
      { day: "Thursday • Day 4", title: "Paddleboard Navigation & Water Polo", badge: "Lake & Games", summary: "Intro to lakeside stand-up paddleboarding on calm waters followed by mini water polo matches in the heated pool.", bullets: ["SUP kneeling and standing balance techniques", "Water polo passing, shooting, and goalie defense", "Synchronized team float challenges"] },
      { day: "Friday • Day 5", title: "Aqua-Olympics & Gold Ribbon Gala", badge: "Championship", summary: "Fun non-competitive race heats, parent observation swim demo, Red Cross progression certificates, and camp ribbons.", bullets: ["Aqua-Olympics relay heats and belly-flop fun", "Parent demonstration showcase", "Official Red Cross level badges awarded"] }
    ],
    instructor: {
      name: "Chloe Bennett",
      role: "Aquatics Director & WSI Certified Lead",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
      bio: "Chloe is a certified Red Cross Water Safety Instructor (WSI) and Lifeguard Trainer with 8 years leading youth aquatic camps. She specializes in overcoming water anxiety with playful, encouraging mentorship.",
      certifications: ["Red Cross WSI & Lifeguard Trainer", "Pediatric CPR/AED Certified"]
    },
    reviews: [
      { name: "Amanda Hayes", meta: "Parent of 6-year-old camper • Attended Summer 2025", stars: 5, quote: "My son wouldn't even put his face in the water on Monday. By Friday, he jumped into the deep end with a smile on his face! Coach Chloe is wonderful." },
      { name: "Kenji Sato", meta: "Parent of 9-year-old camper • Attended Summer 2025", stars: 5, quote: "Extremely attentive lifeguards and 1:4 instructor ratios gave us complete peace of mind. The heated pool made every morning comfortable." }
    ],
    faqs: [
      { q: "What if my child cannot swim at all?", a: "We have dedicated Level 1 beginner instructors stationed in our zero-depth entry shallow pool. Non-swimmers wear lifejackets until baseline skills are mastered." },
      { q: "Is the pool heated?", a: "Yes! Our outdoor Olympic-length pool is maintained at a comfortable 82°F throughout the summer season." },
      { q: "Are lifeguards always on duty?", a: "Always. We maintain a minimum of 4 certified Red Cross lifeguards on deck at all times in addition to swim instructors." },
      { q: "What should campers bring daily?", a: "Swimsuit, towel, sunscreen, flip-flops/water shoes, and goggles. We provide lockers and fresh hot lunch." }
    ],
    related: ["prog-11", "prog-21", "prog-2"]
  },

  "prog-5": {
    id: "prog-5",
    title: "Wilderness Survival & Nature Trekking",
    track: "Nature & Wilderness Track",
    badgeClass: "badge-tag-primary",
    age: "Ages 8 – 14",
    price: 375,
    rating: 4.9,
    reviewsCount: 59,
    spotsLeft: "4 Spots Available",
    desc: "Master outdoor grit! Learn magnetic compass navigation, solar water purification, emergency shelter construction, animal track casting, and Leave-No-Trace wilderness stewardship.",
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=900&auto=format&fit=crop&q=80"
    ],
    locationBadge: "Pine Ridge Backcountry Outpost",
    quickFacts: {
      age: "8 – 14 Years Old",
      hours: "8:30 AM – 4:00 PM",
      ratio: "1:5 Guide Ratio",
      skill: "All Adventure Levels",
      meals: "Trail Lunch + Campfire Snacks",
      takeHome: "Survival Compass & Paracord Kit"
    },
    pillars: [
      { icon: "bi-compass", color: "primary", title: "Topographic Orienteering", desc: "Reading contour lines, compass bearings, pacing measurements, and geocaching treasure trails." },
      { icon: "bi-house-heart-fill", color: "success", title: "Emergency Debris Shelters", desc: "Building waterproof A-frame shelters, knot tying (taut-line, square lash), and insulation techniques." },
      { icon: "bi-droplet-half", color: "secondary", title: "Water Sourcing & Firecraft", desc: "Charcoal filtration, solar water stills, flint & steel spark ignition, and leave-no-trace campfire cooking." },
      { icon: "bi-binoculars", color: "warning", title: "Wildlife Tracking & Ecology", desc: "Plaster paw-print casting, edible plant foraging identification, and bird song recognition." }
    ],
    curriculum: [
      { day: "Monday • Day 1", title: "Compass Navigation & 10 Essentials", badge: "Orienteering", summary: "Backpack inspection, compass bearings, declination adjustment, and 5-stage campus navigation course.", bullets: ["The 10 Survival Essentials orientation", "Pace count calibration and map reading", "Geocaching hidden flag hunt"] },
      { day: "Tuesday • Day 2", title: "Shelter Engineering & Essential Knots", badge: "Shelter Craft", summary: "Constructing weather-resistant lean-to and A-frame shelters using downed timber and paracord lashings.", bullets: ["Square lashing, bowline, and clove hitch knots", "Thermal insulation with pine needles and bark", "Shelter wind and rain testing"] },
      { day: "Wednesday • Day 3", title: "Water Purification & Solar Stills", badge: "Resources", summary: "Sourcing clean water from streams, building sand-charcoal filtration columns, and testing UV purification pens.", bullets: ["Gravity filtration and boiling protocols", "Constructing solar transpiration bags", "Electrolyte trail drink preparation"] },
      { day: "Thursday • Day 4", title: "Flint & Steel Sparkcraft & Foraging", badge: "Fire & Plants", summary: "Safe matchless fire starting with ferrocerium rods, tinder bundle prep, and identifying safe wild berries.", bullets: ["Spark catch with cotton and birch bark", "Smokeless fire configurations", "Campfire s'mores and bannock bread baking"] },
      { day: "Friday • Day 5", title: "Backcountry Wilderness Challenge", badge: "Survival Test", summary: "Team survival simulation: Teams navigate to an unknown landmark, build a functional shelter, filter water, and signal base camp.", bullets: ["Comprehensive team survival gauntlet", "Whistle and mirror signaling demo", "Junior Wilderness Ranger badge award"] }
    ],
    instructor: {
      name: "Tyler Scott",
      role: "Wilderness Survival Specialist",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
      bio: "Tyler is a Wilderness First Responder (WFR) and Leave-No-Trace Master Educator with 10 seasons guiding alpine youth expeditions. He teaches resilience, nature observation, and outdoor self-reliance.",
      certifications: ["Wilderness First Responder (WFR)", "Leave No Trace Master Educator"]
    },
    reviews: [
      { name: "Michael Vance", meta: "Parent of 11-year-old camper • Attended Summer 2025", stars: 5, quote: "My son gained so much confidence! He taught the whole family how to build a waterproof shelter on our last weekend camping trip." },
      { name: "Patricia Gomez", meta: "Parent of 13-year-old camper • Attended Summer 2025", stars: 5, quote: "The best camp experience my daughter has ever had. She loved learning real skills away from screens in the fresh mountain air." }
    ],
    faqs: [
      { q: "Is this camp safe for younger kids?", a: "Yes, all activities are conducted under strict 1:5 staff supervision in designated, inspected outdoor training zones with full medical staff nearby." },
      { q: "Are real fires lit by campers?", a: "Campers learn friction and spark theory under direct 1-on-1 counselor supervision in raised steel fire rings with emergency water buckets." },
      { q: "What gear is provided?", a: "We provide compasses, paracord, water filters, tarps, magnifying lenses, and field journals. Campers just need hiking sneakers and a water bottle." },
      { q: "What happens during bad weather?", a: "In case of lightning or heavy rain, activities move into the Backcountry Lodge for indoor knot tying, map plotting, and survival games." }
    ],
    related: ["prog-6", "prog-15", "prog-17"]
  },

  "prog-6": {
    id: "prog-6",
    title: "High-Ropes & Rock Wall Challenge",
    track: "Outdoor Adventure Track",
    badgeClass: "badge-tag-accent",
    age: "Ages 11 – 16",
    price: 410,
    rating: 5.0,
    reviewsCount: 64,
    spotsLeft: "2 Spots Available",
    desc: "Soar to new heights! Tackle our 40-foot outdoor rock climbing tower, twin 500-foot canopy ziplines, suspended Burma bridges, and team trust building elements under ACCT-certified aerial guides.",
    images: [
      "assets/images/high_ropes_challenge_course.jpg",
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&auto=format&fit=crop&q=80"
    ],
    locationBadge: "Eagle Peak Aerial Challenge Park",
    quickFacts: {
      age: "11 – 16 Years Old",
      hours: "8:30 AM – 4:00 PM",
      ratio: "1:4 Aerial Guide Ratio",
      skill: "All Levels (Fear of Heights OK)",
      meals: "Chef Hot Lunch + Electrolytes",
      takeHome: "Climbing Carabiner & Summit Ribbon"
    },
    pillars: [
      { icon: "bi-fire", color: "accent", title: "40ft Rock Climbing Tower", desc: "Autobelay and top-rope climbing on textured routes ranging from beginner 5.6 to challenging 5.10c overhanging pitches." },
      { icon: "bi-lightning-charge", color: "warning", title: "Twin 500ft Ziplines", desc: "Canopy flights at 30 MPH through the tall pine forest with dual redundant Petzl trolley safety mechanisms." },
      { icon: "bi-shield-check", color: "success", title: "ACCT Level 2 Safety Gear", desc: "Full-body Petzl harnesses, certified climbing helmets, static lifelines, and daily pre-flight gear inspections." },
      { icon: "bi-people-fill", color: "primary", title: "Team Trust & Leadership", desc: "Low-ropes nitro crossing, trust falls, giant ladder ascents, and positive peer encouragement circles." }
    ],
    curriculum: [
      { day: "Monday • Day 1", title: "Harness Mastery & Low-Ropes Team Trust", badge: "Orientation", summary: "Harness fitting, helmet safety checks, belay commands ('On Belay? Belay On!'), and ground-level team obstacle challenges.", bullets: ["Petzl harness fitting and double-pass buckles", "Low-ropes spider web and nitro crossing", "First 15-foot beginner wall ascent"] },
      { day: "Tuesday • Day 2", title: "Rock Climbing Technique & Balance", badge: "Climbing", summary: "Three-point contact rule, smearing on friction holds, using leg power over arm fatigue, and conquering the 25ft ledge.", bullets: ["Footwork placement and heel-toe jams", "Autobelay descent comfort training", "Climbing team speed relays"] },
      { day: "Wednesday • Day 3", title: "The 40ft Tower & Overhang Challenge", badge: "High Altitude", summary: "Ascending the top pinnacle of the 40-foot main tower, traversing the horizontal bouldering cave, and practicing rappelling.", bullets: ["Multi-pitch route selection (Easy to Advanced)", "Overhang grip strategies and core tension", "Safe controlled rappelling descent"] },
      { day: "Thursday • Day 4", title: "Canopy Walkways & Twin 500ft Zipline", badge: "Zipline Flights", summary: "Stepping onto suspended wooden swinging bridges 35 feet up, clipping into the twin 500-foot ziplines, and soaring across the canyon.", bullets: ["Dual-carabiner smart clip transitions", "Canopy platform safety protocols", "High-speed 500-foot zipline flights"] },
      { day: "Friday • Day 5", title: "The Big Leap & Summit Celebration", badge: "Peak Summit", summary: "The famous 'Pamper Pole' trapeze leap, final speed climbing tournament, parent observation flights, and Summit medals.", bullets: ["30ft High-Pole Trapeze Leap challenge", "Climbing tournament finals with parent cheer squad", "Eagle Peak Summit Master ribbons and awards"] }
    ],
    instructor: {
      name: "Austin Briggs",
      role: "Lead Ropes Course Director",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      bio: "Austin is an ACCT Certified Course Manager and AMGA Single Pitch Instructor with 9 years directing high-ropes and alpine challenge courses. He specializes in turning fear into empowering breakthrough moments.",
      certifications: ["ACCT Level 2 Challenge Course Manager", "AMGA Certified Single Pitch Instructor"]
    },
    reviews: [
      { name: "Danielle Cooper", meta: "Parent of 14-year-old camper • Attended Summer 2025", stars: 5, quote: "My teen was afraid of heights and hesitated on Day 1. By Thursday he was doing the 500ft zipline with arms wide open! The safety standards here are unbeatable." },
      { name: "Jason Brooks", meta: "Parent of 12-year-old camper • Attended Summer 2025", stars: 5, quote: "Fantastic instructors who know how to motivate teenagers. He came home every day full of adrenaline, stories, and pride." }
    ],
    faqs: [
      { q: "What safety equipment is used?", a: "All campers wear Petzl climbing helmets and CE/UIAA certified full-body climbing harnesses. Our courses use continuous belay systems where campers cannot accidentally unclip." },
      { q: "What if my child gets scared at the top?", a: "Instructors practice 'Challenge by Choice'. Campers are never forced; guides gently coach them through breathwork, and safe lower-downs are always immediately available." },
      { q: "What is the weight or height limit?", a: "Campers must weigh between 50 lbs and 250 lbs to safely operate within the autobelay and zipline manufacturer safety ratings." },
      { q: "What shoes are required?", a: "Closed-toe sneakers with good rubber grip or climbing shoes. Crocs, sandals, and boots are not permitted on the course." }
    ],
    related: ["prog-5", "prog-15", "prog-21"]
  }
};

// Fallback generator for remaining programs (prog-7 to prog-25) to ensure 100% complete coverage
const PROGRAM_META_CATALOG = [
  {
    "id": "prog-1",
    "title": "Junior Robotics & Python Coding",
    "track": "STEM & Tech",
    "badgeClass": "badge-tag-primary",
    "age": "Ages 8–14",
    "price": 395,
    "rating": 4.9,
    "reviewsCount": 50,
    "spotsLeft": "6 spots left",
    "desc": "Hands-on LEGO Spike Prime robotics, sensor coding, drone flight simulation, and arcade game design.",
    "image": "assets/images/junior_robotics_python_coding.jpeg"
  },
  {
    "id": "prog-2",
    "title": "All-Star Sports & Athletics Camp",
    "track": "Sports",
    "badgeClass": "badge-tag-accent",
    "age": "Ages 7–12",
    "price": 360,
    "rating": 4.8,
    "reviewsCount": 42,
    "spotsLeft": "4 spots left",
    "desc": "Soccer skills, basketball tournaments, track & field dashes, and collaborative teamwork relay challenges.",
    "image": "assets/images/all_star_sports_athletics.jpeg"
  },
  {
    "id": "prog-3",
    "title": "Little Picassos Art & Pottery Studio",
    "track": "Fine Arts",
    "badgeClass": "badge-tag-highlight",
    "age": "Ages 5–10",
    "price": 340,
    "rating": 4.9,
    "reviewsCount": 62,
    "spotsLeft": "Available",
    "desc": "Canvas acrylic painting, ceramic pottery wheel spinning, tie-dye textiles, and Friday parent art gala.",
    "image": "assets/images/Art_and_pottery_studio_202608241021.jpeg"
  },
  {
    "id": "prog-4",
    "title": "Splash & Swim Water Safari",
    "track": "Aquatics",
    "badgeClass": "badge-tag-secondary",
    "age": "Ages 4–9",
    "price": 350,
    "rating": 4.9,
    "reviewsCount": 59,
    "spotsLeft": "Available",
    "desc": "Certified stroke lessons, water safety drills, splash obstacle races, and pool games with 1:4 lifeguard supervision.",
    "image": "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-5",
    "title": "Wilderness Survival & Bushcraft Expedition",
    "track": "Nature",
    "badgeClass": "badge-tag-primary",
    "age": "Ages 10–16",
    "price": 380,
    "rating": 5,
    "reviewsCount": 45,
    "spotsLeft": "5 spots left",
    "desc": "Shelter building, topographical compass navigation, solar water purification, and leave-no-trace trail hiking.",
    "image": "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-6",
    "title": "High-Ropes & Rock Wall Challenge",
    "track": "Adventure",
    "badgeClass": "badge-tag-accent",
    "age": "Ages 11–16",
    "price": 410,
    "rating": 5,
    "reviewsCount": 43,
    "spotsLeft": "3 spots left",
    "desc": "40-foot rock climbing tower, twin 500-foot ziplines, canopy bridges, and confidence-building aerial obstacles.",
    "image": "assets/images/high_ropes_challenge_course.jpg"
  },
  {
    "id": "prog-7",
    "title": "Broadway Stars Musical Theater & Drama",
    "track": "Theater",
    "badgeClass": "badge-tag-highlight",
    "age": "Ages 8–15",
    "price": 370,
    "rating": 4.8,
    "reviewsCount": 61,
    "spotsLeft": "Available",
    "desc": "Vocal warmups, stage choreography, improv theater games, costume design, and a Friday amphitheater production.",
    "image": "assets/images/musical_theater_camp.jpg"
  },
  {
    "id": "prog-8",
    "title": "Minecraft World Architect & 3D Design",
    "track": "STEM",
    "badgeClass": "badge-tag-primary",
    "age": "Ages 9–15",
    "price": 390,
    "rating": 4.9,
    "reviewsCount": 65,
    "spotsLeft": "6 spots left",
    "desc": "Custom Redstone logic circuitry, 3D structure modeling, server architecture, and multiplayer cooperative challenges.",
    "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-9",
    "title": "Junior MasterChef Culinary Academy",
    "track": "Culinary",
    "badgeClass": "badge-tag-accent",
    "age": "Ages 8–14",
    "price": 395,
    "rating": 4.9,
    "reviewsCount": 59,
    "spotsLeft": "Available",
    "desc": "Knife safety, artisan bread baking, handmade pasta making, kitchen chemistry, and Friday mystery box cook-off.",
    "image": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-10",
    "title": "Lake Kayak, Canoe & Paddleboard Safari",
    "track": "Aquatics",
    "badgeClass": "badge-tag-secondary",
    "age": "Ages 10–16",
    "price": 385,
    "rating": 4.8,
    "reviewsCount": 49,
    "spotsLeft": "Available",
    "desc": "Paddle stroke mechanics, tandem canoe expeditions, balance paddleboarding, and shoreline nature mapping.",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-11",
    "title": "Digital Photography & Video Production",
    "track": "Digital Arts",
    "badgeClass": "badge-tag-highlight",
    "age": "Ages 11–16",
    "price": 375,
    "rating": 4.9,
    "reviewsCount": 69,
    "spotsLeft": "Available",
    "desc": "DSLR camera composition, lighting rigs, Adobe Premiere editing, sound design, and short film festival screening.",
    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-12",
    "title": "AI, Machine Learning & Game Dev Lab",
    "track": "STEM",
    "badgeClass": "badge-tag-primary",
    "age": "Ages 12–16",
    "price": 430,
    "rating": 5,
    "reviewsCount": 63,
    "spotsLeft": "2 spots left",
    "desc": "Build smart AI bots, code 2D/3D games in Godot and Unity, and explore computer vision through hands-on projects.",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-13",
    "title": "Rock Band & Electric Music Studio",
    "track": "Music",
    "badgeClass": "badge-tag-highlight",
    "age": "Ages 9–15",
    "price": 380,
    "rating": 4.8,
    "reviewsCount": 69,
    "spotsLeft": "Available",
    "desc": "Electric guitar, drums, synth keyboards, vocal harmony, multi-track audio mixing, and live Friday concert.",
    "image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-14",
    "title": "Mountain Biking & Trail Blazers",
    "track": "Adventure",
    "badgeClass": "badge-tag-accent",
    "age": "Ages 11–16",
    "price": 390,
    "rating": 4.9,
    "reviewsCount": 42,
    "spotsLeft": "Available",
    "desc": "Singletrack handling, berm turns, bike maintenance, trail etiquette, and guided alpine forest expeditions.",
    "image": "https://images.unsplash.com/photo-1475669698648-2f144fcaaeb1?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-15",
    "title": "Forest Ecology & Young Naturalists",
    "track": "Nature",
    "badgeClass": "badge-tag-primary",
    "age": "Ages 6–11",
    "price": 330,
    "rating": 4.8,
    "reviewsCount": 64,
    "spotsLeft": "Available",
    "desc": "Stream macroinvertebrate sampling, native tree identification, birdwatching with binoculars, and terrarium building.",
    "image": "assets/images/forest_ecology_camp.jpg"
  },
  {
    "id": "prog-16",
    "title": "Leaders-in-Training (LIT) Fellowship",
    "track": "Leadership",
    "badgeClass": "badge-tag-secondary",
    "age": "Ages 15–18",
    "price": 295,
    "rating": 5,
    "reviewsCount": 56,
    "spotsLeft": "4 spots left",
    "desc": "Youth counseling mentorship, First Aid/CPR credentialing, event coordination, and service hours certification.",
    "image": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-17",
    "title": "Equestrian Riding & Horsemanship",
    "track": "Equestrian",
    "badgeClass": "badge-tag-accent",
    "age": "Ages 8–16",
    "price": 440,
    "rating": 4.9,
    "reviewsCount": 40,
    "spotsLeft": "2 spots left",
    "desc": "English and Western arena riding, grooming, horse psychology, tacking, and scenic trail riding with certified trainers.",
    "image": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-18",
    "title": "Martial Arts & Self-Defense Academy",
    "track": "Sports",
    "badgeClass": "badge-tag-accent",
    "age": "Ages 7–13",
    "price": 350,
    "rating": 4.8,
    "reviewsCount": 65,
    "spotsLeft": "Available",
    "desc": "Karate kata form, Brazilian Jiu-Jitsu fundamentals, agility obstacle courses, focus mindfulness, and belt grading.",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-19",
    "title": "Chess Grandmasters & Strategic Minds",
    "track": "Strategy",
    "badgeClass": "badge-tag-primary",
    "age": "Ages 6–14",
    "price": 320,
    "rating": 4.9,
    "reviewsCount": 48,
    "spotsLeft": "Available",
    "desc": "Opening theory, middle-game tactics, endgame mates, blitz clocks, and USCF-rated simulated tournament ladders.",
    "image": "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-20",
    "title": "Circus Arts, Acrobatics & Aerial Silks",
    "track": "Acrobatics",
    "badgeClass": "badge-tag-highlight",
    "age": "Ages 7–14",
    "price": 380,
    "rating": 4.8,
    "reviewsCount": 61,
    "spotsLeft": "Available",
    "desc": "Trapeze safety, aerial silk poses, juggling clubs, unicycle balance, and choreographed Friday big top showcase.",
    "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-21",
    "title": "Junior Tennis & Racket Sports Elite",
    "track": "Sports",
    "badgeClass": "badge-tag-accent",
    "age": "Ages 8–15",
    "price": 365,
    "rating": 4.9,
    "reviewsCount": 65,
    "spotsLeft": "Available",
    "desc": "Forehand top-spin, slice backhands, overhead volleys, serve velocity radar, and pickleball doubles matches.",
    "image": "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-22",
    "title": "3D Printing, CAD Modeling & Maker Lab",
    "track": "STEM",
    "badgeClass": "badge-tag-primary",
    "age": "Ages 10–16",
    "price": 410,
    "rating": 4.9,
    "reviewsCount": 49,
    "spotsLeft": "3 spots left",
    "desc": "Autodesk Tinkercad, resin slicing, dual-extruder 3D printing, laser wood etching, and custom drone chassis design.",
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-23",
    "title": "Little Explorers Sensory & Nature Safari",
    "track": "Mini Camp",
    "badgeClass": "badge-tag-secondary",
    "age": "Ages 4–7",
    "price": 310,
    "rating": 4.8,
    "reviewsCount": 67,
    "spotsLeft": "Available",
    "desc": "Pinecone crafts, tactile sensory bins, butterfly garden walks, storytelling under the canopy, and structured nap pods.",
    "image": "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80"
  },
  {
    "id": "prog-24",
    "title": "Archery & Target Marksmanship Academy",
    "track": "Marksmanship",
    "badgeClass": "badge-tag-accent",
    "age": "Ages 9–16",
    "price": 355,
    "rating": 4.9,
    "reviewsCount": 60,
    "spotsLeft": "5 spots left",
    "desc": "Recurve bow stance, breathing control, precision bullseye scoring, safety protocols, and Robin Hood team challenges.",
    "image": "assets/images/camp_archery_lesson.jpg"
  },
  {
    "id": "prog-25",
    "title": "Space Exploration & Rocket Engineering",
    "track": "AeroSpace",
    "badgeClass": "badge-tag-primary",
    "age": "Ages 8–15",
    "price": 415,
    "rating": 5,
    "reviewsCount": 63,
    "spotsLeft": "4 spots left",
    "desc": "Solid-fuel model rocketry, aerodynamic fin physics, telemetry altitude tracking, and lunar rover design challenges.",
    "image": "assets/images/Space_exploration_and_rocket_engineering_202608241141.jpeg"
  }
];

// Populate remaining programs dynamically with their exact corresponding card images
PROGRAM_META_CATALOG.forEach(meta => {
  if (!CAMPSPHERE_PROGRAMS[meta.id]) {
    CAMPSPHERE_PROGRAMS[meta.id] = {
      id: meta.id,
      title: meta.title,
      track: meta.track,
      badgeClass: meta.badgeClass,
      age: meta.age,
      price: meta.price,
      rating: meta.rating,
      reviewsCount: meta.reviewsCount || 52,
      spotsLeft: meta.spotsLeft || "Available",
      desc: meta.desc,
      images: [
        meta.image,
        "assets/images/junior_robotics_python_coding.jpeg",
        "assets/images/all_star_sports_athletics.jpeg",
        "assets/images/high_ropes_challenge_course.jpg"
      ],
      locationBadge: "CampSphere Main Campus",
      quickFacts: {
        age: meta.age,
        hours: "8:30 AM – 4:00 PM",
        ratio: "1:5 Dedicated Ratio",
        skill: "All Skill Levels Welcome",
        meals: "Fresh Hot Lunch + 2 Snacks",
        takeHome: "Official Certificate & Project Kit"
      },
      pillars: [
        { icon: "bi-stars", color: "primary", title: "Hands-on Mastery", desc: `Comprehensive daily workshops exploring ${meta.track} coached by certified specialist instructors.` },
        { icon: "bi-people-fill", color: "accent", title: "Teamwork & Collaboration", desc: "Collaborative project challenges, peer communication routines, and daily encouragement circles." },
        { icon: "bi-water", color: "secondary", title: "Daily Recreation & Swimming", desc: "Supervised outdoor sports, team lawn games, and afternoon heated pool swim breaks." },
        { icon: "bi-award-fill", color: "warning", title: "Friday Showcase Gala", desc: "Culminating parent open house, live demonstrations, and official camper diploma awards." }
      ],
      curriculum: [
        { day: "Monday • Day 1", title: "Foundations & Safety Orientation", badge: "Kickoff", summary: `Introduction to safety rules, tool handling, team group sorting, and initial ${meta.track} practice.`, bullets: ["Team icebreakers and safety pledge", "Tool certification and gear fitting", "First hands-on foundation project"] },
        { day: "Tuesday • Day 2", title: "Core Skills & Progressive Drills", badge: "Skill Building", summary: "Deepening practical knowledge, instructor-guided skill drills, and collaborative team tasks.", bullets: ["Specialist skill progression", "1-on-1 counselor guidance", "Mid-day recreation & lawn games"] },
        { day: "Wednesday • Day 3", title: "Project Design & Creation", badge: "Creation", summary: "Campers begin designing, building, and testing their main week-long centerpiece project.", bullets: ["Project drafting & materials planning", "Hands-on creative construction", "Pool games & afternoon snack break"] },
        { day: "Thursday • Day 4", title: "Refinement & Practice Run", badge: "Testing", summary: "Polishing project details, trial demonstrations, peer feedback, and exhibition preparation.", bullets: ["Quality checks and performance tuning", "Dry-run presentation rehearsal", "Team building activities"] },
        { day: "Friday • Day 5", title: "Grand Finale & Parent Gala", badge: "Grand Finale", summary: "The culminating showcase! Live parent demonstrations, award ceremonies, and camper diplomas.", bullets: ["Live showcase and tournament finals", "Parent Open House & camper presentations", "Official CampSphere medals and certificates"] }
      ],
      instructor: {
        name: "Director & Specialist Team",
        role: `Lead Instructor for ${meta.track}`,
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        bio: `Our certified instructors have extensive experience in ${meta.track} curriculum with dedication to child safety, positive reinforcement, and inspiring confidence.`,
        certifications: ["Pediatric CPR & First Aid Certified", "ACA Accredited Lead"]
      },
      reviews: [
        { name: "Verified Camp Parent", meta: "Parent of enrolled camper • Summer 2025", stars: 5, quote: `Our child had a wonderful week at ${meta.title}! The staff was attentive and communicative every day.` },
        { name: "Summer Family", meta: "Parent of enrolled camper • Summer 2025", stars: 5, quote: "Wonderful balance of learning, creative freedom, and outdoor fun. We are already booking our next session!" }
      ],
      faqs: [
        { q: "Who can enroll in this program?", a: `This program is tailored for campers ${meta.age}. No prior experience required; beginners and experienced campers are grouped appropriately.` },
        { q: "Are lunches and snacks included?", a: "Yes! Fresh chef-prepared hot lunch and two daily snacks are fully included with tuition." },
        { q: "What is the cancellation policy?", a: "Full 100% refund up to 14 days before your camp session begins with zero transfer fees." },
        { q: "What should campers bring?", a: "Comfortable athletic attire, closed-toe sneakers, refillable water bottle, and a labeled swimsuit/towel." }
      ],
      related: ["prog-1", "prog-2", "prog-3"]
    };
  }
});

// Render Function for program-details.html
function renderProgramDetailsPage() {
  if (!document.getElementById('mainCampTitle')) return;

  const urlParams = new URLSearchParams(window.location.search);
  const progId = urlParams.get('id') || 'prog-1';
  const prog = CAMPSPHERE_PROGRAMS[progId] || CAMPSPHERE_PROGRAMS['prog-1'];

  // Update Page Meta & Title
  document.title = `${prog.title} | CampSphere Summer 2026`;
  const breadcrumbCurrent = document.getElementById('breadcrumbProgramTitle');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = prog.title;

  // Update Badges & Titles
  const trackBadge = document.getElementById('detailTrackBadge');
  if (trackBadge) {
    trackBadge.textContent = prog.track;
    trackBadge.className = `badge-tag ${prog.badgeClass}`;
  }

  const ageBadge = document.getElementById('detailAgeBadge');
  if (ageBadge) ageBadge.textContent = prog.age;

  const spotsBadge = document.getElementById('detailSpotsBadge');
  if (spotsBadge) spotsBadge.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i> ${prog.spotsLeft}`;

  const ratingEl = document.getElementById('detailRatingScore');
  if (ratingEl) ratingEl.innerHTML = `<i class="bi bi-star-fill text-warning"></i> <strong class="text-dark ms-1">${prog.rating}</strong> (${prog.reviewsCount} parent reviews)`;

  const mainTitle = document.getElementById('mainCampTitle');
  if (mainTitle) mainTitle.textContent = prog.title;

  const mainDesc = document.getElementById('mainCampDesc');
  if (mainDesc) mainDesc.textContent = prog.desc;

  // Update Images
  const mainImg = document.getElementById('mainCampImage');
  if (mainImg && prog.images.length) mainImg.src = prog.images[0];

  const locationBadge = document.getElementById('detailLocationBadge');
  if (locationBadge) locationBadge.innerHTML = `<i class="bi bi-camera-fill me-1"></i> ${prog.locationBadge}`;



  // Update Quick Facts Matrix
  if (prog.quickFacts) {
    const ageEl = document.getElementById('factAge');
    if (ageEl) ageEl.textContent = prog.quickFacts.age;
    const hoursEl = document.getElementById('factHours');
    if (hoursEl) hoursEl.textContent = prog.quickFacts.hours;
    const ratioEl = document.getElementById('factRatio');
    if (ratioEl) ratioEl.textContent = prog.quickFacts.ratio;
    const skillEl = document.getElementById('factSkill');
    if (skillEl) skillEl.textContent = prog.quickFacts.skill;
    const mealsEl = document.getElementById('factMeals');
    if (mealsEl) mealsEl.textContent = prog.quickFacts.meals;
    const takeHomeEl = document.getElementById('factTakeHome');
    if (takeHomeEl) takeHomeEl.textContent = prog.quickFacts.takeHome;
  }

  // Update Pricing in Subnav & Sidebar
  document.querySelectorAll('.detail-price-display').forEach(el => {
    el.textContent = `$${prog.price}`;
  });

  const baseTuitionDisplay = document.getElementById('detailBaseTuitionDisplay');
  if (baseTuitionDisplay) baseTuitionDisplay.textContent = `$${prog.price}.00`;
  window.currentProgramBasePrice = prog.price;
  if (typeof window.updateDetailTuitionCalc === 'function') {
    window.updateDetailTuitionCalc();
  }

  // Update Wishlist buttons
  document.querySelectorAll('.btn-wishlist-detail').forEach(btn => {
    btn.setAttribute('data-program-id', prog.id);
    btn.setAttribute('data-program-title', prog.title);
  });

  // Update Enroll in Camp buttons on Details page to pass exact program ID
  document.querySelectorAll('a[href^="enrollment.html"]').forEach(btn => {
    btn.href = `enrollment.html?program=${prog.id}`;
  });
  const bookingForm = document.getElementById('campBookingForm');
  if (bookingForm) {
    bookingForm.action = `enrollment.html?program=${prog.id}`;
  }

  // Update Instructor
  if (prog.instructor) {
    const instName = document.getElementById('instructorName');
    if (instName) instName.textContent = prog.instructor.name;
    const heroInstName = document.getElementById('heroInstructorName');
    if (heroInstName) heroInstName.textContent = `Led by ${prog.instructor.name.split(',')[0]}`;
    const heroInstThumb = document.getElementById('heroInstructorThumb');
    if (heroInstThumb) heroInstThumb.src = prog.instructor.photo;
    const instRole = document.getElementById('instructorRole');
    if (instRole) instRole.textContent = prog.instructor.role;
    const instBio = document.getElementById('instructorBio');
    if (instBio) instBio.textContent = prog.instructor.bio;
    const instPhoto = document.getElementById('instructorPhoto');
    if (instPhoto) instPhoto.src = prog.instructor.photo;
  }

  // Update Curriculum Blueprint
  if (prog.curriculum && prog.curriculum.length >= 5) {
    prog.curriculum.forEach((c, i) => {
      const dayBox = document.getElementById(`day${i+1}`);
      if (dayBox) {
        dayBox.innerHTML = `
          <div class="curriculum-detail-box">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold text-navy mb-0">${c.day}: ${c.title}</h5>
              <span class="badge bg-primary-light text-primary">${c.badge}</span>
            </div>
            <p class="text-muted small">${c.summary}</p>
            <ul class="list-unstyled mb-0 small text-muted">
              ${c.bullets.map(b => `<li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i> ${b}</li>`).join('')}
            </ul>
          </div>
        `;
      }
    });
  }

  // Update Learning Pillars
  const pillarsContainer = document.getElementById('pillarsContainer');
  if (pillarsContainer && prog.pillars && prog.pillars.length) {
    pillarsContainer.innerHTML = prog.pillars.map(p => `
      <div class="col-md-6">
        <div class="p-3 bg-white rounded-3 border h-100 shadow-xs">
          <div class="d-flex align-items-center gap-3 mb-2">
            <div class="rounded-circle bg-${p.color || 'primary'}-light text-${p.color || 'primary'} d-flex align-items-center justify-content-center" style="width: 44px; height: 44px; font-size: 1.25rem;">
              <i class="bi ${p.icon || 'bi-stars'}"></i>
            </div>
            <h6 class="fw-bold mb-0 text-navy">${p.title}</h6>
          </div>
          <p class="text-muted small mb-0">${p.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Update Related Programs
  const relatedContainer = document.getElementById('relatedProgramsContainer');
  if (relatedContainer && prog.related && prog.related.length) {
    const relatedCards = prog.related.map(relId => {
      const relProg = CAMPSPHERE_PROGRAMS[relId];
      if (!relProg) return '';
      return `
        <div class="col-lg-4 col-md-6">
          <div class="program-card h-100">
            <div class="program-thumb">
              <img src="${relProg.images[0]}" alt="${relProg.title}">
              <span class="badge-tag ${relProg.badgeClass} program-badge">${relProg.track}</span>
              <span class="program-price-tag">$${relProg.price} / wk</span>
            </div>
            <div class="program-body">
              <div class="program-meta">
                <span><i class="bi bi-person-fill text-primary"></i> ${relProg.age}</span>
                <span class="rating-badge ms-auto"><i class="bi bi-star-fill text-warning"></i> ${relProg.rating}</span>
              </div>
              <h4 class="program-title"><a href="program-details.html?id=${relProg.id}">${relProg.title}</a></h4>
              <p class="program-desc">${relProg.desc}</p>
              <div class="program-footer">
                <a href="program-details.html?id=${relProg.id}" class="fw-bold text-primary">Learn Details <i class="bi bi-chevron-right"></i></a>
                <a href="enrollment.html?program=${relProg.id}" class="btn btn-sm btn-accent">Enroll Now</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
    if (relatedCards) relatedContainer.innerHTML = relatedCards;
  }

  // Trigger base calculation update
  if (window.updateDetailTuitionCalc) {
    window.currentProgramBasePrice = prog.price;
    window.updateDetailTuitionCalc();
  }
}

// Expose dataset globally
window.CAMPSPHERE_PROGRAMS = CAMPSPHERE_PROGRAMS;

document.addEventListener('DOMContentLoaded', renderProgramDetailsPage);
