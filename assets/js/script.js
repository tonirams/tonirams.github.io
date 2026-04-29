let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('searchInput');
    const items = document.querySelectorAll('[data-category]');

    if (searchInput) {
        searchInput.addEventListener('input', applyFilter);
    }

    window.filter = function (category, el) {
        activeCategory = category;

        const buttons = document.querySelectorAll('.filter-btn');

        buttons.forEach(btn => {
            btn.classList.remove('opacity-100', 'scale-105');
            btn.classList.add('opacity-50');
        });

        el.classList.remove('opacity-50');
        el.classList.add('opacity-100', 'scale-105');

        applyFilter();
    };

    function applyFilter() {

        const query = (searchInput?.value || '').toLowerCase();
        let visibleCount = 0;

        items.forEach(item => {

            const title = (item.dataset.title || '').toLowerCase();
            const category = item.dataset.category;

            const matchCategory =
                activeCategory === 'all' || category === activeCategory;

            const matchSearch =
                title.includes(query);

            const show = matchCategory && matchSearch;

            if (show) {
                visibleCount++;

                item.classList.remove('opacity-0', 'scale-95', 'hidden');
                item.classList.add('opacity-100', 'scale-100');
            } else {
                item.classList.add('opacity-0', 'scale-95');
                
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 200);
            }
        });

        const noResults = document.getElementById('noResults');

        if (noResults) {
            noResults.classList.toggle('hidden', visibleCount !== 0);
        }
    }

});