
function setupElements() {
    // Disable canvas right click menu
    document.getElementById("mycanvas")
        .addEventListener("contextmenu", (e) => e.preventDefault());

    const settings = document.getElementById("settings");
    const hsboffset = document.getElementById("hsboffset");
    const iterations = document.getElementById("iterations");
    const spread = document.getElementById("spread");
    const mandelbrot = document.getElementById("mandelbrot");
    const hsbLabel = document.getElementById("hsb-label");
    const iterLabel = document.getElementById("iter-label");
    const spreadLabel = document.getElementById("spread-label");

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
    spread.addEventListener("input", (e)=>{
        spreadLabel.innerHTML = "Spread: " + spread.value;
        data.range = spread.value;
    });
    mandelbrot.addEventListener("input", (e)=>{
        data.domandel = mandelbrot.checked;
    });

    data.settingsVisible = true;
}

function toggleSettings() {
    data.settingsVisible = !data.settingsVisible;
    settings.style.visibility = data.settingsVisible ? "visible" : "hidden";
}
