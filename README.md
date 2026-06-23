# HYDRA — National Health & Contamination Intelligence Matrix

A full-stack, event-driven distributed web application engineered to monitor geographic water safety indices and broadcast real-time IoT sentinel telemetry loops across 36 regional nodes (Indian States & Union Territories).

**Live Production Link:** [https://health-moniter.onrender.com](https://health-moniter.onrender.com)[cite: 1]

---

## 🚀 System Architecture & Core Mechanics

The platform transitions conventional static environmental analytics into an active, low-latency intelligence streaming hub through two distinct software layers:

### 1. The Real-Time WebSocket Pipeline (`Socket.io`)
* **Asynchronous Server Broadcasts:** Rather than relying on taxing browser poll intervals, the Node.js core spins up a background runtime loop that computes variance telemetry matrices every 3000ms.
* **Bi-directional Streaming:** The computed telemetry vector containing dynamic fields (`WCI`, `Turbidity Value`, `Timestamp`, and random `Node ID` maps) is pushed down a single open TCP lane using `Socket.io` directly into the DOM under sub-100ms transmission windows.

### 2. Automated Precautionary Workflow Engine
* **Diagnostic Response Matrix:** Built an asynchronous REST endpoint (`POST /api/incident`) acting as an isolated diagnostic logging portal.
* **Algorithmic Instruction Lookup:** When a node triggers an incoming payload containing a symptom observation variant (e.g., Acute Typhoidal Fever, Jaundice), a hashed lookup algorithm maps the variant against standard precaution datasets to return live field deployment sequences.

---

## 🛠️ Production Tech Stack

* **Language Platform:** TypeScript (Strict Compilation Matrix)
* **Backend Runtime:** Node.js, Express Framework
* **Event Layer:** Socket.io (WebSockets Protocol)
* **Client Interface:** HTML5, Tailwind CSS Engine, Vanilla ES6 JavaScript
* **Data Visualization:** Chart.js Core Analytics Engine
* **Deployment System:** Render Web Services Container Platform

---

## 📂 Project Workspace Structure

```text
Health-moniter/
├── package.json         # Runtime scripts, automated builds & dependencies
├── tsconfig.json        # TypeScript strict rules & compilation parameters
└── src/                 # Main source directory
    ├── server.ts        # Core server entry point, REST APIs & socket pipelines
    └── public/
        └── index.html   # Main dashboard portal UI & WebSocket subscription scripts
