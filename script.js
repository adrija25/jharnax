document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("gameSearch");
    const filterButtons = document.querySelectorAll(".filter-button");
    const gameCards = document.querySelectorAll(".game-card");
    const noResults = document.getElementById("noResults");

    let activeCategory = "all";


    function filterGames() {

        const searchTerm = searchInput.value
            .trim()
            .toLowerCase();

        let visibleGames = 0;


        gameCards.forEach((card) => {

            const category = card.dataset.category;
            const name = card.dataset.name.toLowerCase();

            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;

            const matchesSearch =
                name.includes(searchTerm) ||
                category.includes(searchTerm);


            if (matchesCategory && matchesSearch) {

                card.hidden = false;
                visibleGames++;

            } else {

                card.hidden = true;

            }

        });


        noResults.hidden = visibleGames !== 0;
    }


    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            activeCategory =
                button.dataset.category;

            filterGames();

        });

    });


    searchInput.addEventListener(
        "input",
        filterGames
    );


    filterGames();

    console.log("Jharnax is ready.");

});
