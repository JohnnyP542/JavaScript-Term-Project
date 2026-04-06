/* typing function */
function typeLine(text, speed) {
    return new Promise(resolve => {
        let i = 0;

        function type() {
            if (i < text.length) {
                $("#boot").append(text.charAt(i));
                i++;
                setTimeout(type, speed);
            } else {
                $("#boot").append("\n");
                resolve();
            }
        }

        type();
    });
}

/* boot phase */
async function bootSequence() {
    await typeLine("INITIALIZING SYSTEM...", 30);
    await typeLine("LOADING KERNEL MODULES...", 25);
    await typeLine("CHECKING MEMORY...", 20);
    await typeLine("MEMORY OK", 20);
    await typeLine("CONNECTING TO GAME DATABASE...", 20);
    await typeLine("ACCESS GRANTED", 20);
    await typeLine("STARTING TERMINAL UI...", 20);

    setTimeout(() => {
        $("#boot").fadeOut(500, function () {
            $("#main").fadeIn(500);
            $(".menu").css("display", "flex");
        });
    }, 600);
}

/* menu */
$(".menu button").click(function () {
    let game = $(this).data("game");

    $(".menu").hide();
    $(".game-screen").show();
    $(".typing").html(""); // clear previous text

    /* ----------------- GAME 1: AIM TRAINER ----------------- */
    if (game == 1) {
        $(".typing").html("<div id='aim-info'>Press START to begin the aim trainer.</div>");
        $(".typing").append("<button id='start-aim'>START</button>");
        $(".typing").append("<div id='aim-arena' style='position:relative;width:100%;height:300px;border:1px solid #b3ff00;margin-top:15px;'></div>");
        const arena = $("#aim-arena");

        $("#start-aim").click(function () {
            $(this).remove(); // remove start button

            let countdown = 3;
            $("#aim-info").text(`Get ready: ${countdown}...`);
            const countdownInterval = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    $("#aim-info").text(`Get ready: ${countdown}...`);
                } else {
                    clearInterval(countdownInterval);
                    $("#aim-info").text("Click all targets as fast as you can!");

                    let score = 0;
                    let totalTargets = 10;
                    let targetsClicked = 0;
                    let startTime = new Date();

                    function spawnTarget() {
                        if (targetsClicked >= totalTargets) {
                            const endTime = new Date();
                            const reactionTime = ((endTime - startTime) / 1000).toFixed(2);
                            arena.html(`<div style='color:#b3ff00'>Finished! Your score: ${score} / ${totalTargets}<br>Time: ${reactionTime} seconds</div>`);
                            return;
                        }

                        arena.empty();

                        const target = $("<div class='aim-target'></div>");
                        const arenaWidth = arena.width() - 40;
                        const arenaHeight = arena.height() - 40;
                        const x = Math.floor(Math.random() * arenaWidth);
                        const y = Math.floor(Math.random() * arenaHeight);

                        target.css({
                            position: "absolute",
                            width: "40px",
                            height: "40px",
                            background: "#b3ff00",
                            borderRadius: "50%",
                            top: y + "px",
                            left: x + "px",
                            cursor: "crosshair", // keep crosshair over targets
                            boxShadow: "0 0 6px #8ce201, 0 0 12px #6daf02",
                        });

                        arena.append(target);

                        target.click(function () {
                            score++;
                            targetsClicked++;
                            spawnTarget();
                        });
                    }

                    spawnTarget();
                }
            }, 1000);
        });
    }

    /* ----------------- GAME 2: R1C0CHET ----------------- */
    if (game == 2) {
        $(".typing").html("<div id='game2-info'>Press START to begin the R1c0chet physics game.</div>");
        $(".typing").append("<button id='start-physics'>START</button>");
        $(".typing").append("<canvas id='physics-arena' width='380' height='300' style='border:1px solid #b3ff00;margin-top:15px;'></canvas>");

        const canvas = document.getElementById("physics-arena");
        const ctx = canvas.getContext("2d");
        let core, goal;
        let animationFrame;

        $("#start-physics").click(function () {
            $(this).remove();
            $("#game2-info").text("Reconnect the core...");

            // Initialize core and goal
            core = { x: 30, y: 270, radius: 15, vx: 0, vy: 0 };
            goal = { x: 350, y: 30, radius: 20 };

            let launched = false;

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw goal
                ctx.fillStyle = "#b3ff00";
                ctx.beginPath();
                ctx.arc(goal.x, goal.y, goal.radius, 0, Math.PI * 2);
                ctx.fill();

                // Draw core
                ctx.fillStyle = "#8ce201";
                ctx.beginPath();
                ctx.arc(core.x, core.y, core.radius, 0, Math.PI * 2);
                ctx.fill();

                // Update core position if launched
                if (launched) {
                    core.x += core.vx;
                    core.y += core.vy;

                    // Bounce off walls
                    if (core.x - core.radius <= 0 || core.x + core.radius >= canvas.width) core.vx *= -1;
                    if (core.y - core.radius <= 0 || core.y + core.radius >= canvas.height) core.vy *= -1;

                    // Check goal collision
                    let dx = core.x - goal.x;
                    let dy = core.y - goal.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < core.radius + goal.radius) {
                        cancelAnimationFrame(animationFrame);
                        $("#game2-info").text("Core Reinitialized...");
                    }
                }

                animationFrame = requestAnimationFrame(draw);
            }

            draw();

            // Launch core on click
            canvas.addEventListener("click", function (e) {
                if (!launched) {
                    let rect = canvas.getBoundingClientRect();
                    let clickX = e.clientX - rect.left;
                    let clickY = e.clientY - rect.top;

                    // Calculate velocity vector
                    core.vx = (clickX - core.x) / 20;
                    core.vy = (clickY - core.y) / 20;
                    launched = true;
                }
            });
        });
    }

    /* ----------------- GAME 3 PLACEHOLDER ----------------- */
    if (game == 3) {
        typeGame("LOADING GAME 03...\nSYSTEM PROCESSING\n\n(Work in progress...)\n\nThis module will test the user's visual puzzle solving skills and their ability to escape a labyrinth of neon walls.");
    }
});

/* simple typing for game 3 or text */
function typeGame(text) {
    let i = 0;
    $(".typing").text("");

    function type() {
        if (i < text.length) {
            $(".typing").append(text.charAt(i));
            i++;
            setTimeout(type, 20);
        }
    }

    type();
}

/* back button */
$(".back").click(function () {
    $(".game-screen").hide();
    $(".menu").css("display", "flex");
});

/* start boot */
bootSequence();