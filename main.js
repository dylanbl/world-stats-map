const map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://api.maptiler.com/maps/db95ca3f-d9f6-44e4-965f-7af966072ced/style.json?key=j43i7jjwrjixFedR7wZg', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 1.5, // starting zoom
    minZoom: 1.5
});

let hoverCountryId = null; 

map.on('load', () => {
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

    map.on('mousemove', 'country-fills', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        if (e.features.length > 0) {
            if (hoverCountryId !== null) {
                map.setFeatureState(
                    {source: 'countries', id: hoverCountryId},
                    {hover: false}
                );
            }

            hoverCountryId = e.features[0].id;
            
            map.setFeatureState(
                {source: 'countries', id: hoverCountryId},
                {hover: true}
            ); 
        }
    });

    map.on('mouseleave', 'country-fills', () => {
        if (hoverCountryId) {
            map.setFeatureState(
                {source: 'countries', id: hoverCountryId},
                {hover: false}
            );
        }

        hoverCountryId = null;
    });
});