import React from "react"
import { IconToggle } from "react-mdl"
import physionet from "../src/components/physionet/physionet.js"
import { screen } from '@testing-library/dom'

describe('ckeck physionet zip-file download links', () => {
    it(expect(screen.getByText('Lobachevsky University Electrocardiography Database').href).toBe("https://physionet.org/static/published-projects/ludb/lobachevsky-university-electrocardiography-database-1.0.1.zip"));
    it(expect(screen.getByText('MICRO Motion capture data from groups of participants standing still to auditory stimuli (2012)').href).toBe("https://storage.googleapis.com/music-motion-2012-1.0.physionet.org/micro-motion-capture-data-from-groups-of-participants-standing-still-to-auditory-stimuli-2012-1.0.zip"));
});