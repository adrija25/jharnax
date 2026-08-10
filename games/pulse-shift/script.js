document.addEventListener("DOMContentLoaded", () => {

    const TOTAL_TURNS = 12;


    let turn = 1;


    let state = {

        population: 50,

        food: 50,

        materials: 50,

        wealth: 50,

        morale: 50

    };


    let history = [];


    let flags = {

        tradeFocus: 0,

        education: 0,

        cooperation: 0,

        experimentation: 0,

        defense: 0,

        growth: 0

    };


    let personalityScores = {

        diplomat: 0,
        guardian: 0,
        commander: 0,
        visionary: 0,
        humanist: 0,
        strategist: 0,
        rebel: 0,
        scholar: 0,
        builder: 0,
        survivor: 0

    };



    const events = [


        {
            title: "The Early Rains",

            description:
                "Heavy rain has arrived earlier than expected. Your farmers see an opportunity, but the roads are beginning to deteriorate.",

            choices: [

                {
                    title: "Invest in the harvest",

                    description:
                        "Strengthen food production while the rain lasts.",

                    log:
                        "You invested in the harvest.",

                    effects: {

                        food: 15,

                        materials: -10,

                        wealth: -5

                    },

                    flag: "growth"

                },


                {
                    title: "Protect the roads",

                    description:
                        "Keep trade and movement flowing through the rain.",

                    log:
                        "You invested in protecting the roads.",

                    effects: {

                        materials: -12,

                        wealth: 8

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "Preserve your reserves",

                    description:
                        "Spend nothing and wait for the weather to pass.",

                    log:
                        "You preserved your reserves and waited.",

                    effects: {

                        wealth: 5,

                        food: -5,

                        morale: -2

                    }

                }

            ]

        },


        {
            title: "The Hungry Neighbour",

            description:
                "A nearby settlement has suffered a poor harvest and asks whether you can spare some food.",

            choices: [

                {
                    title: "Share your stores",

                    description:
                        "Give them enough to survive the shortage.",

                    log:
                        "You shared your food with a neighbouring settlement.",

                    effects: {

                        food: -12,

                        morale: 8,

                        wealth: -3

                    },

                    flag: "cooperation"

                },


                {
                    title: "Sell it at a fair price",

                    description:
                        "Help them while strengthening your own economy.",

                    log:
                        "You sold food to your neighbours at a fair price.",

                    effects: {

                        food: -8,

                        wealth: 8,

                        morale: 2

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "Protect your reserves",

                    description:
                        "Your own people must come first.",

                    log:
                        "You protected your own food reserves.",

                    effects: {

                        morale: -6,

                        food: 3

                    }

                }

            ]

        },


        {
            title: "The Travelling Merchant",

            description:
                "A merchant arrives with unusual goods and offers you a deal that may benefit your settlement.",

            choices: [

                {
                    title: "Accept the deal",

                    description:
                        "Take the opportunity before it disappears.",

                    log:
                        "You accepted the merchant's deal.",

                    effects: {

                        wealth: 14,

                        materials: -8

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "Negotiate carefully",

                    description:
                        "Try to improve the terms before committing.",

                    log:
                        "You negotiated carefully with the merchant.",

                    effects: {

                        wealth: 7,

                        morale: 2

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "Decline",

                    description:
                        "Avoid the uncertainty and keep your resources.",

                    log:
                        "You declined the merchant's offer.",

                    effects: {

                        morale: 2

                    }

                }

            ]

        },


        {
            title: "The New Mine",

            description:
                "Workers discover valuable minerals beneath the hills outside your settlement.",

            choices: [

                {
                    title: "Open the mine",

                    description:
                        "Exploit the discovery and grow wealthy.",

                    log:
                        "You opened the new mine.",

                    effects: {

                        wealth: 15,

                        materials: 8,

                        morale: -7

                    }

                },


                {
                    title: "Limit the mining",

                    description:
                        "Take some of the opportunity without going too far.",

                    log:
                        "You limited the mining operation.",

                    effects: {

                        wealth: 8,

                        materials: 4,

                        morale: -2

                    }

                },


                {
                    title: "Leave it untouched",

                    description:
                        "Preserve the land and your current way of life.",

                    log:
                        "You left the mine untouched.",

                    effects: {

                        morale: 5

                    }

                }

            ]

        },


        {
            title: "The Festival",

            description:
                "Your people have worked hard and want a celebration.",

            choices: [

                {
                    title: "Hold a grand festival",

                    description:
                        "Give the entire settlement a celebration to remember.",

                    log:
                        "You held a grand festival for your people.",

                    effects: {

                        morale: 14,

                        wealth: -10,

                        food: -5

                    }

                },


                {
                    title: "Hold a modest festival",

                    description:
                        "Celebrate without spending too much.",

                    log:
                        "You held a modest festival.",

                    effects: {

                        morale: 8,

                        wealth: -4

                    }

                },


                {
                    title: "Cancel the festival",

                    description:
                        "Keep resources for more urgent needs.",

                    log:
                        "You cancelled the festival.",

                    effects: {

                        wealth: 4,

                        morale: -8

                    }

                }

            ]

        },


        {
            title: "The Empty Granary",

            description:
                "Food reserves are falling faster than expected.",

            choices: [

                {
                    title: "Ration food",

                    description:
                        "Protect the remaining supply by reducing consumption.",

                    log:
                        "You introduced food rationing.",

                    effects: {

                        food: 8,

                        morale: -8

                    }

                },


                {
                    title: "Buy food",

                    description:
                        "Spend wealth to bring supplies into the settlement.",

                    log:
                        "You bought food from outside the settlement.",

                    effects: {

                        food: 15,

                        wealth: -12

                    }

                },


                {
                    title: "Use emergency stores",

                    description:
                        "Solve the immediate shortage using your reserves.",

                    log:
                        "You used the emergency stores.",

                    effects: {

                        food: 10,

                        materials: -6

                    }

                }

            ]

        },


        {
            title: "The Builder's Proposal",

            description:
                "A master builder proposes a major public structure that could become a symbol of your civilization.",

            choices: [

                {
                    title: "Build it",

                    description:
                        "Make the ambitious investment.",

                    log:
                        "You approved the ambitious building project.",

                    effects: {

                        materials: -15,

                        morale: 10,

                        wealth: 6

                    }

                },


                {
                    title: "Build something smaller",

                    description:
                        "Create something useful without the full expense.",

                    log:
                        "You approved a smaller building project.",

                    effects: {

                        materials: -8,

                        morale: 5,

                        wealth: 3

                    }

                },


                {
                    title: "Reject the proposal",

                    description:
                        "Keep your materials for more immediate needs.",

                    log:
                        "You rejected the building proposal.",

                    effects: {

                        materials: 4

                    }

                }

            ]

        },


        {
            title: "The Border Dispute",

            description:
                "A neighbouring settlement claims part of the land your people consider theirs.",

            choices: [

                {
                    title: "Give them the land",

                    description:
                        "Avoid escalation by making a difficult concession.",

                    log:
                        "You gave the neighbouring settlement the disputed land.",

                    effects: {

                        materials: -8,

                        morale: 4

                    },

                    flag: "cooperation"

                },


                {
                    title: "Negotiate",

                    description:
                        "Try to find a compromise.",

                    log:
                        "You negotiated over the disputed land.",

                    effects: {

                        wealth: -3,

                        morale: 5

                    },

                    flag: "cooperation"

                },


                {
                    title: "Refuse",

                    description:
                        "Stand firmly behind your claim.",

                    log:
                        "You refused to surrender the disputed land.",

                    effects: {

                        morale: -3,

                        materials: 4

                    },

                    flag: "defense"

                }

            ]

        },


        {
            title: "The Strange Seeds",

            description:
                "Travellers bring unfamiliar seeds that could transform your agriculture — or fail completely.",

            choices: [

                {
                    title: "Plant them everywhere",

                    description:
                        "Take the gamble and embrace the discovery.",

                    log:
                        "You planted the strange seeds across the settlement.",

                    effects: {

                        food: 18,

                        morale: 3

                    },

                    flag: "experimentation"

                },


                {
                    title: "Test them first",

                    description:
                        "Experiment carefully before committing.",

                    log:
                        "You tested the strange seeds before planting them widely.",

                    effects: {

                        food: 7,

                        materials: -3

                    },

                    flag: "experimentation"

                },


                {
                    title: "Reject them",

                    description:
                        "Stick with crops you already understand.",

                    log:
                        "You rejected the unfamiliar seeds.",

                    effects: {

                        food: 2

                    }

                }

            ]

        },


        {
            title: "The Sick Season",

            description:
                "Illness is spreading through the settlement.",

            choices: [

                {
                    title: "Close the markets",

                    description:
                        "Reduce contact and protect the population.",

                    log:
                        "You closed the markets to protect the population.",

                    effects: {

                        wealth: -10,

                        population: 3

                    }

                },


                {
                    title: "Continue normally",

                    description:
                        "Keep the economy moving despite the risk.",

                    log:
                        "You kept the markets open despite the illness.",

                    effects: {

                        wealth: 8,

                        population: -7

                    }

                },


                {
                    title: "Fund public care",

                    description:
                        "Spend heavily to protect your people.",

                    log:
                        "You funded public care during the illness.",

                    effects: {

                        wealth: -12,

                        population: 6,

                        morale: 8

                    }

                }

            ]

        },


        {
            title: "The Skilled Outsiders",

            description:
                "A group of skilled workers asks permission to settle in your civilization.",

            choices: [

                {
                    title: "Welcome them",

                    description:
                        "Open your settlement to their knowledge and skills.",

                    log:
                        "You welcomed skilled outsiders into your civilization.",

                    effects: {

                        population: 8,

                        materials: 7,

                        morale: 4

                    },

                    flag: "growth"

                },


                {
                    title: "Offer limited settlement",

                    description:
                        "Allow some of them to join while keeping growth controlled.",

                    log:
                        "You offered the skilled workers limited settlement.",

                    effects: {

                        population: 4,

                        materials: 4

                    }

                },


                {
                    title: "Turn them away",

                    description:
                        "Protect the stability of your existing population.",

                    log:
                        "You turned the skilled workers away.",

                    effects: {

                        morale: -4

                    }

                }

            ]

        },


        {
            title: "The Great Library",

            description:
                "Scholars ask for funding to build a place where knowledge can be collected and shared.",

            choices: [

                {
                    title: "Fund the library",

                    description:
                        "Invest in knowledge that may benefit future generations.",

                    log:
                        "You funded the great library.",

                    effects: {

                        wealth: -10,

                        morale: 7,

                        materials: -6

                    },

                    flag: "education"

                },


                {
                    title: "Fund a small archive",

                    description:
                        "Preserve some knowledge without the full expense.",

                    log:
                        "You funded a smaller archive.",

                    effects: {

                        wealth: -5,

                        morale: 4

                    },

                    flag: "education"

                },


                {
                    title: "Refuse",

                    description:
                        "Keep your resources focused on immediate needs.",

                    log:
                        "You refused to fund the library.",

                    effects: {

                        wealth: 3

                    }

                }

            ]

        },


        {
            title: "The Broken Bridge",

            description:
                "A major bridge collapses, disrupting movement and trade.",

            choices: [

                {
                    title: "Repair immediately",

                    description:
                        "Restore the connection before the disruption grows.",

                    log:
                        "You repaired the bridge immediately.",

                    effects: {

                        materials: -12,

                        wealth: 8

                    }

                },


                {
                    title: "Build a cheaper replacement",

                    description:
                        "Accept a slower solution to conserve materials.",

                    log:
                        "You built a cheaper replacement for the bridge.",

                    effects: {

                        materials: -7,

                        wealth: 3

                    }

                },


                {
                    title: "Reroute traffic",

                    description:
                        "Avoid the repair cost and accept temporary disruption.",

                    log:
                        "You rerouted traffic around the broken bridge.",

                    effects: {

                        wealth: -8,

                        materials: 3

                    }

                }

            ]

        },


        {
            title: "The Wealthy Merchant",

            description:
                "One merchant has become extraordinarily wealthy while the rest of the settlement struggles.",

            choices: [

                {
                    title: "Tax the merchant",

                    description:
                        "Redistribute part of the wealth.",

                    log:
                        "You taxed the wealthy merchant.",

                    effects: {

                        wealth: 8,

                        morale: 5

                    }

                },


                {
                    title: "Reward the merchant",

                    description:
                        "Encourage further investment and commerce.",

                    log:
                        "You rewarded the wealthy merchant.",

                    effects: {

                        wealth: 12,

                        morale: -3

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "Leave them alone",

                    description:
                        "Avoid interfering with private wealth.",

                    log:
                        "You left the merchant's wealth untouched.",

                    effects: {

                        morale: -2

                    }

                }

            ]

        },


        {
            title: "The Drought",

            description:
                "Rain has disappeared and the fields are beginning to suffer.",

            choices: [

                {
                    title: "Protect the farmland",

                    description:
                        "Spend materials to preserve your food production.",

                    log:
                        "You protected the farmland from the drought.",

                    effects: {

                        materials: -12,

                        food: 10

                    }

                },


                {
                    title: "Buy food abroad",

                    description:
                        "Use wealth to secure supplies elsewhere.",

                    log:
                        "You bought food from abroad.",

                    effects: {

                        wealth: -12,

                        food: 15

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "Trust the rains",

                    description:
                        "Wait and hope the weather changes.",

                    log:
                        "You chose to wait for the rains.",

                    effects: {

                        food: -15,

                        wealth: 4

                    }

                }

            ]

        },


        {
            title: "The Curious Children",

            description:
                "Young people in the settlement ask for places where they can learn.",

            choices: [

                {
                    title: "Build schools",

                    description:
                        "Invest in education for the future.",

                    log:
                        "You built schools for the children.",

                    effects: {

                        wealth: -9,

                        materials: -6,

                        morale: 8

                    },

                    flag: "education"

                },


                {
                    title: "Create apprenticeships",

                    description:
                        "Teach practical skills through work.",

                    log:
                        "You created apprenticeships for young people.",

                    effects: {

                        materials: 5,

                        morale: 5

                    },

                    flag: "education"

                },


                {
                    title: "Ignore the request",

                    description:
                        "Keep resources focused elsewhere.",

                    log:
                        "You chose not to invest in education.",

                    effects: {

                        wealth: 3,

                        morale: -7

                    }

                }

            ]

        },


        {
            title: "The Night Market",

            description:
                "Citizens want permission to create a market that stays open after sunset.",

            choices: [

                {
                    title: "Allow it freely",

                    description:
                        "Let people experiment with a new form of commerce.",

                    log:
                        "You allowed the night market to operate freely.",

                    effects: {

                        wealth: 10,

                        morale: 7

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "Regulate it",

                    description:
                        "Allow the market with clear rules.",

                    log:
                        "You regulated the new night market.",

                    effects: {

                        wealth: 6,

                        morale: 4

                    }

                },


                {
                    title: "Ban it",

                    description:
                        "Keep the settlement predictable and controlled.",

                    log:
                        "You banned the night market.",

                    effects: {

                        morale: -6,

                        materials: 3

                    },

                    flag: "defense"

                }

            ]

        },


        {
            title: "The Great Opportunity",

            description:
                "A powerful neighbouring empire offers you a major trade agreement.",

            choices: [

                {
                    title: "Accept immediately",

                    description:
                        "Take the enormous economic opportunity.",

                    log:
                        "You accepted the major trade agreement.",

                    effects: {

                        wealth: 18,

                        morale: -3

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "Negotiate carefully",

                    description:
                        "Seek prosperity without giving away too much independence.",

                    log:
                        "You negotiated carefully over the trade agreement.",

                    effects: {

                        wealth: 9,

                        morale: 2

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "Reject it",

                    description:
                        "Keep your independence and accept slower growth.",

                    log:
                        "You rejected the major trade agreement.",

                    effects: {

                        morale: 5

                    },

                    flag: "defense"

                }

            ]

        },


        {
            title: "The Storm",

            description:
                "A severe storm is approaching your settlement.",

            choices: [

                {
                    title: "Evacuate vulnerable areas",

                    description:
                        "Protect people even if infrastructure is damaged.",

                    log:
                        "You evacuated vulnerable areas before the storm.",

                    effects: {

                        materials: -8,

                        population: 4

                    }

                },


                {
                    title: "Build defenses",

                    description:
                        "Spend heavily to protect the settlement itself.",

                    log:
                        "You built defenses against the storm.",

                    effects: {

                        materials: -15,

                        population: 6,

                        morale: 5

                    },

                    flag: "defense"

                },


                {
                    title: "Do nothing",

                    description:
                        "Save your resources and accept the risk.",

                    log:
                        "You chose not to prepare for the storm.",

                    effects: {

                        population: -12,

                        materials: 5,

                        morale: -8

                    }

                }

            ]

        },


        {
            title: "The People's Question",

            description:
                "Your citizens ask a simple question: What kind of civilization are we trying to become?",

            choices: [

                {
                    title: "A prosperous civilization",

                    description:
                        "Choose economic opportunity and growth.",

                    log:
                        "You chose to pursue a prosperous civilization.",

                    effects: {

                        wealth: 7

                    },

                    flag: "tradeFocus"

                },


                {
                    title: "A strong civilization",

                    description:
                        "Choose stability and protection.",

                    log:
                        "You chose to build a strong civilization.",

                    effects: {

                        materials: 7

                    },

                    flag: "defense"

                },


                {
                    title: "A happy civilization",

                    description:
                        "Choose the wellbeing of your people.",

                    log:
                        "You chose to build a happy civilization.",

                    effects: {

                        morale: 10

                    },

                    flag: "cooperation"

                }

            ]

        }

    ];



    function clamp(value) {

        return Math.max(
            0,
            Math.min(
                100,
                Math.round(value)
            )
        );

    }



    function updateStats() {

        Object.keys(state).forEach((key) => {

            state[key] = clamp(
                state[key]
            );

        });


        const elements = {

            population: [

                document.getElementById(
                    "populationValue"
                ),

                document.getElementById(
                    "populationBar"
                )

            ],

            food: [

                document.getElementById(
                    "foodValue"
                ),

                document.getElementById(
                    "foodBar"
                )

            ],

            materials: [

                document.getElementById(
                    "materialsValue"
                ),

                document.getElementById(
                    "materialsBar"
                )

            ],

            wealth: [

                document.getElementById(
                    "wealthValue"
                ),

                document.getElementById(
                    "wealthBar"
                )

            ],

            morale: [

                document.getElementById(
                    "moraleValue"
                ),

                document.getElementById(
                    "moraleBar"
                )

            ]

        };


        Object.entries(elements).forEach(
            ([key, [valueElement, barElement]]) => {

                valueElement.textContent =
                    state[key];


                barElement.style.width =
                    `${state[key]}%`;

            }
        );


        document.getElementById(
            "turnNumber"
        ).textContent =
            turn;

    }



    function addLog(message) {

        history.push(
            message
        );


        const log =
            document.getElementById(
                "logEntries"
            );


        const entry =
            document.createElement(
                "p"
            );


        entry.textContent =
            `• ${message}`;


        log.prepend(
            entry
        );

    }



    function getAvailableEvents() {

        return events.filter(
            event =>
                !history.includes(
                    `EVENT:${event.title}`
                )
        );

    }



    function selectEvent() {

        const available =
            getAvailableEvents();


        return available[
            Math.floor(
                Math.random() *
                available.length
            )
        ];

    }



    function renderEvent() {

        const event =
            selectEvent();


        if (!event) {

            endGame();

            return;

        }


        history.push(
            `EVENT:${event.title}`
        );


        document.getElementById(
            "eventTitle"
        ).textContent =
            event.title;


        document.getElementById(
            "eventDescription"
        ).textContent =
            event.description;


        const choicesContainer =
            document.getElementById(
                "choices"
            );


        choicesContainer.innerHTML =
            "";


        event.choices.forEach(
            (choice, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "choice-button";


                const number =
                    document.createElement(
                        "span"
                    );


                number.className =
                    "choice-number";


                number.textContent =
                    `CHOICE ${index + 1}`;


                const title =
                    document.createElement(
                        "span"
                    );


                title.className =
                    "choice-title";


                title.textContent =
                    choice.title;


                const description =
                    document.createElement(
                        "span"
                    );


                description.className =
                    "choice-description";


                description.textContent =
                    choice.description;


                button.appendChild(
                    number
                );


                button.appendChild(
                    title
                );


                button.appendChild(
                    description
                );


                button.addEventListener(
                    "click",
                    () =>
                        chooseOption(
                            event,
                            choice
                        )
                );


                choicesContainer.appendChild(
                    button
                );

            }
        );

    }



    function scorePersonality(choice) {

        /*
         * PERSONALITY SCORING
         * -------------------
         * The original version relied heavily on keywords inside the
         * wording of each choice. That could make the result depend on
         * the text of an option rather than the player's actual pattern
         * of decisions.
         *
         * This version uses explicit behavioural signals:
         *
         * 1. The strategic flag attached to the choice.
         * 2. The resources the player chose to increase or sacrifice.
         * 3. The type of decision being made.
         *
         * The result is still the same 10-archetype system, but the
         * evidence is accumulated from the player's decisions rather
         * than generic keyword matching.
         */

        const effects = choice.effects || {};
        const flag = choice.flag || null;
        const title = choice.title || "";

        const add = (personality, amount = 1) => {
            personalityScores[personality] += amount;
        };


        /*
         * ============================================================
         * 1. EXPLICIT BEHAVIOURAL FLAGS
         * ============================================================
         */

        if (flag === "cooperation") {

            add("diplomat", 5);
            add("humanist", 2);

        }


        if (flag === "defense") {

            add("guardian", 4);
            add("commander", 4);

        }


        if (flag === "growth") {

            add("visionary", 4);
            add("builder", 2);

        }


        if (flag === "experimentation") {

            add("visionary", 4);
            add("scholar", 3);

        }


        if (flag === "education") {

            add("scholar", 6);

        }


        if (flag === "tradeFocus") {

            add("strategist", 4);
            add("visionary", 1);

        }


        /*
         * ============================================================
         * 2. RESOURCE PRIORITIES
         * ============================================================
         *
         * These signals ask what the player actually prioritised:
         *
         * Population / food  -> protection and survival
         * Morale             -> human wellbeing
         * Materials          -> building and infrastructure
         * Wealth             -> strategy and economic positioning
         */

        if ((effects.population || 0) > 0) {

            add("guardian", 2);

        }


        if ((effects.food || 0) > 0) {

            add("guardian", 1);

        }


        if ((effects.morale || 0) > 0) {

            add("humanist", 2);

        }


        if ((effects.materials || 0) > 0) {

            add("builder", 2);

        }


        if ((effects.wealth || 0) > 0) {

            add("strategist", 2);

        }


        /*
         * ============================================================
         * 3. SACRIFICE PATTERNS
         * ============================================================
         *
         * A personality is revealed not only by what someone gains,
         * but by what they are willing to give up to get it.
         */

        if (
            (effects.wealth || 0) < 0 &&
            (
                (effects.morale || 0) > 0 ||
                (effects.population || 0) > 0
            )
        ) {

            add("humanist", 2);

        }


        if (
            (effects.materials || 0) < 0 &&
            (
                (effects.food || 0) > 0 ||
                (effects.population || 0) > 0
            )
        ) {

            add("guardian", 2);

        }


        if (
            (effects.wealth || 0) < 0 &&
            (effects.materials || 0) < 0 &&
            (effects.morale || 0) > 0
        ) {

            add("builder", 1);
            add("humanist", 1);

        }


        /*
         * ============================================================
         * 4. RISK / OPPORTUNITY SIGNALS
         * ============================================================
         */

        const totalPositiveImpact =
            Object.values(effects)
                .filter(value => value > 0)
                .reduce((sum, value) => sum + value, 0);

        const totalNegativeImpact =
            Object.values(effects)
                .filter(value => value < 0)
                .reduce((sum, value) => sum + Math.abs(value), 0);


        if (
            totalPositiveImpact >= 15 &&
            totalNegativeImpact >= 8
        ) {

            add("visionary", 2);

        }


        /*
         * ============================================================
         * 5. CAUTIOUS / DELIBERATE DECISIONS
         * ============================================================
         */

        const cautiousChoices = new Set([
            "Preserve your reserves",
            "Protect your reserves",
            "Negotiate carefully",
            "Limit the mining",
            "Hold a modest festival",
            "Use emergency stores",
            "Build something smaller",
            "Test them first",
            "Offer limited settlement",
            "Fund a small archive",
            "Build a cheaper replacement",
            "Reroute traffic",
            "Regulate it",
            "Buy food abroad",
            "Protect the farmland"
        ]);


        if (cautiousChoices.has(title)) {

            add("strategist", 4);

        }


        /*
         * ============================================================
         * 6. DECISIVE / COMMAND-ORIENTED DECISIONS
         * ============================================================
         */

        const decisiveChoices = new Set([
            "Refuse",
            "Refuse it",
            "Reject it",
            "Reject the proposal",
            "Ban it",
            "Do nothing",
            "Build defenses",
            "Stand firmly behind your claim"
        ]);


        if (decisiveChoices.has(title)) {

            add("commander", 3);

        }


        /*
         * ============================================================
         * 7. AUTONOMY / INDEPENDENCE
         * ============================================================
         *
         * These are explicit choices where the player rejected an
         * expected path, preserved independence, or refused outside
         * pressure.
         */

        const autonomyChoices = new Set([
            "Decline",
            "Reject them",
            "Reject it",
            "Leave it untouched",
            "Turn them away",
            "Reject the proposal",
            "Refuse",
            "Ban it",
            "Reject the major trade agreement",
            "Leave the merchant's wealth untouched",
            "Trust the rains"
        ]);


        if (autonomyChoices.has(title)) {

            add("rebel", 4);

        }


        /*
         * ============================================================
         * 8. KNOWLEDGE / LEARNING
         * ============================================================
         */

        const learningChoices = new Set([
            "Test them first",
            "Fund the library",
            "Fund a small archive",
            "Build schools",
            "Create apprenticeships"
        ]);


        if (learningChoices.has(title)) {

            add("scholar", 3);

        }


        /*
         * ============================================================
         * 9. HUMAN-CENTRED DECISIONS
         * ============================================================
         */

        const humanCentredChoices = new Set([
            "Share your stores",
            "Sell it at a fair price",
            "Hold a grand festival",
            "Hold a modest festival",
            "Fund public care",
            "Welcome them",
            "Build schools",
            "Create apprenticeships",
            "Evacuate vulnerable areas",
            "A happy civilization"
        ]);


        if (humanCentredChoices.has(title)) {

            add("humanist", 3);

        }


        /*
         * ============================================================
         * 10. BUILDING / CREATION
         * ============================================================
         */

        const buildingChoices = new Set([
            "Invest in the harvest",
            "Protect the roads",
            "Open the mine",
            "Build it",
            "Build something smaller",
            "Repair immediately",
            "Build a cheaper replacement",
            "Build schools",
            "Protect the farmland",
            "Build defenses"
        ]);


        if (buildingChoices.has(title)) {

            add("builder", 3);

        }


        /*
         * ============================================================
         * 11. SURVIVAL / RESOURCE PRESERVATION
         * ============================================================
         */

        const survivalChoices = new Set([
            "Preserve your reserves",
            "Protect your reserves",
            "Ration food",
            "Buy food",
            "Use emergency stores",
            "Trust the rains",
            "Reroute traffic",
            "Do nothing"
        ]);


        if (survivalChoices.has(title)) {

            add("survivor", 3);

        }


        /*
         * A direct food-protection decision during scarcity is strong
         * evidence of practical survival thinking.
         */

        if (
            (effects.food || 0) > 0 &&
            (effects.wealth || 0) < 0
        ) {

            add("survivor", 2);

        }


        /*
         * ============================================================
         * 12. BALANCED DECISION-MAKING
         * ============================================================
         *
         * Strategists are not necessarily the people who always
         * choose the safest option. They often choose the option that
         * avoids an extreme trade-off.
         */

        if (
            totalPositiveImpact > 0 &&
            totalNegativeImpact > 0 &&
            totalPositiveImpact <= 15 &&
            totalNegativeImpact <= 12
        ) {

            add("strategist", 2);

        }


        /*
         * ============================================================
         * 13. HIGH-UPSIDE EXPERIMENTATION
         * ============================================================
         */

        if (
            flag === "experimentation" &&
            totalPositiveImpact > totalNegativeImpact
        ) {

            add("visionary", 2);

        }


        /*
         * ============================================================
         * 14. COOPERATION + WELLBEING
         * ============================================================
         *
         * When someone repeatedly chooses cooperation while also
         * protecting morale or people, both Diplomat and Humanist
         * should receive evidence.
         */

        if (
            flag === "cooperation" &&
            (
                (effects.morale || 0) > 0 ||
                (effects.population || 0) > 0
            )
        ) {

            add("humanist", 2);

        }


        /*
         * ============================================================
         * 15. PROTECTION + DECISIVENESS
         * ============================================================
         */

        if (
            flag === "defense" &&
            (effects.population || 0) > 0
        ) {

            add("guardian", 2);
            add("commander", 1);

        }

    }


    function chooseOption(
        event,
        choice
    ) {

        scorePersonality(choice);


        history.push({
            title: choice.title,
            description: choice.description,
            log: choice.log,
            flag: choice.flag || null
        });


        Object.entries(
            choice.effects
        ).forEach(
            ([key, value]) => {

                if (
                    Object.prototype.hasOwnProperty.call(
                        state,
                        key
                    )
                ) {

                    state[key] += value;

                }

            }
        );


        if (choice.flag) {

            if (
                Object.prototype.hasOwnProperty.call(
                    flags,
                    choice.flag
                )
            ) {

                flags[
                    choice.flag
                ]++;

            }

        }


        addLog(
            choice.log ||
            `You chose: ${choice.title}.`
        );


        applyNaturalChanges();


        updateStats();


        document.querySelectorAll(
            ".choice-button"
        ).forEach(
            button => {

                button.disabled =
                    true;

                button.style.opacity =
                    "0.5";

                button.style.cursor =
                    "default";

            }
        );


        if (
            turn >= TOTAL_TURNS
        ) {

            setTimeout(
                endGame,
                700
            );


            return;

        }


        turn++;


        setTimeout(
            renderEvent,
            700
        );

    }



    function applyNaturalChanges() {

        const foodCost =
            state.population >= 75

                ? 7

                : state.population >= 55

                    ? 5

                    : 3;


        state.food -=
            foodCost;


        if (
            state.food >= 65 &&
            state.morale >= 60
        ) {

            state.population += 2;

        }


        if (
            state.food <= 20
        ) {

            state.population -= 3;

            state.morale -= 4;

        }


        if (
            state.morale <= 20
        ) {

            state.population -= 2;

        }

    }



    function calculateEnding() {

        const finalState = [
            state.population,
            state.food,
            state.materials,
            state.wealth,
            state.morale
        ];

        const weakestResource = Math.min(...finalState);
        const scores = { ...personalityScores };

        if (weakestResource <= 20) scores.survivor += 8;
        if (weakestResource <= 10) scores.survivor += 6;
        if (state.population >= 70) scores.guardian += 3;
        if (state.morale >= 70) scores.humanist += 4;
        if (state.materials >= 70) scores.builder += 4;
        if (state.wealth >= 70) scores.strategist += 4;
        if (state.food >= 70) scores.guardian += 3;
        if (flags.education >= 2) scores.scholar += 5;
        if (flags.experimentation >= 2) scores.visionary += 4;
        if (flags.cooperation >= 2) scores.diplomat += 4;
        if (flags.defense >= 2) scores.commander += 4;
        if (flags.growth >= 2) scores.builder += 3;
        if (flags.tradeFocus >= 2) scores.strategist += 3;

        const priority = [
            "diplomat", "guardian", "commander", "visionary", "humanist",
            "strategist", "rebel", "scholar", "builder", "survivor"
        ];

        let winningPersonality = priority[0];
        priority.forEach(personality => {
            if (scores[personality] > scores[winningPersonality]) winningPersonality = personality;
        });

        const profiles = {
            diplomat: {
                title: "THE DIPLOMAT",
                trait: "DIPLOMAT",
                image: "images/diplomat.png",
                subtitle: "You shaped your civilization through cooperation, negotiation and careful relationships.",
                story: "You rarely saw every problem as a battle to be won. You looked for agreements, compromises and ways to keep relationships intact. Your civilization's strength came from knowing when listening could accomplish more than force.",
                insight: "You tend to look for the path that allows different interests to coexist.",
                howYouDecide: "You naturally look for common ground before choosing confrontation. You weigh how a decision will affect relationships as well as resources, and you often prefer a workable compromise over a victory that leaves lasting damage.",
                howYouMoveThroughLife: "You are likely to move through life by reading the room, understanding different perspectives and keeping doors open. You can be the person who helps people with very different priorities find a way forward together.",
                strength: "You can turn disagreement into cooperation. People may trust you to find a path forward when there is no obvious answer that satisfies everyone.",
                blindSpot: "Keeping the peace can sometimes become more important than saying what you actually want. A compromise is not always the same thing as the right decision.",
                decisionPhilosophy: "“Find a way forward without making unnecessary enemies.”"
            },
            guardian: {
                title: "THE GUARDIAN",
                trait: "GUARDIAN",
                image: "images/guardian.png",
                subtitle: "You built your civilization around protection, stability and the wellbeing of your people.",
                story: "When uncertainty appeared, your instinct was to protect what mattered. You were willing to sacrifice wealth or opportunity when the safety of your people was at stake.",
                insight: "You naturally think about what needs protecting before asking what can be gained.",
                howYouDecide: "You begin by asking what could be harmed and who might bear the cost. Once something important is under threat, you are willing to spend resources or accept slower growth to keep it safe.",
                howYouMoveThroughLife: "You tend to become the person others rely on when circumstances are uncertain. You notice vulnerabilities early and often feel most comfortable when the people, systems or responsibilities in your care are secure.",
                strength: "You are dependable under pressure. You take responsibility seriously and are willing to make sacrifices that protect people or preserve something valuable.",
                blindSpot: "Protection can become overprotection. A strong instinct to prevent harm can sometimes make you reluctant to take a worthwhile risk or allow others to find their own way.",
                decisionPhilosophy: "“Protect what matters before chasing what is possible.”"
            },
            commander: {
                title: "THE COMMANDER",
                trait: "COMMANDER",
                image: "images/commander.png",
                subtitle: "You made decisive choices and were willing to stand firmly behind them.",
                story: "Your civilization was shaped by decisiveness. You did not always choose the safest or most popular path, but you were willing to take responsibility and act when hesitation carried its own risks.",
                insight: "You are comfortable making difficult decisions when someone has to take the lead.",
                howYouDecide: "You are inclined to make the call rather than remain stuck between possibilities. Once you believe a direction is necessary, you can accept the consequences and move forward without needing everyone to agree first.",
                howYouMoveThroughLife: "You tend to move toward responsibility rather than away from it. In uncertain situations, you may naturally become the person who sets a direction, establishes boundaries and expects action.",
                strength: "You create momentum. When a situation is paralysed by uncertainty, your willingness to choose can turn discussion into action.",
                blindSpot: "Decisiveness can become rigidity. Moving quickly can sometimes leave too little room for information, dissent or a better option that appears later.",
                decisionPhilosophy: "“Someone has to decide — make the call and own it.”"
            },
            visionary: {
                title: "THE VISIONARY",
                trait: "VISIONARY",
                image: "images/visionary.png",
                subtitle: "You repeatedly chose possibility over certainty.",
                story: "You were drawn toward opportunities that could change the future of your civilization. You were willing to experiment, expand and invest in possibilities that had not yet proven themselves.",
                insight: "You tend to see what something could become rather than only what it is today.",
                howYouDecide: "You are energized by potential. When an option could fundamentally change what comes next, you are willing to accept uncertainty and invest before the outcome is guaranteed.",
                howYouMoveThroughLife: "You tend to live with an eye on what could be built, discovered or transformed. Routine can feel limiting when you can see a larger possibility beyond it, and you may be happiest when there is something meaningful to pursue.",
                strength: "You can imagine futures that do not exist yet. Your willingness to experiment can create opportunities that a purely cautious approach would never discover.",
                blindSpot: "Possibility can be seductive. You may sometimes underestimate the boring, practical work required to turn an exciting idea into something sustainable.",
                decisionPhilosophy: "“If the future can be different, it may be worth risking the present.”"
            },
            humanist: {
                title: "THE HUMANIST",
                trait: "HUMANIST",
                image: "images/humanist.png",
                subtitle: "You measured success by the lives of the people inside your civilization.",
                story: "Again and again, your choices returned to people: their wellbeing, morale, opportunities and quality of life. Your civilization may not have maximised every resource, but you refused to treat its people as merely numbers.",
                insight: "You instinctively ask how decisions affect the human beings living with them.",
                howYouDecide: "You look beyond the immediate result and consider the human experience created by a choice. Morale, fairness, dignity and wellbeing can matter to you even when they are harder to measure than wealth or materials.",
                howYouMoveThroughLife: "You are likely to notice the people behind systems and outcomes. You may judge a situation less by how efficient it is and more by whether the people inside it are being treated well.",
                strength: "You keep humanity in the equation. You can create loyalty, belonging and trust because people feel seen rather than treated as resources.",
                blindSpot: "Caring deeply can make boundaries difficult. You may take on costs or responsibilities that are not yours to carry, or struggle with choices where someone inevitably loses.",
                decisionPhilosophy: "“A civilization is only successful if the people living in it can feel it.”"
            },
            strategist: {
                title: "THE STRATEGIST",
                trait: "STRATEGIST",
                image: "images/strategist.png",
                subtitle: "You preferred calculated decisions over impulsive ones.",
                story: "You consistently weighed costs, risks and alternatives before committing. You understood that a good decision is not always the biggest decision — sometimes it is the one that preserves options for later.",
                insight: "You naturally think several moves ahead.",
                howYouDecide: "You tend to compare consequences rather than react to the most obvious option. You look for leverage, trade-offs and ways to protect future choices while still making progress now.",
                howYouMoveThroughLife: "You are likely to observe before committing. You may prefer having a sense of the landscape, keeping options available and making moves that improve your position over time rather than chasing every immediate opportunity.",
                strength: "You can remain deliberate when other people are reacting emotionally. Your ability to see second- and third-order consequences can prevent avoidable mistakes.",
                blindSpot: "Analysis can become its own form of hesitation. Sometimes the information you want will never be complete, and waiting for certainty can cost you an opportunity.",
                decisionPhilosophy: "“Protect the future without losing the present.”"
            },
            rebel: {
                title: "THE REBEL",
                trait: "REBEL",
                image: "images/rebel.png",
                subtitle: "You were willing to question expectations and reject paths that did not feel right.",
                story: "Your civilization was not built by simply following the obvious path. You questioned proposals, resisted pressure and sometimes chose independence over cooperation.",
                insight: "You value autonomy and are willing to challenge the direction everyone else expects.",
                howYouDecide: "You are suspicious of choices that are presented as inevitable. You ask whether a rule, expectation or established path actually deserves your agreement before deciding whether to follow it.",
                howYouMoveThroughLife: "You tend to need a sense of autonomy. You may thrive when you can question assumptions, choose your own route and avoid being pushed into a role simply because it is expected of you.",
                strength: "You can see alternatives that conformity hides. Your willingness to say no can protect independence and create room for genuine change.",
                blindSpot: "Opposition can become a habit. Rejecting something simply because it is established can be just as limiting as following it without question.",
                decisionPhilosophy: "“I will choose my path — not simply inherit one.”"
            },
            scholar: {
                title: "THE SCHOLAR",
                trait: "SCHOLAR",
                image: "images/scholar.png",
                subtitle: "You believed knowledge could be one of the greatest foundations of civilization.",
                story: "You repeatedly invested in learning, education and understanding. You accepted that some of the most important investments may not produce immediate rewards.",
                insight: "You are drawn toward understanding how things work before deciding what should be done.",
                howYouDecide: "You prefer to improve the quality of the decision by improving the quality of your understanding. You are willing to invest time and resources in learning when the answer is not yet clear.",
                howYouMoveThroughLife: "You tend to stay curious. Experience becomes something to study rather than merely endure, and you may keep asking questions long after others have accepted the first explanation.",
                strength: "You can turn uncertainty into understanding. Your willingness to learn helps you adapt when old assumptions stop working.",
                blindSpot: "There is always more to learn. Too much preparation can become a way of postponing action, especially when no amount of information can remove uncertainty completely.",
                decisionPhilosophy: "“Understand first. Then decide what is worth doing.”"
            },
            builder: {
                title: "THE BUILDER",
                trait: "BUILDER",
                image: "images/builder.png",
                subtitle: "You turned resources into structures, systems and lasting foundations.",
                story: "Your choices repeatedly favoured creating something tangible. Buildings, infrastructure and practical foundations mattered because you understood that civilizations need things that endure beyond a single decision.",
                insight: "You naturally turn ideas into systems, structures and things that can last.",
                howYouDecide: "You are drawn to choices that create something useful and durable. Rather than only solving today's problem, you often look for the structure, system or investment that can keep solving it tomorrow.",
                howYouMoveThroughLife: "You tend to value progress you can see and build upon. You may feel most fulfilled when effort leaves something stronger behind — a skill, a project, a system, a home or a foundation for someone else.",
                strength: "You make ideas tangible. You can turn limited resources into something that continues creating value long after the original decision.",
                blindSpot: "Building can become an end in itself. You may sometimes keep improving a structure when what is really needed is flexibility, rest or a willingness to walk away.",
                decisionPhilosophy: "“Leave something stronger than you found it.”"
            },
            survivor: {
                title: "THE SURVIVOR",
                trait: "SURVIVOR",
                image: "images/survivor.png",
                subtitle: "You kept your civilization alive when circumstances became difficult.",
                story: "Your choices reveal a strong instinct for endurance. When resources became scarce or circumstances deteriorated, you focused on getting through the immediate danger and preserving what remained.",
                insight: "You know how to keep going when the ideal solution is no longer available.",
                howYouDecide: "You become practical when conditions get difficult. You focus on what is necessary, what can be protected and what must be sacrificed so that the whole system can keep functioning.",
                howYouMoveThroughLife: "You tend to be adaptable when circumstances stop cooperating. You may not need everything to be ideal before moving forward; you can work with what is available and keep going when others become overwhelmed.",
                strength: "You endure. You can function under pressure, improvise with limited resources and keep sight of what absolutely has to survive.",
                blindSpot: "Survival mode can become a permanent way of living. Once danger passes, it can be difficult to stop bracing for the next problem and allow yourself to pursue growth rather than merely safety.",
                decisionPhilosophy: "“When the perfect choice disappears, make the choice that keeps you moving.”"
            }
        };

        return { ...profiles[winningPersonality], scores };
    }


    function endGame() {

        document.querySelector(".event-panel").hidden = true;

        document.querySelector(".civilization-log").hidden = true;


        const ending = calculateEnding();


        document.getElementById("endingTitle").textContent =
            ending.title;


        document.getElementById("endingSubtitle").textContent =
            ending.subtitle;


        document.getElementById("finalPopulation").textContent =
            state.population;


        document.getElementById("finalFood").textContent =
            state.food;


        document.getElementById("finalMaterials").textContent =
            state.materials;


        document.getElementById("finalWealth").textContent =
            state.wealth;


        document.getElementById("finalMorale").textContent =
            state.morale;


        document.getElementById("finalStory").textContent =
            ending.story;


        document.getElementById("definingTrait").textContent =
            ending.trait;



        /* =========================
           PERSONALITY ARTWORK
           ========================= */

        const civilizationVisual =
            document.getElementById(
                "civilizationVisual"
            );


        if (civilizationVisual) {

            civilizationVisual.dataset.trait =
                ending.trait
                    .toLowerCase()
                    .replace(/\s+/g, "-");


            civilizationVisual.innerHTML = `
                <img
                    src="${ending.image}"
                    alt="${ending.title} — ${ending.trait}"
                    class="personality-artwork"
                >
            `;

        }



        /* =========================
           PERSONALITY RESULT
           ========================= */

        const resultFields = {

            personalityInsight:
                ending.insight,

            howYouDecide:
                ending.howYouDecide,

            howYouMoveThroughLife:
                ending.howYouMoveThroughLife,

            personalityStrength:
                ending.strength,

            personalityBlindSpot:
                ending.blindSpot,

            decisionPhilosophy:
                ending.decisionPhilosophy

        };


        Object.entries(resultFields).forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);


                if (element) {

                    element.textContent =
                        value;

                }

            }
        );



        /* =========================
           OPTIONAL LEGACY ELEMENT
           ========================= */

        const visualTrait =
            document.getElementById(
                "visualTrait"
            );


        if (visualTrait) {

            visualTrait.textContent =
                ending.trait;

        }



        document.getElementById(
            "endScreen"
        ).hidden = false;



        setTimeout(() => {

            document.getElementById(
                "endScreen"
            ).scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }, 50);

    }


    function resetGame() {

        state = {

            population: 50,

            food: 50,

            materials: 50,

            wealth: 50,

            morale: 50

        };


        turn = 1;


        history = [];


        flags = {

            tradeFocus: 0,

            education: 0,

            cooperation: 0,

            experimentation: 0,

            defense: 0,

            growth: 0

        };


        personalityScores = {
            diplomat: 0,
            guardian: 0,
            commander: 0,
            visionary: 0,
            humanist: 0,
            strategist: 0,
            rebel: 0,
            scholar: 0,
            builder: 0,
            survivor: 0
        };


        document.querySelector(
            ".event-panel"
        ).hidden = false;


        document.querySelector(
            ".civilization-log"
        ).hidden = false;


        document.getElementById(
            "endScreen"
        ).hidden = true;



        /* Clear personality result fields */

        const resultFields = [
            "personalityInsight",
            "howYouDecide",
            "howYouMoveThroughLife",
            "personalityStrength",
            "personalityBlindSpot",
            "decisionPhilosophy"
        ];


        resultFields.forEach((id) => {

            const element =
                document.getElementById(id);


            if (element) {

                element.textContent = "";

            }

        });


        const civilizationVisual =
            document.getElementById(
                "civilizationVisual"
            );


        if (
            civilizationVisual
        ) {

            delete civilizationVisual.dataset.trait;

        }


        const visualTrait =
            document.getElementById(
                "visualTrait"
            );


        if (
            visualTrait
        ) {

            visualTrait.textContent =
                "YOUR CIVILIZATION";

        }


        document.getElementById(
            "logEntries"
        ).innerHTML =
            "<p>Your civilization begins its first era.</p>";


        updateStats();


        renderEvent();

    }



    document.getElementById(
        "playAgainButton"
    ).addEventListener(
        "click",
        resetGame
    );


    updateStats();


    renderEvent();

});
