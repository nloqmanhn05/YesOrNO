const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const container = document.querySelector('.container');
const headerText = document.querySelector('.header_text');
const gifImage = document.querySelector('.gif_container img');

let hoverCount = 0;
const PADDING = 20;

/**
 * Positions the No button absolutely within the container bounds
 * so it can start moving around.
 */
function initNoButtonPosition() {
    if (!noButton || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = noButton.getBoundingClientRect();
    
    noButton.style.position = 'absolute';
    noButton.style.left = (bRect.left - cRect.left) + 'px';
    noButton.style.top = (bRect.top - cRect.top) + 'px';
}

/**
 * Moves the No button to a random spot inside the container,
 * ensuring it lands far from the current mouse position.
 */
function moveNoButtonAway(mouseX, mouseY) {
    if (!noButton || !container) return;
    
    const cRect = container.getBoundingClientRect();
    const bRect = noButton.getBoundingClientRect();
    
    const maxLeft = cRect.width - bRect.width - PADDING;
    const maxTop = cRect.height - bRect.height - PADDING;
    
    let newLeft, newTop;
    let attempts = 0;
    
    // Try to find a position that's far from the mouse
    do {
        newLeft = PADDING + Math.random() * Math.max(0, maxLeft - PADDING);
        newTop = PADDING + Math.random() * Math.max(0, maxTop - PADDING);
        
        // Calculate distance from mouse to new button center
        const btnCenterX = cRect.left + newLeft + bRect.width / 2;
        const btnCenterY = cRect.top + newTop + bRect.height / 2;
        const dist = Math.hypot(btnCenterX - mouseX, btnCenterY - mouseY);
        
        attempts++;
        // Accept if far enough from mouse (>200px) or after 20 attempts
        if (dist > 200 || attempts > 20) break;
    } while (true);
    
    noButton.style.left = newLeft + 'px';
    noButton.style.top = newTop + 'px';
}

// Initialize absolute positioning on page load
window.addEventListener('load', () => {
    // Small delay to ensure layout is computed
    setTimeout(() => {
        initNoButtonPosition();
    }, 100);
});

// ----- No button hover logic: move away when cursor approaches -----
noButton.addEventListener('mouseenter', (e) => {
    hoverCount++;
    
    // Move the button away from the cursor
    moveNoButtonAway(e.clientX, e.clientY);

    // Increase Yes button scale by 0.3 each hover
    const scaleFactor = 1 + hoverCount * 0.3;
    yesButton.style.transform = `scale(${scaleFactor})`;

    // Change Yes button color to green
    yesButton.style.backgroundColor = '#28a745';

    // Update header text based on hover count
    const texts = [
        "Are you sure?",
        "Are you don't want to think again",
        "No second guessing",
        "You can't catch me!",
        "Just click Yes already!",
        "No regrets"
    ];

    const gifs = [
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NW9nYnh3a3lhd3g3ejU5aDZvaDM2a2d5czhxYWJxa2t6N2lmd2p6OCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/dxCQ6QDi6sqjvMtsIA/giphy.gif",
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2lob281NzlkcWRqZTVrZDRjcHlndGF4NHpqcWE0NGticXN5dzRuZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y0gJU9DqdkQ3qdNX9M/giphy.gif",
        "https://media.giphy.com/media/iePca2KJLR11gqK84S/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NW9nYnh3a3lhd3g3ejU5aDZvaDM2a2d5czhxYWJxa2t6N2lmd2p6OCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/W6XA4lxY1DoEEdMEtx/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3emQwaGVsbGU2cXEwanMxbzJsdmQxaDE0OW41amZ6MXNkNDNnZWJraiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/W0cxfrq1QOXsspdPDo/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MGg3Z2w1ZTgyODNyNzdsbmxhamVnenduN2xibGFsbWhkZ3NnZ2JoOCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/lSbapXn4zc4sMcIibp/giphy.gif"
    ];

    if (hoverCount <= texts.length) {
        headerText.textContent = texts[hoverCount - 1];
        gifImage.src = gifs[hoverCount - 1];
    } else {
        headerText.textContent = "Just click Yes! 💕";
        gifImage.src = "https://media.giphy.com/media/LSQtYQZMSUStB2dqmX/giphy.gif";
    }

    // Shrink GIF size (min 40%)
    let newGifWidthPercent = Math.max(40, 100 - hoverCount * 12);
    gifImage.style.maxWidth = newGifWidthPercent + '%';

    // Hide No button when Yes becomes very large
    if (scaleFactor > 3) {
        noButton.classList.add('hidden');
    }
});

// Also prevent click on the No button (just in case)
noButton.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButtonAway(e.clientX, e.clientY);
});

// ----- Yes button final logic -----
yesButton.addEventListener('click', () => {
    // Success state
    gifImage.src = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnRvaGZkY3hpd3prN3duZnRqY3Nxcjh0NnJsenk0aGF4a3E4a3N6MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ieJXRlUHIGnkVWqhIh/giphy.gif";
    gifImage.style.maxWidth = "100%";
    headerText.textContent = "thank you , I just joking, Im busy by the way";
    
    // Reset Yes button appearance
    yesButton.style.transform = 'scale(1)';
    yesButton.style.backgroundColor = '#ff6b81';
    noButton.classList.add('hidden');
});
