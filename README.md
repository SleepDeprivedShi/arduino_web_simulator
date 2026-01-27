# Minimal Web-Based Arduino Simulator

Minimal web-based Arduino simulator with automatic pin wiring and code generation (logic-level prototype).
---

## Overview

The simulator allows users to configure a simple Arduino experiment where a **push
button controls an LED**.  
It supports automatic pin assignment, user-controlled pin reassignment with conflict
prevention, logic-level simulation, and automatic Arduino code generation.

The interface is intentionally minimal, as permitted by the task guidelines, to focus
on correctness and architecture.

---

## Features

- Web-based interface using Flask  
- Logic-level simulation (no physical hardware required)   
- Configurable pin assignments (Digital Pins 2–13 only)  
- Pin conflict detection and prevention  
- Automatic Arduino code generation
- Real-time update of generated code when pin assignments change  
- Visual LED status:
  - Green → LED ON  
  - Grey → LED OFF / Reset  
  - Red → Invalid pin configuration  

---

## Tech Stack

- **Backend:** Python (Flask)  
- **Frontend:** HTML, CSS  
- **Client-side Logic:** JavaScript  
- **Simulation:** Custom logic Arduino abstraction  

---

## Project Structure

```
.
├── app.py              # Flask application
├── simulation.py       # Arduino logic-level simulator & code generator
├── templates/
│   └── index.html      # Web UI
├── static/
│   └── main.js         # Minimal frontend logic
└── README.md
```

---

## How to Run

1. Install Flask:
   ```bash
   pip install flask
   ```

2. Run the application:
   ```bash
   python app.py
   ```

3. Open your browser and go to:
   ```
   http://127.0.0.1:5000
   ```

---

## Simulation Behavior

- Button pressed → GPIO HIGH → LED ON  
- Button released → GPIO LOW → LED OFF  
- Changing pin assignments resets the circuit state  
- Invalid pin configurations disable the simulation and code generation  
