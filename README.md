# Minimal Web-Based Arduino Simulator

Minimal web-based Arduino simulator with automatic pin wiring and code generation (logic-level prototype).

---

## Overview

The simulator allows users to configure a simple Arduino experiment where a **push button controls an LED**.

It supports automatic pin assignment, user-controlled pin reassignment with conflict prevention, logic-level simulation, and automatic Arduino code generation.

The interface is intentionally minimal, as permitted by the task guidelines, to focus on correctness and architecture.

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
- **Simulation:** Custom logic-level Arduino abstraction  

---

## Project Structure

