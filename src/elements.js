
function setupElements() {
    // Disable canvas right click menu
    document.getElementById("mycanvas")
        .addEventListener("contextmenu", (e) => e.preventDefault());

    const settings = document.getElementById("settings");
    const hsboffset = document.getElementById("hsboffset");
    const iterations = document.getElementById("iterations");
    const hsbLabel = document.getElementById("hsb-label");
    const iterLabel = document.getElementById("iter-label");

    settings.addEventListener("mouseenter", ()=>{
        keys.busy = true;
    });
    settings.addEventListener("mouseleave", ()=>{
        keys.busy = false;
    });
    hsboffset.addEventListener("input", (e)=>{
        hsbLabel.innerHTML = "HSB Offset: " + hsboffset.value;
        data.hsboff = hsboffset.value;
    });
    iterations.addEventListener("input", (e)=>{
        iterLabel.innerHTML = "Iterations: " + iterations.value;
        data.iterations = iterations.value;
    });

    data.settingsVisible = true;
}

function toggleSettings() {
    data.settingsVisible = !data.settingsVisible;
    settings.style.visibility = data.settingsVisible ? "visible" : "hidden";
}
