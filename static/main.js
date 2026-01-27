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

        showCode(data.code);
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
