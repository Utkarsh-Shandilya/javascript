function handleParentClick(event) {
    if (event.target.tagName === 'LI') {
        console.log(`Clicked on: ${event.target.innerText}`);
    }
}

function main() {
    const ulElement = document.getElementById('parent');
    ulElement.addEventListener("click", (event) => handleParentClick(event));
}

main();