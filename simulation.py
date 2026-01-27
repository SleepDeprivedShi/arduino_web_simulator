class Arduino:
    def __init__(self):
        self.pins = {}

    def read(self,pin):
        return self.pins.get(pin, False)

    def write(self, pin, state):
        self.pins[pin] = state


def toggle(b_pin, led_pin, b_state, ard):
    ard.write(b_pin, b_state)

    if ard.read(b_pin):
        ard.write(led_pin, True)
    else:
        ard.write(led_pin, False)

    led = ard.read(led_pin)
    return led


def gen_code(b_pin, led_pin):

    code = f"""

const int buttonPin = {b_pin};
const int ledPin = {led_pin};

void setup() {{
    pinMode(buttonPin, INPUT);
    pinMode(ledPin, OUTPUT);
}}

void loop() {{
    int b_state = digitalRead(buttonPin);

    if (b_state == HIGH) {{
        digitalWrite(ledPin, HIGH);
    }}
    else {{
        digitalWrite(ledPin, LOW);
    }}
}}

"""

    return code.strip() 



if __name__ == "__main__":
    ard = Arduino()

    b_pin = 2
    led_pin = 13

    led = toggle(b_pin, led_pin, True, ard)

    if led:
        print("LED --> ON")
    else:
        print("LED --> OFF")

    print("\nGenerated Arduino Code:\n")
    print(gen_code(b_pin, led_pin))