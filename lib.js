export function addCountryLayer() {
    map.addSource('countries', {
        'type': 'geojson',
        'data': 'https://dylanbl.github.io/api/geojson/countryBorders.geojson',
        'generateId': true
    });

    map.addLayer({
        'id': 'country-fills',
        'type': 'fill',
        'source': 'countries',
        'layout': {}, 
        'paint': {
            'fill-color': '#949494',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.5,
                0
            ]
        }
    });
}

export function loadMap(map) {
    map.on('load', () => {
        addCountryLayer(); 
    })
}

export function fillCountry()