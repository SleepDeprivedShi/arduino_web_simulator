let arduinoAdded = false;
let ledAdded = false;
let buttonAdded = false;

function addArduino() {
    arduinoAdded = true;

    document.getElementById("simulator").style.display = "block";
    document.getElementById("arduinoSection").style.display = "block";

    document.getElementById("code").innerText = "Add LED and Press Button to generate code";

    updateWorkspace();
}



function addLED() {
    if (!arduinoAdded) return alert("Add Arduino first");
    ledAdded = true;
    document.getElementById("ledSection").style.display = "block";
    updateWorkspace();
}

function addButton() {
    if (!arduinoAdded) return alert("Add Arduino first");
    buttonAdded = true;
    document.getElementById("buttonSection").style.display = "block";
    updateWorkspace();
}



function updateWorkspace() {
    let items = [];

    if (arduinoAdded) items.push("Arduino Uno");
    if (ledAdded) items.push("LED");
    if (buttonAdded) items.push("Push Button");

    const workspace = document.getElementById("workspace");
    const simulator = document.getElementById("simulator");

    if (items.length === 0) {
        workspace.innerText = "No components added";
        simulator.style.display = "none";
        return;
    }

    workspace.innerText = items.join(", ") + " added";

    if (arduinoAdded && ledAdded && buttonAdded) {
    simulator.style.display = "block";
    document.getElementById("arduinoSection").style.display = "block";
    }

}


let lastButtonPin = "2";
let lastLedPin = "10";


function pressButton(isPressed) {
    fetch("/press", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pressed: isPressed })
    })
    .then(response => response.json())
    .then(data => {
        updateLED(data.led);
        showCode(data.code);
    });
}

function changePins() {
    let buttonPin = document.getElementById("b_pin").value;
    let ledPin = document.getElementById("led_pin").value;

    fetch("/set_pins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            b_pin: buttonPin,
            led_pin: ledPin
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            setLedError();

            //document.getElementById("code").innerText = "";

            alert(data.error);

            document.getElementById("b_pin").value = lastButtonPin;
            document.getElementById("led_pin").value = lastLedPin;

            return;
        }
        lastButtonPin = buttonPin;
        lastLedPin = ledPin;

        updateLED(false);

        if (arduinoAdded && ledAdded && buttonAdded && data.code) {
        showCode(data.code);
        }   


    });
}



function updateLED(isOn) {
    let led = document.getElementById("led");
    if (isOn) {
        led.style.backgroundColor = "green";
    } else {
        led.style.backgroundColor = "gray";
    }
}


function setLedError() {
    let led = document.getElementById("led");
    led.style.backgroundColor = "red";
}


function showCode(code) {
    if (code) {
        document.getElementById("code").innerText = code;
    }
}
