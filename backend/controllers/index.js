'use strict';

module.exports = function (router) {
    router.post('/', async function (req, res) {
        // Plotar mapa
        let mapInfo = req.body, field = [];
        const airportsY = [], airportsX = [], cloudsY = [], cloudsX = [];

        for (let airport = 0; airport < mapInfo.airports; airport++) {
            let y = Math.floor(Math.random() * (mapInfo.map - 0)) + 0;
            let x = Math.floor(Math.random() * (mapInfo.map - 0)) + 0;

            if (!airportsX.includes(x)) {
                airportsX.push(x);
            } else {
                airportsX.push(x + 1);
            }

            if (!airportsY.includes(y)) {
                airportsY.push(y);
            } else {
                airportsY.push(y + 1);
            }
        }

        for (let cloud = 0; cloud < mapInfo.clouds; cloud++) {
            let y = Math.floor(Math.random() * (mapInfo.map - 0)) + 0;
            let x = Math.floor(Math.random() * (mapInfo.map - 0)) + 0;
            if (!cloudsX.includes(x)) {
                cloudsX.push(x);
            } else {
                cloudsX.push(x + 1);
            }

            if (!cloudsY.includes(y)) {
                cloudsY.push(y);
            } else {
                cloudsY.push(x + 1);
            }
        }

        for (var y = 0; y <= mapInfo.map; y++) { // linhas
            let lines = [];
            for (let x = 0; x <= mapInfo.map; x++) { // colunas
                if (airportsY.includes(y) && airportsX[airportsY.indexOf(y)] == x) {
                    lines.push('A');
                } else if (cloudsY.includes(y) && cloudsX[cloudsY.indexOf(y)] == x) {
                    lines.push('N');
                } else {
                    lines.push('o');
                }
            }
            field.push(lines);
        }
        // fim plotar mapa


        let newPlot = [];
        for (let i = 0; i < field.length; i++) {
            if (typeof field[i] === 'object') {
                newPlot.push(field[i].slice(0, mapInfo.map));
            } else {
                newPlot.push(field[i]);
            }
        }

        // Calcular dias para o primeiro aeroporto ser atingido
        let countDays = 0; // Count dos dias
        let firstAirportCovered = 0; // Dias até o primeiro aeroporto ser coberto
        let allAirportsCovered = 0; // Dias até todos os aeroportos estarem cobertos

        while (allAirportsCovered == 0) {
            const getClouds = newPlot.map(e => ( // verifica onde existem nuvens
                e.indexOf('N')
            ));

            const currentAirports = [...newPlot.map(element => ( // verifica onde existem aeroportos
                element.indexOf('A')
            )).filter(element => {
                return element != -1;
            })];


            getClouds.forEach((e, index) => {
                if (e != -1) {
                    if (newPlot[index - 1] != undefined) { // acima
                        newPlot[index - 1][e] = 'N';
                    }

                    if (newPlot[index][e + 1] != undefined) { // direita
                        newPlot[index][e + 1] = 'N';
                    }

                    if (newPlot[index][e - 1] != undefined) { // esquerda
                        newPlot[index][e - 1] = 'N';
                    }

                    if (newPlot[index + 1] != undefined) { // abaixo
                        newPlot[index + 1][e] = 'N';
                    }

                    if (firstAirportCovered == 0 && currentAirports.length < mapInfo.airports) {
                        firstAirportCovered = countDays;
                    }

                    let checkClouds = newPlot.map(e => ( // verifica onde existem nuvens
                        e.indexOf('A')
                    )).filter(e => {
                        return e != -1;
                    });

                    if (countDays == mapInfo.map) {
                        allAirportsCovered = countDays;
                    } else {
                        allAirportsCovered = currentAirports.length < 1 && countDays;
                    }
                }
            });

            countDays++
        }

        res.json({
            error: 'false',
            plot: field,
            novo: newPlot,
            firstAirportCovered: firstAirportCovered,
            allAirportsCovered: allAirportsCovered
        })
    });
};
