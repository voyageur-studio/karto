//begin custom code

mapboxgl.accessToken = 'pk.eyJ1Ijoidm95YWdldXJzdHVkaW8iLCJhIjoiY2tldTVienlqMWxmOTJybXJuOGYwYTByOSJ9.Atz7a2_ggdIUL0MNVQQaeg';
//map bounds
let bounds = [
						 [-28, 2], // Southwest coordinates
						 [48, 49] // Northeast coordinates
];
//universal model scales
let scaleBuilding = 500;
//model origin variables
let originFarm = [16.657991116569747, 35.20442984585782];
let originWizard = [23.55753204731775, 29.824589523135046];
let originForestshrowded = [23.55753204731775, 29.824589523135046];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];
//let farmOrigin = [16.657991116569747, 35.20442984585782];

let mapCenter = [5.410843, 29.836440];

let map = (window.map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/voyageurstudio/ckzlf88jp000b15kljs01wuqi',
	center: mapCenter,
	zoom: 4.8,
	maxZoom: 11.5,
	minZoom: 4.8,
	maxPitch: 70,
	maxBounds: bounds,
  antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiased
}));

//define Stats
let stats;
			import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';
			function animate(timestamp) {

				// clamp the rotation between 0 -360 degrees
				// Divide timestamp by 100 to slow rotation to ~10 degrees / sec
				//rotateCamera(Date.now());
				stats.update();
				requestAnimationFrame(animate);
			}
//fly to center button
document.getElementById('mapreset').addEventListener('click', () => {
// Fly to the center
  map.flyTo({
    center: mapCenter,
    zoom: 4.8,
    curve: 1,
    bearing: 0,
		pitch: 0,
		speed: 0.5,
		essential: true, // this animation is considered essential with respect to prefers-reduced-motion
	});
});
//coords finder
map.on('click', (e) => {
	document.getElementById('info').innerHTML =
		// `e.point` is the x, y coordinates of the `mousemove` event
		// relative to the top-left corner of the map.
		JSON.stringify(e.point) +
		'<br />' +
		// `e.lngLat` is the longitude, latitude geographical position of the event.
		JSON.stringify(e.lngLat.wrap());
});


//threebox window
window.tb = new Threebox(
	map,
	map.getCanvas().getContext('webgl'),
		{
			//realSunlight: true,
			sky: true,
			enableSelectingObjects: false,
			enableTooltips: true,
	}
);


map.on('style.load', function () {
				// stats
				stats = new Stats();
				map.getContainer().appendChild(stats.dom);
				animate();

				map.addLayer({
					id: 'custom_layer',
					type: 'custom',
					renderingMode: '3d',
					onAdd: function (map, mbxContext) {
						//light set
						// create two three.js lights to illuminate the model
						var directionalLight = new THREE.DirectionalLight(0xfee9dc);
						directionalLight.position.set(0, -7000, 1000).normalize();
						tb.scene.add(directionalLight);

						var directionalLight2 = new THREE.DirectionalLight(0xfee9dc);
						directionalLight2.position.set(0, 7000, 1000).normalize();
						tb.scene.add(directionalLight2);
							let modelFarm = {
									type: 'gltf',
									obj: 'https://cdn.jsdelivr.net/gh/voyageur-studio/karto@main/Karto_Models/Sunshield_Farm_nobase.glb', //model url
									units: 'meters', //units in the default values are always in meters
									scale: scaleBuilding,
									rotation: { x: 90, y: -110, z: 0 }, //default rotation
									anchor: 'center'
							}
							tb.loadObj(modelFarm, function (model) {
									model.setCoords(originFarm);
									model.castShadow = true;
									tb.add(model);
							});

							let modelWizard = {
									type: 'gltf',
									obj: 'https://cdn.jsdelivr.net/gh/voyageur-studio/karto@main/Karto_Models/wizard_tower.glb', //model url
									units: 'meters', //units in the default values are always in meters
									scale: scaleBuilding,
									rotation: { x: 90, y: 0, z: 0 }, //default rotation
									anchor: 'center'
							}
							tb.loadObj(modelWizard, function (model) {
									model.setCoords(originWizard);
									model.castShadow = true;
									tb.add(model);
							});

							let modelShrowdedforest = {
									type: 'gltf',
									obj: 'https://cdn.jsdelivr.net/gh/voyageur-studio/karto@main/Karto_Models/forest_shrowded.glb', //model url
									units: 'meters', //units in the default values are always in meters
									scale: scaleBuilding,
									rotation: { x: 90, y: 0, z: 0 }, //default rotation
									anchor: 'center'
							}
							tb.loadObj(modelShrowdedforest, function (model) {
									model.setCoords(originForestshrowded);
									model.castShadow = false;
									tb.add(model);
							});

						},

						render: function (gl, matrix) {
							tb.update();
							map.triggerRepaint();
						}
					}
)});
