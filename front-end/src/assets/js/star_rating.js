const allStars = document.querySelectorAll(".fa-star");
// console.log("allStars", allStars);
const rating = document.querySelector('.rating');
init();

function init(){
    allStars.forEach((star) => {
        star.addEventListener("click", saveRating );
        star.addEventListener("mouseover", addCss);
        star.addEventListener("mouseleave", removeCss);
    });
}

function saveRating(e){
    removeEventListenerToAllStars(); 
    rating.innerText = e.target.dataset.star
}

function removeEventListenerToAllStars() {
    allStars.forEach(star =>{
       star.removeEventListener('click', saveRating);
       star.removeEventListener("mouseover", addCss);
       star.removeEventListener("mouseleave", removeCss); 
    });
}

function addCss(e, css = "checked"){
    const overedStar = e.target;
    overedStar.classList.add(css);
    const previousSiblings = getPreviousSliblings(overedStar);
    console.log("previousSiblings", previousSiblings);
    previousSiblings.forEach((elem) => elem.classList.add(css));
}

function removeCss(e, css = "checked"){
    const overedStar = e.target;
    e.target.classList.remove(css);
    const previousSiblings = getPreviousSliblings(overedStar);
    previousSiblings.forEach((elem) => elem.classList.remove(css));
}

function getPreviousSliblings(elem) {
    let siblings = [];
    const spanNodeType = 1;
    while ((elem = elem.previousSibling)) {
        if (elem.nodeType === spanNodeType) {
            siblings = [elem, ...siblings];
        }
    }
    return siblings;
}
