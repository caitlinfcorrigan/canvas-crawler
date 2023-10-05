console.log("Hello, Canvas!")

/* ----- DOM SELECTORS -------- */ 
    const movement = document.querySelector("#movement");
    const status = document.querySelector("#status");
    const canvas = document.querySelector("canvas");

    // Verify you have the correct HTML elements
    // console.log(movement, status, canvas);

/* ----- CANVAS SETUP --------- */ 
// Get the canvas context
    const ctx = canvas.getContext("2d");
    // console.log(ctx)

// Set the canvas resolution to be the same as the window's (otherwise, it's old-school resolution size)
    //Set the canvas to be the render size it appears on the page (responsive)
    canvas.setAttribute("height", getComputedStyle(canvas).height);
    canvas.setAttribute("width", getComputedStyle(canvas).width);

// Set context properties, then invoke methods to use those properties
// Impacts the view-- not the data when they're not in a 

// Practice creating shapes on the canvas
    // ctx.fillStyle = "purple";
    // // Fill using .fillRect(x, y, width, height)
    // ctx.fillRect(10, 20, 40, 40)

    // ctx.fillStyle = "green"
    // ctx.fillRect(75, 90, 40, 20);


/* ----- CLASSES -------------- */ 
// Since the Hero and Ogre have the same "data", they can share a class
    class Crawler {
        constructor(x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.alive = true;
        }
        render() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // Test the Crawler class
    // const testCrawler = new Crawler(45, 45, 65, 23, "green");
    // testCrawler.render();

    const hero = new Crawler(0, 0, 30, 30, "hotpink")
    const ogre = new Crawler( 700, 300, 60, 60, "#bada55")


/* ----- FUNCTIONS ------------ */ 

    function drawBox(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }
    // drawBox(50,100,35,75,"hotpink")

    // Handle keyboard input from the user
    function movementHandler(e) {
        const speed = 10; // How many pixels the hero moves per key
        // Console.log to find the key or code from the event!
            // console.log(e)
        // One variable that can have many values and each value has a different chunk of code to run, use a switch case
        switch(e.key) {
            // Cases are case sensitive!
            // Can do "switch(e.key.toLowerCase())"
            case "ArrowUp":
                hero.y-= speed;
                // console.log("Move hero up")
                break;
            case "ArrowDown": 
                hero.y+= speed;
                // console.log("Move hero down")
                break;
            case "ArrowLeft":
                hero.x-= speed;
                // console.log("Move hero left")
                break;
            case "ArrowRight":
                hero.x+= speed;
                // console.log("Move hero right")
                break;
            default:
                // Like an else; for any other case
                console.log(`${e.key} not recognized`)
        }
    }
    // Collision detection algorithm (using a bounding box to find intersection)
    function detectHit() {
        // AABB - axis-aligned bounding box algorithm
        // Check for collisions on each side of each object
        // If each boundary is passed, a collision is detected

        // Top of ogre
        const top = hero.y + hero.height >= ogre.y;
        // Bottom of ogre
        const bottom = hero.y <= ogre.y + ogre.height
        // Left of ogre
        const left = hero.x + hero.width >= ogre.x;
        // Right of ogre
        const right = hero.x <= ogre.x + ogre.width;
        // console.log(`top: ${top} bottom: ${bottom} left: ${left} right: ${right}`)

        if (top && bottom && left && right) {
            return true;
        }
        // If no collision, then return false
        return false;
    }

    // Create a game loop -- run the business logic of the game and be called by a setInterval
    const gameInterval = setInterval(gameLoop, 80);
    function gameLoop() {
        // Clear the canvas (from (0,0) to max width & height)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Render all game objects
        hero.render();
        if (ogre.alive) {
            ogre.render();
        }
        // Do game loop
        if(detectHit()) {
            // The game is over
            // The ogre dies
            ogre.alive = false;
            // Display message to user in the Status
            status.innerText = "You slayed Shrek! :("
        };

    }

/* ----- EVENT LISTENERS ------ */ 

// Draw a box where a user clicks (offsetX, offsetY)
    canvas.addEventListener("click", e => {
        // console.log(`x: ${e.offsetX} y: ${e.offsetY}`)
        movement.innerText = `x: ${e.offsetX} y: ${e.offsetY}`;
        drawBox(e.offsetX, e.offsetY, 30, 30, "hotpink");
    })

// Keypress event listener
document.addEventListener("keydown", movementHandler);