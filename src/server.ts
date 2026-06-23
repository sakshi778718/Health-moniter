import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const httpServer = createServer(app);

// Enterprise WebSocket Integration
const io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());

// Robust Path-Fallback Routing Engine for Render Architecture
const publicPath = path.join(__dirname, 'public');
const fallbackPublicPath = path.join(__dirname, '..', 'src', 'public');

if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
} else {
    app.use(express.static(fallbackPublicPath));
}

// Precautionary Protocol engine registry
const PRECAUTION_PROTOCOLS: Record<string, string[]> = {
    "Gastroenteritis / Diarrhea": [
        "Enforce immediate 'Boil Water Advisory' across regional micro-clusters for 1-3 minutes.",
        "Rapidly distribute standardized Oral Rehydration Salts (ORS) packs via field logistics.",
        "Isolate impacted storage well infrastructure and initiate hyperchlorination shock treating routines."
    ],
    "Acute Typhoidal Fever": [
        "Deploy diagnostic mobile screening labs to map cluster boundaries and isolate carriers.",
        "Sanitize local municipal sewage infrastructure with high-efficiency chemical agents.",
        "Suspend distribution of raw produce harvested from fields near flagged drainage networks."
    ],
    "Jaundice / Hepatic Symptoms": [
        "Run immediate viral screening panels for Hepatitis A & E paths on active nodes.",
        "Deploy sealed commercial containment canisters for public fluid distribution points.",
        "Post localized warning notices forbidding agricultural usage or laundering near the reservoir."
    ]
};

