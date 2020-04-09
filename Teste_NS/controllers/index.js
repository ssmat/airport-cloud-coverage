'use strict';

module.exports = function (router) {
    router.post('/', async function (req, res) {
        // Plotar mapa
        let mapInfo = req.body, field = [];
        const airportsY = [], airportsX = [], cloudsY = [], cloudsX = [];

        for (let airport = 0; airport < mapInfo.airports; airport++) {
            let y = Math.floor(Math.random() * (mapInfo.map - 0)) + 0;
            let x = Math.floor(Math.random() * (mapInfo.map - 0)) + 0;
            airportsY.push(y);
            airportsX.push(x);
        }

        for (let cloud = 0; cloud < mapInfo.clouds; cloud++) {
            let y = Math.floor(Math.random() * (mapInfo.map - 0)) + 0;
            let x = Math.floor(Math.random() * (mapInfo.map - 0)) + 0;
            cloudsY.push(y);
            cloudsX.push(x);
        }

        for (var y = 0; y < mapInfo.map; y++) { // linhas
            let lines = [];
            for (let x = 0; x < mapInfo.map; x++) { // colunas
                if (airportsY.includes(y) && airportsX[airportsY.indexOf(y)] == x) {
                    lines.push('A');
                }
                if (cloudsY.includes(y) && cloudsX[cloudsY.indexOf(y)] == x) {
                    lines.push('N');
                } else {
                    lines.push('.');
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

        var getAirports = newPlot.map(e => ( // verifica onde existem aeroportos
            e.indexOf('A')
        )).filter(element => {
            return element != -1;
        });
        // Calcular dias para o primeiro aeroporto ser atingido
        let countDays = 0; // Count dos dias
        let firstAirportCovered = 0; // Dias até o primeiro aeroporto ser coberto
        let allAirportsCovered = 0; // Dias até todos os aeroportos estarem cobertos

        while (countDays < mapInfo.days) {
            let getClouds = newPlot.map(e => ( // verifica onde existem nuvens
                e.indexOf('N')
            ));

            getClouds.forEach((e, index) => {
                var currentAirports = newPlot.map(e => ( // verifica onde existem aeroportos
                    e.indexOf('A')
                )).filter(element => {
                    return element != -1;
                });

                if (e != -1) {
                    if (newPlot[index - 1][e] != undefined) { // acima
                        newPlot[index - 1][e] = 'N';
                    }

                    if (newPlot[index][e + 1] != undefined) { // direita
                        newPlot[index][e + 1] = 'N';
                    }

                    if (newPlot[index][e - 1] != undefined) { // esquerda
                        newPlot[index][e - 1] = 'N';
                    }

                    if (newPlot[index + 1][e] != undefined) { // abaixo
                        newPlot[index + 1][e] = 'N';
                    }

                    countDays++

                    if (currentAirports.length < getAirports.length) {
                        firstAirportCovered = countDays
                    }

                    if (currentAirports.length === 0) {
                        allAirportsCovered = countDays
                    }
                }
            });
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
