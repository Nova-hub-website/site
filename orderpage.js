const passiveTab = document.getElementById("passiveTab")
const activeTab = document.getElementById("activeTab")
const movingPage = document.getElementById("move")
const tab = document.getElementById("tab")

passiveTab.addEventListener("click", () => {
    movingPage.style.left = "0px";
    // activeTab.style.backgroundColor = "transparent";
    // passiveTab.style.backgroundColor = "#fff";
    tab.classList.remove("active")
})

activeTab.addEventListener("click", () => {
    movingPage.style.left = "-100%  ";
    // activeTab.style.backgroundColor = "#fff";
    // passiveTab.style.backgroundColor = "transparent";
    tab.classList.add("active")

})