// Complete geographic ledger for all 36 States & UTs with historical telemetry trends
const baselineDatabase: Record<string, any> = {
    "Andhra Pradesh": { q: "Amaravati,Andhra+Pradesh", wci: 48.2, alert: false, msg: "All irrigation canals stable.", baseCases: 12, chart: [30, 32, 35, 40, 44, 45, 48] },
    "Arunachal Pradesh": { q: "Itanagar,Arunachal+Pradesh", wci: 32.5, alert: false, msg: "Mountain streams normal.", baseCases: 4, chart: [25, 28, 30, 29, 31, 33, 32] },
    "Assam": { q: "Mikir+Hills,Assam", wci: 74.2, alert: true, msg: "Spike in coliform bacteria detected in water sample line Zone B (Mikir Hills). Local clinic registries show elevated caseloads.", baseCases: 118, chart: [42, 48, 45, 62, 78, 71, 74] },
    "Bihar": { q: "Patna,Bihar", wci: 65.4, alert: true, msg: "High groundwater arsenic contamination flags active in northern flood sectors.", baseCases: 89, chart: [55, 58, 60, 62, 68, 64, 65] },
    "Chhattisgarh": { q: "Raipur,Chhattisgarh", wci: 41.0, alert: false, msg: "Water reservoirs tracking stable tracking loops.", baseCases: 18, chart: [38, 39, 41, 40, 42, 41, 41] },
    "Goa": { q: "Panaji,Goa", wci: 28.1, alert: false, msg: "Coastal estuaries running clean.", baseCases: 2, chart: [20, 22, 25, 27, 26, 29, 28] },
    "Gujarat": { q: "Gandhinagar,Gujarat", wci: 52.3, alert: false, msg: "Industrial effluent filters logging optimal metrics.", baseCases: 34, chart: [45, 47, 50, 52, 54, 51, 52] },
    "Haryana": { q: "Ambala,Haryana", wci: 59.8, alert: true, msg: "Agricultural runoff index elevated in Yamunanagar irrigation channels.", baseCases: 41, chart: [48, 51, 55, 57, 62, 60, 59] },
    "Himachal Pradesh": { q: "Shimla,Himachal+Pradesh", wci: 22.4, alert: false, msg: "Glacial melt feeds measuring pristine scores.", baseCases: 1, chart: [18, 19, 21, 23, 20, 22, 22] },
    "Jharkhand": { q: "Ranchi,Jharkhand", wci: 49.6, alert: false, msg: "Mining runoff filters evaluating within legal boundaries.", baseCases: 23, chart: [42, 44, 46, 48, 51, 49, 49] },
    "Karnataka": { q: "Bellandur,Bengaluru", wci: 79.5, alert: true, msg: "Chemical surfactant foamy discharges caught near eastern processing grids.", baseCases: 160, chart: [70, 72, 75, 78, 81, 80, 79] },
    "Kerala": { q: "Alappuzha,Kerala", wci: 38.2, alert: false, msg: "Backwater matrix monitoring arrays logging clean data loops.", baseCases: 15, chart: [32, 34, 37, 39, 36, 38, 38] },
    "Madhya Pradesh": { q: "Bhopal,Madhya+Pradesh", wci: 47.9, alert: false, msg: "Narmada basin grid infrastructure functioning smoothly.", baseCases: 29, chart: [40, 42, 45, 48, 46, 47, 47] },
    "Maharashtra": { q: "Thane,Mumbai", wci: 81.0, alert: true, msg: "Heavy drainage backflow mixing signature caught by automated filtration nodes.", baseCases: 245, chart: [60, 65, 72, 75, 79, 83, 81] },
    "Manipur": { q: "Loktak+Lake,Manipur", wci: 55.2, alert: true, msg: "Eutrophication vectors altering dissolved oxygen indices around Loktak peripheral nodes.", baseCases: 38, chart: [45, 48, 50, 52, 57, 56, 55] },
    "Meghalaya": { q: "Cherrapunji,Meghalaya", wci: 61.9, alert: true, msg: "Acidic shifts combined with high microbial flags reported around rainwater collections.", baseCases: 84, chart: [50, 52, 55, 58, 60, 63, 61] },
    "Mizoram": { q: "Aizawl,Mizoram", wci: 34.1, alert: false, msg: "Hill terrain water supplies running normal.", baseCases: 5, chart: [30, 31, 33, 35, 32, 34, 34] },
    "Nagaland": { q: "Dimapur,Nagaland", wci: 43.8, alert: false, msg: "Storage networks reporting clear biosensor baselines.", baseCases: 11, chart: [38, 40, 42, 45, 43, 44, 43] },
    "Odisha": { q: "Puri,Odisha", wci: 51.4, alert: false, msg: "Mahanadi delta telemetry tracking safe levels.", baseCases: 26, chart: [45, 48, 49, 52, 53, 50, 51] },
    "Punjab": { q: "Bathinda,Punjab", wci: 76.8, alert: true, msg: "Heavy chemical toxicity index spikes logged in shallow handpump wells.", baseCases: 142, chart: [65, 68, 72, 75, 80, 78, 76] },
    "Rajasthan": { q: "Sambhar+Lake,Rajasthan", wci: 58.1, alert: false, msg: "High salinity metrics localized to natural salt beds.", baseCases: 20, chart: [50, 53, 56, 58, 59, 57, 58] },
    "Sikkim": { q: "Gangtok,Sikkim", wci: 18.5, alert: false, msg: "Teesta river sensor feeds verifying high purity scores.", baseCases: 0, chart: [15, 16, 18, 17, 19, 18, 18] },
    "Tamil Nadu": { q: "Coimbatore,Tamil+Nadu", wci: 54.6, alert: false, msg: "Cauvery distribution loops analyzing safe alkaline margins.", baseCases: 39, chart: [48, 50, 52, 55, 56, 53, 54] },
    "Telangana": { q: "Hussain+Sagar,Hyderabad", wci: 68.2, alert: true, msg: "Organic loading parameters high near urban treatment inflows.", baseCases: 73, chart: [58, 60, 64, 67, 72, 70, 68] },
    "Tripura": { q: "Agartala,Tripura", wci: 46.1, alert: false, msg: "Groundwater iron filtration arrays indicating ideal operations.", baseCases: 14, chart: [40, 42, 44, 47, 45, 46, 46] },
    "Uttar Pradesh": { q: "Kanpur,Uttar+Pradesh", wci: 78.4, alert: true, msg: "Industrial chromium alerts triggered around leather processing runoff pathways.", baseCases: 198, chart: [68, 71, 74, 82, 85, 80, 78] },
    "Uttarakhand": { q: "Rishikesh,Uttarakhand", wci: 25.3, alert: false, msg: "Upper Ganges monitoring relays recording pure baselines.", baseCases: 2, chart: [22, 24, 26, 25, 27, 26, 25] },
    "West Bengal": { q: "South+24+Parganas,West+Bengal", wci: 72.9, alert: true, msg: "Salinity intrusion alerts blinking across deltaic drinking aquifers.", baseCases: 110, chart: [62, 66, 69, 74, 78, 75, 72] },
    "Andaman and Nicobar Islands": { q: "Port+Blair", wci: 29.4, alert: false, msg: "Catchment fields reporting perfect parameters.", baseCases: 1, chart: [25, 27, 28, 30, 29, 28, 29] },
    "Chandigarh": { q: "Sukhna+Lake,Chandigarh", wci: 33.6, alert: false, msg: "Urban supply pipelines logging clean data metrics.", baseCases: 3, chart: [30, 32, 34, 35, 33, 34, 33] },
    "Dadra and Nagar Haveli and Daman and Diu": { q: "Daman,India", wci: 44.5, alert: false, msg: "Coastal zones filtering wastewater effectively.", baseCases: 8, chart: [40, 42, 45, 46, 43, 45, 44] },
    "Delhi": { q: "Wazirabad,Delhi", wci: 84.9, alert: true, msg: "Critical ammonia contamination signatures caught near Wazirabad interface.", baseCases: 312, chart: [72, 76, 82, 88, 92, 86, 84] },
    "Jammu and Kashmir": { q: "Dal+Lake,Srinagar", wci: 39.1, alert: false, msg: "Jhelum basin water indicators displaying stable metrics.", baseCases: 14, chart: [35, 36, 38, 41, 39, 40, 39] },
    "Ladakh": { q: "Leh,Ladakh", wci: 19.2, alert: false, msg: "Stream arrays operating clear under freezing cycles.", baseCases: 0, chart: [15, 17, 18, 20, 19, 18, 19] },
    "Lakshadweep": { q: "Kavaratti,Lakshadweep", wci: 26.8, alert: false, msg: "Coral aquifer lens checking within pristine safety scopes.", baseCases: 0, chart: [22, 24, 25, 28, 27, 26, 26] },
    "Puducherry": { q: "Puducherry,India", wci: 42.7, alert: false, msg: "Groundwater sensors logging ideal salt-barrier tracking.", baseCases: 7, chart: [38, 40, 41, 43, 44, 42, 42] }
};

