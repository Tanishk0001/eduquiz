import { ClassCurriculum, ClassLevel, Subject, Topic, Difficulty, Question } from '../types';

export const CURRICULUM_DATA: ClassCurriculum[] = [
  // ==========================================
  // CLASS 12
  // ==========================================
  {
    classLevel: '12',
    title: 'Class 12 Senior Secondary',
    subtitle: 'Advanced conceptual mastery for board examinations and competitive entrances',
    subjects: [
      {
        id: 'c12-pol-sci',
        name: 'Political Science',
        iconName: 'Globe',
        color: '#4f69b8',
        description: 'World politics, international treaties, geopolitical alliances, and democratic institutions.',
        topics: [
          {
            id: 'c12-pol-cold-war',
            subjectId: 'c12-pol-sci',
            title: 'Cold War Era',
            description: 'The ideological, economic, and geopolitical confrontation between the US and the USSR following WWII.',
            estimatedMinutes: 25,
            keyConcepts: [
              'Bipolarity and the division into Western and Eastern Blocs',
              'The Cuban Missile Crisis of 1962 as the peak of tension',
              'Military alliances: NATO (1949), SEATO, CENTO vs Warsaw Pact (1955)',
              'Arenas of the Cold War: Korea, Berlin, Congo, and Vietnam',
              'The Non-Aligned Movement (NAM) founded by Nehru, Tito, Nasser, Sukarno, and Nkrumah',
              'New International Economic Order (NIEO) and arms control treaties (SALT, START, NPT)'
            ],
            summary: 'The Cold War was not merely a military showdown but an ideological struggle between Western capitalism and Eastern socialism. Beginning after the Allied victory in 1945, the superpowers avoided direct hot war due to the logic of deterrence (Mutually Assured Destruction), instead waging proxy conflicts, building alliance treaties, and engaging in psychological warfare. Third World nations responded by establishing the Non-Aligned Movement (NAM) in Belgrade (1961) to retain sovereignty and pursue peaceful development.',
            formulasOrFacts: [
              'NATO founded: April 1949 (12 initial member states)',
              'Warsaw Pact signed: May 1955 (Dissolved in 1991)',
              'Cuban Missile Crisis: October 1962',
              'First NAM Summit: Belgrade, 1961 (attended by 25 member states)',
              'Core principle: Logic of Deterrence prevents nuclear exchange'
            ],
            questions: [
              {
                id: 'c12-cw-q1',
                topicId: 'c12-pol-cold-war',
                question: 'Which historical event in 1962 is widely regarded as the high point of Cold War tension between the United States and the Soviet Union?',
                options: [
                  'The signing of the Warsaw Pact',
                  'The Cuban Missile Crisis',
                  'The construction of the Berlin Wall',
                  'The Soviet invasion of Afghanistan'
                ],
                correctAnswer: 1,
                explanation: 'In October 1962, the deployment of Soviet nuclear missiles in Cuba brought the US and USSR to the brink of direct nuclear war. It was resolved peacefully when Khrushchev agreed to dismantle the missiles in exchange for a US pledge not to invade Cuba.',
                difficulty: 'Easy',
                hint: 'Involves Soviet missiles placed just 90 miles off the coast of Florida.'
              },
              {
                id: 'c12-cw-q2',
                topicId: 'c12-pol-cold-war',
                question: 'What military doctrine explained why the US and the Soviet Union avoided direct military confrontation despite possessing massive nuclear arsenals?',
                options: [
                  'The Monroe Doctrine',
                  'The Marshall Plan',
                  'The Logic of Deterrence (Mutually Assured Destruction)',
                  'The Principle of Collective Security'
                ],
                correctAnswer: 2,
                explanation: 'The Logic of Deterrence states that both sides possessed the capability to retaliate against an attack and cause unacceptably devastating destruction, meaning neither could initiate war and claim victory.',
                difficulty: 'Medium',
                hint: 'If both sides are assured of destruction, neither dares to strike first.'
              },
              {
                id: 'c12-cw-q3',
                topicId: 'c12-pol-cold-war',
                question: 'In which year and city was the First Summit of the Non-Aligned Movement (NAM) formally convened?',
                options: [
                  '1955, Bandung',
                  '1961, Belgrade',
                  '1949, New Delhi',
                  '1973, Algiers'
                ],
                correctAnswer: 1,
                explanation: 'While the Bandung Conference of 1955 paved the ideological groundwork, the 1st NAM Summit officially took place in Belgrade in 1961, attended by 25 participating states under the leadership of Tito, Nehru, and Nasser.',
                difficulty: 'Medium',
                hint: 'Hosted in the capital of Yugoslavia with 25 founding delegates.'
              },
              {
                id: 'c12-cw-q4',
                topicId: 'c12-pol-cold-war',
                question: 'Which Western alliance was established in 1949 with the clause that an armed attack against one member in Europe or North America shall be considered an attack against them all?',
                options: [
                  'SEATO',
                  'CENTO',
                  'NATO',
                  'ANZUS'
                ],
                correctAnswer: 2,
                explanation: 'The North Atlantic Treaty Organization (NATO) was established in April 1949 under Article 5, enshrining mutual collective defense among Western democratic nations.',
                difficulty: 'Easy',
                hint: 'It was formed by twelve North Atlantic nations.'
              },
              {
                id: 'c12-cw-q5',
                topicId: 'c12-pol-cold-war',
                question: 'Why did newly decolonized countries advocate for a New International Economic Order (NIEO) through UNCTAD in 1972?',
                options: [
                  'To adopt Soviet-style command economies globally',
                  'To gain sovereign control over natural resources and fairer trade terms from Western markets',
                  'To dismantle international lending institutions like the World Bank',
                  'To establish a unified global currency for non-aligned states'
                ],
                correctAnswer: 1,
                explanation: 'The NIEO initiative sought to rectify neo-colonial economic imbalances by granting developing nations genuine ownership over their resources, affordable access to Western technology, and equitable trade tariffs.',
                difficulty: 'Hard',
                hint: 'Focused on resource sovereignty and equitable trade for developing countries.'
              }
            ]
          },
          {
            id: 'c12-pol-south-asia',
            subjectId: 'c12-pol-sci',
            title: 'Contemporary South Asia',
            description: 'Regional dynamics, democratic evolution, and geopolitical cooperation across India, Pakistan, Bangladesh, Sri Lanka, and Nepal.',
            estimatedMinutes: 20,
            keyConcepts: [
              'Geopolitical definition of South Asia surrounded by Himalayas and Indian Ocean',
              'Alternation between military rule and democracy in Pakistan',
              'The 1971 Liberation War and the creation of Bangladesh',
              'Transition from monarchy to constitutional democracy in Nepal and Bhutan',
              'Ethnic conflict in Sri Lanka and the 2009 resolution',
              'SAARC and SAFTA: Opportunities and structural impasses'
            ],
            summary: 'South Asia represents an extraordinary blend of cultural commonality and bilateral tensions. While India and Sri Lanka have maintained unbroken democratic systems since independence, Pakistan and Bangladesh experienced alternating military regimes. Regional integration through SAARC has faced hurdles primarily due to Indo-Pakistani rivalry, though bilateral agreements and transit corridors continue to offer avenues of shared growth.',
            formulasOrFacts: [
              'SAARC established: Dhaka, December 1985 (7 founding nations, later 8 with Afghanistan)',
              'SAFTA signed: 2004 (entered into force January 2006)',
              'Indus Waters Treaty: signed 1960 between Nehru and Ayub Khan, mediated by World Bank',
              'Nepal adopted democratic constitution: 2015'
            ],
            questions: [
              {
                id: 'c12-sa-q1',
                topicId: 'c12-pol-south-asia',
                question: 'In which year did the South Asian Association for Regional Cooperation (SAARC) establish the South Asian Free Trade Area (SAFTA)?',
                options: [
                  '1995',
                  '2004',
                  '2010',
                  '1985'
                ],
                correctAnswer: 1,
                explanation: 'The SAFTA agreement was signed in Islamabad during the 12th SAARC Summit in January 2004, aiming to reduce customs duties on traded goods among member states.',
                difficulty: 'Medium',
                hint: 'Signed at the Islamabad Summit in the mid-2000s.'
              },
              {
                id: 'c12-sa-q2',
                topicId: 'c12-pol-south-asia',
                question: 'Which historic 1960 water-sharing pact between India and Pakistan was brokered by the World Bank and has endured through multiple wars?',
                options: [
                  'Shimla Agreement',
                  'Tashkent Declaration',
                  'Indus Waters Treaty',
                  'Ganga River Accord'
                ],
                correctAnswer: 2,
                explanation: 'The Indus Waters Treaty was signed in Karachi on September 19, 1960, by Indian Prime Minister Jawaharlal Nehru and Pakistani President Ayub Khan, allocating the eastern rivers to India and western rivers to Pakistan.',
                difficulty: 'Easy',
                hint: 'Named after the mighty northern river system originating in Tibet.'
              },
              {
                id: 'c12-sa-q3',
                topicId: 'c12-pol-south-asia',
                question: 'Which two South Asian countries have successfully preserved unbroken constitutional democratic rule since gaining independence?',
                options: [
                  'India and Pakistan',
                  'India and Sri Lanka',
                  'Nepal and Bangladesh',
                  'Sri Lanka and Maldives'
                ],
                correctAnswer: 1,
                explanation: 'India and Sri Lanka have both maintained unbroken democratic elections and constitutional governance since their post-WWII independence, avoiding military coups.',
                difficulty: 'Medium',
                hint: 'Both island and peninsular giants that gained independence around 1947–1948.'
              }
            ]
          }
        ]
      },
      {
        id: 'c12-math',
        name: 'Mathematics',
        iconName: 'Sigma',
        color: '#3d61b3',
        description: 'Differential & integral calculus, vectors, matrices, and three-dimensional geometry.',
        topics: [
          {
            id: 'c12-math-integrals',
            subjectId: 'c12-math',
            title: 'Integrals and Applications',
            description: 'Definite and indefinite integrals, integration by parts, substitution, and area under curves.',
            estimatedMinutes: 30,
            keyConcepts: [
              'Fundamental Theorem of Calculus connecting differentiation and integration',
              'Integration by parts: ∫ u v dx = u ∫ v dx - ∫ [u\' (∫ v dx)] dx',
              'Definite integrals as limits of Riemann sums',
              'Properties of definite integrals (e.g., King property: ∫_0^a f(x)dx = ∫_0^a f(a-x)dx)',
              'Computing bounded areas between intersecting curves'
            ],
            summary: 'Integration represents the inverse process of differentiation (anti-derivatives) and mathematically computes accumulated quantities like areas, volumes, and work. Definite integrals bounded by [a, b] evaluate precise physical measurements by leveraging symmetry, substitution, and standard polynomial/trigonometric reduction identities.',
            formulasOrFacts: [
              '∫ x^n dx = (x^(n+1))/(n+1) + C, for n ≠ -1',
              '∫ (1/x) dx = ln|x| + C',
              '∫ e^(ax) dx = (1/a) e^(ax) + C',
              '∫_0^a f(x) dx = ∫_0^a f(a - x) dx'
            ],
            questions: [
              {
                id: 'c12-int-q1',
                topicId: 'c12-math-integrals',
                question: 'What is the value of the definite integral ∫_0^(π/2) [sin(x) / (sin(x) + cos(x))] dx?',
                options: [
                  'π',
                  'π / 2',
                  'π / 4',
                  '1'
                ],
                correctAnswer: 2,
                explanation: 'Using the King property ∫_0^a f(x)dx = ∫_0^a f(a-x)dx, replacing x with (π/2 - x) yields I = ∫_0^(π/2) [cos(x) / (cos(x) + sin(x))] dx. Adding both equations gives 2I = ∫_0^(π/2) 1 dx = π/2, hence I = π/4.',
                difficulty: 'Medium',
                hint: 'Use the property f(x) + f(a-x) symmetry.'
              },
              {
                id: 'c12-int-q2',
                topicId: 'c12-math-integrals',
                question: 'What is the integral of x · e^x with respect to x?',
                options: [
                  'e^x (x - 1) + C',
                  'e^x (x + 1) + C',
                  'x^2 e^x / 2 + C',
                  'e^x + x + C'
                ],
                correctAnswer: 0,
                explanation: 'Applying integration by parts: ∫ u v\' dx = u v - ∫ u\' v dx. Let u = x (so u\' = 1) and v\' = e^x (so v = e^x). Then ∫ x e^x dx = x e^x - ∫ 1 · e^x dx = x e^x - e^x + C = e^x (x - 1) + C.',
                difficulty: 'Easy',
                hint: 'Use integration by parts with u = x.'
              },
              {
                id: 'c12-int-q3',
                topicId: 'c12-math-integrals',
                question: 'What is the area of the region bounded by the parabola y = x^2 and the line y = 4?',
                options: [
                  '16 / 3',
                  '32 / 3',
                  '8 / 3',
                  '16'
                ],
                correctAnswer: 1,
                explanation: 'The curve intersects y = 4 at x = -2 and x = 2. Area = ∫_(-2)^2 (4 - x^2) dx = 2 ∫_0^2 (4 - x^2) dx = 2 [4x - x^3 / 3]_0^2 = 2 [8 - 8/3] = 2 [16/3] = 32/3 square units.',
                difficulty: 'Hard',
                hint: 'Integrate the upper curve minus the lower curve from -2 to +2.'
              }
            ]
          }
        ]
      },
      {
        id: 'c12-physics',
        name: 'Physics',
        iconName: 'Atom',
        color: '#42589f',
        description: 'Electromagnetism, electromagnetic induction, physical optics, and nuclear physics.',
        topics: [
          {
            id: 'c12-phys-charges',
            subjectId: 'c12-physics',
            title: 'Electric Charges and Fields',
            description: 'Coulomb\'s Law, electric field intensity, electric dipole moments, and Gauss\'s Theorem.',
            estimatedMinutes: 25,
            keyConcepts: [
              'Quantization and conservation of electrostatic charges: q = n · e',
              'Coulomb\'s Law in vector form and permittivity of free space ε₀',
              'Electric field lines and their physical properties (never intersect)',
              'Gauss\'s Law: Total flux Φ_E = ∮ E · dA = q_enclosed / ε₀',
              'Electric dipole in uniform and non-uniform fields (Torque τ = p × E)'
            ],
            summary: 'Electrostatics studies electric charges at rest. Electric fields emanate radially outward from positive charges and terminate at negative charges. Gauss\'s law provides a powerful technique for calculating electric field distributions around symmetrical charge configurations like infinite sheets, cylinders, and spherical shells.',
            formulasOrFacts: [
              'Coulomb\'s Law: F = (1 / 4πε₀) · (|q₁ q₂| / r²)',
              'Permittivity of vacuum: ε₀ ≈ 8.854 × 10⁻¹² C²/(N·m²)',
              'Gauss Law: ∮ E · dA = q_enclosed / ε₀',
              'Dipole torque: τ = p × E = p E sin(θ)'
            ],
            questions: [
              {
                id: 'c12-ec-q1',
                topicId: 'c12-phys-charges',
                question: 'What is the electric field inside a hollow charged spherical conducting shell of radius R containing charge Q on its surface?',
                options: [
                  'Q / (4πε₀ R²)',
                  'Zero',
                  'Q / (4πε₀ r)',
                  'Infinite'
                ],
                correctAnswer: 1,
                explanation: 'By Gauss\'s Law, any Gaussian surface drawn completely inside the hollow conducting shell encloses zero net charge (q_enclosed = 0). Thus, ∮ E · dA = 0, giving E = 0 throughout the interior.',
                difficulty: 'Easy',
                hint: 'Consider the amount of charge enclosed inside the cavity.'
              },
              {
                id: 'c12-ec-q2',
                topicId: 'c12-phys-charges',
                question: 'When an electric dipole with dipole moment p is placed in a uniform electric field E, what is the net force and maximum torque experienced?',
                options: [
                  'Net force = pE, Maximum torque = 0',
                  'Net force = 0, Maximum torque = p · E (at θ = 90°)',
                  'Net force = 0, Maximum torque = 0',
                  'Net force = 2pE, Maximum torque = pE / 2'
                ],
                correctAnswer: 1,
                explanation: 'In a uniform electric field, the two equal and opposite charges experience equal and opposing forces (+qE and -qE), yielding net force = 0. The torque τ = p × E = pE sin(θ) reaches its maximum value of pE when θ = 90°.',
                difficulty: 'Medium',
                hint: 'In a uniform field, the opposite forces cancel translational motion but form a couple.'
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 11
  // ==========================================
  {
    classLevel: '11',
    title: 'Class 11 Higher Secondary',
    subtitle: 'Foundational concepts in Newtonian mechanics, thermodynamics, and algebraic systems',
    subjects: [
      {
        id: 'c11-physics',
        name: 'Physics',
        iconName: 'Compass',
        color: '#4f69b8',
        description: 'Kinematics, dynamics, gravitation, and mechanical properties of matter.',
        topics: [
          {
            id: 'c11-phys-motion',
            subjectId: 'c11-physics',
            title: 'Laws of Motion and Friction',
            description: 'Newtonian inertia, momentum conservation, impulse, and static and kinetic friction.',
            estimatedMinutes: 25,
            keyConcepts: [
              'Newton\'s First Law: Inertia of rest, direction, and motion',
              'Newton\'s Second Law: F = dp/dt = m · a (for constant mass)',
              'Newton\'s Third Law: Action-reaction pairs act on two distinct bodies',
              'Conservation of linear momentum in isolated systems',
              'Static friction (self-adjusting up to μ_s N) versus kinetic friction'
            ],
            summary: 'Mechanics examines the relationship between motion and force. Momentum is conserved in all collisions when external forces are absent. Friction acts tangential to the interface to resist relative motion, with limiting static friction exceeding kinetic friction in macroscopic contact.',
            formulasOrFacts: [
              'F_net = m · a',
              'Impulse J = F · Δt = Δp',
              'Limiting static friction: f_s(max) = μ_s · N',
              'Kinetic friction: f_k = μ_k · N (where μ_k < μ_s)'
            ],
            questions: [
              {
                id: 'c11-mot-q1',
                topicId: 'c11-phys-motion',
                question: 'Why does an athlete continue running a few steps past the finish line rather than coming to an abrupt halt?',
                options: [
                  'Due to gravitational pull',
                  'Due to inertia of motion',
                  'To overcome centrifugal acceleration',
                  'Because friction is zero on running tracks'
                ],
                correctAnswer: 1,
                explanation: 'According to Newton\'s First Law, an object in motion remains in motion unless acted upon by an external unbalanced force. The athlete\'s body maintains inertia of motion, making sudden stops physically straining.',
                difficulty: 'Easy',
                hint: 'Newton\'s First Law property of moving bodies.'
              },
              {
                id: 'c11-mot-q2',
                topicId: 'c11-phys-motion',
                question: 'A mass of 2 kg moving at 6 m/s collides and sticks to a stationary 4 kg mass. What is the common final velocity?',
                options: [
                  '1 m/s',
                  '2 m/s',
                  '3 m/s',
                  '4 m/s'
                ],
                correctAnswer: 1,
                explanation: 'Using conservation of momentum: m₁ v₁ + m₂ v₂ = (m₁ + m₂) V. (2)(6) + (4)(0) = (2 + 4) V ⇒ 12 = 6 V ⇒ V = 2 m/s.',
                difficulty: 'Medium',
                hint: 'Total momentum before collision equals total momentum after collision.'
              }
            ]
          }
        ]
      },
      {
        id: 'c11-chemistry',
        name: 'Chemistry',
        iconName: 'FlaskConical',
        color: '#5568aa',
        description: 'Atomic structure, periodic trends, chemical bonding, and thermodynamic equilibrium.',
        topics: [
          {
            id: 'c11-chem-bonding',
            subjectId: 'c11-chemistry',
            title: 'Chemical Bonding and Molecular Structure',
            description: 'Lewis structures, VSEPR theory, hybridization, and molecular orbital diagrams.',
            estimatedMinutes: 25,
            keyConcepts: [
              'Octet rule and exceptions (incomplete octet, expanded valence shells)',
              'VSEPR theory: Repulsion order: Lone Pair-Lone Pair > Lone Pair-Bond Pair > Bond Pair-Bond Pair',
              'Valence Bond Theory & Hybridization (sp, sp², sp³, sp³d)',
              'Dipole moment and molecular polarity (e.g. CO₂ is linear with μ = 0, H₂O is bent with μ > 0)'
            ],
            summary: 'Atoms bond to achieve stable electronic configurations with minimum potential energy. VSEPR theory predicts spatial geometry from electron pair repulsion, while orbital hybridization explains equivalent directional bonds in organic and inorganic molecules.',
            formulasOrFacts: [
              'Dipole moment: μ = q × d (Debye)',
              'Bond Order (MOT) = 1/2 (N_b - N_a)',
              'Hybridization steric number: SN = (Number of bonded atoms) + (Lone pairs on central atom)'
            ],
            questions: [
              {
                id: 'c11-cb-q1',
                topicId: 'c11-chem-bonding',
                question: 'What is the hybridization and geometric shape of the central sulfur atom in sulfur hexafluoride (SF₆)?',
                options: [
                  'sp³d, Trigonal bipyramidal',
                  'sp³d², Octahedral',
                  'sp³d³, Pentagonal bipyramidal',
                  'dsp², Square planar'
                ],
                correctAnswer: 1,
                explanation: 'SF₆ has 6 bonded fluorine atoms and 0 lone pairs on sulfur. Steric number is 6, which corresponds to sp³d² hybridization and a symmetrical octahedral geometry with 90° bond angles.',
                difficulty: 'Medium',
                hint: 'Six bond pairs around sulfur with zero lone pairs.'
              },
              {
                id: 'c11-cb-q2',
                topicId: 'c11-chem-bonding',
                question: 'Why does Carbon Dioxide (CO₂) possess a zero net dipole moment even though its C=O bonds are strongly polar?',
                options: [
                  'The carbon and oxygen atoms have identical electronegativities',
                  'The linear geometry causes equal bond dipole moments to pull in opposite directions and cancel',
                  'Because carbon dioxide is in a liquid state at room temperature',
                  'The resonance structures eliminate dipole moments'
                ],
                correctAnswer: 1,
                explanation: 'CO₂ has a linear symmetric shape (O=C=O). The two equal C=O bond dipole vectors point in opposite directions at 180°, canceling each other out to yield a net dipole moment of zero.',
                difficulty: 'Easy',
                hint: 'Look at the linear symmetrical shape of the molecule.'
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 10
  // ==========================================
  {
    classLevel: '10',
    title: 'Class 10 Secondary',
    subtitle: 'Core board syllabus covering fundamental sciences, mathematics, and social studies',
    subjects: [
      {
        id: 'c10-science',
        name: 'Science',
        iconName: 'Microscope',
        color: '#445fa8',
        description: 'Chemical reactions, optics, electricity, genetics, and life processes.',
        topics: [
          {
            id: 'c10-sci-reactions',
            subjectId: 'c10-science',
            title: 'Chemical Reactions and Equations',
            description: 'Balancing chemical equations, types of reactions, oxidation-reduction, corrosion, and rancidity.',
            estimatedMinutes: 20,
            keyConcepts: [
              'Law of conservation of mass in balanced equations',
              'Combination, decomposition, displacement, and double displacement reactions',
              'Exothermic (heat released) vs endothermic (heat absorbed) reactions',
              'Redox reactions: Oxidation (gain of oxygen/loss of electrons), Reduction (loss of oxygen/gain of electrons)',
              'Prevention of corrosion (galvanization, painting) and rancidity (antioxidants, nitrogen flushing)'
            ],
            summary: 'A chemical reaction transforms reactants into new substances through the breaking and forming of chemical bonds. Balanced equations reflect mass conservation. Redox reactions drive essential biological and industrial processes, while displacement reactions depend on the metal reactivity series.',
            formulasOrFacts: [
              'Rust formula: Fe₂O₃ · xH₂O',
              'Quicklime to slaked lime: CaO + H₂O → Ca(OH)₂ + Heat (Exothermic)',
              'Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (Endothermic)'
            ],
            questions: [
              {
                id: 'c10-cr-q1',
                topicId: 'c10-sci-reactions',
                question: 'When an iron nail is immersed in a blue copper sulfate (CuSO₄) solution for 30 minutes, what observable change occurs?',
                options: [
                  'The solution turns deep purple and hydrogen gas bubbles evolve',
                  'The solution turns pale green and a reddish-brown copper deposit forms on the nail',
                  'No reaction occurs because copper is more reactive than iron',
                  'The nail completely dissolves without altering the blue solution color'
                ],
                correctAnswer: 1,
                explanation: 'Iron is more reactive than copper in the reactivity series. Iron displaces copper: Fe + CuSO₄ (blue) → FeSO₄ (light green) + Cu (reddish-brown deposit on the nail).',
                difficulty: 'Easy',
                hint: 'Iron replaces copper from its salt solution.'
              },
              {
                id: 'c10-cr-q2',
                topicId: 'c10-sci-reactions',
                question: 'In the redox reaction: CuO + H₂ → Cu + H₂O, which substance acts as the reducing agent?',
                options: [
                  'CuO',
                  'Cu',
                  'H₂',
                  'H₂O'
                ],
                correctAnswer: 2,
                explanation: 'Hydrogen (H₂) gains oxygen to form H₂O (is oxidized). The substance that undergoes oxidation acts as the reducing agent because it reduces CuO to Cu.',
                difficulty: 'Medium',
                hint: 'The reducing agent undergoes oxidation itself by gaining oxygen.'
              },
              {
                id: 'c10-cr-q3',
                topicId: 'c10-sci-reactions',
                question: 'Why are potato chips and fried snacks packed in bags flushed with nitrogen gas?',
                options: [
                  'To speed up fermentation and enhance flavor',
                  'To create an inert atmosphere that prevents oxidation and rancidity of oils',
                  'To cool the chips and maintain moisture',
                  'To neutralize acidic compounds inside the packaging'
                ],
                correctAnswer: 1,
                explanation: 'Oils and fats in snacks undergo oxidation when exposed to atmospheric oxygen, causing rancidity (unpleasant smell and taste). Nitrogen is an unreactive gas that displaces oxygen.',
                difficulty: 'Easy',
                hint: 'Inert gas prevents the fats and oils from spoiling through oxidation.'
              }
            ]
          },
          {
            id: 'c10-sci-light',
            subjectId: 'c10-science',
            title: 'Light: Reflection and Refraction',
            description: 'Spherical mirrors, Snell\'s law of refraction, lenses, magnification, and power.',
            estimatedMinutes: 25,
            keyConcepts: [
              'Laws of reflection and sign conventions (Cartesian coordinates)',
              'Concave and convex mirrors: Focal length f = R / 2',
              'Mirror formula: 1/f = 1/v + 1/u',
              'Snell\'s Law of Refraction: n = sin(i) / sin(r)',
              'Lens formula: 1/f = 1/v - 1/u, Power of a lens P = 1 / f (in meters, measured in Diopters)'
            ],
            summary: 'Light travels in straight lines in uniform media and refracts when crossing boundaries between optical media of differing densities. Convex lenses converge rays to form real or virtual images, while concave mirrors are used in car headlights and solar furnaces.',
            formulasOrFacts: [
              'Mirror formula: 1/f = 1/v + 1/u',
              'Lens formula: 1/f = 1/v - 1/u',
              'Lens Power: P = 1 / f(m) in Dioptres (D)',
              'Refractive index: n = c / v'
            ],
            questions: [
              {
                id: 'c10-light-q1',
                topicId: 'c10-sci-light',
                question: 'A convex lens has a focal length of +50 cm. What is the optical power of this lens?',
                options: [
                  '+0.5 D',
                  '+2.0 D',
                  '-2.0 D',
                  '+5.0 D'
                ],
                correctAnswer: 1,
                explanation: 'Power P = 1 / f(in meters). Convert 50 cm to meters: f = 0.5 m. Therefore, P = 1 / 0.5 = +2.0 Diopters (D).',
                difficulty: 'Medium',
                hint: 'Always convert centimeters to meters first before taking the reciprocal.'
              },
              {
                id: 'c10-light-q2',
                topicId: 'c10-sci-light',
                question: 'Which type of mirror is universally fitted as the rear-view mirror in automobiles to provide a wider field of view?',
                options: [
                  'Concave mirror',
                  'Plane mirror',
                  'Convex mirror',
                  'Parabolic mirror'
                ],
                correctAnswer: 2,
                explanation: 'Convex mirrors always form erect, diminished, and virtual images regardless of object distance, allowing drivers to see a significantly broader panoramic view of rear traffic.',
                difficulty: 'Easy',
                hint: 'It curves outwards and always gives an upright, diminished view.'
              }
            ]
          }
        ]
      },
      {
        id: 'c10-math',
        name: 'Mathematics',
        iconName: 'Calculator',
        color: '#3d61b3',
        description: 'Quadratic equations, arithmetic progressions, coordinate geometry, and trigonometry.',
        topics: [
          {
            id: 'c10-math-quadratic',
            subjectId: 'c10-math',
            title: 'Quadratic Equations',
            description: 'Standard form ax² + bx + c = 0, factorization, quadratic formula, and discriminant analysis.',
            estimatedMinutes: 20,
            keyConcepts: [
              'Standard form: ax² + bx + c = 0, where a ≠ 0',
              'Discriminant formula: D = b² - 4ac',
              'Nature of roots: D > 0 (two distinct real roots), D = 0 (two equal real roots), D < 0 (no real roots)',
              'Quadratic formula: x = (-b ± √D) / 2a',
              'Relation between roots: Sum = -b/a, Product = c/a'
            ],
            summary: 'Quadratic equations describe parabolic trajectories and optimization problems. The sign of the discriminant b² - 4ac uniquely dictates whether the quadratic intersects the x-axis at two points, touches at a single vertex, or floats without real intersections.',
            formulasOrFacts: [
              'Discriminant: D = b² - 4ac',
              'Roots formula: x = (-b ± √(b² - 4ac)) / (2a)',
              'Sum of roots (α + β) = -b / a',
              'Product of roots (α · β) = c / a'
            ],
            questions: [
              {
                id: 'c10-qe-q1',
                topicId: 'c10-math-quadratic',
                question: 'What is the nature of the roots of the quadratic equation 2x² - 4x + 3 = 0?',
                options: [
                  'Two distinct real roots',
                  'Two equal real roots',
                  'No real roots',
                  'Three rational roots'
                ],
                correctAnswer: 2,
                explanation: 'Here a = 2, b = -4, c = 3. Discriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8. Because D < 0, the equation has no real roots.',
                difficulty: 'Easy',
                hint: 'Calculate D = b² - 4ac and check its sign.'
              },
              {
                id: 'c10-qe-q2',
                topicId: 'c10-math-quadratic',
                question: 'If one root of the quadratic equation x² - kx + 12 = 0 is 4, what is the value of k?',
                options: [
                  '7',
                  '3',
                  '-7',
                  '8'
                ],
                correctAnswer: 0,
                explanation: 'Substitute x = 4 into the equation: (4)² - k(4) + 12 = 0 ⇒ 16 - 4k + 12 = 0 ⇒ 28 = 4k ⇒ k = 7. (The second root is 12/4 = 3, and sum = 4 + 3 = 7).',
                difficulty: 'Medium',
                hint: 'Substitute x = 4 into the equation or use product of roots.'
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 9
  // ==========================================
  {
    classLevel: '9',
    title: 'Class 9 Foundation',
    subtitle: 'Building fundamental concepts in natural sciences, algebra, and geometry',
    subjects: [
      {
        id: 'c9-science',
        name: 'Science',
        iconName: 'Dna',
        color: '#4963a8',
        description: 'Matter in our surroundings, cell biology, tissues, and motion.',
        topics: [
          {
            id: 'c9-sci-matter',
            subjectId: 'c9-science',
            title: 'Matter in Our Surroundings',
            description: 'States of matter, kinetic molecular theory, evaporation, latent heat, and sublimation.',
            estimatedMinutes: 20,
            keyConcepts: [
              'Particulate nature of matter (diffusion, spaces between particles)',
              'Solid, liquid, gas comparison (shape, volume, compressibility)',
              'Latent heat of fusion and latent heat of vaporization',
              'Factors affecting evaporation: Surface area, temperature, humidity, wind speed',
              'Cooling effect of evaporation in earthen pots and perspiration'
            ],
            summary: 'All matter is composed of tiny moving particles whose kinetic energy increases with temperature. Phase transitions occur at fixed temperatures as latent heat overcomes intermolecular attractive forces without raising kinetic temperature.',
            formulasOrFacts: [
              'Kelvin temperature conversion: K = °C + 273.15',
              'Evaporation causes cooling due to energetic surface molecules escaping',
              'Sublimation: Direct solid-to-gas transition (e.g. Camphor, Ammonium Chloride)'
            ],
            questions: [
              {
                id: 'c9-mat-q1',
                topicId: 'c9-sci-matter',
                question: 'Why does water kept in an earthen pot (matka) become cool during hot summer days?',
                options: [
                  'Because clay conducts cold air from the ground',
                  'Water seeps through microscopic pores and evaporates, absorbing latent heat from the pot',
                  'The porous clay filters out sunlight radiation',
                  'Chemical reactions inside clay lower the temperature'
                ],
                correctAnswer: 1,
                explanation: 'Earthen pots have microscopic pores through which water continuously seeps to the outer surface. As it evaporates, it absorbs the latent heat of vaporization from the remaining water and pot, cooling it down.',
                difficulty: 'Easy',
                hint: 'Evaporation absorbs heat energy from the surrounding system.'
              },
              {
                id: 'c9-mat-q2',
                topicId: 'c9-sci-matter',
                question: 'What is the physical process called when solid ammonium chloride transitions directly into vapor upon heating without entering the liquid state?',
                options: [
                  'Condensation',
                  'Sublimation',
                  'Deposition',
                  'Vaporization'
                ],
                correctAnswer: 1,
                explanation: 'Sublimation is the direct transition of a substance from solid phase to gaseous phase without passing through an intermediate liquid state.',
                difficulty: 'Easy',
                hint: 'The same process dry ice undergoes at room temperature.'
              }
            ]
          }
        ]
      },
      {
        id: 'c9-math',
        name: 'Mathematics',
        iconName: 'Shapes',
        color: '#3d61b3',
        description: 'Number systems, polynomials, coordinate geometry, and Euclidean axioms.',
        topics: [
          {
            id: 'c9-math-numbers',
            subjectId: 'c9-math',
            title: 'Number Systems',
            description: 'Rational and irrational numbers, decimal expansions, and laws of exponents for real numbers.',
            estimatedMinutes: 20,
            keyConcepts: [
              'Rational numbers: p/q where q ≠ 0; terminating or non-terminating repeating decimals',
              'Irrational numbers: non-terminating, non-repeating decimal expansions (e.g. √2, √3, π)',
              'Rationalizing denominators with conjugate radicals',
              'Laws of exponents for real bases'
            ],
            summary: 'The set of real numbers unites all rationals and irrationals along a continuous geometrical number line. Every irrational number has a unique point on the number line constructible via Pythagoras\' theorem.',
            formulasOrFacts: [
              'Rational: terminating or recurring decimal',
              'Irrational: non-terminating and non-recurring',
              'Rationalization: 1 / (√a + √b) = (√a - √b) / (a - b)'
            ],
            questions: [
              {
                id: 'c9-num-q1',
                topicId: 'c9-math-numbers',
                question: 'Which of the following numbers is an irrational number?',
                options: [
                  '√16',
                  '0.375',
                  '√7',
                  '22 / 7'
                ],
                correctAnswer: 2,
                explanation: '√7 is irrational because 7 is not a perfect square, producing a non-terminating and non-repeating decimal. 22/7 is a rational fraction, √16 = 4, and 0.375 is a terminating decimal.',
                difficulty: 'Easy',
                hint: 'Square root of a prime number cannot be expressed as a ratio of integers.'
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 8
  // ==========================================
  {
    classLevel: '8',
    title: 'Class 8 Middle School',
    subtitle: 'Exploratory science and structured problem-solving',
    subjects: [
      {
        id: 'c8-science',
        name: 'Science',
        iconName: 'Sparkles',
        color: '#4963a8',
        description: 'Force, pressure, sound, combustion, and cell structure.',
        topics: [
          {
            id: 'c8-sci-force',
            subjectId: 'c8-science',
            title: 'Force and Pressure',
            description: 'Contact and non-contact forces, pressure in fluids, and atmospheric pressure.',
            estimatedMinutes: 20,
            keyConcepts: [
              'Force as a push or pull capable of altering shape, speed, or direction',
              'Contact forces (muscular, friction) vs Non-contact forces (magnetic, electrostatic, gravitational)',
              'Pressure definition: Force per unit area (P = F / A)',
              'Liquid pressure increases proportionally with depth'
            ],
            summary: 'Pressure measures the concentration of force applied perpendicular to a surface. A smaller contact area results in significantly greater pressure for the same applied force, which explains why cutting knives have sharpened edges and school bags have wide shoulder straps.',
            formulasOrFacts: [
              'Pressure P = Force (N) / Area (m²)',
              'SI Unit of pressure: Pascal (Pa) = 1 N/m²',
              'Atmospheric pressure at sea level ≈ 101.3 kPa'
            ],
            questions: [
              {
                id: 'c8-fp-q1',
                topicId: 'c8-sci-force',
                question: 'Why are the shoulder straps of school backpacks made wide rather than thin strings?',
                options: [
                  'To increase friction against the shoulders',
                  'To reduce pressure exerted on shoulders by increasing contact surface area',
                  'To increase gravitational force acting on the bag',
                  'To prevent the bag from swinging backward'
                ],
                correctAnswer: 1,
                explanation: 'Since Pressure = Force / Area, increasing the surface area of the straps decreases the pressure exerted by the weight of the bag on the student\'s shoulders, preventing pain.',
                difficulty: 'Easy',
                hint: 'Consider the inverse relationship between area and pressure.'
              },
              {
                id: 'c8-fp-q2',
                topicId: 'c8-sci-force',
                question: 'Which of the following is an example of a non-contact force?',
                options: [
                  'Frictional force on a sliding hockey puck',
                  'Muscular force when lifting a book',
                  'Gravitational force causing an apple to fall from a tree',
                  'Tension force in a stretched rubber band'
                ],
                correctAnswer: 2,
                explanation: 'Gravitational force acts across distances without physical contact between objects, making it a non-contact force. Friction, tension, and muscular force require physical touch.',
                difficulty: 'Easy',
                hint: 'Acts without physical contact between the two bodies.'
              }
            ]
          }
        ]
      },
      {
        id: 'c8-math',
        name: 'Mathematics',
        iconName: 'Binary',
        color: '#3d61b3',
        description: 'Rational numbers, linear equations, quadrilaterals, and algebraic identities.',
        topics: [
          {
            id: 'c8-math-linear',
            subjectId: 'c8-math',
            title: 'Linear Equations in One Variable',
            description: 'Solving linear equations with variables on one or both sides and practical word problems.',
            estimatedMinutes: 20,
            keyConcepts: [
              'Linear equations have highest variable power equal to 1',
              'Balancing method and transposition method',
              'Solving equations with fractional coefficients',
              'Translating word problems into algebraic equations'
            ],
            summary: 'A linear equation in one variable expresses equality between expressions where the highest power of the variable is 1. Solving involves isolating the unknown variable using inverse operations on both sides.',
            formulasOrFacts: [
              'Standard form: ax + b = 0 (where a ≠ 0)',
              'Solution is a unique real value: x = -b / a'
            ],
            questions: [
              {
                id: 'c8-le-q1',
                topicId: 'c8-math-linear',
                question: 'Solve for x: 3x - 5 = 2x + 7',
                options: [
                  'x = 2',
                  'x = 12',
                  'x = -12',
                  'x = 6'
                ],
                correctAnswer: 1,
                explanation: 'Subtract 2x from both sides: 3x - 2x - 5 = 7 ⇒ x - 5 = 7. Add 5 to both sides: x = 12.',
                difficulty: 'Easy',
                hint: 'Transpose variable terms to the left and numerical constants to the right.'
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 7
  // ==========================================
  {
    classLevel: '7',
    title: 'Class 7 Junior Level',
    subtitle: 'Nurturing curiosity in biological processes, thermal energy, and numbers',
    subjects: [
      {
        id: 'c7-science',
        name: 'Science',
        iconName: 'Leaf',
        color: '#4963a8',
        description: 'Nutrition in plants and animals, heat, acids and bases, and weather.',
        topics: [
          {
            id: 'c7-sci-nutrition',
            subjectId: 'c7-science',
            title: 'Nutrition in Plants',
            description: 'Autotrophic nutrition, photosynthesis, chlorophyll function, stomata, and heterotrophic modes.',
            estimatedMinutes: 20,
            keyConcepts: [
              'Autotrophs synthesize food; heterotrophs depend on others',
              'Photosynthesis equation: Carbon dioxide + Water in sunlight & chlorophyll produces Glucose + Oxygen',
              'Stomata regulate gas exchange through guard cells',
              'Specialized modes: Parasitic (Cuscuta), Saprotrophic (Fungi), Insectivorous (Pitcher plant)'
            ],
            summary: 'Green plants are the primary producers on Earth. Chlorophyll inside chloroplasts captures solar energy to convert inorganic carbon dioxide and soil water into chemical food energy in the form of glucose.',
            formulasOrFacts: [
              'Chlorophyll absorbs red and blue wavelengths, reflecting green',
              'Iodine test: Starch turns blue-black in the presence of dilute iodine'
            ],
            questions: [
              {
                id: 'c7-np-q1',
                topicId: 'c7-sci-nutrition',
                question: 'What are the microscopic pores on the surface of green leaves through which carbon dioxide and oxygen are exchanged called?',
                options: [
                  'Stomata',
                  'Chloroplasts',
                  'Xylem vessels',
                  'Lenticels'
                ],
                correctAnswer: 0,
                explanation: 'Stomata are microscopic pores flanked by guard cells on leaf surfaces that open and close to facilitate gaseous exchange for photosynthesis and transpiration.',
                difficulty: 'Easy',
                hint: 'Guarded by kidney-shaped guard cells.'
              },
              {
                id: 'c7-np-q2',
                topicId: 'c7-sci-nutrition',
                question: 'Which of the following is an example of an insectivorous plant that traps insects to supplement nitrogen nutrition?',
                options: [
                  'Cuscuta (Dodder)',
                  'Pitcher Plant',
                  'Mushroom',
                  'Algae'
                ],
                correctAnswer: 1,
                explanation: 'Pitcher plants grow in nitrogen-deficient soil and possess modified leaves that form jug-like pitchers to capture and digest insects, absorbing essential nitrogenous compounds.',
                difficulty: 'Easy',
                hint: 'Has modified leaves that resemble a pitcher with a lid.'
              }
            ]
          }
        ]
      },
      {
        id: 'c7-math',
        name: 'Mathematics',
        iconName: 'PieChart',
        color: '#3d61b3',
        description: 'Integers, fractions, decimals, simple equations, and lines and angles.',
        topics: [
          {
            id: 'c7-math-integers',
            subjectId: 'c7-math',
            title: 'Integers and Properties',
            description: 'Addition, subtraction, multiplication, and division of positive and negative integers.',
            estimatedMinutes: 15,
            keyConcepts: [
              'Integers encompass whole numbers and negative natural numbers',
              'Multiplication rules: (+) × (-) = (-), (-) × (-) = (+)',
              'Properties: Commutative, associative, and distributive over addition'
            ],
            summary: 'Integers extend the whole number system below zero. Understanding sign rules is fundamental for algebra, temperature modeling, and financial calculations.',
            formulasOrFacts: [
              'Additive inverse of a is -a',
              'a × (b + c) = (a × b) + (a × c)'
            ],
            questions: [
              {
                id: 'c7-int-q1',
                topicId: 'c7-math-integers',
                question: 'What is the product of (-6) × (-4) × (-2)?',
                options: [
                  '+48',
                  '-48',
                  '-12',
                  '+24'
                ],
                correctAnswer: 1,
                explanation: 'First evaluate (-6) × (-4) = +24. Then multiply +24 × (-2) = -48. An odd number of negative factors produces a negative product.',
                difficulty: 'Easy',
                hint: 'Multiplying two negatives gives positive; multiplying that by a third negative gives negative.'
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // CLASS 6
  // ==========================================
  {
    classLevel: '6',
    title: 'Class 6 Elementary Transition',
    subtitle: 'Sparking scientific inquiry and mathematical confidence for beginners',
    subjects: [
      {
        id: 'c6-science',
        name: 'Science',
        iconName: 'Apple',
        color: '#4963a8',
        description: 'Food components, separation of substances, living organisms, and electricity.',
        topics: [
          {
            id: 'c6-sci-food',
            subjectId: 'c6-science',
            title: 'Components of Food',
            description: 'Nutrients: carbohydrates, fats, proteins, vitamins, minerals, and deficiency diseases.',
            estimatedMinutes: 15,
            keyConcepts: [
              'Energy-giving foods: Carbohydrates (starch/sugars) and Fats',
              'Body-building foods: Proteins',
              'Protective foods: Vitamins and Minerals',
              'Balanced diet and dietary roughage / dietary fiber',
              'Deficiency diseases: Scurvy (Vit C), Rickets (Vit D), Beriberi (Vit B1), Goitre (Iodine)'
            ],
            summary: 'A balanced diet provides all essential nutrients in appropriate proportions along with sufficient water and dietary fiber to sustain healthy bodily growth and disease resistance.',
            formulasOrFacts: [
              'Vitamin A deficiency causes Night Blindness',
              'Vitamin C deficiency causes Scurvy (bleeding gums)',
              'Iodine deficiency causes Goitre (swollen neck gland)'
            ],
            questions: [
              {
                id: 'c6-food-q1',
                topicId: 'c6-sci-food',
                question: 'Which deficiency disease is caused by an acute lack of Vitamin C in the daily diet?',
                options: [
                  'Beriberi',
                  'Scurvy',
                  'Rickets',
                  'Goitre'
                ],
                correctAnswer: 1,
                explanation: 'Scurvy is caused by Vitamin C deficiency and causes bleeding gums, slow wound healing, and joint pain. Citrus fruits like oranges and lemons are rich sources of Vitamin C.',
                difficulty: 'Easy',
                hint: 'Symptoms include bleeding gums, cured by citrus fruits.'
              },
              {
                id: 'c6-food-q2',
                topicId: 'c6-sci-food',
                question: 'Which nutrient is primarily responsible for growth, muscle tissue repair, and enzyme synthesis in the human body?',
                options: [
                  'Fats',
                  'Proteins',
                  'Carbohydrates',
                  'Dietary Fiber'
                ],
                correctAnswer: 1,
                explanation: 'Proteins are known as "body-building foods" because they supply essential amino acids necessary for building new cellular tissue, repairing worn-out tissues, and growing muscles.',
                difficulty: 'Easy',
                hint: 'Known as the body-building nutrient found in eggs, lentils, and milk.'
              }
            ]
          }
        ]
      },
      {
        id: 'c6-math',
        name: 'Mathematics',
        iconName: 'Shapes',
        color: '#3d61b3',
        description: 'Knowing our numbers, whole numbers, playing with numbers, and basic geometry.',
        topics: [
          {
            id: 'c6-math-numbers',
            subjectId: 'c6-math',
            title: 'Knowing Our Numbers',
            description: 'Place value, Indian and International systems of numeration, estimation, and Roman numerals.',
            estimatedMinutes: 15,
            keyConcepts: [
              'Place values: Ones, Tens, Hundreds, Thousands, Lakhs / Millions',
              'Comparing and ordering multi-digit integers',
              'Roman Numerals: I, V, X, L, C, D, M'
            ],
            summary: 'Place value numeration allows compact representation of massive quantities. Indian system groups in pairs after the hundreds period (lakh, crore), while the International system groups in triples (thousands, millions, billions).',
            formulasOrFacts: [
              '1 Million = 10 Lakhs = 1,000,000',
              '1 Crore = 10 Millions = 10,000,000'
            ],
            questions: [
              {
                id: 'c6-num-q1',
                topicId: 'c6-math-numbers',
                question: 'How many thousands make up one million in the International system of numeration?',
                options: [
                  '100 thousands',
                  '1,000 thousands',
                  '10 thousands',
                  '10,000 thousands'
                ],
                correctAnswer: 1,
                explanation: 'One million is 1,000,000. Dividing by 1,000 gives 1,000 thousands in one million.',
                difficulty: 'Easy',
                hint: '1,000,000 divided by 1,000.'
              }
            ]
          }
        ]
      }
    ]
  }
];

export function getClassCurriculum(classLevel: ClassLevel): ClassCurriculum | undefined {
  return CURRICULUM_DATA.find((c) => c.classLevel === classLevel);
}

export function getAllSubjectsForClass(classLevel: ClassLevel): Subject[] {
  const c = getClassCurriculum(classLevel);
  return c ? c.subjects : [];
}

export interface UniqueQuizCard {
  uniqueKey: string; // `${subjectId}__${topicId}`
  classLevel: ClassLevel;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  iconName: string;
  topicId: string;
  topicTitle: string;
  topicDescription: string;
  questionCount: number;
  estimatedMinutes: number;
  difficultyLevels: Difficulty[];
}

/**
 * Returns deduplicated quiz cards for the given classLevel.
 * Ensures each subject/topic appears exactly once.
 */
export function getDeduplicatedQuizzes(classLevel: ClassLevel): UniqueQuizCard[] {
  const subjects = getAllSubjectsForClass(classLevel);
  const seenKeys = new Set<string>();
  const quizCards: UniqueQuizCard[] = [];

  for (const subject of subjects) {
    for (const topic of subject.topics) {
      const uniqueKey = `${subject.id}__${topic.id}`;
      if (!seenKeys.has(uniqueKey) && topic.questions.length > 0) {
        seenKeys.add(uniqueKey);
        const difficulties = Array.from(new Set(topic.questions.map((q: Question) => q.difficulty)));
        quizCards.push({
          uniqueKey,
          classLevel,
          subjectId: subject.id,
          subjectName: subject.name,
          subjectColor: subject.color,
          iconName: subject.iconName,
          topicId: topic.id,
          topicTitle: topic.title,
          topicDescription: topic.description,
          questionCount: topic.questions.length,
          estimatedMinutes: topic.estimatedMinutes,
          difficultyLevels: difficulties
        });
      }
    }
  }

  return quizCards;
}

export function findTopic(classLevel: ClassLevel, topicId: string): { subject: Subject; topic: Topic } | null {
  const subjects = getAllSubjectsForClass(classLevel);
  for (const sub of subjects) {
    const topic = sub.topics.find((t: Topic) => t.id === topicId);
    if (topic) {
      return { subject: sub, topic };
    }
  }
  return null;
}
