function ensureFadeClass(image) {
    if (image && !image.classList.contains("fade-image")) {
        image.classList.add("fade-image", "is-hidden");
    }
}

function showMagic() {
    var magicImage = document.getElementById("magicImage");
    var hoverText = document.getElementById("hoverText");

    if (magicImage) {
        if (!magicImage.src) {
            magicImage.src = "MagicPhoto.jpg";
        }
        ensureFadeClass(magicImage);
        magicImage.style.display = "block";
        window.requestAnimationFrame(function () {
            magicImage.classList.remove("is-hidden");
        });
    }

    if (hoverText) {
        hoverText.textContent = "Magic revealed!";
    }
}

function hideMagic() {
    var magicImage = document.getElementById("magicImage");
    var hoverText = document.getElementById("hoverText");

    if (magicImage) {
        ensureFadeClass(magicImage);
        magicImage.classList.add("is-hidden");
        window.setTimeout(function () {
            if (magicImage.classList.contains("is-hidden")) {
                magicImage.style.display = "none";
            }
        }, 350);
    }

    if (hoverText) {
        hoverText.textContent = "Hover over me to see some magic.";
    }
}

function changeImage() {
    var spaceImage = document.getElementById("spaceImage");

    if (!spaceImage) {
        return;
    }

    ensureFadeClass(spaceImage);

    if (!spaceImage.dataset.originalSrc) {
        spaceImage.dataset.originalSrc = spaceImage.src;
        spaceImage.dataset.originalAlt = spaceImage.alt;
    }

    if (!spaceImage.dataset.toggledSrc) {
        spaceImage.dataset.toggledSrc = "Mountain.jpg";
        spaceImage.dataset.toggledAlt = "Mountain Image";
    }

    if (spaceImage.src === spaceImage.dataset.originalSrc) {
        spaceImage.classList.add("is-hidden");
        window.setTimeout(function () {
            spaceImage.src = spaceImage.dataset.toggledSrc;
            spaceImage.alt = spaceImage.dataset.toggledAlt;
            spaceImage.classList.remove("is-hidden");
        }, 350);
    } else {
        spaceImage.classList.add("is-hidden");
        window.setTimeout(function () {
            spaceImage.src = spaceImage.dataset.originalSrc;
            spaceImage.alt = spaceImage.dataset.originalAlt;
            spaceImage.classList.remove("is-hidden");
        }, 350);
    }
}
