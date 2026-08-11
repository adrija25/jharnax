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



    function scorePersonality(event, choice) {

        /*
         * PERSONALITY SCORING
         * -------------------
         * Each decision now carries a deliberate personality signal.
         *
         * The previous system gave Strategist points from many overlapping
         * generic rules (wealth, cautious choices, balanced effects, trade,
         * and final wealth). That made Strategist disproportionately likely
         * to win even when the player's actual decisions pointed elsewhere.
         *
         * This version makes the player's chosen action the main evidence.
         * Every choice has a primary personality and, where appropriate, a
         * secondary personality. Final civilization conditions provide only
         * small supporting signals later in calculateEnding().
         */

        const key = `${event.title}::${choice.title}`;

        const profiles = {

            // THE EARLY RAINS
            "The Early Rains::Invest in the harvest": { builder: 5, visionary: 2, guardian: 1 },
            "The Early Rains::Protect the roads": { builder: 4, strategist: 2 },
            "The Early Rains::Preserve your reserves": { survivor: 5, strategist: 1 },

            // THE HUNGRY NEIGHBOUR
            "The Hungry Neighbour::Share your stores": { diplomat: 5, humanist: 3 },
            "The Hungry Neighbour::Sell it at a fair price": { diplomat: 4, strategist: 2, humanist: 2 },
            "The Hungry Neighbour::Protect your reserves": { survivor: 5, guardian: 2 },

            // THE TRAVELLING MERCHANT
            "The Travelling Merchant::Accept the deal": { strategist: 4, visionary: 2 },
            "The Travelling Merchant::Negotiate carefully": { diplomat: 4, strategist: 2 },
            "The Travelling Merchant::Decline": { rebel: 4, strategist: 1 },

            // THE NEW MINE
            "The New Mine::Open the mine": { visionary: 4, builder: 2, strategist: 1 },
            "The New Mine::Limit the mining": { strategist: 3, builder: 2, guardian: 1 },
            "The New Mine::Leave it untouched": { rebel: 4, guardian: 2 },

            // THE FESTIVAL
            "The Festival::Hold a grand festival": { humanist: 6, visionary: 1 },
            "The Festival::Hold a modest festival": { humanist: 5, strategist: 1 },
            "The Festival::Cancel the festival": { survivor: 4, strategist: 2 },

            // THE EMPTY GRANARY
            "The Empty Granary::Ration food": { survivor: 6, guardian: 2 },
            "The Empty Granary::Buy food": { survivor: 4, guardian: 2, strategist: 1 },
            "The Empty Granary::Use emergency stores": { survivor: 5, guardian: 2 },

            // THE BUILDER'S PROPOSAL
            "The Builder's Proposal::Build it": { builder: 6, visionary: 2 },
            "The Builder's Proposal::Build something smaller": { builder: 5, strategist: 2 },
            "The Builder's Proposal::Reject the proposal": { rebel: 5, strategist: 1 },

            // THE BORDER DISPUTE
            "The Border Dispute::Give them the land": { diplomat: 6, humanist: 2 },
            "The Border Dispute::Negotiate": { diplomat: 6, strategist: 1 },
            "The Border Dispute::Refuse": { commander: 4, rebel: 4 },

            // THE STRANGE SEEDS
            "The Strange Seeds::Plant them everywhere": { visionary: 6, rebel: 2 },
            "The Strange Seeds::Test them first": { scholar: 5, visionary: 2, strategist: 1 },
            "The Strange Seeds::Reject them": { rebel: 5, survivor: 1 },

            // THE SICK SEASON
            "The Sick Season::Close the markets": { guardian: 6, humanist: 2 },
            "The Sick Season::Continue normally": { strategist: 3, rebel: 2, visionary: 1 },
            "The Sick Season::Fund public care": { humanist: 6, guardian: 3 },

            // THE SKILLED OUTSIDERS
            "The Skilled Outsiders::Welcome them": { diplomat: 5, humanist: 3, visionary: 1 },
            "The Skilled Outsiders::Offer limited settlement": { strategist: 2, diplomat: 3, guardian: 1 },
            "The Skilled Outsiders::Turn them away": { rebel: 4, guardian: 2 },

            // THE GREAT LIBRARY
            "The Great Library::Fund the library": { scholar: 7, visionary: 1 },
            "The Great Library::Fund a small archive": { scholar: 6, strategist: 1 },
            "The Great Library::Refuse": { rebel: 4, strategist: 1 },

            // THE BROKEN BRIDGE
            "The Broken Bridge::Repair immediately": { builder: 6, guardian: 1 },
            "The Broken Bridge::Build a cheaper replacement": { builder: 5, strategist: 2 },
            "The Broken Bridge::Reroute traffic": { survivor: 4, strategist: 2 },

            // THE WEALTHY MERCHANT
            "The Wealthy Merchant::Tax the merchant": { humanist: 5, commander: 2 },
            "The Wealthy Merchant::Reward the merchant": { strategist: 4, visionary: 2 },
            "The Wealthy Merchant::Leave them alone": { rebel: 4, strategist: 1 },

            // THE DROUGHT
            "The Drought::Protect the farmland": { guardian: 4, builder: 3, survivor: 2 },
            "The Drought::Buy food abroad": { survivor: 4, strategist: 2 },
            "The Drought::Trust the rains": { rebel: 4, survivor: 2 },

            // THE CURIOUS CHILDREN
            "The Curious Children::Build schools": { scholar: 5, humanist: 3, builder: 2 },
            "The Curious Children::Create apprenticeships": { scholar: 5, builder: 2, humanist: 2 },
            "The Curious Children::Ignore the request": { rebel: 3, strategist: 1 },

            // THE NIGHT MARKET
            "The Night Market::Allow it freely": { visionary: 4, rebel: 3, strategist: 1 },
            "The Night Market::Regulate it": { strategist: 3, guardian: 2 },
            "The Night Market::Ban it": { commander: 4, rebel: 3, guardian: 1 },

            // THE GREAT OPPORTUNITY
            "The Great Opportunity::Accept immediately": { visionary: 4, strategist: 3 },
            "The Great Opportunity::Negotiate carefully": { diplomat: 4, strategist: 2 },
            "The Great Opportunity::Reject it": { rebel: 5, commander: 2 },

            // THE STORM
            "The Storm::Evacuate vulnerable areas": { guardian: 6, humanist: 2 },
            "The Storm::Build defenses": { commander: 5, guardian: 4, builder: 2 },
            "The Storm::Do nothing": { survivor: 3, rebel: 2 },

            // THE PEOPLE'S QUESTION
            "The People's Question::A prosperous civilization": { strategist: 4, visionary: 3 },
            "The People's Question::A strong civilization": { commander: 4, guardian: 3 },
            "The People's Question::A happy civilization": { humanist: 6, diplomat: 2 }
        };


        const selectedProfile = profiles[key];


        if (selectedProfile) {

            Object.entries(selectedProfile).forEach(
                ([personality, amount]) => {

                    personalityScores[personality] += amount;

                }
            );

            return;
        }


        /*
         * Safe fallback for any future choice added to the game.
         * This deliberately does NOT award automatic Strategist points.
         */

        const flagFallbacks = {
            cooperation: { diplomat: 3, humanist: 2 },
            defense: { guardian: 3, commander: 3 },
            growth: { visionary: 3, builder: 2 },
            experimentation: { visionary: 3, scholar: 2 },
            education: { scholar: 4 },
            tradeFocus: { strategist: 3, visionary: 1 }
        };


        const fallback = flagFallbacks[choice.flag];


        if (fallback) {

            Object.entries(fallback).forEach(
                ([personality, amount]) => {

                    personalityScores[personality] += amount;

                }
            );

        }

    }


    function chooseOption(
        event,
        choice
    ) {

        scorePersonality(event, choice);


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

        /*
         * The player's decisions are the primary source of personality.
         * Final civilization conditions only add small supporting signals,
         * so a high wealth score or one strong resource cannot overpower
         * the actual pattern of choices made during the game.
         */

        const scores = { ...personalityScores };


        // Small end-state bonuses only.
        if (state.population >= 75) {
            scores.guardian += 2;
        }


        if (state.morale >= 75) {
            scores.humanist += 2;
        }


        if (state.materials >= 75) {
            scores.builder += 2;
        }


        if (state.wealth >= 75) {
            scores.strategist += 2;
        }


        if (state.food >= 75) {
            scores.guardian += 2;
        }


        // Repeated explicit behavioural flags provide only a small nudge.
        if (flags.education >= 3) {
            scores.scholar += 2;
        }


        if (flags.experimentation >= 3) {
            scores.visionary += 2;
        }


        if (flags.cooperation >= 3) {
            scores.diplomat += 2;
        }


        if (flags.defense >= 3) {
            scores.commander += 2;
        }


        if (flags.growth >= 3) {
            scores.builder += 2;
        }


        if (flags.tradeFocus >= 3) {
            scores.strategist += 2;
        }


        // Survival should reflect actual difficult conditions, not just low wealth.
        const weakestResource = Math.min(
            state.population,
            state.food,
            state.materials,
            state.wealth,
            state.morale
        );


        if (weakestResource <= 20) {
            scores.survivor += 2;
        }


        /*
         * Find the highest score. The priority list is used ONLY for genuine
         * ties. It no longer gives Strategist an advantage over other types.
         */

        const priority = [
            "diplomat",
            "guardian",
            "commander",
            "visionary",
            "humanist",
            "strategist",
            "rebel",
            "scholar",
            "builder",
            "survivor"
        ];


        let winningPersonality = priority[0];
        let highestScore = scores[winningPersonality];


        priority.forEach((personality) => {

            if (scores[personality] > highestScore) {

                winningPersonality = personality;
                highestScore = scores[personality];

            }

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

        const selectedProfile = profiles[winningPersonality];

        return {
            key: winningPersonality,
            ...selectedProfile,
            scores
        };
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


            /*
             * PERSONALITY IMAGE RESOLUTION
             * -----------------------------
             * The image is resolved from the same personality key that
             * produced the text result. This prevents a stale/mismatched
             * profile image reference from ever being paired with another
             * personality's result. The query string also forces the browser
             * to fetch the current artwork rather than an older cached copy.
             */
            const personalityImages = {
                diplomat: "images/diplomat.png",
                guardian: "images/guardian.png",
                commander: "images/commander.png",
                visionary: "images/visionary.png",
                humanist: "images/humanist.png",
                strategist: "images/strategist.png",
                rebel: "images/rebel.png",
                scholar: "images/scholar.png",
                builder: "images/builder.png",
                survivor: "images/survivor.png"
            };

            const imagePath =
                personalityImages[ending.key] ||
                ending.image;

            const imageSource =
                `${imagePath}?v=20260811-2`;


            civilizationVisual.innerHTML = `
                <img
                    src="${imageSource}"
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
