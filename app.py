from flask import Flask, render_template, jsonify, request
from simulation import Arduino, toggle, gen_code

app = Flask(__name__)

ard = Arduino()

state = {"b_pin":2,"led_pin":10}

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/press", methods=["POST"])
def press():
    data = request.get_json()
    b_state = data.get("pressed", False)

    led = toggle(state["b_pin"], state["led_pin"], b_state, ard)

    return jsonify({"led": led,"code": gen_code(state["b_pin"],state["led_pin"])})


@app.route("/set_pins", methods=["POST"])
def set_pins():
    data = request.get_json()

    nb_pin = int(data["b_pin"])
    nled_pin = int(data["led_pin"])

    if nb_pin == nled_pin:
        return jsonify({"error": "Pin conflict"}), 400


    if nb_pin not in range(2, 14) or nled_pin not in range(2, 14):
        return jsonify({"error": "Invalid pin"}), 400

    ard.pins.clear()
    state["b_pin"] = nb_pin
    state["led_pin"] = nled_pin

    return jsonify({
        "success": True,
        "led": False,
        "code": gen_code(state["b_pin"], state["led_pin"])
    })

    
if __name__== "__main__":
    app.run(debug=True)