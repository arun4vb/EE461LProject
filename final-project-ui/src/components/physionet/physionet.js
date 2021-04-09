import React, { Component } from 'react';
import './physionet.css'

function Physionet() {

    return (
            <>
            <div class="banner" style={{ width: '100%', margin: 'auto' }}>
                <div class="banner-text">
                    <h1 class="banner-text">Datasets</h1>
                    <hr />
                    <p>Here you will find our most popular datasets - click one to download!</p>
                </div>
            </div>
            <br aria-setsize="50px" />
            <div class="list-group">
                <a
                    href="https://physionet.org/static/published-projects/ludb/lobachevsky-university-electrocardiography-database-1.0.1.zip"
                    class="list-group-item list-group-item-action"
                    width="100px">
                        Lobachevsky University Electrocardiography Database
                </a>
                <a
                    href="https://physionet.org/static/published-projects/but-pdb/brno-university-of-technology-ecg-signal-database-with-annotations-of-p-wave-but-pdb-1.0.0.zip"
                    class="list-group-item list-group-item-action"
                    width="100px">
                        Brno University of Technology ECG Signal Database with Annotations of P Wave (BUT PDB)
                </a>
                <a
                    href="https://physionet.org/static/published-projects/butppg/brno-university-of-technology-smartphone-ppg-database-but-ppg-1.0.0.zip"
                    class="list-group-item list-group-item-action"
                    width="100px">
                        Brno University of Technology Smartphone PPG Database (BUT PPG)
                </a>
                <a
                    href="https://storage.googleapis.com/music-motion-2012-1.0.physionet.org/micro-motion-capture-data-from-groups-of-participants-standing-still-to-auditory-stimuli-2012-1.0.zip"
                    class="list-group-item list-group-item-action"
                    width="100px">
                        MICRO Motion capture data from groups of participants standing still to auditory stimuli (2012)
                </a>
                <a
                    href="https://storage.googleapis.com/bhx-brain-bounding-box-1.1.physionet.org/brain-hemorrhage-extended-bhx-bounding-box-extrapolation-from-thick-to-thin-slice-ct-images-1.1.zip"
                    class="list-group-item list-group-item-action"
                    width="100px">
                        Bounding box extrapolation from thick to thin slice CT images
                </a>
                <a
                    href="https://physionet.org/static/published-projects/mmash/multilevel-monitoring-of-activity-and-sleep-in-healthy-people-1.0.0.zip"
                    class="list-group-item list-group-item-action"
                    width="100px">
                        Multilevel Monitoring of Activity and Sleep in Healthy People
                </a>
                <a
                    href="https://physionet.org/static/published-projects/maternal-visceral-adipose/visceral-adipose-tissue-measurements-during-pregnancy-1.0.0.zip"
                    class="list-group-item list-group-item-action"
                    width="100px">
                        Visceral adipose tissue measurements during pregnancy
                </a>
                <a
                    href="https://physionet.org/static/published-projects/phdsm/permittivity-of-healthy-and-diseased-skeletal-muscle-1.1.zip"
                    class="list-group-item list-group-item-action"
                    width="100px">
                        Permittivity of Healthy and Diseased Skeletal Muscle
                </a>
                <a
                    href="https://physionet.org/static/published-projects/physiozoo/physiozoo-mammalian-nsr-databases-1.0.0.zip"
                    class="list-group-item list-group-item-action"
                    width="100px">
                        PhysioZoo - mammalian NSR databases
                </a>
            </div>
        </>
    );
}

export default Physionet;