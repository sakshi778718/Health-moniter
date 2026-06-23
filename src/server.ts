   import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

// Enterprise WebSocket Integration
const io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());

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

// In-Memory UI Rendering Framework to bypass disk routing errors
const HTML_VIEWPORT = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HYDRA - Enterprise Intelligence Portal</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="/socket.io/socket.io.js"></script>
</head>
<body class="bg-slate-900 text-slate-100 font-sans min-h-screen antialiased">
    <nav class="bg-slate-950 border-b border-slate-800 sticky top-0 z-50 px-6 py-3 flex justify-between items-center shadow-xl">
        <div class="flex items-center gap-3">
            <div class="bg-blue-600 p-2.5 rounded-xl text-white shadow-md"><i class="fa-solid fa-shield-halved text-xl"></i></div>
            <div>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-mono font-black text-blue-400 uppercase tracking-widest">HYDRA DISTRIBUTED HUB</span>
                    <span id="global-badge" class="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-bold">System Online</span>
                </div>
                <h1 class="text-lg font-black tracking-tight text-white">National Health & Contamination Intelligence Matrix</h1>
            </div>
        </div>
        <div class="flex items-center gap-4 text-xs">
            <span class="text-slate-400"><i class="fa-solid fa-network-wired text-blue-400 mr-2"></i>WS Feed Status:</span>
            <span id="socket-status-dot" class="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
        </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-map-location-dot text-blue-500 text-xl"></i>
                <div>
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Geographic Jurisdiction</h3>
                    <p class="text-[11px] text-slate-500">Query live tracking metrics across all 36 States & UTs</p>
                </div>
            </div>
            <div class="w-full md:w-80">
                <select id="stateSelector" onchange="handleStateChange()" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:ring-1 focus:ring-blue-500 focus:outline-hidden"></select>
            </div>
        </div>
        <div id="precautionDisplay" class="hidden bg-slate-950 border border-emerald-500/30 rounded-xl p-5 shadow-2xl transition-all">
            <div class="flex items-center gap-3 border-b border-emerald-500/10 pb-3 mb-4">
                <i class="fa-solid fa-shield-virus text-emerald-400 text-xl"></i>
                <h3 class="text-sm font-bold text-emerald-400 uppercase tracking-wider">Automated Precaution Protocols Loaded</h3>
            </div>
            <ul id="precautionList" class="space-y-2 text-xs text-slate-300 list-disc pl-5"></ul>
            <div class="flex justify-end mt-4"><button onclick="this.parentElement.parentElement.classList.add('hidden')" class="px-3 py-1 bg-slate-800 text-slate-400 text-xs rounded hover:bg-slate-700 cursor-pointer">Dismiss Protocol</button></div>
        </div>
        <div id="alertBanner" class="hidden bg-gradient-to-r from-amber-950/30 to-slate-950 border-l-4 border-amber-500 rounded-r-xl p-4 flex gap-3">
            <i class="fa-solid fa-triangle-exclamation text-amber-500 text-lg"></i>
            <p id="alertText" class="text-xs text-slate-300 leading-relaxed"></p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xs">
                <p class="text-xs font-bold tracking-wider text-slate-400 uppercase">Water Contamination Index</p>
                <h4 id="metric-wci" class="text-2xl font-black text-rose-400 mt-2">--</h4>
            </div>
            <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xs">
                <p class="text-xs font-bold tracking-wider text-slate-400 uppercase">Reported Cases</p>
                <h4 id="metric-cases" class="text-2xl font-black text-amber-400 mt-2">--</h4>
            </div>
            <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xs">
                <p class="text-xs font-bold tracking-wider text-slate-400 uppercase">System Status Profile</p>
                <h4 id="metric-status" class="text-sm font-black text-emerald-400 mt-3 uppercase tracking-widest">Normal</h4>
            </div>
            <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xs">
                <p class="text-xs font-bold tracking-wider text-slate-400 uppercase">Live WS Tracker Packet</p>
                <h4 id="metric-packet" class="text-xs font-mono text-blue-400 mt-3 truncate">Connecting...</h4>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xs">
                    <h3 class="font-bold text-white text-sm tracking-wide mb-4">7-Day Outbreak Prediction Modeling</h3>
                    <div class="h-64"><canvas id="outbreakChart"></canvas></div>
                </div>
                <div class="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xs">
                    <h3 class="font-bold text-white text-sm tracking-wide mb-3">Google Maps GIS Vector Satellite Interface</h3>
                    <div class="w-full h-80 rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                        <iframe id="googleMapIframe" class="w-full h-full filter invert grayscale opacity-80" src="" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
                <div class="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xs">
                    <h3 class="font-bold text-white text-sm tracking-wide mb-3"><i class="fa-solid fa-satellite-dish text-blue-400 mr-2 animate-pulse"></i>Live Real-Time Sentinel IoT Stream Feed</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr class="border-b border-slate-800 text-[10px] text-slate-500 uppercase font-black tracking-wider">
                                    <th class="pb-2">Timestamp</th>
                                    <th class="pb-2">Target Node Jurisdiction</th>
                                    <th class="pb-2">Contamination WCI</th>
                                    <th class="pb-2">Turbidity Value</th>
                                </tr>
                            </thead>
                            <tbody id="streamTableBody" class="divide-y divide-slate-800/60 text-slate-300"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="space-y-6">
                <div class="bg-slate-950 border border-slate-800 p-5 rounded-xl shadow-md">
                    <h3 class="font-bold text-white text-sm tracking-wide mb-4">Transmit Incident Diagnostics</h3>
                    <form onsubmit="submitIncident(event)" class="space-y-4">
                        <div>
                            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Target Cluster Node Name</label>
                            <input type="text" id="formNode" required placeholder="e.g. Sector 4 Outpost" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-hidden focus:border-blue-500">
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Observation Variant</label>
                                <select id="formSymptom" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-hidden focus:border-blue-500">
                                    <option>Gastroenteritis / Diarrhea</option>
                                    <option>Acute Typhoidal Fever</option>
                                    <option>Jaundice / Hepatic Symptoms</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Symptomatic Count</label>
                                <input type="number" id="formCases" required min="1" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-hidden focus:border-blue-500">
                            </div>
                        </div>
                        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-lg cursor-pointer transition-colors uppercase tracking-wider">Transmit Field Log</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
    <script>
        let serverDatabase = {};
        let outbreakChart;
        const ctx = document.getElementById('outbreakChart').getContext('2d');
        const socket = io();

        socket.on('connect', () => {
            document.getElementById('socket-status-dot').className = "h-2 w-2 rounded-full bg-emerald-400";
        });

        socket.on('sentinel_stream_pulse', (payload) => {
            document.getElementById('metric-packet').innerText = "Pulse: " + payload.state + " -> " + payload.wci + " WCI";

            const tbody = document.getElementById('streamTableBody');
            const row = document.createElement('tr');
            row.className = "bg-blue-950/10 border-b border-slate-800/40 transition-colors hover:bg-slate-800/30";
            row.innerHTML = ' +
                '<td class="py-2.5 font-mono text-slate-500">' + payload.timestamp + '</td>' +
                '<td class="py-2.5 font-bold text-white">' + payload.state + ' <span class="text-[10px] font-normal text-slate-400">(' + payload.nodeName + ')</span></td>' +
                '<td class="py-2.5 font-mono font-bold ' + (payload.wci > 60 ? 'text-rose-400':'text-emerald-400') + '">' + payload.wci + '</td>' +
                '<td class="py-2.5 font-mono text-blue-400">' + payload.turbidity + '</td>' +
            '';
            tbody.insertBefore(row, tbody.firstChild);

            if (tbody.rows.length > 8) tbody.removeChild(tbody.lastChild);

            if(document.getElementById('stateSelector').value === payload.state) {
                document.getElementById('metric-wci').innerText = payload.wci + " / 100";
            }
        });

        async function fetchTelemetryCluster() {
            try {
                const response = await fetch('/api/telemetry');
                serverDatabase = await response.json();
                
                const selector = document.getElementById('stateSelector');
                selector.innerHTML = "";
                
                Object.keys(serverDatabase).sort().forEach(state => {
                    const opt = document.createElement('option');
                    opt.value = state;
                    opt.innerText = state;
                    selector.appendChild(opt);
                });

                selector.value = "Assam";
                initChartLayout();
                handleStateChange();
            } catch (err) {
                console.error("Failure Connecting API Endpoint: ", err);
            }
        }

        function initChartLayout() {
            outbreakChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        { label: 'Water Risk Coefficient', data: [], borderColor: '#f43f5e', tension: 0.3, fill: false },
                        { label: 'Clinic Influx Density', data: [], borderColor: '#f59e0b', borderDash: [4,4], tension: 0.1 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#94a3b8', font: { size: 10 } } } },
                    scales: { y: { grid: { color: '#1e293b' }, ticks: { color: '#64748b' } }, x: { grid: { display: false }, ticks: { color: '#64748b' } } }
                }
            });
        }

        function handleStateChange() {
            const state = document.getElementById('stateSelector').value;
            const record = serverDatabase[state];
            if (!record) return;

            document.getElementById('metric-wci').innerText = record.wci + " / 100";
            document.getElementById('metric-cases').innerText = record.baseCases;
            
            document.getElementById('googleMapIframe').src = "http://googleusercontent.com/maps.google.com/maps?q=" + record.q + "&t=k&z=10&ie=UTF8&iwloc=&output=embed";

            const alertBanner = document.getElementById('alertBanner');
            const statusMetric = document.getElementById('metric-status');
            const globalBadge = document.getElementById('global-badge');

            if(record.alert) {
                alertBanner.classList.remove('hidden');
                document.getElementById('alertText').innerText = record.msg;
                statusMetric.innerText = "CRITICAL LIMIT DETECTED";
                statusMetric.className = "text-sm font-black text-rose-400 mt-3 uppercase tracking-widest";
                globalBadge.className = "px-2 py-0.5 text-[10px] bg-rose-500/10 text-rose-400 rounded border border-rose-500/20 font-bold animate-pulse";
                globalBadge.innerText = "Incident Event Matrix Flagged";
            } else {
                alertBanner.classList.add('hidden');
                statusMetric.innerText = "NOMINAL RANGE OPERATIONAL";
                statusMetric.className = "text-sm font-black text-emerald-400 mt-3 uppercase tracking-widest";
                globalBadge.className = "px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-bold";
                globalBadge.innerText = "System Online";
            }

            outbreakChart.data.datasets[0].data = record.chart;
            outbreakChart.data.datasets[1].data = [4, 10, 15, 22, 38, 55, record.baseCases];
            outbreakChart.update();
        }

        async function submitIncident(event) {
            event.preventDefault();
            const payload = {
                node: document.getElementById('formNode').value,
                symptom: document.getElementById('formSymptom').value,
                cases: document.getElementById('formCases').value
            };

            try {
                const response = await fetch('/api/incident', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();

                const listContainer = document.getElementById('precautionList');
                listContainer.innerHTML = "";
                result.instructions.forEach(inst => {
                    const li = document.createElement('li');
                    li.innerText = inst;
                    listContainer.appendChild(li);
                });

                document.getElementById('precautionDisplay').classList.remove('hidden');
                document.getElementById('precautionDisplay').scrollIntoView({ behavior: 'smooth' });
            } catch (err) {
                console.error("Transmission Error: ", err);
            }
        }

        window.onload = fetchTelemetryCluster;
    </script>
</body>
</html>
`;

// Catch-all server index route directly serving the embedded webpage string
app.get('/', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(HTML_VIEWPORT);
});

app.get('/api/telemetry', (req: Request, res: Response) => {
    res.json(baselineDatabase);
});

app.post('/api/incident', (req: Request, res: Response) => {
    const { symptom, node, cases } = req.body;
    if (!symptom || !node) {
        return res.status(400).json({ error: "Missing parameters." });
    }
    res.json({
        success: true,
        timestamp: new Date(),
        node,
        symptom,
        cases,
        instructions: PRECAUTION_PROTOCOLS[symptom] || ["Standard purification protocol active."]
    });
});

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
