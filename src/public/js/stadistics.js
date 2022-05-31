
let labels = []
let values = []

let data = [{
    type: "pie",
    values: values,
    labels: labels,
    hole: 0.25,
    pull: [0.1, 0, 0, 0, 0],
    direction: 'clockwise',
    marker: {
        colors: ['#CDDC39', '#673AB7', '#F44336', '#00BCD4', '#607D8B'],
        line: {
            color: 'black',
            width: 1,
        }
    },
    textfont: {
        color: 'white',
        size: 15
    },
    hoverlabel: {
        bgcolor: '#ededed',
        bordercolor: 'transparent',
        font: {
            color: 'black',
            size: 12
        }
    }
}]

Plotly.newPlot("graph", data, "Estadisticas")