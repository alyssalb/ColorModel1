const URL = "https://teachablemachine.withgoogle.com/models/tDSvJj8yn/";

let model, labelContainer, maxPredictions;

document.addEventListener("DOMContentLoaded", async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");

    // Create container to display prediction labels
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }

    // Add event listener for image upload
    const imageUpload = document.getElementById("imageUpload");
    imageUpload.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
            URL.revokeObjectURL(img.src);  // Release memory once image is loaded
            await predict(img);
        };
    });
});

// Run the image through the image model and predict the label
async function predict(image) {
    const prediction = await model.predict(image);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}
