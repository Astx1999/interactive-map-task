import React, {useContext, useRef} from 'react';
import styles from './CSVReaderButtons.module.scss'
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../stores/RootStore";
import Button from "../Button/Button";

const CSVReaderButtons = observer(() => {
        const fileInputRef = useRef(null);

        const {
            listStore: {
                addItems,
                list
            }
        } = useContext(RootStoreContext)

        const handleFileSelect = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const result = event.target.result;
                    const lines = result.split('\n').map(line => line.trim());

                    // Ensure the file has at least one data row
                    if (lines.length < 2) {
                        alert('Error: CSV file is empty or does not contain data.');
                        return;
                    }
                    // Ensure the header row contains expected column names
                    const headerRow = lines[0].split(',');
                    const isLatLongHeader = (
                        headerRow.length === 2 &&
                        (headerRow[0].toLowerCase() === 'latitude' || headerRow[0].toLowerCase() === 'lat') &&
                        (headerRow[1].toLowerCase() === 'longitude' || headerRow[1].toLowerCase() === 'lng')
                    );
                    if (!isLatLongHeader) {
                        alert('Error: CSV file format is incorrect. Expected header row: "Latitude,Longitude".');
                        return;
                    }

                    // Exclude the header row
                    const parsedData = lines.slice(1).map(line => {
                        const [lat, lng] = line.split(',');
                        return {lat: parseFloat(lat), lng: parseFloat(lng)};
                    });

                    // Filter out empty lines
                    const filteredData = parsedData.filter(item => item.lat && item.lng);


                    addItems(filteredData);
                };
                reader.readAsText(file);
            }
        };


        const exportData = (data) => {
            const csvContent = "data:text/csv;charset=utf-8," +
                "Latitude,Longitude\n" +
                data.map(item => `${item.lat},${item.lng}`).join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "exported_data.csv");
            document.body.appendChild(link);
            link.click();
        };

        return (
            <div className={styles.root}>
                <div className={styles.import}>
                    <label htmlFor="file-upload" className={styles.button}>
                        Import Data
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        accept=".csv"
                        ref={fileInputRef}
                        style={{display: 'none'}}
                        onChange={handleFileSelect}
                    />
                </div>
                <Button text="Export Data" onClick={() => exportData(list)}/>
            </div>
        );
    }
);

export default CSVReaderButtons;
