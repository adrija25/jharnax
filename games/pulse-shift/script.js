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



    function chooseOption(
        event,
        choice
    ) {

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
         * Tiny Empire does not judge the player by one resource alone.
         *
         * The final identity of a civilization is determined by:
         *
         * 1. Its final condition
         * 2. The choices the player repeatedly made
         * 3. The balance between different priorities
         *
         * This makes the ending feel earned rather than random.
         */


        const scores = {


            ambition:

                (state.wealth * 0.6) +

                (flags.tradeFocus * 12) +

                (flags.growth * 8),


            care:

                (state.morale * 0.55) +

                (state.food * 0.35) +

                (flags.cooperation * 14),


            resolve:

                (state.materials * 0.5) +

                (state.morale * 0.25) +

                (flags.defense * 14),


            curiosity:

                (state.population * 0.45) +

                (state.food * 0.2) +

                (flags.experimentation * 16) +

                (flags.growth * 10),


            wisdom:

                (state.morale * 0.3) +

                (state.materials * 0.2) +

                (flags.education * 18) +

                (flags.experimentation * 7),


            cooperation:

                (state.morale * 0.45) +

                (state.population * 0.2) +

                (flags.cooperation * 18),


            adaptability:

                (flags.experimentation * 18) +

                (flags.cooperation * 8) +

                (flags.tradeFocus * 7),


            endurance:

                Math.min(
                    state.population,
                    state.food,
                    state.materials,
                    state.wealth,
                    state.morale
                ) * 0.7

        };


        /*
         * A civilization with a dangerously low final resource
         * should be recognized for survival before prosperity.
         */


        const weakestResource =
            Math.min(
                state.population,
                state.food,
                state.materials,
                state.wealth,
                state.morale
            );


        if (
            weakestResource <= 15
        ) {

            return {

                title:
                    "THE SURVIVOR",

                trait:
                    "ENDURANCE",

                story:
                    "Your civilization faced serious hardship and carried its people through an era of scarcity. It was not defined by abundance, but by the ability to endure when resources ran dangerously low.",

                subtitle:
                    "Your twelve-turn era ended under pressure — but your civilization endured."

            };

        }


        /*
         * A civilization that maintained strong values across
         * all resources can receive a balance ending.
         */


        const resourceValues = [

            state.population,

            state.food,

            state.materials,

            state.wealth,

            state.morale

        ];


        const highest =
            Math.max(
                ...resourceValues
            );


        const lowest =
            Math.min(
                ...resourceValues
            );


        const balanceGap =
            highest - lowest;


        if (
            balanceGap <= 18 &&
            lowest >= 55
        ) {

            return {

                title:
                    "THE HARMONIOUS REALM",

                trait:
                    "BALANCE",

                story:
                    "Your civilization avoided becoming dependent on a single strength. Food, people, resources, wealth and morale remained remarkably aligned, creating a stable and resilient society.",

                subtitle:
                    "Your twelve-turn era produced a civilization defined by balance."

            };

        }


        /*
         * Education becomes a genuine ending rather than merely
         * being a tracked flag that never affects the result.
         */


        if (
            flags.education >= 2 &&
            state.morale >= 55
        ) {

            return {

                title:
                    "THE SCHOLAR'S REALM",

                trait:
                    "WISDOM",

                story:
                    "Your civilization invested in knowledge even when more immediate opportunities competed for attention. Learning became part of the foundation on which your society was built.",

                subtitle:
                    "Your twelve-turn era became an era of learning and knowledge."

            };

        }


        if (
            flags.experimentation >= 2 &&
            (
                flags.cooperation +
                flags.tradeFocus
            ) >= 2
        ) {

            return {

                title:
                    "THE ADAPTIVE REALM",

                trait:
                    "ADAPTABILITY",

                story:
                    "Your civilization repeatedly experimented, adjusted and remained open to unfamiliar possibilities. Rather than relying on one fixed path, you learned to change with circumstances.",

                subtitle:
                    "Your twelve-turn era rewarded curiosity and adaptation."

            };

        }


        if (
            scores.ambition >= 78 &&
            state.wealth >= 65
        ) {

            return {

                title:
                    "THE MERCHANT REALM",

                trait:
                    "AMBITION",

                story:
                    "Your civilization grew through commerce, opportunity and calculated risk. Prosperity became one of the strongest foundations of your era.",

                subtitle:
                    "Your twelve-turn era became an age of prosperity."

            };

        }


        if (
            scores.care >= 78 &&
            state.morale >= 65
        ) {

            return {

                title:
                    "THE GARDEN",

                trait:
                    "CARE",

                story:
                    "Your civilization repeatedly invested in the wellbeing of its people. Prosperity mattered, but creating a good life for those who lived within your realm mattered more.",

                subtitle:
                    "Your twelve-turn era became an age of collective wellbeing."

            };

        }


        if (
            scores.resolve >= 78 &&
            state.materials >= 65
        ) {

            return {

                title:
                    "THE FORTRESS",

                trait:
                    "RESOLVE",

                story:
                    "Your civilization valued preparation, infrastructure and protection. When uncertainty arrived, you preferred to build foundations strong enough to withstand it.",

                subtitle:
                    "Your twelve-turn era became an age of strength and preparation."

            };

        }


        if (
            scores.curiosity >= 78 &&
            (
                state.population >= 60 ||
                flags.growth >= 2
            )
        ) {

            return {

                title:
                    "THE FRONTIER",

                trait:
                    "CURIOSITY",

                story:
                    "Your civilization embraced growth and new possibilities. You repeatedly chose expansion, experimentation and opportunity instead of remaining within familiar boundaries.",

                subtitle:
                    "Your twelve-turn era became an age of discovery."

            };

        }


        if (
            scores.cooperation >= 78 &&
            flags.cooperation >= 2
        ) {

            return {

                title:
                    "THE PEOPLE'S REALM",

                trait:
                    "COOPERATION",

                story:
                    "Your civilization was shaped by decisions that considered the lives of others. Cooperation became one of your greatest strengths and helped hold your society together.",

                subtitle:
                    "Your twelve-turn era became an age of community."

            };

        }


        /*
         * If no single identity dominates, use the strongest
         * overall tendency so ordinary playthroughs still
         * receive a meaningful result.
         */


        const ranked = [

            [
                "AMBITION",
                scores.ambition
            ],

            [
                "CARE",
                scores.care
            ],

            [
                "RESOLVE",
                scores.resolve
            ],

            [
                "CURIOSITY",
                scores.curiosity
            ],

            [
                "WISDOM",
                scores.wisdom
            ],

            [
                "COOPERATION",
                scores.cooperation
            ],

            [
                "ADAPTABILITY",
                scores.adaptability
            ]

        ].sort(
            (a, b) =>
                b[1] - a[1]
        );


        const dominantTrait =
            ranked[0][0];


        const fallbackEndings = {


            AMBITION: {

                title:
                    "THE RISING REALM",

                trait:
                    "AMBITION",

                story:
                    "Your civilization consistently looked toward opportunity and growth. It may not have become an economic powerhouse, but ambition shaped the direction of your era.",

                subtitle:
                    "Your twelve-turn era was driven by ambition."

            },


            CARE: {

                title:
                    "THE KINDER REALM",

                trait:
                    "CARE",

                story:
                    "Your civilization placed unusual value on the wellbeing of its people. Its greatest achievement was not wealth, but the quality of life it tried to create.",

                subtitle:
                    "Your twelve-turn era was shaped by care."

            },


            RESOLVE: {

                title:
                    "THE STEADFAST REALM",

                trait:
                    "RESOLVE",

                story:
                    "Your civilization preferred preparation and stability over reckless expansion. You built carefully and tried to make your society capable of weathering uncertainty.",

                subtitle:
                    "Your twelve-turn era was shaped by resolve."

            },


            CURIOSITY: {

                title:
                    "THE EXPLORERS' REALM",

                trait:
                    "CURIOSITY",

                story:
                    "Your civilization was rarely satisfied with the familiar. Your choices repeatedly opened the door to growth, experimentation and new possibilities.",

                subtitle:
                    "Your twelve-turn era was shaped by curiosity."

            },


            WISDOM: {

                title:
                    "THE LEARNING REALM",

                trait:
                    "WISDOM",

                story:
                    "Your civilization understood that not every investment produces an immediate reward. Knowledge, learning and thoughtful decisions became part of its identity.",

                subtitle:
                    "Your twelve-turn era was shaped by wisdom."

            },


            COOPERATION: {

                title:
                    "THE UNITED REALM",

                trait:
                    "COOPERATION",

                story:
                    "Your civilization repeatedly considered how its decisions affected others. Unity and cooperation became quiet strengths throughout your era.",

                subtitle:
                    "Your twelve-turn era was shaped by cooperation."

            },


            ADAPTABILITY: {

                title:
                    "THE CHANGING REALM",

                trait:
                    "ADAPTABILITY",

                story:
                    "Your civilization did not follow one rigid path. It adapted to circumstances, experimented with possibilities and changed course when necessary.",

                subtitle:
                    "Your twelve-turn era was shaped by adaptability."

            }

        };


        return (

            fallbackEndings[
                dominantTrait
            ]

            ||

            {

                title:
                    "THE FRAGILE KINGDOM",

                trait:
                    "RESILIENCE",

                story:
                    "Your civilization survived an uncertain era. It was not defined by one overwhelming strength, but by its ability to continue despite difficult choices.",

                subtitle:
                    "Your twelve-turn era has come to an end."

            }

        );

    }



    function endGame() {

        document.querySelector(
            ".event-panel"
        ).hidden = true;


        document.querySelector(
            ".civilization-log"
        ).hidden = true;


        const ending =
            calculateEnding();


        document.getElementById(
            "endingTitle"
        ).textContent =
            ending.title;


        document.getElementById(
            "endingSubtitle"
        ).textContent =
            ending.subtitle ||
            "Your twelve-turn era has come to an end.";


        document.getElementById(
            "finalPopulation"
        ).textContent =
            state.population;


        document.getElementById(
            "finalFood"
        ).textContent =
            state.food;


        document.getElementById(
            "finalMaterials"
        ).textContent =
            state.materials;


        document.getElementById(
            "finalWealth"
        ).textContent =
            state.wealth;


        document.getElementById(
            "finalMorale"
        ).textContent =
            state.morale;


        document.getElementById(
            "finalStory"
        ).textContent =
            ending.story;


        document.getElementById(
            "definingTrait"
        ).textContent =
            ending.trait;


        /*
         * Give the result visual a semantic trait class.
         * The CSS can use this later to create genuinely
         * different visual identities for different endings.
         */


        const civilizationVisual =
            document.getElementById(
                "civilizationVisual"
            );


        if (
            civilizationVisual
        ) {

            civilizationVisual.dataset.trait =
                ending.trait
                    .toLowerCase()
                    .replace(
                        /\s+/g,
                        "-"
                    );

        }


        const visualTrait =
            document.getElementById(
                "visualTrait"
            );


        if (
            visualTrait
        ) {

            visualTrait.textContent =
                ending.trait;

        }


        document.getElementById(
            "endScreen"
        ).hidden = false;


        /*
         * Bring the result into view so the player
         * immediately sees the outcome.
         */


        setTimeout(
            () => {

                document.getElementById(
                    "endScreen"
                ).scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            },
            50
        );

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


        document.querySelector(
            ".event-panel"
        ).hidden = false;


        document.querySelector(
            ".civilization-log"
        ).hidden = false;


        document.getElementById(
            "endScreen"
        ).hidden = true;


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
