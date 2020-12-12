const express = require('express');
const app = express();
const cors = require('cors');
var uniqid = require('uniqid');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5);
const PORT = 4000;
var SSE = require('express-sse');
var sse = new SSE();


/* Monitoring stations:
 * Unique ID for each station
 * ------------------------------------------
 * List:
 *  - Patient ID for those under this station
*/
monitoring_stations = {}

/* Patient:
 * Unique ID for each patient 
 * ------------------------------------
 * JSON Object:
 *      status:             Coded, Status of last check
 *      frequency:          Hours between checks
 *      last_status_time:       Time since last connection
 *      interactive_mode:   Boolean, are they required to press button afterwards.
 *      settings_changed:   Do new settings need to be downloaded.
*/
patients = {}
pending_codes = {}

// New station
function new_station() {
    station_id = uniqid('ms-');
    monitoring_stations[station_id] = []

    return station_id;
}

// New patient
function new_patient(station_id) {
    patient_id = uniqid('pt-');

    monitoring_stations[station_id].push(patient_id)
    patients[patient_id] = {
        station_id: station_id,
        status: -1,
        frequency: 1,
        last_status_time: null,
        interactive_mode: 0,
        settings_changed: 1
    };
    
    code = nanoid();
    pending_codes[code] = patient_id;
    
    return {id: patient_id, code: code};
}

// Patients for a station
function get_all_patients(station_id, callback) {
    results = {}
    
    monitoring_stations[station_id].forEach(function(patient_id){
        results[patient_id] = patients[patient_id];
    });

    callback(results);
}

// Update patient
function update_patient(patient_id, frequency, interactive) {

    patients[patient_id].frequency = frequency;
    patients[patient_id].interactive_mode = interactive;
    patients[patient_id].settings_changed = 1;

    return patient_id;
}

/* Status Update
--------------------------------
 *  Codes:
 *      -2 if error
 *      -1 if not connected
 *      0 if connected
 *      1 if message played
 *      2 if responded to message
*/
function patient_status_update(patient_id, status) {
    patients[patient_id].status = status;
    patients[patient_id].last_status_time = Date.now();

    sse.send(patients[patient_id], patients[patient_id].station_id);
    return patients[patient_id];
}

// Express
const station = express.Router();
const patient = express.Router();
app.use(cors());

station.post('/new', (req, res) => {
    id = new_station();
    console.log("[S/POST] New station, given id: " + id.toString());
    res.status(200).json({id: id});
});

station.post('/:station_id', (req, res) => {
    console.log("[S/POST] Given Station ID: " + req.params.station_id);
    res.status(201).json(new_patient(req.params.station_id));
});

station.get('/:station_id', (req, res) => {
    console.log("[S/GET] Given Station ID: " + req.params.station_id);

    get_all_patients(req.params.station_id, (value) => {
        res.status(200).json(value);
    });
});

station.post('/:station_id/:patient_id', (req, res) => {
    console.log("[S/POST] Given Station/Patient ID: " + req.params.station_id + '/' + req.params.patient_id);

    if (!(req.params.station_id in monitoring_stations)) {
        res.status(400).send('Bad Request.');
    } else if(!monitoring_stations[req.params.station_id].includes(req.params.patient_id)) {
        res.status(403).send('Unauthorised.');
    } else {
        update_patient(req.params.patient_id, req.query.frequency, req.query.interactive);
        res.status(202).send('Updated.');
    }
});

station.get('/:station_id/:patient_id', (req, res) => {
    console.log("[S/GET] Given Station/Patient ID: " + req.params.station_id + '/' + req.params.patient_id);

    if (!(req.params.station_id in monitoring_stations)) {
        res.status(400).send('Bad Request');
    } else if(!monitoring_stations[req.params.station_id].includes(req.params.patient_id)) {
        res.status(403).send('Unauthorised.');
    } else {
        status = patients[req.params.patient_id].status;
        last_status_time = patients[req.params.patient_id].last_status_time;
        res.status(202).json({status: status, last_status_time: last_status_time});
    }
});

station.get('/subscribe', sse.init);

// Patient Requests
patient.post('/register/:patient_code', (req, res) => {
    console.log("[P/POST] Registering patient, code: " + req.params.patient_code);
    if (req.params.patient_code in pending_codes) {
        res.status(200).json({id: pending_codes[req.params.patient_code]});
        patient_status_update(pending_codes[req.params.patient_code], 0);
        delete pending_codes[req.params.patient_code];
    } else {
        res.status(400).send('Bad Request');
    }
});

patient.post('/:patient_id', (req, res) => {
    console.log("[P/POST] Given Patient ID: " + req.params.patient_id);
    patient_status_update(req.params.patient_id, req.query.status);
    res.status(202).send('Updated.');
});

patient.get('/:patient_id', (req, res) => {
    console.log("[P/GET] Given Patient ID: " + req.params.patient_id);

    res.status(200).json(patients[req.params.patient_id]);
    patients[req.params.patient_id].settings_changed = 0;
});

app.use('/station-api', station);
app.use('/patient-api', patient);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});