// Core Base Root Delivery Router
app.get('/', (req: Request, res: Response) => {
    const indexPath = path.join(publicPath, 'index.html');
    const fallbackIndexPath = path.join(fallbackPublicPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.sendFile(fallbackIndexPath);
    }
});

app.get('/api/telemetry', (req: Request, res: Response) => {
    res.json(baselineDatabase);
});

app.post('/api/incident', (req: Request, res: Response) => {
    const { symptom, node, cases } = req.body;
    if (!symptom || !node) {
        return res.status(400).json({ error: "Missing tracking variables." });
    }
    res.json({
        success: true,
        timestamp: new Date(),
        node,
        symptom,
        cases,
        instructions: PRECAUTION_PROTOCOLS[symptom] || ["Standard purification protocol initialization advised."]
    });
});

// Real-time streaming loop
setInterval(() => {
    const states = Object.keys(baselineDatabase);
    const selectedState = states[Math.floor(Math.random() * states.length)];
    const variance = (Math.random() * 6 - 3); 
    const currentWci = Math.min(Math.max((baselineDatabase[selectedState].wci + variance), 10), 100).toFixed(1);
    const simulatedTurbidity = (Math.random() * 4.5 + 0.3).toFixed(1);

    io.emit('sentinel_stream_pulse', {
        state: selectedState,
        wci: parseFloat(currentWci),
        turbidity: `${simulatedTurbidity} NTU`,
        timestamp: new Date().toLocaleTimeString(),
        nodeName: `Node-${Math.floor(Math.random() * 8 + 100)}`
    });
}, 3000);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`🚀 HYDRA Core Engine executing on port ${PORT}`);
});
