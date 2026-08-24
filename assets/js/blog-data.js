/**
 * CampSphere - Full 8 Blog Articles Dataset & Detail Rendering Engine
 * assets/js/blog-data.js
 */

const CAMPSPHERE_BLOG_ARTICLES = {
  "article-1": {
    id: "article-1",
    title: "The Ultimate Summer Camp Packing Checklist for Parents (2026 Edition)",
    category: "Packing & Prep",
    categorySlug: "prep",
    date: "May 24, 2026",
    readTime: "6 Min Read",
    author: {
      name: "Dr. Rachel Adams",
      role: "Executive Camp Director • 18+ Yrs Experience",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
    },
    heroImage: "assets/images/Summer_camp_packing_checklist_202608241109.jpeg",
    lead: "Preparing your child for summer camp shouldn't feel overwhelming. With the right checklist and organization strategies, packing can become an exciting ritual that builds anticipation, confidence, and childhood independence.",
    contentHtml: `
      <h3>1. Daily Backpack Essentials</h3>
      <p>
        Every camper should arrive each morning with a labeled, lightweight backpack containing everyday essentials:
      </p>
      <ul class="article-checklist">
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Refillable Water Bottle:</strong> Minimum 24 oz insulated bottle, clearly labeled with your child’s first and last name. Hydration refill stations are available every 50 yards on campus.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Broad-Spectrum Sunscreen (SPF 30+):</strong> Waterproof stick or lotion (labeled). Counselors supervise group reapplication before all outdoor track rotations.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>UV Sun Hat & Polarized Sunglasses:</strong> Wide-brim or baseball cap designed for high-motion sports and trail runs.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Insect Repellent:</strong> DEET-free natural eucalyptus or picaridin botanical spray for wooded adventure trails.</div></li>
      </ul>

      <div class="article-tip-box">
        <h5 class="fw-bold text-navy mb-2"><i class="bi bi-lightbulb-fill text-warning me-2"></i> Pro Camp Tip: The "Label Everything" Rule</h5>
        <p class="mb-0">
          Over 80% of lost camp items look identical (standard water bottles and blue towels). Use waterproof label tape or permanent laundry markers on all clothing tags, swim caps, and footwear to guarantee immediate return.
        </p>
      </div>

      <h3>2. Swim & Aquatics Gear</h3>
      <p>
        Whether your child is enrolled in swimming lessons or recreational pool splash sessions, keep swim gear packed in a separate waterproof bag:
      </p>
      <ul class="article-checklist">
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>1 Comfortable Swimsuit:</strong> UV-protective quick-dry rash guard recommended for sun safety.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Microfiber Quick-Dry Towel:</strong> Lightweight and highly absorbent to prevent heavy wet gear.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Slip-resistant Water Shoes / Flip Flops:</strong> Designed for poolside grip and changing locker navigation.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Anti-Fog Swim Goggles:</strong> Sized comfortably with silicone straps.</div></li>
      </ul>

      <h3>3. What to Leave at Home</h3>
      <p>
        To maintain our immersive screen-free community and protect personal valuables, please do NOT pack:
      </p>
      <ul class="article-checklist">
        <li class="text-danger"><i class="bi bi-x-circle-fill text-danger"></i> <div><strong>Electronics:</strong> Smartphones, iPads, smartwatches, or handheld gaming devices.</div></li>
        <li class="text-danger"><i class="bi bi-x-circle-fill text-danger"></i> <div><strong>Valuables:</strong> Expensive jewelry, family heirlooms, or sentimental toys that cannot get dirty.</div></li>
        <li class="text-danger"><i class="bi bi-x-circle-fill text-danger"></i> <div><strong>Outside Food:</strong> Snacks containing peanuts, tree nuts, or unpackaged homemade items to safeguard campers with severe allergies.</div></li>
      </ul>
    `,
    comments: [
      { name: "Elena Rodriguez", date: "May 25, 2026", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80", text: "The tip about labeling the water bottle was a lifesaver last summer! Our son lost his twice and both times the counselor returned it immediately." },
      { name: "Marcus Thorne", date: "May 26, 2026", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80", text: "Do counselors provide backup sunscreen if our child runs out during the week?" }
    ],
    relatedIds: ["article-2", "article-3"]
  },

  "article-2": {
    id: "article-2",
    title: "Why STEM & Robotics Camps Beat the Summer Learning Slump",
    category: "STEM & Robotics",
    categorySlug: "stem",
    date: "May 18, 2026",
    readTime: "5 Min Read",
    author: {
      name: "Jessica Vance, M.S.",
      role: "Director of Robotics & STEM Education",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
    },
    heroImage: "assets/images/STEM_robotics_camps_prevent_learning_slump_202608241110.jpeg",
    lead: "Studies show students lose up to two months of math and science concepts during traditional summer breaks. Hands-on coding and robotics turn abstract theory into tangible, exciting invention.",
    contentHtml: `
      <h3>1. The Reality of Summer Brain Drain</h3>
      <p>
        Educators refer to the summer learning slump as the cumulative decline in academic performance between June and August. When young minds go disengaged from logical problem solving, returning to school in September can feel like an uphill struggle.
      </p>

      <div class="article-tip-box">
        <h5 class="fw-bold text-navy mb-2"><i class="bi bi-lightbulb-fill text-warning me-2"></i> Experiential vs. Rote Learning</h5>
        <p class="mb-0">
          Rather than memorizing formulas, robotics campers immediately see cause and effect: if their Python code contains a syntax error, their motor won't turn. Debugging teaches resilient trial-and-error reasoning that textbooks cannot replicate.
        </p>
      </div>

      <h3>2. How Robotics Keeps Neural Pathways Firing</h3>
      <p>
        Project-based robotics combines mechanical engineering, coding logic, and spatial physics:
      </p>
      <ul class="article-checklist">
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Spatial & Mechanical Assembly:</strong> Campers calculate gear ratios, torque, and structural balance while snapping together functional dual-motor chassis.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Algorithmic Thinking:</strong> Writing autonomous line-tracking routines requires campers to formulate nested conditionals and feedback loop algorithms.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Collaborative Team Engineering:</strong> Working in pairs mirrors modern software design studios, teaching active communication and code reviews.</div></li>
      </ul>

      <h3>3. Blending High-Tech Labs with High-Energy Outdoors</h3>
      <p>
        At CampSphere, robotics is never a stationary screen marathon. Morning coding sprints in our air-conditioned Innovation Lab are balanced by afternoon kayak races and archery tournaments, ensuring balanced physical and intellectual vitality.
      </p>
    `,
    comments: [
      { name: "David Chen", date: "May 20, 2026", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80", text: "My daughter built her first autonomous maze robot last July and went into 6th grade math with so much extra confidence." },
      { name: "Patricia Gomez", date: "May 22, 2026", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80", text: "Are the coding laptops provided on campus, or do we bring our own?" }
    ],
    relatedIds: ["article-1", "article-7"]
  },

  "article-3": {
    id: "article-3",
    title: "Helping Shy Children Make Friends at Summer Camp",
    category: "Parenting & Growth",
    categorySlug: "parenting",
    date: "May 12, 2026",
    readTime: "5 Min Read",
    author: {
      name: "David Kim, M.Ed.",
      role: "Youth Counselor & Child Development Specialist",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    heroImage: "assets/images/Helping_shy_children_make_friends_202608241112.jpeg",
    lead: "Stepping into a bustling camp full of unfamiliar faces can feel daunting for introverted or sensitive children. With thoughtful counselor scaffolding, camp becomes their greatest breakthrough for social confidence.",
    contentHtml: `
      <h3>1. Understanding First-Day Social Anxiety</h3>
      <p>
        It is completely natural for children to feel hesitant on Day 1. Camp removes the rigid social hierarchies of the school classroom and offers a clean slate where every child can reinvent their comfort zone through shared fun.
      </p>

      <div class="article-tip-box">
        <h5 class="fw-bold text-navy mb-2"><i class="bi bi-lightbulb-fill text-warning me-2"></i> Counselor Scaffolding Strategy</h5>
        <p class="mb-0">
          Our counselors are trained in unobtrusive peer matchmaking. Instead of putting shy campers on the spot with loud group introductions, we pair them with a welcoming "Camp Buddy" for low-stakes dual tasks like gathering art supplies or setting up the canoe oars.
        </p>
      </div>

      <h3>2. Practical Strategies Parents Can Practice at Home</h3>
      <ul class="article-checklist">
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Rehearse the Simple Opening:</strong> Role-play asking: <em>"Can I join your team?"</em> or <em>"What track are you doing this afternoon?"</em></div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Focus on Shared Interests:</strong> Encourage your child to share their excitement about Minecraft, LEGO, swimming, or comic drawing.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Validate Without Magnifying Fear:</strong> Say <em>"It's normal to feel nervous, and I know you'll find friendly teammates by lunchtime"</em> rather than over-focusing on worries.</div></li>
      </ul>

      <h3>3. Celebrating Micro-Victories</h3>
      <p>
        Making lifelong friends doesn't happen in the first 5 minutes. Celebrate the small milestones: sitting with someone new at lunch, sharing a high-five after a team relay, or singing a funny campfire song together.
      </p>
    `,
    comments: [
      { name: "Samantha Miller", date: "May 14, 2026", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80", text: "Our 8-year-old was terrified on Monday morning and by Wednesday she was singing camp songs the entire drive home. Counselors are truly wonderful." }
    ],
    relatedIds: ["article-8", "article-1"]
  },

  "article-4": {
    id: "article-4",
    title: "Sun Protection & Hydration Secrets for Active Campers",
    category: "Health & Safety",
    categorySlug: "safety",
    date: "May 05, 2026",
    readTime: "4 Min Read",
    author: {
      name: "Nurse Brenda Hayes, RN",
      role: "Head of Camp Health & Medical Services",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80"
    },
    heroImage: "assets/images/Campers_sun_protection_and_hydration_202608241115.jpeg",
    lead: "Summer outdoor play demands vigilant sun care and continuous hydration. Learn our camp medical team's proven routines to keep kids sunburn-free, energized, and ready for adventure.",
    contentHtml: `
      <h3>1. The 2-Hour Sunscreen Reapplication Rule</h3>
      <p>
        Applying sunscreen before dropping off your child is critical, but by 10:30 AM, sweat and swimming will have degraded that initial protective barrier. Our staff enforces scheduled sunscreen breaks before every outdoor activity switch.
      </p>

      <div class="article-tip-box">
        <h5 class="fw-bold text-navy mb-2"><i class="bi bi-lightbulb-fill text-warning me-2"></i> The Best Sunscreen for Camp</h5>
        <p class="mb-0">
          We strongly recommend mineral stick sunscreen (Zinc Oxide or Titanium Dioxide) for faces and waterproof SPF 50 lotion for arms and legs. Stick sunscreens won't run into children's eyes during vigorous physical play.
        </p>
      </div>

      <h3>2. Electrolyte Balance vs Plain Water</h3>
      <p>
        Children often forget to drink water until they are already experiencing mild dehydration. We institute "Hydration Checkpoints" every 45 minutes across all athletic and outdoor fields:
      </p>
      <ul class="article-checklist">
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Insulated Water Bottles:</strong> Keeping water chilled makes children drink twice as much volume throughout hot afternoons.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Hydrating Fruits at Snack Breaks:</strong> We serve chilled watermelon, orange wedges, and cucumber slices that naturally restore electrolytes.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Shade Rotation:</strong> High-intensity sports are limited to 30-minute intervals followed by shaded tactical strategy discussions.</div></li>
      </ul>
    `,
    comments: [
      { name: "Robert Taylor", date: "May 08, 2026", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80", text: "The mineral stick sunscreen recommendation is a game changer. No more stinging tears during afternoon soccer matches!" }
    ],
    relatedIds: ["article-6", "article-1"]
  },

  "article-5": {
    id: "article-5",
    title: "Essential Wilderness & Survival Skills for Young Explorers",
    category: "Outdoor Adventure",
    categorySlug: "adventure",
    date: "April 28, 2026",
    readTime: "6 Min Read",
    author: {
      name: "Marcus Thorne",
      role: "Head Wilderness & Survival Mentor",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    heroImage: "assets/images/Survival_skills_for_young_explorers_202608241117.jpeg",
    lead: "From learning compass orienteering to building weather-tight forest shelters, bushcraft instills self-reliance, environmental stewardship, and situational problem-solving in young adventurers.",
    contentHtml: `
      <h3>1. Why Wilderness Education Still Matters in a Digital World</h3>
      <p>
        In an era of GPS and instant delivery, young people rarely experience the profound satisfaction of reading natural terrain, building something useful with their bare hands, or understanding the weather patterns in the sky.
      </p>

      <div class="article-tip-box">
        <h5 class="fw-bold text-navy mb-2"><i class="bi bi-lightbulb-fill text-warning me-2"></i> Safety First Philosophy</h5>
        <p class="mb-0">
          All wilderness skills at CampSphere are taught under strict 1:5 instructor supervision in designated teaching clearings. Campers master tool safety protocols, emergency whistle signaling, and the universal "Stop, Think, Observe, Plan" (S.T.O.P.) rule.
        </p>
      </div>

      <h3>2. Core Bushcraft Skills Every Camper Learns</h3>
      <ul class="article-checklist">
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Magnetic Compass & Topo Map Navigation:</strong> Reading elevation contours, calculating bearings, and navigating outdoor geocaching trails.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Leave-No-Trace Firecraft:</strong> Understanding tinder, kindling, and fuel structures using flint strikers in monitored fire rings.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Practical Knots & Lashings:</strong> Mastering the Bowline, Square Knot, Clove Hitch, and Taut-Line for lean-to tarp shelters.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Water Filtration Science:</strong> Constructing multi-layer sand, charcoal, and gravel filters to study natural purification.</div></li>
      </ul>
    `,
    comments: [
      { name: "Karen White", date: "April 30, 2026", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80", text: "My 11-year-old came home and demonstrated how to tie a bowline knot to secure our kayak on the roof rack. So proud!" }
    ],
    relatedIds: ["article-7", "article-1"]
  },

  "article-6": {
    id: "article-6",
    title: "Nut-Free & Allergy-Safe Fueling for High-Energy Days",
    category: "Health & Safety",
    categorySlug: "safety",
    date: "April 20, 2026",
    readTime: "5 Min Read",
    author: {
      name: "Chef Carlos Mendez",
      role: "Dining Director & Pediatric Nutritionist",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    heroImage: "assets/images/Nut-Free_Allergy-Safe_Fueling_202608241118.jpeg",
    lead: "Campers burn between 2,200 and 3,000 calories a day running, swimming, and exploring. Keeping them fueled safely without allergens requires thoughtful kitchen engineering.",
    contentHtml: `
      <h3>1. Our 100% Nut-Free Campus Standard</h3>
      <p>
        Severe peanut and tree nut allergies can cause life-threatening anaphylaxis in seconds. To guarantee safety for every child, CampSphere operates a strictly enforced peanut-free and tree-nut-free campus.
      </p>

      <div class="article-tip-box">
        <h5 class="fw-bold text-navy mb-2"><i class="bi bi-lightbulb-fill text-warning me-2"></i> Dedicated Allergy Prep Kitchen</h5>
        <p class="mb-0">
          Our culinary team utilizes color-coded prep stations and separate cookware for gluten-free, dairy-free, and egg-free meals to eliminate any possibility of cross-contamination.
        </p>
      </div>

      <h3>2. Nutrient-Dense Snack Combinations</h3>
      <ul class="article-checklist">
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Sunflower Butter & Apple Wedges:</strong> Creamy nut-free protein paired with natural fructose for sustained energy.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Oat & Pumpkin Seed Energy Bites:</strong> Honey-sweetened rolled oats with chia and flax seeds for slow-release carbs.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Fresh Hummus & Carrot Sticks:</strong> Hearty plant-based protein with crunchy dietary fiber.</div></li>
      </ul>
    `,
    comments: [
      { name: "Emily Watson", date: "April 22, 2026", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80", text: "As a parent of a son with severe peanut allergies, CampSphere is one of the only places where I sleep peacefully while he's at camp." }
    ],
    relatedIds: ["article-4", "article-1"]
  },

  "article-7": {
    id: "article-7",
    title: "Building Grit & Courage on the High Ropes Challenge Course",
    category: "Outdoor Adventure",
    categorySlug: "adventure",
    date: "April 14, 2026",
    readTime: "5 Min Read",
    author: {
      name: "Tyler Evans",
      role: "Lead Ropes & Climbing Instructor",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    heroImage: "assets/images/Building_grit_on_high_ropes_202608241120.jpeg",
    lead: "Perched 35 feet up in the California pines, navigating rope bridges and ziplines teaches youth how to manage healthy fear, trust their gear, and discover reservoirs of inner courage.",
    contentHtml: `
      <h3>1. The Difference Between Panic and Growth</h3>
      <p>
        Challenge courses are designed around the concept of 'Perceived Risk vs. Actual Safety'. The height and wobbling cables feel exhilaratingly perilous to a child, while our dual-continuous safety carabiner systems make falling impossible.
      </p>

      <div class="article-tip-box">
        <h5 class="fw-bold text-navy mb-2"><i class="bi bi-lightbulb-fill text-warning me-2"></i> Challenge by Choice Philosophy</h5>
        <p class="mb-0">
          We never force or pressure a camper to step onto a high element. Instead, counselors teach deep belly breathing, goal setting ('let's take just 3 steps and assess'), and cheer every camper's personal threshold.
        </p>
      </div>

      <h3>2. Lifelong Psychological Benefits of High Ropes</h3>
      <ul class="article-checklist">
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Overcoming Self-Doubt:</strong> Reaching the opposite platform proves to a child that their fears do not define their capabilities.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Peer Encouragement Culture:</strong> Campers on the ground actively chant and encourage their teammates on the course.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Kinesthetic Balance & Agility:</strong> Building core coordination and spatial awareness across dynamic obstacles.</div></li>
      </ul>
    `,
    comments: [
      { name: "George Clark", date: "April 16, 2026", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80", text: "My twin boys were afraid of heights before last summer. By Friday, they were asking to do the 400-foot zipline twice!" }
    ],
    relatedIds: ["article-5", "article-3"]
  },

  "article-8": {
    id: "article-8",
    title: "The Neurological Power of Screen-Free Summers for Teens",
    category: "Parenting & Growth",
    categorySlug: "parenting",
    date: "April 08, 2026",
    readTime: "6 Min Read",
    author: {
      name: "Dr. Rachel Adams",
      role: "Executive Camp Director • 18+ Yrs Experience",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
    },
    heroImage: "assets/images/Teens_benefit_from_screen_free_summers_202608241119.jpeg",
    lead: "Today's adolescents spend an average of 7.5 hours per day on digital screens. Discover what happens to the teenage brain when notifications stop and real-world connection begins.",
    contentHtml: `
      <h3>1. The Constant State of Digital Hypervigilance</h3>
      <p>
        Smartphones keep adolescents trapped in an endless loop of algorithmic validation, FOMO, and fragmented attention spans. At CampSphere, disconnecting is not a punishment—it is the greatest gift of freedom we give to growing minds.
      </p>

      <div class="article-tip-box">
        <h5 class="fw-bold text-navy mb-2"><i class="bi bi-lightbulb-fill text-warning me-2"></i> The 72-Hour Digital Detox Threshold</h5>
        <p class="mb-0">
          Neurological studies reveal that after 72 hours without screen blue-light and notification pings, teens experience deeper REM sleep cycles, enhanced eye contact, and noticeably decreased baseline cortisol (stress hormone) levels.
        </p>
      </div>

      <h3>2. What Replaces the Screen?</h3>
      <ul class="article-checklist">
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Unfiltered Face-to-Face Empathy:</strong> Reading facial expressions and hearing tone of voice during spontaneous campfire banter.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Deep Flow State Creativity:</strong> Spending two uninterrupted hours shaping ceramic pottery or tuning a robotic gear train.</div></li>
        <li><i class="bi bi-check-circle-fill text-success"></i> <div><strong>Immersion in Living Nature:</strong> Gazing at stars over Lake Tahoe instead of backlit LED screens before falling asleep.</div></li>
      </ul>
    `,
    comments: [
      { name: "Lisa Bennett", date: "April 10, 2026", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80", text: "My 14-year-old was furious about leaving her phone behind at first. By the end of Week 2, she told me she had never felt happier or more peaceful." }
    ],
    relatedIds: ["article-3", "article-5"]
  }
};

/**
 * Renders the Blog Details Page Dynamically based on ?id= query param
 */
function initBlogDetailsPage() {
  const articleContainer = document.getElementById('blogArticleContainer');
  if (!articleContainer) return; // Not on blog-details.html

  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id') || 'article-1';
  const article = CAMPSPHERE_BLOG_ARTICLES[articleId] || CAMPSPHERE_BLOG_ARTICLES['article-1'];

  // Update Page Document Title
  document.title = `${article.title} - CampSphere Journal`;

  // Update Breadcrumbs
  const breadcrumbActive = document.getElementById('blogBreadcrumbTitle');
  if (breadcrumbActive) {
    breadcrumbActive.textContent = article.category;
  }

  // Update Category Badge
  const categoryBadge = document.getElementById('blogArticleCategory');
  if (categoryBadge) {
    categoryBadge.textContent = article.category;
  }

  // Update Article Title
  const titleEl = document.getElementById('blogArticleTitle');
  if (titleEl) {
    titleEl.textContent = article.title;
  }

  // Update Author Info
  const authorPhoto = document.getElementById('blogAuthorPhoto');
  const authorName = document.getElementById('blogAuthorName');
  const authorRole = document.getElementById('blogAuthorRole');
  if (authorPhoto) authorPhoto.src = article.author.photo;
  if (authorPhoto) authorPhoto.alt = article.author.name;
  if (authorName) authorName.textContent = article.author.name;
  if (authorRole) authorRole.textContent = article.author.role;

  // Update Date & Read Time
  const dateEl = document.getElementById('blogArticleDate');
  const readTimeEl = document.getElementById('blogArticleReadTime');
  if (dateEl) dateEl.textContent = article.date;
  if (readTimeEl) readTimeEl.textContent = article.readTime;

  // Update Hero Image
  const heroImg = document.getElementById('blogArticleHeroImg');
  if (heroImg) {
    heroImg.src = article.heroImage;
    heroImg.alt = article.title;
  }

  // Update Article Lead & Body Content
  const leadEl = document.getElementById('blogArticleLead');
  const bodyEl = document.getElementById('blogArticleBody');
  if (leadEl) leadEl.textContent = article.lead;
  if (bodyEl) bodyEl.innerHTML = article.contentHtml;



  // Render Related Articles
  const relatedContainer = document.getElementById('blogRelatedArticles');
  if (relatedContainer && article.relatedIds) {
    relatedContainer.innerHTML = article.relatedIds.map(relId => {
      const rel = CAMPSPHERE_BLOG_ARTICLES[relId];
      if (!rel) return '';
      return `
        <div class="col-md-6">
          <div class="blog-card">
            <div class="blog-thumb" style="height: 170px; min-height: 170px;">
              <img src="${rel.heroImage}" alt="${rel.title}">
            </div>
            <div class="blog-body p-3">
              <div class="blog-meta mb-2">
                <span><i class="bi bi-calendar3"></i> ${rel.date}</span>
                <span><i class="bi bi-tag text-primary"></i> ${rel.category}</span>
              </div>
              <h6 class="blog-title mb-2" style="min-height: auto;"><a href="blog-details.html?id=${rel.id}">${rel.title}</a></h6>
              <a href="blog-details.html?id=${rel.id}" class="blog-card-link">Read Article <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

if (typeof window !== 'undefined') {
  window.CAMPSPHERE_BLOG_ARTICLES = CAMPSPHERE_BLOG_ARTICLES;
  window.initBlogDetailsPage = initBlogDetailsPage;
}

document.addEventListener('DOMContentLoaded', initBlogDetailsPage);
