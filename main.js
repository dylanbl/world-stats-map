const arcgisMapId = '1c365daf37a744fbad748b67aa69dac8'; 
const arcgisApiKey = config.ARCGIS_API_KEY;

const map = new maplibregl.Map({
  container: "map",
  style: `https://basemaps-api.arcgis.com/arcgis/rest/services/styles/${arcgisMapId}?type=style&token=${arcgisApiKey}`,
  zoom: 2,
  center: [-118.805, 34.027]
});

map.on('load', () => {
    // Add a source for the state polygons.
    map.addSource('countryBorders', {
        'type': 'geojson',
        'data': 'https://dylanbl.github.io/api/geojson/countryBorders.geojson'
    });

    map.addLayer({
        'id': 'countriesLayer',
        'type': 'fill',
        'source': 'countryBorders',
        'paint': {
            'fill-color': 'rgba(0, 0, 0, 0)',
            'fill-outline-color': 'rgba(0, 0, 0, 0.75)'
        }
    });

    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'countriesLayer', (e) => {
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.ADMIN)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'countriesLayer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'countriesLayer', () => {
        map.getCanvas().style.cursor = '';
    });
});

/*
map.on('mousemove', (e) => {
    const features = map.queryRenderedFeatures(e.point);

    // Limit the number of properties we're displaying for
    // legibility and performance
    const displayProperties = [
        'type',
        'properties',
        'id',
        'layer',
        'source',
        'sourceLayer',
        'state'
    ];

    const displayFeatures = features.map((feat) => {
        const displayFeat = {};
        displayProperties.forEach((prop) => {
            displayFeat[prop] = feat[prop];
        });
        return displayFeat;
    });

    document.getElementById('features').innerHTML = JSON.stringify(
        displayFeatures,
        null,
        2
    );
});
*/