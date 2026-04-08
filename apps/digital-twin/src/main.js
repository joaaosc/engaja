import {
  MAX_REPORT_DESCRIPTION_LENGTH,
  REPORT_CATEGORIES,
  normalizeReportDate,
  normalizeReportSeverity,
  normalizeReportStatus,
  slugifyToken,
} from "../../../packages/reports-domain/src/index.js";
import {
  ALL_CATEGORIES_FILTER,
  CAMPUS_BOUNDARY_URL,
  DEFAULT_VISUALIZATION_MODE,
  REPORTS_SEED_URL,
  TREE_MODEL_ASSET_URL,
  VISUALIZATION_MODES,
} from "./config/runtime.js";

(() => {
  const BASE_STYLE_URL = "https://tiles.openfreemap.org/styles/bright";
  const MAX_DESCRIPTION_LENGTH = MAX_REPORT_DESCRIPTION_LENGTH;
  const DEFAULT_BUILDING_HEIGHT_METERS = 12;
  const LEVEL_HEIGHT_METERS = 3.2;
  const DEFAULT_MAP_CENTER = [-43.2258, -22.8531];
  const CAMPUS_BOUNDARY_JOIN_TOLERANCE = 0.0002;
  const TREE_VOLUME_LAYER_MIN_ZOOM = 14.9;
  const TREE_MODEL_LAYER_MIN_ZOOM = TREE_VOLUME_LAYER_MIN_ZOOM;
  const TREE_MODEL_ASSET_HEIGHT_METERS = 6.15;
  const TREE_MODEL_BASE_ALTITUDE_METERS = 0.04;
  const slugify = slugifyToken;
  const normalizeStatus = normalizeReportStatus;
  const normalizeSeverity = normalizeReportSeverity;
  const normalizeDate = normalizeReportDate;
  const CAMPUS_MASK_OUTER_RING = [
    [-180, -85],
    [180, -85],
    [180, 85],
    [-180, 85],
    [-180, -85],
  ];
  const DEFAULT_CAMERA = {
    pitch: 55,
    bearing: -20,
    maxZoom: 14.5,
  };
  const FOCUS_CAMERA = {
    pitch: 60,
    bearing: -24,
    maxZoom: 17,
  };
  const CAMERA_SOFT_RECENTER = {
    leashPaddingMeters: 1400,
    minCorrectionMeters: 45,
    duration: 1350,
  };
  const SUNLIGHT_CONFIG = {
    altitudeDegrees: 35,
    azimuthDegrees: 318,
    softness: 0.58,
    radialDistance: 1.34,
    intensity: 0.78,
    color: "#fff0d6",
  };

  const TREE_MODEL_CONFIG = {
    minHeightMeters: 4,
    maxHeightMeters: 10,
    minCanopyRadiusMeters: 1.55,
    maxCanopyRadiusMeters: 3.25,
    minTrunkRadiusMeters: 0.18,
    maxTrunkRadiusMeters: 0.34,
    minSampleSpacingMeters: 14,
    maxSampleSpacingMeters: 22,
    areaPerTreeSquareMeters: 310,
    minDensityFactor: 0.92,
    maxDensityFactor: 1.62,
    minVegetationAreaSquareMeters: 150,
    maxPointsPerVegetationFeature: 30,
    maxTotalPoints: 780,
    minPointSpacingMeters: 7.2,
    canopySides: 12,
    trunkSides: 8,
    canopyWobbleFactor: 0.14,
  };

  const EMPTY_FEATURE_COLLECTION = {
    type: "FeatureCollection",
    features: [],
  };
  const WATER_CONTEXT_PADDING_METERS = 2600;
  const WATER_WAVE_TEXTURE_IMAGE_ID = "campus-water-wave-texture";
  const WATER_REFLECTION_IMAGE_ID = "campus-water-reflection";
  const ROAD_TEXTURE_IMAGE_ID = "campus-road-asphalt-texture";

  const SCENE_THEME = {
    surfaceBackdrop: "#d0d6d1",
    surfaceBase: "#d7ddd8",
    surfaceSoft: "#c6cec7",
    surfaceEdge: "#9aa79f",
    parcelAccent: "#cbd3c9",
    greenSoft: "#92ac7e",
    greenBase: "#6d8f5b",
    greenDeep: "#4d6f42",
    greenEdge: "#8ba07e",
    treeCanopy: "#59784c",
    treeCanopyShade: "#47653e",
    treeCanopySun: "#769261",
    treeTrunk: "#6f563f",
    treeTrunkShade: "#4f3a2a",
    treeShadow: "rgba(35, 54, 32, 0.15)",
    treeShadowCore: "rgba(29, 45, 28, 0.18)",
    treeHalo: "rgba(214, 235, 198, 0.24)",
    treeRootOcclusion: "rgba(41, 50, 38, 0.2)",
    waterBase: "#7ea4b4",
    waterSoft: "#b7d3dd",
    waterEdge: "#628697",
    waterInner: "#abd0da",
    waterInnerDeep: "#90b8c5",
    waterBay: "#6e96a8",
    waterBayDeep: "#53798a",
    waterWaveHighlight: "#d8eef5",
    waterWaveShadow: "#6f99aa",
    waterReflection: "#f1fbfd",
    roadMajor: "#808881",
    roadMajorCasing: "#505752",
    roadMinor: "#8a918a",
    roadMinorCasing: "#606762",
    roadTextureLight: "#a1a99f",
    roadTextureDark: "#666d67",
    roadLaneMarking: "#f1ecd7",
    roadEdgeShadow: "rgba(23, 28, 24, 0.18)",
    walkway: "#91a19d",
    buildingShadowNear: "rgba(38, 42, 38, 0.16)",
    buildingShadowFar: "rgba(28, 34, 30, 0.09)",
    buildingFootprint: "#c3c2ba",
    buildingEdge: "#7b8076",
    buildingTop: "#ddd8cf",
    buildingMid: "#c4beb4",
    buildingTall: "#a79f92",
    buildingAo: "#64665f",
    buildingBaseOcclusion: "#585b54",
    buildingRoofWarm: "#b28968",
    buildingRoofCool: "#6f7f88",
    buildingRoofNeutral: "#aba18f",
    buildingRoofLight: "#c4b39e",
    buildingHover: "#d6f1ff",
    buildingSelection: "#c1ebff",
  };

  const BUILDING_ROOF_PALETTE = [
    SCENE_THEME.buildingRoofWarm,
    SCENE_THEME.buildingRoofCool,
    SCENE_THEME.buildingRoofNeutral,
    SCENE_THEME.buildingRoofLight,
  ];

  const BUILDING_SIZE_PALETTES = {
    compact: {
      wall: "#d9cfbf",
      roof: "#b88462",
      bandLight: "#f1e5d6",
      bandDark: "#8f7a65",
      ao: "#6f6558",
      footprint: "#cdbfae",
      outline: "#827666",
    },
    midrise: {
      wall: "#c5c0b4",
      roof: "#a6957e",
      bandLight: "#e5e0d4",
      bandDark: "#7d776d",
      ao: "#66645e",
      footprint: "#c0b8ab",
      outline: "#74736d",
    },
    campus: {
      wall: "#c7c7bf",
      roof: "#7e8b8c",
      bandLight: "#dde2dc",
      bandDark: "#6d7671",
      ao: "#5c625d",
      footprint: "#bcc0bb",
      outline: "#6a716c",
    },
    large: {
      wall: "#b8b8b4",
      roof: "#6f7b84",
      bandLight: "#d5dbe0",
      bandDark: "#60686f",
      ao: "#53585d",
      footprint: "#b0b4b8",
      outline: "#5f666d",
    },
  };

  const CATEGORIES = REPORT_CATEGORIES;

  const MAP_SOURCE_IDS = {
    markings: "campus-markings",
    campusWater: "campus-water",
    campusRoads: "campus-roads",
    buildingHover: "campus-building-hover",
    buildingSelection: "campus-building-selection",
    campusBuildings: "campus-buildings",
    contextBuildings: "city-context-buildings",
    treeVolumes: "campus-tree-volumes",
    campusBoundary: "campus-boundary",
    campusBoundaryArea: "campus-boundary-area",
    campusExteriorMask: "campus-exterior-mask",
  };

  const LAYER_IDS = {
    waterBase: "campus-water-base",
    waterDepth: "campus-water-depth",
    waterWaves: "campus-water-waves",
    waterReflection: "campus-water-reflection",
    roadAreas: "campus-road-areas",
    roadAreaTexture: "campus-road-area-texture",
    roadShadows: "campus-road-shadows",
    roadSurfaces: "campus-road-surfaces",
    roadTexture: "campus-road-texture",
    roadLaneEdges: "campus-road-lane-edges",
    roadLaneCenters: "campus-road-lane-centers",
    walkways: "campus-walkways",
    vegetationRelief: "campus-vegetation-relief",
    vegetationMass: "campus-vegetation-mass",
    trees: "campus-tree-canopy",
    treeModels: "campus-tree-models",
    treeShadows: "campus-tree-shadows",
    treeShadowCore: "campus-tree-shadows-core",
    treeRootOcclusion: "campus-tree-root-occlusion",
    treeTrunks: "campus-tree-trunks",
    treeCanopyLower: "campus-tree-canopy-lower",
    treeCanopyUpper: "campus-tree-canopy-upper",
    buildingShadowFar: "fundao-buildings-shadow-far",
    buildingShadowMid: "fundao-buildings-shadow-mid",
    buildingShadowNear: "fundao-buildings-shadow-near",
    buildingShadowContact: "fundao-buildings-shadow-contact",
    buildingBaseOcclusion: "fundao-buildings-base-occlusion",
    buildingFootprints: "fundao-buildings-footprints",
    buildingOutline: "fundao-buildings-outline",
    buildingAmbientOcclusion: "fundao-buildings-ambient-occlusion",
    buildings3d: "fundao-buildings-3d",
    buildingFacadeBands: "fundao-buildings-facade-bands",
    buildingRoofCaps: "fundao-buildings-roof-caps",
    buildingContextFootprints: "city-context-buildings-footprints",
    buildingContextOutline: "city-context-buildings-outline",
    buildingsContext3d: "city-context-buildings-3d",
    buildingContextRoofCaps: "city-context-buildings-roof-caps",
    buildingHover: "fundao-buildings-hover",
    buildingHoverOutline: "fundao-buildings-hover-outline",
    buildingSelection: "fundao-buildings-selection",
    buildingSelectionOutline: "fundao-buildings-selection-outline",
    generalHeatmap: "campus-markings-heatmap",
    markingsPulse: "campus-markings-pulse",
    markingsHalo: "campus-markings-halo",
    markings: "campus-markings-circles",
    campusExteriorMask: "campus-exterior-mask",
    campusBoundaryOutline: "campus-boundary-outline",
  };

  const MARKING_LAYER_IDS = [
    LAYER_IDS.markingsPulse,
    LAYER_IDS.markingsHalo,
    LAYER_IDS.markings,
  ];

  const BUILDING_INTERACTIVE_LAYER_IDS = [
    LAYER_IDS.buildingSelection,
    LAYER_IDS.buildingHover,
    LAYER_IDS.buildingRoofCaps,
    LAYER_IDS.buildingFacadeBands,
    LAYER_IDS.buildingAmbientOcclusion,
    LAYER_IDS.buildings3d,
  ];

  const categoryById = new Map(CATEGORIES.map((category) => [category.id, category]));
  const categoryByLabel = new Map(
    CATEGORIES.map((category) => [slugify(category.label), category]),
  );
  const modeById = new Map(VISUALIZATION_MODES.map((mode) => [mode.id, mode]));

  let activePopup = null;

  const map = new maplibregl.Map({
    container: "map",
    style: BASE_STYLE_URL,
    center: DEFAULT_MAP_CENTER,
    zoom: 14.5,
    minZoom: 13,
    maxZoom: 18,
    maxPitch: 78,
    pitch: DEFAULT_CAMERA.pitch,
    bearing: DEFAULT_CAMERA.bearing,
    bearingSnap: 0,
    dragPan: {
      linearity: 0.3,
      easing: (t) => 1 - (1 - t) ** 2.2,
      maxSpeed: 1400,
      deceleration: 2500,
    },
    dragRotate: true,
    antialias: true,
    canvasContextAttributes: {
      antialias: true,
      powerPreference: "high-performance",
      desynchronized: false,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
      contextType: "webgl2withfallback",
    },
    renderWorldCopies: false,
  });

  const categorySelect = document.getElementById("category-select");
  const categoryFilters = document.getElementById("category-filters");
  const categoryLegend = document.getElementById("category-legend");
  const descriptionInput = document.getElementById("description-input");
  const descriptionCounter = document.getElementById("description-counter");
  const modeStatus = document.getElementById("mode-status");
  const modeSwitcher = document.getElementById("mode-switcher");
  const pinCount = document.getElementById("pin-count");
  const pinList = document.getElementById("pin-list");
  const pinToggleButton = document.getElementById("pin-toggle-button");
  const sidebar = document.querySelector(".sidebar");
  const togglePinListButton = document.getElementById("toggle-pin-list-button");
  const visualizationHelper = document.getElementById("visualization-helper");
  const markingsPanel = document.getElementById("markings-panel");

  const state = {
    isPlacementMode: false,
    isListCollapsed: false,
    nextId: 1,
    visualizationMode: DEFAULT_VISUALIZATION_MODE,
    activeCategoryFilter: ALL_CATEGORIES_FILTER,
    markings: [],
    hoveredBuildingFingerprint: null,
    selectedBuildingFingerprint: null,
    campusBoundary: null,
    isSoftRecenteringCamera: false,
    isTreeModelRefreshPending: false,
  };
  populateCategorySelect();
  renderModeButtons();
  renderCategoryFilters();
  renderCategoryLegend();
  renderMarkingsList();
  updateDescriptionCounter();
  updatePlacementUi();
  updateMarkingsListVisibility();
  updateVisualizationHelper();

  descriptionInput.addEventListener("input", updateDescriptionCounter);

  pinToggleButton.addEventListener("click", () => {
    if (state.isPlacementMode) {
      disablePlacementMode();
      return;
    }

    if (!buildDraftMarking()) {
      return;
    }

    enablePlacementMode();
  });

  togglePinListButton.addEventListener("click", () => {
    state.isListCollapsed = !state.isListCollapsed;
    updateMarkingsListVisibility();
  });

  map.addControl(
    new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true,
    }),
    "bottom-right",
  );

  map.addControl(
    new maplibregl.ScaleControl({
      unit: "metric",
      maxWidth: 120,
    }),
    "bottom-right",
  );

  map.on("load", async () => {
    try {
      applyCampusTwinTheme();
      configureSceneLighting();
      await loadCampusBoundary();
      lockMapToCidadeUniversitaria();
      map.dragRotate.enable();
      map.touchZoomRotate.enable();
      map.touchPitch.enable();
      await waitForMapIdle();
      addCampusWaterEnhancementLayers();
      addCampusRoadEnhancementLayers();
      addCampusWalkwayOverlay();
      addVegetationDepthLayers();
      addFundaoBuildingsTwinLayers();
      addInteractiveBuildingLayers();
      syncDirectionalSunShadows();
      addMarkingsSourceAndLayers();
      addCampusBoundaryLayers();
      bindMapInteractions();
      applyVisualizationMode();
      await loadSeedReports();
    } catch (error) {
      console.error("Falha ao inicializar a cena do campus.", error);
      modeStatus.textContent = "Falha ao inicializar a cena do campus.";
    }
  });

  map.on("moveend", handleMapMoveEnd);
  map.on("rotate", syncDirectionalSunShadows);

  async function loadCampusBoundary() {
    const response = await fetch(CAMPUS_BOUNDARY_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Falha ao carregar fundao.geojson (${response.status})`);
    }

    const featureCollection = await response.json();
    const campusBoundary = buildCampusBoundary(featureCollection);
    state.campusBoundary = campusBoundary;

    map.addSource(MAP_SOURCE_IDS.campusBoundary, {
      type: "geojson",
      data: campusBoundary.lineFeatureCollection,
    });

    map.addSource(MAP_SOURCE_IDS.campusBoundaryArea, {
      type: "geojson",
      data: campusBoundary.polygonFeature,
    });

    map.addSource(MAP_SOURCE_IDS.campusExteriorMask, {
      type: "geojson",
      data: campusBoundary.maskFeature,
    });
  }

  function waitForMapIdle() {
    return new Promise((resolve) => {
      map.once("idle", resolve);
    });
  }

  function buildCampusBoundary(featureCollection) {
    const lineFeatures = extractCampusBoundaryLineFeatures(featureCollection);
    const boundaryRing = buildCampusBoundaryRing(
      lineFeatures.map((feature) => feature.geometry.coordinates),
    );
    const polygonFeature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [boundaryRing],
      },
    };
    const bounds = getGeometryBounds(polygonFeature.geometry);

    if (!bounds) {
      throw new Error("Nao foi possivel calcular os limites do campus.");
    }

    return {
      lineFeatureCollection: {
        type: "FeatureCollection",
        features: lineFeatures,
      },
      polygonFeature,
      maskFeature: buildCampusExteriorMaskFeature(boundaryRing),
      bounds,
    };
  }

  function extractCampusBoundaryLineFeatures(featureCollection) {
    if (!featureCollection || !Array.isArray(featureCollection.features)) {
      throw new Error("fundao.geojson precisa ser um FeatureCollection valido.");
    }

    const lineFeatures = [];

    featureCollection.features.forEach((feature) => {
      if (feature?.geometry?.type === "LineString") {
        const coordinates = sanitizeLineCoordinates(feature.geometry.coordinates);

        if (coordinates.length >= 2) {
          lineFeatures.push({
            type: "Feature",
            properties: JSON.parse(JSON.stringify(feature.properties ?? {})),
            geometry: {
              type: "LineString",
              coordinates,
            },
          });
        }
      }

      if (feature?.geometry?.type === "MultiLineString") {
        feature.geometry.coordinates.forEach((lineCoordinates) => {
          const coordinates = sanitizeLineCoordinates(lineCoordinates);

          if (coordinates.length >= 2) {
            lineFeatures.push({
              type: "Feature",
              properties: JSON.parse(JSON.stringify(feature.properties ?? {})),
              geometry: {
                type: "LineString",
                coordinates,
              },
            });
          }
        });
      }
    });

    if (!lineFeatures.length) {
      throw new Error("fundao.geojson nao contem LineString utilizavel como fronteira.");
    }

    return lineFeatures;
  }

  function sanitizeLineCoordinates(coordinates) {
    return (coordinates ?? [])
      .map((coordinate) => [Number(coordinate?.[0]), Number(coordinate?.[1])])
      .filter(([lng, lat]) => Number.isFinite(lng) && Number.isFinite(lat));
  }

  function buildCampusBoundaryRing(lineStrings) {
    const pendingSegments = lineStrings
      .map((coordinates) => coordinates.map((coordinate) => coordinate.slice()))
      .filter((coordinates) => coordinates.length >= 2);

    if (!pendingSegments.length) {
      throw new Error("Nao ha segmentos suficientes para montar a fronteira do campus.");
    }

    const boundaryRing = pendingSegments.shift();

    while (pendingSegments.length) {
      const currentEnd = boundaryRing[boundaryRing.length - 1];
      let bestIndex = -1;
      let bestDistance = Infinity;
      let reverseSegment = false;

      pendingSegments.forEach((segment, index) => {
        const distanceToStart = coordinateDistance(currentEnd, segment[0]);
        const distanceToEnd = coordinateDistance(currentEnd, segment[segment.length - 1]);

        if (distanceToStart < bestDistance) {
          bestDistance = distanceToStart;
          bestIndex = index;
          reverseSegment = false;
        }

        if (distanceToEnd < bestDistance) {
          bestDistance = distanceToEnd;
          bestIndex = index;
          reverseSegment = true;
        }
      });

      if (bestIndex === -1 || bestDistance > CAMPUS_BOUNDARY_JOIN_TOLERANCE) {
        throw new Error("Nao foi possivel encadear os segmentos de fundao.geojson.");
      }

      const [segment] = pendingSegments.splice(bestIndex, 1);
      const orderedSegment = reverseSegment ? segment.slice().reverse() : segment;
      appendCoordinateSequence(boundaryRing, orderedSegment);
    }

    const dedupedRing = dedupeSequentialCoordinates(boundaryRing);

    if (dedupedRing.length < 4) {
      throw new Error("A fronteira oficial nao possui vertices suficientes para formar um poligono.");
    }

    if (
      coordinateDistance(dedupedRing[0], dedupedRing[dedupedRing.length - 1]) >
      CAMPUS_BOUNDARY_JOIN_TOLERANCE
    ) {
      throw new Error("A fronteira oficial nao fecha um anel utilizavel para o campus.");
    }

    dedupedRing[dedupedRing.length - 1] = dedupedRing[0].slice();
    return dedupedRing;
  }

  function appendCoordinateSequence(target, sequence) {
    sequence.forEach((coordinate, index) => {
      if (index === 0 && coordinatesAlmostEqual(target[target.length - 1], coordinate)) {
        return;
      }

      target.push(coordinate.slice());
    });
  }

  function dedupeSequentialCoordinates(coordinates) {
    return coordinates.reduce((result, coordinate) => {
      if (!result.length || !coordinatesAlmostEqual(result[result.length - 1], coordinate)) {
        result.push(coordinate.slice());
      }

      return result;
    }, []);
  }

  function coordinatesAlmostEqual(a, b) {
    return coordinateDistance(a, b) <= CAMPUS_BOUNDARY_JOIN_TOLERANCE;
  }

  function coordinateDistance(a, b) {
    return Math.hypot((a?.[0] ?? 0) - (b?.[0] ?? 0), (a?.[1] ?? 0) - (b?.[1] ?? 0));
  }

  function buildCampusExteriorMaskFeature(boundaryRing) {
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [CAMPUS_MASK_OUTER_RING, boundaryRing.slice().reverse()],
      },
    };
  }

  function populateCategorySelect() {
    categorySelect.innerHTML = CATEGORIES.map(
      (category) => `<option value="${category.id}">${category.label}</option>`,
    ).join("");
  }

  function renderModeButtons() {
    modeSwitcher.innerHTML = "";

    VISUALIZATION_MODES.forEach((mode) => {
      const button = document.createElement("button");
      button.className = "mode-button";
      button.type = "button";
      button.textContent = mode.label;
      button.dataset.mode = mode.id;
      button.setAttribute("aria-pressed", String(state.visualizationMode === mode.id));
      button.addEventListener("click", () => {
        setVisualizationMode(mode.id);
      });
      modeSwitcher.appendChild(button);
    });

    updateModeButtons();
  }

  function renderCategoryFilters() {
    const counts = getCategoryCounts();
    categoryFilters.innerHTML = "";

    const filterItems = [
      {
        id: ALL_CATEGORIES_FILTER,
        label: "Todas",
        count: state.markings.length,
      },
      ...CATEGORIES.map((category) => ({
        id: category.id,
        label: category.label,
        count: counts.get(category.id) ?? 0,
        color: category.color,
      })),
    ];

    filterItems.forEach((item) => {
      const button = document.createElement("button");
      button.className = "filter-chip";
      button.type = "button";
      button.dataset.filter = item.id;
      button.setAttribute(
        "aria-pressed",
        String(state.activeCategoryFilter === item.id),
      );
      button.classList.toggle("is-active", state.activeCategoryFilter === item.id);

      if (item.color) {
        button.style.setProperty("--chip-color", item.color);
      }

      const label = document.createElement("span");
      label.className = "filter-chip-label";
      label.textContent = item.label;

      const count = document.createElement("span");
      count.className = "filter-chip-count";
      count.textContent = String(item.count);

      button.append(label, count);
      button.addEventListener("click", () => {
        setActiveCategoryFilter(item.id);
      });

      categoryFilters.appendChild(button);
    });
  }

  function renderCategoryLegend() {
    const counts = getCategoryCounts();
    categoryLegend.innerHTML = "";

    CATEGORIES.forEach((category) => {
      const item = document.createElement("li");
      item.className = "legend-item";

      const label = document.createElement("span");
      label.className = "legend-label";
      label.innerHTML = `
        <span class="legend-swatch" style="background:${category.color}"></span>
        ${escapeHtml(category.label)}
      `;

      const count = document.createElement("span");
      count.className = "legend-count";
      count.textContent = String(counts.get(category.id) ?? 0);

      item.append(label, count);
      categoryLegend.appendChild(item);
    });
  }

  function bindMapInteractions() {
    map.on("click", handleMapClick);
    map.on("mousemove", handleMapPointerMove);
    map.on("mouseout", () => {
      if (!state.isPlacementMode) {
        clearHoveredBuilding();
      }
      syncCursor();
    });
  }

  function handleMapClick(event) {
    const clickCoordinates = [event.lngLat.lng, event.lngLat.lat];

    if (!isPointInCampusArea(clickCoordinates)) {
      if (state.isPlacementMode) {
        modeStatus.textContent =
          "Fora do limite oficial da Cidade Universitaria. Clique dentro do contorno do Fundao.";
        syncCursor("not-allowed");
      }

      clearHoveredBuilding();
      return;
    }

    if (state.isPlacementMode) {
      handleMapPlacement(event);
      return;
    }

    const markingFeature = getMarkingFeatureAtPoint(event.point);

    if (markingFeature) {
      clearHoveredBuilding();
      showPopupForMarking(markingFeature);
      clearSelectedBuilding();
      return;
    }

    const buildingFeature = getBuildingFeatureAtPoint(event.point);

    if (buildingFeature) {
      clearHoveredBuilding();
      selectBuilding(buildingFeature);
      return;
    }

    clearHoveredBuilding();
    clearSelectedBuilding();
    closeActivePopup();
  }

  function handleMapPointerMove(event) {
    const pointerCoordinates = [event.lngLat.lng, event.lngLat.lat];

    if (!isPointInCampusArea(pointerCoordinates)) {
      clearHoveredBuilding();
      syncCursor(state.isPlacementMode ? "not-allowed" : "");
      return;
    }

    if (state.isPlacementMode) {
      clearHoveredBuilding();
      syncCursor("crosshair");
      return;
    }

    const markingFeature = getMarkingFeatureAtPoint(event.point);

    if (markingFeature) {
      clearHoveredBuilding();
      syncCursor("pointer");
      return;
    }

    const buildingFeature = getBuildingFeatureAtPoint(event.point);

    if (buildingFeature) {
      setHoveredBuilding(buildingFeature);
      syncCursor("pointer");
      return;
    }

    clearHoveredBuilding();
    syncCursor("");
  }

  function handleMapPlacement(event) {
    const draftMarking = buildDraftMarking();

    if (!draftMarking) {
      disablePlacementMode();
      return;
    }

    const coordinates = [event.lngLat.lng, event.lngLat.lat];

    if (!isPointInCampusArea(coordinates)) {
      modeStatus.textContent =
        "Fora do limite oficial da Cidade Universitaria. Escolha um ponto dentro do contorno.";
      syncCursor("not-allowed");
      return;
    }

    const feature = {
      type: "Feature",
      properties: {
        id: String(state.nextId),
        title: `Nova ocorrencia de ${draftMarking.category.label}`,
        categoryId: draftMarking.category.id,
        categoryLabel: draftMarking.category.label,
        color: draftMarking.category.color,
        description: draftMarking.description,
        locationName: "Registro manual",
        status: "Novo",
        severity: "Media",
        reportedAt: new Date().toISOString().slice(0, 10),
      },
      geometry: {
        type: "Point",
        coordinates,
      },
    };

    state.nextId += 1;
    state.markings.unshift(feature);

    syncMarkingsSource();
    renderCategoryFilters();
    renderCategoryLegend();
    renderMarkingsList();
    applyVisualizationMode();
    showPopupForMarking(feature);
    resetDraft();
    disablePlacementMode();
  }

  function addMarkingsSourceAndLayers() {
    map.addSource(MAP_SOURCE_IDS.markings, {
      type: "geojson",
      data: buildMarkingsFeatureCollection(),
    });

    addCategoryDensityLayers();
    addGeneralHeatmapLayer();
    addMarkingPinLayers();
  }

  function addCategoryDensityLayers() {
    const groundAnchorId = getGroundOverlayAnchorId();

    CATEGORIES.forEach((category) => {
      map.addLayer(
        {
          id: getCategoryDensityLayerId(category.id),
          type: "heatmap",
          source: MAP_SOURCE_IDS.markings,
          filter: ["==", ["get", "categoryId"], category.id],
          maxzoom: 18,
          paint: {
            "heatmap-weight": 1,
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              14,
              0.95,
              17,
              1.95,
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              14,
              20,
              17,
              42,
            ],
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              14,
              0.56,
              18,
              0.34,
            ],
            "heatmap-color": buildCategoryHeatmapColorExpression(category.color),
          },
        },
        groundAnchorId,
      );
    });
  }

  function addGeneralHeatmapLayer() {
    map.addLayer(
      {
        id: LAYER_IDS.generalHeatmap,
        type: "heatmap",
        source: MAP_SOURCE_IDS.markings,
        maxzoom: 18,
        paint: {
          "heatmap-weight": 1,
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14,
            0.82,
            17,
            1.92,
          ],
          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14,
            24,
            17,
            46,
          ],
          "heatmap-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14,
            0.62,
            18,
            0.36,
          ],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(42, 92, 126, 0)",
            0.2,
            "rgba(52, 110, 154, 0.24)",
            0.42,
            "rgba(75, 153, 183, 0.34)",
            0.64,
            "rgba(228, 183, 92, 0.52)",
            0.84,
            "rgba(223, 124, 72, 0.72)",
            1,
            "rgba(197, 68, 59, 0.84)",
          ],
        },
      },
      getGroundOverlayAnchorId(),
    );
  }

  function addMarkingPinLayers() {
    map.addLayer({
      id: LAYER_IDS.markingsPulse,
      type: "circle",
      source: MAP_SOURCE_IDS.markings,
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          12,
          17,
          20,
        ],
        "circle-color": [
          "match",
          ["get", "categoryId"],
          ...buildCategoryColorMatchExpression(0.18),
          "rgba(76, 94, 112, 0.18)",
        ],
        "circle-blur": 0.55,
        "circle-opacity": 0.95,
      },
    });

    map.addLayer({
      id: LAYER_IDS.markingsHalo,
      type: "circle",
      source: MAP_SOURCE_IDS.markings,
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          8.8,
          17,
          11.5,
        ],
        "circle-color": "rgba(7, 14, 22, 0.56)",
        "circle-stroke-color": "rgba(214, 230, 240, 0.16)",
        "circle-stroke-width": 1.2,
        "circle-opacity": 0.96,
      },
    });

    map.addLayer({
      id: LAYER_IDS.markings,
      type: "circle",
      source: MAP_SOURCE_IDS.markings,
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14,
          5.5,
          17,
          7,
        ],
        "circle-color": [
          "match",
          ["get", "categoryId"],
          ...buildCategoryColorMatchExpression(1),
          "#4b5563",
        ],
        "circle-stroke-color": "#f5fbff",
        "circle-stroke-width": 2,
        "circle-opacity": 1,
      },
    });
  }

  function addInteractiveBuildingLayers() {
    map.addSource(MAP_SOURCE_IDS.buildingHover, {
      type: "geojson",
      data: EMPTY_FEATURE_COLLECTION,
    });

    map.addSource(MAP_SOURCE_IDS.buildingSelection, {
      type: "geojson",
      data: EMPTY_FEATURE_COLLECTION,
    });

    map.addLayer({
      id: LAYER_IDS.buildingHover,
      type: "fill-extrusion",
      source: MAP_SOURCE_IDS.buildingHover,
      minzoom: 14.2,
      paint: {
        "fill-extrusion-color": SCENE_THEME.buildingHover,
        "fill-extrusion-height": ["+", getBuildingHeightExpression(), 0.8],
        "fill-extrusion-base": getBuildingBaseExpression(),
        "fill-extrusion-opacity": 0.18,
        "fill-extrusion-vertical-gradient": false,
      },
    });

    map.addLayer({
      id: LAYER_IDS.buildingHoverOutline,
      type: "line",
      source: MAP_SOURCE_IDS.buildingHover,
      minzoom: 14.2,
      paint: {
        "line-color": "rgba(239, 250, 255, 0.88)",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14.2,
          0.6,
          18,
          1.6,
        ],
        "line-opacity": 0.82,
      },
    });

    map.addLayer({
      id: LAYER_IDS.buildingSelection,
      type: "fill-extrusion",
      source: MAP_SOURCE_IDS.buildingSelection,
      minzoom: 14.2,
      paint: {
        "fill-extrusion-color": SCENE_THEME.buildingSelection,
        "fill-extrusion-height": ["+", getBuildingHeightExpression(), 1.2],
        "fill-extrusion-base": getBuildingBaseExpression(),
        "fill-extrusion-opacity": 0.28,
        "fill-extrusion-vertical-gradient": false,
      },
    });

    map.addLayer({
      id: LAYER_IDS.buildingSelectionOutline,
      type: "line",
      source: MAP_SOURCE_IDS.buildingSelection,
      minzoom: 14.2,
      paint: {
        "line-color": "#ffffff",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14.2,
          1,
          18,
          2.2,
        ],
        "line-opacity": 0.94,
      },
    });
  }

  function applyVisualizationMode() {
    const isBaseMode = state.visualizationMode === "base";
    const isAnalyticsMode = state.visualizationMode === "analytics";
    const hasSpecificCategory = state.activeCategoryFilter !== ALL_CATEGORIES_FILTER;
    const layerFilter = buildCategoryLayerFilter();

    MARKING_LAYER_IDS.forEach((layerId) => {
      setLayerVisibility(layerId, !isBaseMode);
      setLayerFilter(layerId, layerFilter);
    });

    setLayerVisibility(
      LAYER_IDS.generalHeatmap,
      isAnalyticsMode && !hasSpecificCategory,
    );
    setLayerFilter(LAYER_IDS.generalHeatmap, layerFilter);

    CATEGORIES.forEach((category) => {
      const isVisible =
        isAnalyticsMode &&
        hasSpecificCategory &&
        state.activeCategoryFilter === category.id;
      setLayerVisibility(getCategoryDensityLayerId(category.id), isVisible);
    });

    updateModeButtons();
    updateVisualizationHelper();
    renderCategoryFilters();
    renderMarkingsList();
    syncCursor();
  }

  function setVisualizationMode(modeId) {
    if (!modeById.has(modeId) || state.visualizationMode === modeId) {
      return;
    }

    state.visualizationMode = modeId;
    applyVisualizationMode();

    if (modeId === "base") {
      moveCameraToCampus(900);
      return;
    }

    if (state.activeCategoryFilter !== ALL_CATEGORIES_FILTER) {
      focusOnMarkings(getFilteredMarkings(), 900);
    }
  }

  function setActiveCategoryFilter(filterId) {
    if (
      filterId !== ALL_CATEGORIES_FILTER &&
      !categoryById.has(filterId)
    ) {
      return;
    }

    if (state.activeCategoryFilter === filterId) {
      return;
    }

    state.activeCategoryFilter = filterId;
    applyVisualizationMode();

    if (state.visualizationMode !== "base") {
      focusOnMarkings(getFilteredMarkings(), 880);
    }
  }

  function setLayerVisibility(layerId, isVisible) {
    if (!map.getLayer(layerId)) {
      return;
    }

    map.setLayoutProperty(layerId, "visibility", isVisible ? "visible" : "none");
  }

  function setLayerFilter(layerId, filter) {
    if (!map.getLayer(layerId)) {
      return;
    }

    map.setFilter(layerId, filter);
  }

  function buildCategoryLayerFilter() {
    if (state.activeCategoryFilter === ALL_CATEGORIES_FILTER) {
      return null;
    }

    return ["==", ["get", "categoryId"], state.activeCategoryFilter];
  }

  function updateModeButtons() {
    Array.from(modeSwitcher.querySelectorAll("[data-mode]")).forEach((button) => {
      const isActive = button.dataset.mode === state.visualizationMode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function updateVisualizationHelper() {
    const mode = modeById.get(state.visualizationMode);
    const categoryLabel =
      state.activeCategoryFilter === ALL_CATEGORIES_FILTER
        ? "todas as categorias"
        : categoryById.get(state.activeCategoryFilter)?.label ?? "categoria ativa";

    visualizationHelper.textContent = `${mode?.helper ?? ""} Filtro atual: ${categoryLabel}.`;
  }

  function lockMapToCidadeUniversitaria() {
    moveCameraToCampus(0);
  }

  function getCampusBoundaryBounds() {
    return state.campusBoundary?.bounds ?? null;
  }

  function getCampusBoundaryGeometry() {
    return state.campusBoundary?.polygonFeature?.geometry ?? null;
  }

  function getCampusSoftFocusBounds() {
    const campusBounds = getCampusBoundaryBounds();

    if (!campusBounds) {
      return null;
    }

    return expandLngLatBoundsByMeters(
      campusBounds,
      CAMERA_SOFT_RECENTER.leashPaddingMeters,
    );
  }

  function getCampusWaterContextBounds() {
    const campusBounds = getCampusBoundaryBounds();

    if (!campusBounds) {
      return null;
    }

    return expandLngLatBoundsByMeters(campusBounds, WATER_CONTEXT_PADDING_METERS);
  }

  function moveCameraToCampus(duration) {
    const campusBounds = getCampusBoundaryBounds();

    if (!campusBounds) {
      return;
    }

    const camera = map.cameraForBounds(campusBounds, {
      pitch: DEFAULT_CAMERA.pitch,
      bearing: DEFAULT_CAMERA.bearing,
      padding: getMapPadding(),
      maxZoom: DEFAULT_CAMERA.maxZoom,
    });

    if (!camera) {
      return;
    }

    const options = {
      center: camera.center,
      zoom: DEFAULT_CAMERA.maxZoom,
      pitch: DEFAULT_CAMERA.pitch,
      bearing: DEFAULT_CAMERA.bearing,
    };

    if (duration === 0) {
      map.jumpTo(options);
      return;
    }

    map.easeTo({
      ...options,
      duration,
      essential: true,
    });
  }

  function handleMapMoveEnd() {
    syncDirectionalSunShadows();
    refreshCampusWaterSource();
    refreshCampusRoadSource();
    refreshBuildingTwinSources();
    refreshTreeVolumeSource();

    if (state.isSoftRecenteringCamera) {
      state.isSoftRecenteringCamera = false;
      return;
    }

    softlyRecenterCameraToCampus();
  }

  function softlyRecenterCameraToCampus() {
    const softBounds = getCampusSoftFocusBounds();

    if (!softBounds) {
      return;
    }

    const center = map.getCenter();
    const currentCenter = [center.lng, center.lat];

    if (isPointWithinBounds(currentCenter, softBounds)) {
      return;
    }

    const targetCenter = [
      clampNumber(currentCenter[0], softBounds.west, softBounds.east),
      clampNumber(currentCenter[1], softBounds.south, softBounds.north),
    ];

    if (
      haversineDistanceMeters(currentCenter, targetCenter) <
      CAMERA_SOFT_RECENTER.minCorrectionMeters
    ) {
      return;
    }

    state.isSoftRecenteringCamera = true;
    map.easeTo({
      center: targetCenter,
      zoom: map.getZoom(),
      pitch: map.getPitch(),
      bearing: map.getBearing(),
      duration: CAMERA_SOFT_RECENTER.duration,
      easing: (t) => 1 - (1 - t) ** 2.4,
      essential: true,
    });
  }

  function getMapPadding() {
    const sidebarRect = sidebar.getBoundingClientRect();
    const isCompactLayout = window.innerWidth <= 920;
    const basePadding = isCompactLayout ? 16 : 26;

    if (isCompactLayout) {
      return {
        top: Math.round(sidebarRect.height + 20),
        right: basePadding,
        bottom: 24,
        left: basePadding,
      };
    }

    return {
      top: basePadding,
      right: 24,
      bottom: 24,
      left: Math.round(sidebarRect.width + 34),
    };
  }

  function focusOnMarkings(markings, duration) {
    if (!markings.length) {
      return;
    }

    if (markings.length === 1) {
      map.easeTo({
        center: markings[0].geometry.coordinates,
        zoom: Math.max(map.getZoom(), 16.3),
        pitch: FOCUS_CAMERA.pitch,
        bearing: FOCUS_CAMERA.bearing,
        duration,
        essential: true,
      });
      return;
    }

    const bounds = new maplibregl.LngLatBounds();
    markings.forEach((marking) => {
      bounds.extend(marking.geometry.coordinates);
    });

    map.fitBounds(bounds, {
      padding: getMapPadding(),
      maxZoom: 16.65,
      duration,
      pitch: FOCUS_CAMERA.pitch,
      bearing: FOCUS_CAMERA.bearing,
      essential: true,
    });
  }

  function focusOnGeometry(geometry, duration) {
    const bounds = getGeometryBounds(geometry);

    if (!bounds) {
      return;
    }

    map.fitBounds(bounds, {
      padding: getMapPadding(),
      maxZoom: FOCUS_CAMERA.maxZoom,
      duration,
      pitch: FOCUS_CAMERA.pitch,
      bearing: FOCUS_CAMERA.bearing,
      essential: true,
    });
  }

  function syncCursor(forcedCursor) {
    if (forcedCursor !== undefined) {
      map.getCanvas().style.cursor = forcedCursor;
      return;
    }

    if (state.isPlacementMode) {
      map.getCanvas().style.cursor = "crosshair";
      return;
    }

    map.getCanvas().style.cursor = "";
  }

  function addCampusBoundaryLayers() {
    if (!state.campusBoundary) {
      return;
    }

    if (!map.getLayer(LAYER_IDS.campusExteriorMask)) {
      map.addLayer({
        id: LAYER_IDS.campusExteriorMask,
        type: "fill",
        source: MAP_SOURCE_IDS.campusExteriorMask,
        paint: {
          "fill-color": "#e8ece7",
          "fill-opacity": 0.46,
        },
      });
    }

    if (!map.getLayer(LAYER_IDS.campusBoundaryOutline)) {
      map.addLayer({
        id: LAYER_IDS.campusBoundaryOutline,
        type: "line",
        source: MAP_SOURCE_IDS.campusBoundary,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "rgba(86, 101, 92, 0.9)",
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            13,
            1.2,
            16,
            2.2,
            18,
            3.2,
          ],
          "line-opacity": 0.88,
        },
      });
    }
  }

  function buildCampusConstrainedFilter(filter) {
    const campusGeometry = state.campusBoundary?.polygonFeature?.geometry;

    if (!campusGeometry) {
      return filter ?? null;
    }

    if (!filter) {
      return ["within", campusGeometry];
    }

    return ["all", filter, ["within", campusGeometry]];
  }

  function buildCampusContextFilter(filter) {
    const campusGeometry = state.campusBoundary?.polygonFeature?.geometry;

    if (!campusGeometry) {
      return filter ?? null;
    }

    if (!filter) {
      return ["!", ["within", campusGeometry]];
    }

    return ["all", filter, ["!", ["within", campusGeometry]]];
  }

  function applyCampusTwinTheme() {
    const style = map.getStyle();

    style.layers.forEach((layer) => {
      if (!map.getLayer(layer.id)) {
        return;
      }

      if (layer.type === "background") {
        map.setPaintProperty(layer.id, "background-color", SCENE_THEME.surfaceBackdrop);
        return;
      }

      if (shouldHideBaseLayer(layer)) {
        map.setLayoutProperty(layer.id, "visibility", "none");
        return;
      }

      if (layer.type === "fill") {
        tuneFillLayer(layer);
        return;
      }

      if (layer.type === "line") {
        tuneLineLayer(layer);
      }
    });
  }

  function shouldHideBaseLayer(layer) {
    const layerId = layer.id.toLowerCase();
    const sourceLayer = String(layer["source-layer"] ?? "").toLowerCase();

    if (layerId.startsWith("campus-") || layerId.startsWith("fundao-")) {
      return false;
    }

    if (layer.type === "symbol") {
      return true;
    }

    if (sourceLayer === "building" || layerId.startsWith("building")) {
      return true;
    }

    if (
      layerId.includes("boundary") ||
      layerId.includes("railway") ||
      layerId.includes("ferry") ||
      layerId.includes("aeroway") ||
      layerId.includes("cablecar")
    ) {
      return true;
    }

    return layer.type === "line" && layerId.includes("path");
  }

  function getFeatureVariationSeedExpression() {
    return [
      "to-number",
      ["id"],
      ["get", "osm_id"],
      ["length", ["coalesce", ["get", "name"], ["get", "class"], ["get", "subclass"], ""]],
      0,
    ];
  }

  function buildSubtleFeatureColorExpression(
    baseColor,
    {
      hueShiftDegrees = 2,
      saturationDelta = 0.03,
      lightnessDelta = 0.06,
    } = {},
  ) {
    const variants = [
      adjustHexColor(baseColor, {
        hueShiftDegrees: -hueShiftDegrees,
        saturationDelta: -saturationDelta * 0.8,
        lightnessDelta: -lightnessDelta,
      }),
      adjustHexColor(baseColor, {
        hueShiftDegrees: -hueShiftDegrees * 0.42,
        saturationDelta: -saturationDelta * 0.18,
        lightnessDelta: -lightnessDelta * 0.34,
      }),
      adjustHexColor(baseColor, {
        hueShiftDegrees: hueShiftDegrees * 0.26,
        saturationDelta: saturationDelta * 0.2,
        lightnessDelta: lightnessDelta * 0.12,
      }),
      adjustHexColor(baseColor, {
        hueShiftDegrees: hueShiftDegrees,
        saturationDelta,
        lightnessDelta: lightnessDelta * 0.84,
      }),
    ];

    return [
      "match",
      ["%", getFeatureVariationSeedExpression(), variants.length],
      0,
      variants[0],
      1,
      variants[1],
      2,
      variants[2],
      3,
      variants[3],
      baseColor,
    ];
  }

  function tuneFillLayer(layer) {
    const layerId = layer.id.toLowerCase();
    const sourceLayer = String(layer["source-layer"] ?? "").toLowerCase();

    if (sourceLayer === "water") {
      map.setPaintProperty(
        layer.id,
        "fill-color",
        layerId.includes("intermittent") ? SCENE_THEME.waterSoft : SCENE_THEME.waterBase,
      );
      map.setPaintProperty(layer.id, "fill-outline-color", SCENE_THEME.waterEdge);
      map.setPaintProperty(layer.id, "fill-opacity", layerId.includes("intermittent") ? 0.74 : 0.96);
      return;
    }

    if (
      sourceLayer === "park" ||
      layerId.includes("park") ||
      layerId.includes("grass") ||
      layerId.includes("wood")
    ) {
      const greenColor = layerId.includes("wood")
        ? buildSubtleFeatureColorExpression(SCENE_THEME.greenDeep, {
            hueShiftDegrees: 2.2,
            saturationDelta: 0.03,
            lightnessDelta: 0.06,
          })
        : layerId.includes("grass")
          ? buildSubtleFeatureColorExpression(SCENE_THEME.greenBase, {
              hueShiftDegrees: 2.8,
              saturationDelta: 0.04,
              lightnessDelta: 0.08,
            })
          : buildSubtleFeatureColorExpression(SCENE_THEME.greenSoft, {
              hueShiftDegrees: 2.4,
              saturationDelta: 0.03,
              lightnessDelta: 0.07,
            });
      const greenOpacity = layerId.includes("wood") ? 0.52 : 0.92;

      map.setPaintProperty(layer.id, "fill-color", greenColor);
      map.setPaintProperty(layer.id, "fill-opacity", greenOpacity);
      map.setPaintProperty(layer.id, "fill-outline-color", SCENE_THEME.greenEdge);
      return;
    }

    if (sourceLayer === "landuse") {
      const isInstitutionalParcel = layerId.includes("school") || layerId.includes("hospital");
      map.setPaintProperty(
        layer.id,
        "fill-color",
        isInstitutionalParcel ? SCENE_THEME.parcelAccent : SCENE_THEME.surfaceSoft,
      );
      map.setPaintProperty(layer.id, "fill-opacity", isInstitutionalParcel ? 0.22 : 0.18);
      map.setPaintProperty(layer.id, "fill-outline-color", SCENE_THEME.surfaceEdge);
      return;
    }

    if (layerId.includes("highway-area") || layerId.includes("road_area") || layerId.includes("road_pier")) {
      map.setPaintProperty(layer.id, "fill-color", SCENE_THEME.roadMinor);
      map.setPaintProperty(layer.id, "fill-opacity", 0.9);
      map.setPaintProperty(layer.id, "fill-outline-color", SCENE_THEME.roadMinorCasing);
      return;
    }

    map.setPaintProperty(layer.id, "fill-color", SCENE_THEME.surfaceBase);
  }

  function tuneLineLayer(layer) {
    const layerId = layer.id.toLowerCase();
    const sourceLayer = String(layer["source-layer"] ?? "").toLowerCase();

    if (sourceLayer === "waterway" || layerId.includes("waterway")) {
      map.setPaintProperty(layer.id, "line-color", SCENE_THEME.waterEdge);
      map.setPaintProperty(layer.id, "line-opacity", layerId.includes("intermittent") ? 0.56 : 0.84);
      return;
    }

    if (sourceLayer !== "transportation" && !layerId.includes("road_pier")) {
      return;
    }

    const isCasing = layerId.includes("casing");
    const isMajor = /(motorway|primary|secondary|tertiary|trunk|link)/.test(layerId);
    const isMinor = /(minor|service|track)/.test(layerId) || layerId.includes("road_pier");
    const isTunnel = layerId.includes("tunnel");

    if (isMajor) {
      map.setPaintProperty(
        layer.id,
        "line-color",
        isCasing ? SCENE_THEME.roadMajorCasing : SCENE_THEME.roadMajor,
      );
      map.setPaintProperty(layer.id, "line-opacity", isTunnel ? 0.42 : 0.94);
      return;
    }

    if (isMinor) {
      map.setPaintProperty(
        layer.id,
        "line-color",
        isCasing ? SCENE_THEME.roadMinorCasing : SCENE_THEME.roadMinor,
      );
      map.setPaintProperty(layer.id, "line-opacity", isTunnel ? 0.36 : 0.82);
    }
  }

  function configureSceneLighting() {
    if (typeof map.setLight !== "function") {
      return;
    }

    map.setLight({
      anchor: "map",
      color: SUNLIGHT_CONFIG.color,
      intensity: SUNLIGHT_CONFIG.intensity,
      position: [
        SUNLIGHT_CONFIG.radialDistance,
        SUNLIGHT_CONFIG.azimuthDegrees,
        getSunLightPolarAngleDegrees(),
      ],
    });
  }

  function getSunLightPolarAngleDegrees() {
    return clampNumber(90 - SUNLIGHT_CONFIG.altitudeDegrees, 8, 86);
  }

  function getSunShadowBearingDegrees() {
    return (SUNLIGHT_CONFIG.azimuthDegrees + 180) % 360;
  }

  function getSunShadowProfile() {
    const altitudeFactor = clampNumber((60 - SUNLIGHT_CONFIG.altitudeDegrees) / 40, 0.22, 1.1);
    const lengthFactor = interpolateNumber(0.9, 1.18, altitudeFactor);

    return {
      building: {
        far: interpolateNumber(8.6, 11.2, SUNLIGHT_CONFIG.softness) * lengthFactor,
        mid: interpolateNumber(5.2, 7.1, SUNLIGHT_CONFIG.softness) * lengthFactor,
        near: interpolateNumber(2.9, 4.2, SUNLIGHT_CONFIG.softness) * lengthFactor,
        contact: interpolateNumber(1, 1.65, SUNLIGHT_CONFIG.softness) * lengthFactor,
      },
      tree: {
        soft: interpolateNumber(4.3, 6.6, SUNLIGHT_CONFIG.softness) * lengthFactor,
        core: interpolateNumber(2.6, 4.3, SUNLIGHT_CONFIG.softness) * lengthFactor,
      },
    };
  }

  function getDirectionalShadowTranslate(distance) {
    const viewportBearing = (getSunShadowBearingDegrees() - map.getBearing() + 360) % 360;
    const radians = (viewportBearing * Math.PI) / 180;

    return [
      roundNumber(Math.sin(radians) * distance, 2),
      roundNumber(-Math.cos(radians) * distance, 2),
    ];
  }

  function syncDirectionalSunShadows() {
    if (!map || typeof map.getBearing !== "function") {
      return;
    }

    const shadowProfile = getSunShadowProfile();
    const fillLayerTranslations = [
      [LAYER_IDS.buildingShadowFar, getDirectionalShadowTranslate(shadowProfile.building.far)],
      [LAYER_IDS.buildingShadowMid, getDirectionalShadowTranslate(shadowProfile.building.mid)],
      [LAYER_IDS.buildingShadowNear, getDirectionalShadowTranslate(shadowProfile.building.near)],
      [LAYER_IDS.buildingShadowContact, getDirectionalShadowTranslate(shadowProfile.building.contact)],
      [LAYER_IDS.treeShadows, getDirectionalShadowTranslate(shadowProfile.tree.soft)],
      [LAYER_IDS.treeShadowCore, getDirectionalShadowTranslate(shadowProfile.tree.core)],
    ];

    fillLayerTranslations.forEach(([layerId, translate]) => {
      if (!map.getLayer(layerId)) {
        return;
      }

      map.setPaintProperty(layerId, "fill-translate", translate);
      map.setPaintProperty(layerId, "fill-translate-anchor", "viewport");
    });
  }

  function addCampusWalkwayOverlay() {
    const transportationReference = getSourceReference("transportation");

    if (!transportationReference || map.getLayer(LAYER_IDS.walkways)) {
      return;
    }

    map.addLayer(
      {
        id: LAYER_IDS.walkways,
        type: "line",
        source: transportationReference.source,
        "source-layer": transportationReference.sourceLayer,
        minzoom: 14.1,
        filter: buildCampusConstrainedFilter([
          "all",
          ["match", ["geometry-type"], ["LineString", "MultiLineString"], true, false],
          ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
          [
            "any",
            ["==", ["get", "class"], "path"],
            [
              "match",
              ["get", "subclass"],
              ["footway", "path", "pedestrian", "cycleway"],
              true,
              false,
            ],
          ],
        ]),
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": SCENE_THEME.walkway,
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14.1,
            0.42,
            17,
            0.74,
          ],
          "line-dasharray": [1.3, 1.15],
          "line-width": [
            "interpolate",
            ["exponential", 1.2],
            ["zoom"],
            14.1,
            0.9,
            17,
            2.4,
            19,
            3.9,
          ],
        },
      },
      getLabelAnchorLayerId(),
    );
  }

  function addCampusWaterEnhancementLayers() {
    const waterReference = getSourceReference("water");

    if (!waterReference) {
      return;
    }

    ensureCampusWaterSource();
    ensureWaterPatternImages();
    refreshCampusWaterSource(waterReference);

    const anchorLayerId = getLabelAnchorLayerId();

    if (!map.getLayer(LAYER_IDS.waterBase)) {
      map.addLayer(
        {
          id: LAYER_IDS.waterBase,
          type: "fill",
          source: MAP_SOURCE_IDS.campusWater,
          minzoom: 13.3,
          paint: {
            "fill-color": getWaterZoneExpression(SCENE_THEME.waterInner, SCENE_THEME.waterBay),
            "fill-opacity": 0.95,
            "fill-outline-color": SCENE_THEME.waterEdge,
          },
        },
        anchorLayerId,
      );
    }

    if (!map.getLayer(LAYER_IDS.waterDepth)) {
      map.addLayer(
        {
          id: LAYER_IDS.waterDepth,
          type: "fill",
          source: MAP_SOURCE_IDS.campusWater,
          minzoom: 13.3,
          paint: {
            "fill-color": getWaterZoneExpression(SCENE_THEME.waterInnerDeep, SCENE_THEME.waterBayDeep),
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.3,
              getWaterZoneExpression(0.08, 0.16),
              18,
              getWaterZoneExpression(0.12, 0.22),
            ],
            "fill-translate": [0, 2.8],
            "fill-translate-anchor": "viewport",
          },
        },
        anchorLayerId,
      );
    }

    if (!map.getLayer(LAYER_IDS.waterWaves)) {
      map.addLayer(
        {
          id: LAYER_IDS.waterWaves,
          type: "fill",
          source: MAP_SOURCE_IDS.campusWater,
          minzoom: 13.3,
          paint: {
            "fill-pattern": WATER_WAVE_TEXTURE_IMAGE_ID,
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.3,
              getWaterZoneExpression(0.22, 0.28),
              18,
              getWaterZoneExpression(0.28, 0.36),
            ],
          },
        },
        anchorLayerId,
      );
    }

    if (!map.getLayer(LAYER_IDS.waterReflection)) {
      map.addLayer(
        {
          id: LAYER_IDS.waterReflection,
          type: "fill",
          source: MAP_SOURCE_IDS.campusWater,
          minzoom: 13.35,
          paint: {
            "fill-pattern": WATER_REFLECTION_IMAGE_ID,
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.35,
              getWaterZoneExpression(0.12, 0.18),
              18,
              getWaterZoneExpression(0.16, 0.24),
            ],
            "fill-translate": [5.2, -3.8],
            "fill-translate-anchor": "viewport",
          },
        },
        anchorLayerId,
      );
    }
  }

  function ensureCampusWaterSource() {
    if (!map.getSource(MAP_SOURCE_IDS.campusWater)) {
      map.addSource(MAP_SOURCE_IDS.campusWater, {
        type: "geojson",
        data: EMPTY_FEATURE_COLLECTION,
      });
    }
  }

  function refreshCampusWaterSource(waterReference = getSourceReference("water")) {
    const source = map.getSource(MAP_SOURCE_IDS.campusWater);
    const contextBounds = getCampusWaterContextBounds();

    if (!source || !waterReference || !contextBounds) {
      return;
    }

    const features = dedupeFeaturesByGeometry(
      querySourceFeaturesInBounds(waterReference, contextBounds)
        .map(normalizePolygonFeature)
        .filter(Boolean)
        .map(prepareWaterRenderFeature)
        .filter(Boolean),
    );

    source.setData({
      type: "FeatureCollection",
      features,
    });
  }

  function ensureWaterPatternImages() {
    ensureWaterWaveTextureImage();
    ensureWaterReflectionImage();
  }

  function ensureWaterWaveTextureImage() {
    if (map.hasImage(WATER_WAVE_TEXTURE_IMAGE_ID)) {
      return;
    }

    const size = 64;
    const data = new Uint8Array(size * size * 4);
    const highlight = hexToRgb(SCENE_THEME.waterWaveHighlight);
    const shadow = hexToRgb(SCENE_THEME.waterWaveShadow);

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const pixelIndex = (y * size + x) * 4;
        const ridgeA = Math.sin(x * 0.42 + y * 0.15);
        const ridgeB = Math.sin(x * 0.16 - y * 0.36 + 1.2);
        const ridgeC = Math.cos(x * 0.09 + y * 0.48 + 0.7);
        const noise = seededUnitValue(`water-wave:${x}:${y}`) * 0.22 - 0.11;
        const waveField = clampNumber(
          (ridgeA * 0.48 + ridgeB * 0.34 + ridgeC * 0.18 + 1) / 2 + noise,
          0,
          1,
        );
        let color = shadow;
        let alpha = 0;

        if (waveField > 0.66) {
          color = highlight;
          alpha = Math.round(interpolateNumber(14, 64, (waveField - 0.66) / 0.34));
        } else if (waveField < 0.32) {
          color = shadow;
          alpha = Math.round(interpolateNumber(10, 44, (0.32 - waveField) / 0.32));
        }

        data[pixelIndex] = color.red;
        data[pixelIndex + 1] = color.green;
        data[pixelIndex + 2] = color.blue;
        data[pixelIndex + 3] = alpha;
      }
    }

    map.addImage(WATER_WAVE_TEXTURE_IMAGE_ID, {
      width: size,
      height: size,
      data,
    });
  }

  function ensureWaterReflectionImage() {
    if (map.hasImage(WATER_REFLECTION_IMAGE_ID)) {
      return;
    }

    const size = 96;
    const data = new Uint8Array(size * size * 4);
    const reflection = hexToRgb(SCENE_THEME.waterReflection);

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const pixelIndex = (y * size + x) * 4;
        const streak = Math.sin(x * 0.12 + y * 0.54 + 0.4);
        const sweep = Math.sin(x * 0.04 - y * 0.18 + 1.6);
        const breaks = seededUnitValue(`water-reflection:${x}:${y}`);
        const glint = clampNumber((streak * 0.62 + sweep * 0.38 + 1) / 2, 0, 1);
        const shimmer = glint > 0.78 ? (glint - 0.78) / 0.22 : 0;
        const alpha =
          shimmer > 0 && breaks > 0.22
            ? Math.round(interpolateNumber(12, 88, shimmer) * interpolateNumber(0.72, 1, breaks))
            : 0;

        data[pixelIndex] = reflection.red;
        data[pixelIndex + 1] = reflection.green;
        data[pixelIndex + 2] = reflection.blue;
        data[pixelIndex + 3] = alpha;
      }
    }

    map.addImage(WATER_REFLECTION_IMAGE_ID, {
      width: size,
      height: size,
      data,
    });
  }

  function prepareWaterRenderFeature(feature) {
    if (!feature) {
      return null;
    }

    const geometryPoints = flattenGeometryCoordinates(feature.geometry);
    const waterTokens = [
      feature.properties?.class,
      feature.properties?.subclass,
      feature.properties?.natural,
      feature.properties?.water,
      feature.properties?.waterway,
    ]
      .map(slugify)
      .filter(Boolean);

    if (!geometryPoints.length) {
      return null;
    }

    const isBayLikeWater = waterTokens.some((token) =>
      /^(bay|sea|ocean|strait|sound|fjord|estuary|harbour|harbor|river)(-|$)/.test(token),
    );
    const isEnclosedWater = waterTokens.some((token) =>
      /^(lake|pond|reservoir|basin|lagoon)(-|$)/.test(token),
    );
    const isInteriorWater =
      geometryPoints.every((point) => isPointInCampusArea(point)) ||
      (isEnclosedWater && !isBayLikeWater);

    return {
      ...feature,
      properties: {
        ...feature.properties,
        render_water_zone: isInteriorWater ? "interior" : "bay",
      },
    };
  }

  function getWaterZoneExpression(interiorValue, bayValue) {
    return [
      "match",
      ["get", "render_water_zone"],
      "interior",
      interiorValue,
      bayValue,
    ];
  }

  function addCampusRoadEnhancementLayers() {
    const transportationReference = getSourceReference("transportation");

    if (!transportationReference) {
      return;
    }

    ensureCampusRoadSource();
    ensureRoadTextureImage();
    refreshCampusRoadSource(transportationReference);

    const anchorLayerId = getLabelAnchorLayerId();

    if (!map.getLayer(LAYER_IDS.roadAreas)) {
      map.addLayer(
        {
          id: LAYER_IDS.roadAreas,
          type: "fill",
          source: MAP_SOURCE_IDS.campusRoads,
          minzoom: 13.95,
          filter: buildRoadGeometryFilter(["Polygon", "MultiPolygon"]),
          paint: {
            "fill-color": getRoadSurfaceColorExpression(),
            "fill-opacity": [
              "case",
              ["==", ["get", "render_is_bridge"], 1],
              0.88,
              0.94,
            ],
            "fill-outline-color": [
              "match",
              ["get", "render_road_tier"],
              "major",
              SCENE_THEME.roadMajorCasing,
              SCENE_THEME.roadMinorCasing,
            ],
          },
        },
        anchorLayerId,
      );
    }

    if (!map.getLayer(LAYER_IDS.roadAreaTexture)) {
      map.addLayer(
        {
          id: LAYER_IDS.roadAreaTexture,
          type: "fill",
          source: MAP_SOURCE_IDS.campusRoads,
          minzoom: 13.95,
          filter: buildRoadGeometryFilter(["Polygon", "MultiPolygon"]),
          paint: {
            "fill-pattern": ROAD_TEXTURE_IMAGE_ID,
            "fill-opacity": [
              "case",
              ["==", ["get", "render_is_bridge"], 1],
              0.18,
              0.28,
            ],
          },
        },
        anchorLayerId,
      );
    }

    if (!map.getLayer(LAYER_IDS.roadShadows)) {
      map.addLayer(
        {
          id: LAYER_IDS.roadShadows,
          type: "line",
          source: MAP_SOURCE_IDS.campusRoads,
          minzoom: 13.95,
          filter: buildRoadGeometryFilter(["LineString", "MultiLineString"]),
          layout: {
            "line-cap": "round",
            "line-join": "round",
            "line-sort-key": ["coalesce", ["get", "render_sort_key"], 0],
          },
          paint: {
            "line-color": SCENE_THEME.roadEdgeShadow,
            "line-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.95,
              0.16,
              18,
              0.26,
            ],
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.95,
              0.72,
              18,
              1.45,
            ],
            "line-gap-width": getRoadSurfaceWidthExpression(),
            "line-blur": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.95,
              0.78,
              18,
              1.38,
            ],
            "line-translate": [0.42, 0.88],
            "line-translate-anchor": "viewport",
          },
        },
        anchorLayerId,
      );
    }

    if (!map.getLayer(LAYER_IDS.roadSurfaces)) {
      map.addLayer(
        {
          id: LAYER_IDS.roadSurfaces,
          type: "line",
          source: MAP_SOURCE_IDS.campusRoads,
          minzoom: 13.95,
          filter: buildRoadGeometryFilter(["LineString", "MultiLineString"]),
          layout: {
            "line-cap": "round",
            "line-join": "round",
            "line-sort-key": ["coalesce", ["get", "render_sort_key"], 0],
          },
          paint: {
            "line-color": getRoadSurfaceColorExpression(),
            "line-opacity": [
              "case",
              ["==", ["get", "render_is_bridge"], 1],
              0.9,
              0.96,
            ],
            "line-width": getRoadSurfaceWidthExpression(),
          },
        },
        anchorLayerId,
      );
    }

    if (!map.getLayer(LAYER_IDS.roadTexture)) {
      map.addLayer(
        {
          id: LAYER_IDS.roadTexture,
          type: "line",
          source: MAP_SOURCE_IDS.campusRoads,
          minzoom: 13.95,
          filter: buildRoadGeometryFilter(["LineString", "MultiLineString"]),
          layout: {
            "line-cap": "round",
            "line-join": "round",
            "line-sort-key": ["coalesce", ["get", "render_sort_key"], 0],
          },
          paint: {
            "line-pattern": ROAD_TEXTURE_IMAGE_ID,
            "line-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.95,
              0.34,
              18,
              0.52,
            ],
            "line-width": getRoadSurfaceWidthExpression(),
          },
        },
        anchorLayerId,
      );
    }

    if (!map.getLayer(LAYER_IDS.roadLaneEdges)) {
      map.addLayer(
        {
          id: LAYER_IDS.roadLaneEdges,
          type: "line",
          source: MAP_SOURCE_IDS.campusRoads,
          minzoom: 15.05,
          filter: [
            "all",
            buildRoadGeometryFilter(["LineString", "MultiLineString"]),
            ["==", ["get", "render_edge_markings"], 1],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
            "line-sort-key": ["coalesce", ["get", "render_sort_key"], 0],
          },
          paint: {
            "line-color": hexToRgba(SCENE_THEME.roadLaneMarking, 0.76),
            "line-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15.05,
              0.28,
              18,
              0.64,
            ],
            "line-width": getRoadLaneEdgeWidthExpression(),
            "line-gap-width": getRoadLaneEdgeGapWidthExpression(),
            "line-blur": 0.18,
          },
        },
        anchorLayerId,
      );
    }

    if (!map.getLayer(LAYER_IDS.roadLaneCenters)) {
      map.addLayer(
        {
          id: LAYER_IDS.roadLaneCenters,
          type: "line",
          source: MAP_SOURCE_IDS.campusRoads,
          minzoom: 15.05,
          filter: [
            "all",
            buildRoadGeometryFilter(["LineString", "MultiLineString"]),
            ["==", ["get", "render_lane_markings"], 1],
          ],
          layout: {
            "line-cap": "butt",
            "line-join": "round",
            "line-sort-key": ["coalesce", ["get", "render_sort_key"], 0],
          },
          paint: {
            "line-color": hexToRgba(SCENE_THEME.roadLaneMarking, 0.96),
            "line-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15.05,
              0.34,
              18,
              0.78,
            ],
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15.05,
              0.9,
              16.8,
              1.4,
              18,
              1.85,
            ],
            "line-dasharray": [4.2, 3.1],
          },
        },
        anchorLayerId,
      );
    }
  }

  function ensureCampusRoadSource() {
    if (!map.getSource(MAP_SOURCE_IDS.campusRoads)) {
      map.addSource(MAP_SOURCE_IDS.campusRoads, {
        type: "geojson",
        data: EMPTY_FEATURE_COLLECTION,
      });
    }
  }

  function refreshCampusRoadSource(transportationReference = getSourceReference("transportation")) {
    const source = map.getSource(MAP_SOURCE_IDS.campusRoads);

    if (!source || !transportationReference) {
      return;
    }

    const features = dedupeFeaturesByGeometry(
      queryCampusSourceFeatures(transportationReference)
        .map(normalizeRoadFeature)
        .filter(Boolean)
        .map(prepareRoadRenderFeature)
        .filter(Boolean),
    );

    source.setData({
      type: "FeatureCollection",
      features,
    });
  }

  function ensureRoadTextureImage() {
    if (map.hasImage(ROAD_TEXTURE_IMAGE_ID)) {
      return;
    }

    const size = 64;
    const data = new Uint8Array(size * size * 4);
    const lightColor = hexToRgb(SCENE_THEME.roadTextureLight);
    const darkColor = hexToRgb(SCENE_THEME.roadTextureDark);

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const pixelIndex = (y * size + x) * 4;
        const grain = seededUnitValue(`road-grain:${x}:${y}`);
        const streak = seededUnitValue(`road-streak:${(x + y * 3) % size}:${(y * 2 + x) % size}`);
        const band = seededUnitValue(`road-band:${(x * 5 + y) % size}:${Math.floor(y / 4)}`);
        const toneValue = grain * 0.62 + streak * 0.26 + band * 0.12;
        let alpha = 0;
        let color = darkColor;

        if (toneValue < 0.29) {
          color = darkColor;
          alpha = Math.round(interpolateNumber(18, 66, (0.29 - toneValue) / 0.29));
        } else if (toneValue > 0.74) {
          color = lightColor;
          alpha = Math.round(interpolateNumber(16, 54, (toneValue - 0.74) / 0.26));
        }

        data[pixelIndex] = color.red;
        data[pixelIndex + 1] = color.green;
        data[pixelIndex + 2] = color.blue;
        data[pixelIndex + 3] = alpha;
      }
    }

    map.addImage(ROAD_TEXTURE_IMAGE_ID, {
      width: size,
      height: size,
      data,
    });
  }

  function normalizeRoadFeature(feature) {
    if (
      !feature ||
      !["LineString", "MultiLineString", "Polygon", "MultiPolygon"].includes(feature.geometry?.type)
    ) {
      return null;
    }

    return {
      type: "Feature",
      properties: JSON.parse(JSON.stringify(feature.properties ?? {})),
      geometry: JSON.parse(JSON.stringify(feature.geometry)),
    };
  }

  function prepareRoadRenderFeature(feature) {
    if (!isLikelyRoadFeature(feature.properties)) {
      return null;
    }

    const properties = JSON.parse(JSON.stringify(feature.properties ?? {}));
    const roadTier = getRoadTier(properties);

    if (!roadTier) {
      return null;
    }

    const isBridge = slugify(properties.brunnel) === "bridge";

    return {
      ...feature,
      properties: {
        ...properties,
        render_road_tier: roadTier,
        render_is_bridge: isBridge ? 1 : 0,
        render_lane_markings:
          roadTier === "major" && ["LineString", "MultiLineString"].includes(feature.geometry.type) ? 1 : 0,
        render_edge_markings:
          roadTier === "major" && ["LineString", "MultiLineString"].includes(feature.geometry.type) ? 1 : 0,
        render_sort_key: roadTier === "major" ? (isBridge ? 4 : 3) : isBridge ? 2 : 1,
      },
    };
  }

  function isLikelyRoadFeature(properties) {
    const tokens = [properties?.class, properties?.subclass, properties?.type]
      .map(slugify)
      .filter(Boolean);

    if (!tokens.length) {
      return false;
    }

    const excludedPatterns = [
      /^(path|footway|pedestrian|cycleway|steps|bridleway|track)(-|$)/,
      /^(rail|transit|tram|subway|monorail|narrow-gauge)(-|$)/,
      /^(ferry|aerialway|cablecar|runway|taxiway|pier|platform)(-|$)/,
    ];

    if (tokens.some((token) => excludedPatterns.some((pattern) => pattern.test(token)))) {
      return false;
    }

    return tokens.some((token) =>
      /^(motorway|trunk|primary|secondary|tertiary|minor|service|street|residential|living-street|unclassified|road)(-|$)/.test(
        token,
      ),
    );
  }

  function getRoadTier(properties) {
    const tokens = [properties?.class, properties?.subclass, properties?.type]
      .map(slugify)
      .filter(Boolean);

    if (
      tokens.some((token) =>
        /^(motorway|trunk|primary|secondary|tertiary)(-|$)/.test(token),
      )
    ) {
      return "major";
    }

    if (
      tokens.some((token) =>
        /^(minor|service|street|residential|living-street|unclassified|road)(-|$)/.test(token),
      )
    ) {
      return "minor";
    }

    return null;
  }

  function buildRoadGeometryFilter(geometryTypes) {
    return ["match", ["geometry-type"], geometryTypes, true, false];
  }

  function getRoadSurfaceColorExpression() {
    return [
      "match",
      ["get", "render_road_tier"],
      "major",
      SCENE_THEME.roadMajor,
      SCENE_THEME.roadMinor,
    ];
  }

  function getRoadSurfaceWidthExpression() {
    return [
      "interpolate",
      ["linear"],
      ["zoom"],
      13.95,
      ["match", ["get", "render_road_tier"], "major", 6.2, 4.2],
      15.2,
      ["match", ["get", "render_road_tier"], "major", 8.4, 5.8],
      16.8,
      ["match", ["get", "render_road_tier"], "major", 12.9, 8.5],
      18,
      ["match", ["get", "render_road_tier"], "major", 16.8, 10.8],
    ];
  }

  function getRoadLaneEdgeWidthExpression() {
    return [
      "interpolate",
      ["linear"],
      ["zoom"],
      15.05,
      0.34,
      16.8,
      0.52,
      18,
      0.72,
    ];
  }

  function getRoadLaneEdgeGapWidthExpression() {
    return [
      "interpolate",
      ["linear"],
      ["zoom"],
      15.05,
      5.3,
      16.8,
      8.5,
      18,
      11.9,
    ];
  }

  function getVegetationReliefColorExpression() {
    return [
      "match",
      ["coalesce", ["get", "class"], ["get", "subclass"], ""],
      "wood",
      buildSubtleFeatureColorExpression(SCENE_THEME.greenDeep, {
        hueShiftDegrees: 2,
        saturationDelta: 0.03,
        lightnessDelta: 0.05,
      }),
      "forest",
      buildSubtleFeatureColorExpression(SCENE_THEME.greenDeep, {
        hueShiftDegrees: 2,
        saturationDelta: 0.03,
        lightnessDelta: 0.05,
      }),
      "park",
      buildSubtleFeatureColorExpression(SCENE_THEME.greenBase, {
        hueShiftDegrees: 2.8,
        saturationDelta: 0.04,
        lightnessDelta: 0.08,
      }),
      "grass",
      buildSubtleFeatureColorExpression(SCENE_THEME.greenSoft, {
        hueShiftDegrees: 2.6,
        saturationDelta: 0.04,
        lightnessDelta: 0.08,
      }),
      buildSubtleFeatureColorExpression(SCENE_THEME.greenBase, {
        hueShiftDegrees: 2.4,
        saturationDelta: 0.03,
        lightnessDelta: 0.07,
      }),
    ];
  }

  function getVegetationMassColorExpression() {
    return [
      "match",
      ["coalesce", ["get", "class"], ["get", "subclass"], ""],
      "wood",
      buildSubtleFeatureColorExpression(SCENE_THEME.greenDeep, {
        hueShiftDegrees: 2,
        saturationDelta: 0.03,
        lightnessDelta: 0.05,
      }),
      "forest",
      buildSubtleFeatureColorExpression(SCENE_THEME.greenDeep, {
        hueShiftDegrees: 2,
        saturationDelta: 0.03,
        lightnessDelta: 0.05,
      }),
      "park",
      buildSubtleFeatureColorExpression(SCENE_THEME.greenBase, {
        hueShiftDegrees: 2.8,
        saturationDelta: 0.04,
        lightnessDelta: 0.08,
      }),
      "grass",
      buildSubtleFeatureColorExpression(SCENE_THEME.greenSoft, {
        hueShiftDegrees: 2.6,
        saturationDelta: 0.04,
        lightnessDelta: 0.08,
      }),
      buildSubtleFeatureColorExpression(SCENE_THEME.greenBase, {
        hueShiftDegrees: 2.4,
        saturationDelta: 0.03,
        lightnessDelta: 0.07,
      }),
    ];
  }

  function addVegetationDepthLayers() {
    const vegetationReference =
      getSourceReference("park") ??
      getSourceReference("landuse") ??
      getSourceReference("landcover");
    const labelAnchorId = getLabelAnchorLayerId();

    if (vegetationReference && !map.getLayer(LAYER_IDS.vegetationRelief)) {
      map.addLayer(
        {
          id: LAYER_IDS.vegetationRelief,
          type: "fill",
          source: vegetationReference.source,
          "source-layer": vegetationReference.sourceLayer,
          minzoom: 13.8,
          filter: buildCampusConstrainedFilter(buildVegetationFeatureFilter()),
          paint: {
            "fill-color": getVegetationReliefColorExpression(),
            "fill-outline-color": SCENE_THEME.greenEdge,
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.8,
              0.12,
              16.8,
              0.2,
            ],
            "fill-translate": [0, 1.2],
            "fill-translate-anchor": "viewport",
          },
        },
        labelAnchorId,
      );
    }

    if (vegetationReference && !map.getLayer(LAYER_IDS.vegetationMass)) {
      map.addLayer(
        {
          id: LAYER_IDS.vegetationMass,
          type: "fill-extrusion",
          source: vegetationReference.source,
          "source-layer": vegetationReference.sourceLayer,
          minzoom: 14,
          filter: buildCampusConstrainedFilter(buildVegetationFeatureFilter()),
          paint: {
            "fill-extrusion-color": getVegetationMassColorExpression(),
            "fill-extrusion-base": 0,
            "fill-extrusion-height": [
              "match",
              ["coalesce", ["get", "class"], ["get", "subclass"], ""],
              "wood",
              2.4,
              "forest",
              2.8,
              "park",
              1.2,
              "grass",
              0.55,
              1,
            ],
            "fill-extrusion-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              14,
              0.18,
              17,
              0.28,
            ],
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelAnchorId,
      );
    }

    const poiReference = getSourceReference("poi");

    if (poiReference && !map.getLayer(LAYER_IDS.trees)) {
      map.addLayer(
        {
          id: LAYER_IDS.trees,
          type: "circle",
          source: poiReference.source,
          "source-layer": poiReference.sourceLayer,
          minzoom: 15,
          maxzoom: TREE_VOLUME_LAYER_MIN_ZOOM,
          filter: buildCampusConstrainedFilter(buildTreePointFilter()),
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              1.3,
              TREE_VOLUME_LAYER_MIN_ZOOM,
              3.2,
            ],
            "circle-color": SCENE_THEME.treeCanopySun,
            "circle-stroke-color": SCENE_THEME.treeHalo,
            "circle-stroke-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              TREE_VOLUME_LAYER_MIN_ZOOM,
              0.8,
            ],
            "circle-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0.36,
              TREE_VOLUME_LAYER_MIN_ZOOM,
              0.58,
            ],
            "circle-blur": 0.15,
          },
        },
        labelAnchorId,
      );
    }

    ensureTreeVolumeSourceAndLayers(labelAnchorId);
    refreshTreeVolumeSource();
  }

  function ensureInstancedTreeModelLayer(labelAnchorId) {
    return labelAnchorId;
  }

  function scheduleInstancedTreeModelRefresh() {
    state.isTreeModelRefreshPending = false;
  }

  function refreshInstancedTreeModels() {
    return;
  }

  function getTreeModelAnchorCoordinates() {
    const campusGeometry = getCampusBoundaryGeometry();
    return campusGeometry ? getGeometryCenter(campusGeometry) : DEFAULT_MAP_CENTER.slice();
  }

  function createInstancedTreeModelLayer() {
    const tempPosition = new THREE.Vector3();
    const tempQuaternion = new THREE.Quaternion();
    const tempScale = new THREE.Vector3();
    const tempEuler = new THREE.Euler();
    let anchorCoordinates = DEFAULT_MAP_CENTER.slice();
    let anchorMercator = null;
    let meterInMercatorUnits = 1;
    let mapInstance = null;
    let renderer = null;
    let scene = null;
    let camera = null;
    let rootGroup = null;
    let meshTemplates = [];
    let instancedMeshes = [];
    let pendingTreePoints = [];
    let isModelLoaded = false;
    let isDisposed = false;

    return {
      id: LAYER_IDS.treeModels,
      type: "custom",
      renderingMode: "3d",

      onAdd(mapReference, gl) {
        mapInstance = mapReference;
        updateAnchorReference();
        isDisposed = false;

        scene = new THREE.Scene();
        camera = new THREE.Camera();
        renderer = new THREE.WebGLRenderer({
          canvas: mapReference.getCanvas(),
          context: gl,
          antialias: true,
        });
        renderer.autoClear = false;
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        rootGroup = new THREE.Group();
        rootGroup.frustumCulled = false;
        scene.add(rootGroup);

        const ambientLight = new THREE.HemisphereLight("#eef8dc", "#607158", 1.18);
        const keyLight = new THREE.DirectionalLight("#fff0d6", 1.05);
        const fillLight = new THREE.DirectionalLight("#dceecf", 0.34);

        keyLight.position.set(0.7, -0.9, 1.35);
        fillLight.position.set(-0.55, 0.42, 0.82);

        scene.add(ambientLight, keyLight, fillLight);

        loadTreeModelTemplates(TREE_MODEL_ASSET_URL)
          .then((templates) => {
            meshTemplates = templates;
            isModelLoaded = true;
            rebuildTreeInstances();
            mapReference.triggerRepaint();
          })
          .catch((error) => {
            console.warn("Nao foi possivel carregar o asset GLTF das arvores. Usando fallback procedural.", error);
            meshTemplates = buildFallbackTreeModelTemplates();
            isModelLoaded = true;
            rebuildTreeInstances();
            mapReference.triggerRepaint();
          });
      },

      render(gl, matrix) {
        if (
          !mapInstance ||
          !renderer ||
          !scene ||
          !camera ||
          !rootGroup ||
          !anchorMercator ||
          !isModelLoaded ||
          !instancedMeshes.length ||
          mapInstance.getZoom() < TREE_MODEL_LAYER_MIN_ZOOM
        ) {
          return;
        }

        const mapMatrix = new THREE.Matrix4().fromArray(matrix);
        const anchorMatrix = new THREE.Matrix4()
          .makeTranslation(anchorMercator.x, anchorMercator.y, anchorMercator.z)
          .scale(
            new THREE.Vector3(
              meterInMercatorUnits,
              -meterInMercatorUnits,
              meterInMercatorUnits,
            ),
          );

        camera.projectionMatrix = mapMatrix.multiply(anchorMatrix);
        renderer.resetState();
        renderer.render(scene, camera);
      },

      onRemove() {
        isDisposed = true;
        clearTreeInstances();
        meshTemplates.forEach((template) => {
          template.geometry.dispose();
          template.material.dispose();
        });
        meshTemplates = [];
        renderer?.dispose();
        renderer = null;
        scene = null;
        camera = null;
        rootGroup = null;
        isModelLoaded = false;
        mapInstance = null;
      },

      setAnchorCoordinates(nextAnchorCoordinates) {
        if (
          !Array.isArray(nextAnchorCoordinates) ||
          nextAnchorCoordinates.length !== 2 ||
          !nextAnchorCoordinates.every(Number.isFinite)
        ) {
          return;
        }

        anchorCoordinates = nextAnchorCoordinates.slice();
        updateAnchorReference();
        rebuildTreeInstances();
        mapInstance?.triggerRepaint();
      },

      setTreePoints(treePoints) {
        pendingTreePoints = Array.isArray(treePoints)
          ? treePoints.map((treePoint) => ({
              coordinates: treePoint.coordinates.map(Number),
              seed: String(treePoint.seed ?? getPointSeed(treePoint.coordinates)),
            }))
          : [];
        rebuildTreeInstances();
        mapInstance?.triggerRepaint();
      },
    };

    function updateAnchorReference() {
      anchorMercator = maplibregl.MercatorCoordinate.fromLngLat(
        {
          lng: anchorCoordinates[0],
          lat: anchorCoordinates[1],
        },
        0,
      );
      meterInMercatorUnits = anchorMercator.meterInMercatorCoordinateUnits();
    }

    function rebuildTreeInstances() {
      if (!rootGroup || !isModelLoaded || !anchorMercator) {
        return;
      }

      clearTreeInstances();

      if (!pendingTreePoints.length || !meshTemplates.length) {
        return;
      }

      const treeInstances = pendingTreePoints.map(buildTreeInstanceTransform);

      meshTemplates.forEach((template) => {
        const instancedMesh = new THREE.InstancedMesh(
          template.geometry,
          template.material.clone(),
          treeInstances.length,
        );

        instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        instancedMesh.frustumCulled = false;

        treeInstances.forEach((treeInstance, index) => {
          instancedMesh.setMatrixAt(index, treeInstance.matrix);
          instancedMesh.setColorAt(
            index,
            template.kind === "trunk" ? treeInstance.trunkColor : treeInstance.canopyColor,
          );
        });

        instancedMesh.instanceMatrix.needsUpdate = true;

        if (instancedMesh.instanceColor) {
          instancedMesh.instanceColor.needsUpdate = true;
        }

        rootGroup.add(instancedMesh);
        instancedMeshes.push(instancedMesh);
      });
    }

    function clearTreeInstances() {
      instancedMeshes.forEach((mesh) => {
        rootGroup?.remove(mesh);
        mesh.material.dispose();
      });
      instancedMeshes = [];
    }

    function buildTreeInstanceTransform(treePoint) {
      const mercatorPoint = maplibregl.MercatorCoordinate.fromLngLat(
        {
          lng: treePoint.coordinates[0],
          lat: treePoint.coordinates[1],
        },
        0,
      );
      const eastMeters = (mercatorPoint.x - anchorMercator.x) / meterInMercatorUnits;
      const northMeters = (anchorMercator.y - mercatorPoint.y) / meterInMercatorUnits;
      const heightMeters = interpolateNumber(
        TREE_MODEL_CONFIG.minHeightMeters,
        TREE_MODEL_CONFIG.maxHeightMeters,
        seededUnitValue(`${treePoint.seed}-height`),
      );
      const scaleFactor = heightMeters / TREE_MODEL_ASSET_HEIGHT_METERS;
      const rotation = Math.PI * 2 * seededUnitValue(`${treePoint.seed}-rotation`);
      const canopyColor = new THREE.Color().setHSL(
        interpolateNumber(0.28, 0.35, seededUnitValue(`${treePoint.seed}-canopy-hue`)),
        interpolateNumber(0.34, 0.52, seededUnitValue(`${treePoint.seed}-canopy-sat`)),
        interpolateNumber(0.27, 0.4, seededUnitValue(`${treePoint.seed}-canopy-light`)),
      );
      const trunkColor = new THREE.Color().setHSL(
        interpolateNumber(0.055, 0.085, seededUnitValue(`${treePoint.seed}-trunk-hue`)),
        interpolateNumber(0.28, 0.42, seededUnitValue(`${treePoint.seed}-trunk-sat`)),
        interpolateNumber(0.2, 0.32, seededUnitValue(`${treePoint.seed}-trunk-light`)),
      );

      tempPosition.set(eastMeters, northMeters, TREE_MODEL_BASE_ALTITUDE_METERS);
      tempEuler.set(0, 0, rotation);
      tempQuaternion.setFromEuler(tempEuler);
      tempScale.set(scaleFactor, scaleFactor, scaleFactor);

      return {
        matrix: new THREE.Matrix4().compose(
          tempPosition.clone(),
          tempQuaternion.clone(),
          tempScale.clone(),
        ),
        canopyColor,
        trunkColor,
      };
    }
  }

  async function loadTreeModelTemplates(assetUrl) {
    const gltf = await new Promise((resolve, reject) => {
      new GLTFLoader().load(assetUrl, resolve, undefined, reject);
    });
    const rotationMatrix = new THREE.Matrix4().makeRotationX(Math.PI / 2);
    const templates = [];

    gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse((node) => {
      if (!node.isMesh || !node.geometry || !node.material) {
        return;
      }

      const geometry = node.geometry.clone();
      geometry.applyMatrix4(node.matrixWorld);
      geometry.applyMatrix4(rotationMatrix);
      geometry.computeBoundingSphere();

      const material = node.material.clone();
      material.color = new THREE.Color("#ffffff");
      material.side = THREE.DoubleSide;

      if ("metalness" in material) {
        material.metalness = 0;
      }

      if ("roughness" in material) {
        material.roughness = 1;
      }

      templates.push({
        geometry,
        material,
        kind: /trunk/i.test(`${node.name} ${node.material.name}`) ? "trunk" : "canopy",
      });
    });

    return templates;
  }

  function buildFallbackTreeModelTemplates() {
    const trunkGeometry = new THREE.CylinderGeometry(0.16, 0.22, 1.1, 8);
    trunkGeometry.rotateX(Math.PI / 2);
    trunkGeometry.translate(0, 0, 0.55);
    trunkGeometry.computeBoundingSphere();

    const canopyGeometry = new THREE.IcosahedronGeometry(1.08, 1);
    canopyGeometry.scale(0.92, 0.92, 1.2);
    canopyGeometry.translate(0, 0, 1.82);
    canopyGeometry.computeBoundingSphere();

    return [
      {
        geometry: trunkGeometry,
        material: new THREE.MeshStandardMaterial({
          color: "#ffffff",
          roughness: 1,
          metalness: 0,
        }),
        kind: "trunk",
      },
      {
        geometry: canopyGeometry,
        material: new THREE.MeshStandardMaterial({
          color: "#ffffff",
          roughness: 1,
          metalness: 0,
        }),
        kind: "canopy",
      },
    ];
  }

  function ensureTreeVolumeSourceAndLayers(labelAnchorId) {
    if (!map.getSource(MAP_SOURCE_IDS.treeVolumes)) {
      map.addSource(MAP_SOURCE_IDS.treeVolumes, {
        type: "geojson",
        data: EMPTY_FEATURE_COLLECTION,
      });
    }

    if (!map.getLayer(LAYER_IDS.treeShadows)) {
      map.addLayer(
        {
          id: LAYER_IDS.treeShadows,
          type: "fill",
          source: MAP_SOURCE_IDS.treeVolumes,
          minzoom: TREE_VOLUME_LAYER_MIN_ZOOM,
          filter: ["==", ["get", "kind"], "shadow-soft"],
          paint: {
            "fill-color": SCENE_THEME.treeShadow,
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15.15,
              0.18,
              17.5,
              0.24,
            ],
            "fill-translate": getDirectionalShadowTranslate(getSunShadowProfile().tree.soft),
            "fill-translate-anchor": "viewport",
          },
        },
        labelAnchorId,
      );
    }

    if (!map.getLayer(LAYER_IDS.treeShadowCore)) {
      map.addLayer(
        {
          id: LAYER_IDS.treeShadowCore,
          type: "fill",
          source: MAP_SOURCE_IDS.treeVolumes,
          minzoom: TREE_VOLUME_LAYER_MIN_ZOOM,
          filter: ["==", ["get", "kind"], "shadow-core"],
          paint: {
            "fill-color": SCENE_THEME.treeShadowCore,
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15.15,
              0.14,
              17.5,
              0.2,
            ],
            "fill-translate": getDirectionalShadowTranslate(getSunShadowProfile().tree.core),
            "fill-translate-anchor": "viewport",
          },
        },
        labelAnchorId,
      );
    }

    if (!map.getLayer(LAYER_IDS.treeRootOcclusion)) {
      map.addLayer(
        {
          id: LAYER_IDS.treeRootOcclusion,
          type: "fill",
          source: MAP_SOURCE_IDS.treeVolumes,
          minzoom: TREE_VOLUME_LAYER_MIN_ZOOM,
          filter: ["==", ["get", "kind"], "root-ao"],
          paint: {
            "fill-color": SCENE_THEME.treeRootOcclusion,
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15.15,
              0.18,
              17.5,
              0.26,
            ],
          },
        },
        labelAnchorId,
      );
    }

    if (!map.getLayer(LAYER_IDS.treeTrunks)) {
      map.addLayer(
        {
          id: LAYER_IDS.treeTrunks,
          type: "fill-extrusion",
          source: MAP_SOURCE_IDS.treeVolumes,
          minzoom: TREE_VOLUME_LAYER_MIN_ZOOM,
          filter: ["==", ["get", "kind"], "trunk"],
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "tone"],
              0,
              SCENE_THEME.treeTrunkShade,
              1,
              SCENE_THEME.treeTrunk,
            ],
            "fill-extrusion-base": ["get", "baseHeight"],
            "fill-extrusion-height": ["get", "topHeight"],
            "fill-extrusion-opacity": 0.98,
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelAnchorId,
      );
    }

    if (!map.getLayer(LAYER_IDS.treeCanopyLower)) {
      map.addLayer(
        {
          id: LAYER_IDS.treeCanopyLower,
          type: "fill-extrusion",
          source: MAP_SOURCE_IDS.treeVolumes,
          minzoom: TREE_VOLUME_LAYER_MIN_ZOOM,
          filter: ["==", ["get", "kind"], "canopy-lower"],
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "tone"],
              0,
              SCENE_THEME.treeCanopyShade,
              1,
              SCENE_THEME.treeCanopy,
            ],
            "fill-extrusion-base": ["get", "baseHeight"],
            "fill-extrusion-height": ["get", "topHeight"],
            "fill-extrusion-opacity": 0.95,
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelAnchorId,
      );
    }

    if (!map.getLayer(LAYER_IDS.treeCanopyUpper)) {
      map.addLayer(
        {
          id: LAYER_IDS.treeCanopyUpper,
          type: "fill-extrusion",
          source: MAP_SOURCE_IDS.treeVolumes,
          minzoom: TREE_VOLUME_LAYER_MIN_ZOOM,
          filter: ["==", ["get", "kind"], "canopy-upper"],
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "tone"],
              0,
              SCENE_THEME.treeCanopy,
              1,
              SCENE_THEME.treeCanopySun,
            ],
            "fill-extrusion-base": ["get", "baseHeight"],
            "fill-extrusion-height": ["get", "topHeight"],
            "fill-extrusion-opacity": 0.92,
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelAnchorId,
      );
    }

    syncDirectionalSunShadows();
  }

  function refreshTreeVolumeSource() {
    const source = map.getSource(MAP_SOURCE_IDS.treeVolumes);

    if (!source) {
      return;
    }

    const treeSeedPoints = buildTreeSeedPoints();

    source.setData(
      treeSeedPoints.length
        ? buildTreeVolumeFeatureCollection(treeSeedPoints)
        : EMPTY_FEATURE_COLLECTION,
    );
  }

  function buildTreeSeedPoints() {
    const vegetationFeatures = getTreePlacementVegetationFeatures();

    if (!vegetationFeatures.length) {
      return [];
    }

    const explicitTreePoints = getExplicitTreePoints(vegetationFeatures);
    const sampledTreePoints = getSampledVegetationTreePoints(
      vegetationFeatures,
      explicitTreePoints,
    );
    const combined = [];
    const seen = new Set();

    explicitTreePoints
      .concat(sampledTreePoints)
      .slice(0, TREE_MODEL_CONFIG.maxTotalPoints)
      .forEach((treePoint) => {
        appendUniqueTreePoint(combined, seen, treePoint);
      });

    return combined.slice(0, TREE_MODEL_CONFIG.maxTotalPoints);
  }

  function getExplicitTreePoints(vegetationFeatures) {
    const poiReference = getSourceReference("poi");

    if (!poiReference || !vegetationFeatures.length) {
      return [];
    }

    return queryCampusSourceFeatures(poiReference)
      .filter((feature) => feature.geometry?.type === "Point")
      .filter((feature) => isLikelyTreePoint(feature.properties))
      .map((feature) => ({
        coordinates: feature.geometry.coordinates.map(Number),
        seed: getPointSeed(feature.geometry.coordinates),
      }))
      .filter((point) => isPointInsideVegetationAreas(point.coordinates, vegetationFeatures))
      .slice(0, TREE_MODEL_CONFIG.maxTotalPoints);
  }

  function getSampledVegetationTreePoints(vegetationFeatures, existingPoints) {
    if (!vegetationFeatures.length) {
      return [];
    }

    const existingCollection = existingPoints.slice();
    const sampledPoints = [];

    for (const feature of vegetationFeatures) {
      if (sampledPoints.length + existingCollection.length >= TREE_MODEL_CONFIG.maxTotalPoints) {
        break;
      }

      const candidates = sampleTreePointsFromGeometry(
        feature.geometry,
        getGeometryFingerprint(feature.geometry),
      );

      candidates.forEach((candidate) => {
        const wasInserted = appendUniqueTreePoint(
          existingCollection,
          null,
          candidate,
          TREE_MODEL_CONFIG.minPointSpacingMeters,
        );

        if (wasInserted) {
          sampledPoints.push(candidate);
        }
      });
    }

    return sampledPoints;
  }

  function buildTreeVolumeFeatureCollection(treeSeedPoints) {
    return {
      type: "FeatureCollection",
      features: treeSeedPoints.flatMap((treePoint) => buildTreeVolumeFeatures(treePoint)),
    };
  }

  function buildTreeVolumeFeatures(treePoint) {
    const tone = interpolateNumber(
      0.24,
      0.8,
      seededUnitValue(`${treePoint.seed}-tone`),
    );
    const canopyRadius = interpolateNumber(
      TREE_MODEL_CONFIG.minCanopyRadiusMeters,
      TREE_MODEL_CONFIG.maxCanopyRadiusMeters,
      seededUnitValue(`${treePoint.seed}-canopy`),
    );
    const trunkRadius = interpolateNumber(
      TREE_MODEL_CONFIG.minTrunkRadiusMeters,
      TREE_MODEL_CONFIG.maxTrunkRadiusMeters,
      seededUnitValue(`${treePoint.seed}-trunk`),
    );
    const totalHeight = interpolateNumber(
      TREE_MODEL_CONFIG.minHeightMeters,
      TREE_MODEL_CONFIG.maxHeightMeters,
      seededUnitValue(`${treePoint.seed}-height`),
    );
    const trunkTop = totalHeight * 0.34;
    const canopyLowerBase = totalHeight * 0.22;
    const canopyLowerTop = totalHeight * 0.76;
    const canopyUpperBase = totalHeight * 0.58;

    return [
      createTreeVolumeFeature(
        "shadow-soft",
        buildOrganicCanopyPolygon(
          treePoint.coordinates,
          canopyRadius * 1.24,
          TREE_MODEL_CONFIG.canopySides,
          `${treePoint.seed}-shadow-soft`,
        ),
        { tone, baseHeight: 0, topHeight: 0 },
      ),
      createTreeVolumeFeature(
        "shadow-core",
        buildOrganicCanopyPolygon(
          treePoint.coordinates,
          canopyRadius * 1.04,
          TREE_MODEL_CONFIG.canopySides,
          `${treePoint.seed}-shadow-core`,
        ),
        { tone, baseHeight: 0, topHeight: 0 },
      ),
      createTreeVolumeFeature(
        "root-ao",
        buildOrganicCanopyPolygon(
          treePoint.coordinates,
          Math.max(trunkRadius * 2.1, canopyRadius * 0.28),
          TREE_MODEL_CONFIG.canopySides,
          `${treePoint.seed}-root-ao`,
        ),
        { tone, baseHeight: 0, topHeight: 0 },
      ),
      createTreeVolumeFeature(
        "trunk",
        buildCirclePolygon(
          treePoint.coordinates,
          trunkRadius,
          TREE_MODEL_CONFIG.trunkSides,
        ),
        { tone, baseHeight: 0, topHeight: trunkTop },
      ),
      createTreeVolumeFeature(
        "canopy-lower",
        buildOrganicCanopyPolygon(
          treePoint.coordinates,
          canopyRadius,
          TREE_MODEL_CONFIG.canopySides,
          `${treePoint.seed}-lower`,
        ),
        { tone, baseHeight: canopyLowerBase, topHeight: canopyLowerTop },
      ),
      createTreeVolumeFeature(
        "canopy-upper",
        buildOrganicCanopyPolygon(
          treePoint.coordinates,
          canopyRadius * 0.64,
          TREE_MODEL_CONFIG.canopySides,
          `${treePoint.seed}-upper`,
        ),
        { tone, baseHeight: canopyUpperBase, topHeight: totalHeight },
      ),
    ];
  }

  function createTreeVolumeFeature(kind, geometry, properties) {
    return {
      type: "Feature",
      properties: {
        kind,
        tone: properties.tone,
        baseHeight: properties.baseHeight,
        topHeight: properties.topHeight,
      },
      geometry,
    };
  }

  function buildVegetationFeatureFilter() {
    return [
      "any",
      ["match", ["get", "landuse"], ["grass", "park"], true, false],
      ["==", ["get", "leisure"], "park"],
      ["match", ["get", "class"], ["park", "grass"], true, false],
      ["match", ["get", "subclass"], ["park", "grass"], true, false],
    ];
  }

  function buildTreePointFilter() {
    return [
      "any",
      ["==", ["get", "subclass"], "tree"],
      ["==", ["get", "class"], "tree"],
      ["==", ["get", "natural"], "tree"],
    ];
  }

  function addFundaoBuildingsTwinLayers() {
    const buildingReference = getBuildingReference();

    if (!buildingReference || map.getLayer(LAYER_IDS.buildings3d)) {
      return;
    }

    ensureBuildingTwinSources(buildingReference);

    const labelAnchorId = getLabelAnchorLayerId();
    addCityContextBuildingLayers(buildingReference, labelAnchorId);

    map.addLayer(
      {
        id: LAYER_IDS.buildingShadowFar,
        type: "fill",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.05,
        paint: {
          "fill-color": "#2d312d",
          "fill-opacity": [
            "*",
            ["coalesce", ["get", "render_shadow_far_opacity"], 0.04],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              14.05,
              0.72,
              18,
              1.18,
            ],
          ],
          "fill-translate": getDirectionalShadowTranslate(getSunShadowProfile().building.far),
          "fill-translate-anchor": "viewport",
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildingShadowMid,
        type: "fill",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.05,
        paint: {
          "fill-color": "#2a2f2a",
          "fill-opacity": [
            "*",
            ["coalesce", ["get", "render_shadow_mid_opacity"], 0.07],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              14.05,
              0.8,
              18,
              1.1,
            ],
          ],
          "fill-translate": getDirectionalShadowTranslate(getSunShadowProfile().building.mid),
          "fill-translate-anchor": "viewport",
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildingShadowNear,
        type: "fill",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.05,
        paint: {
          "fill-color": "#232823",
          "fill-opacity": [
            "*",
            ["coalesce", ["get", "render_shadow_near_opacity"], 0.1],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              14.05,
              0.86,
              18,
              1.08,
            ],
          ],
          "fill-translate": getDirectionalShadowTranslate(getSunShadowProfile().building.near),
          "fill-translate-anchor": "viewport",
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildingShadowContact,
        type: "fill",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.08,
        paint: {
          "fill-color": "#3a3f39",
          "fill-opacity": [
            "*",
            ["coalesce", ["get", "render_shadow_contact_opacity"], 0.1],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              14.08,
              0.72,
              17.8,
              1.04,
            ],
          ],
          "fill-translate": getDirectionalShadowTranslate(getSunShadowProfile().building.contact),
          "fill-translate-anchor": "viewport",
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildingBaseOcclusion,
        type: "line",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.05,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": ["coalesce", ["get", "render_base_ao_color"], SCENE_THEME.buildingBaseOcclusion],
          "line-opacity": [
            "*",
            ["coalesce", ["get", "render_base_ao_opacity"], 0.16],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              14.05,
              0.78,
              18,
              1.06,
            ],
          ],
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14.05,
            1.2,
            16,
            2.4,
            18,
            3.6,
          ],
          "line-blur": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14.05,
            0.7,
            18,
            1.2,
          ],
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildingFootprints,
        type: "fill",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.05,
        paint: {
          "fill-color": ["coalesce", ["get", "render_footprint_color"], SCENE_THEME.buildingFootprint],
          "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14.05,
            0.8,
            18,
            0.9,
          ],
          "fill-outline-color": ["coalesce", ["get", "render_outline_color"], SCENE_THEME.buildingEdge],
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildingOutline,
        type: "line",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.05,
        paint: {
          "line-color": ["coalesce", ["get", "render_outline_color"], SCENE_THEME.buildingEdge],
          "line-opacity": 0.72,
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            14.05,
            0.34,
            16,
            0.8,
            18,
            1.3,
          ],
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildingAmbientOcclusion,
        type: "fill-extrusion",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.12,
        paint: {
          "fill-extrusion-color": ["coalesce", ["get", "render_ao_color"], SCENE_THEME.buildingAo],
          "fill-extrusion-height": ["coalesce", ["get", "render_plinth_height"], getBuildingHeightExpression()],
          "fill-extrusion-base": getBuildingBaseExpression(),
          "fill-extrusion-opacity": ["coalesce", ["get", "render_ao_opacity"], 0.3],
          "fill-extrusion-vertical-gradient": false,
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildings3d,
        type: "fill-extrusion",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.15,
        paint: {
          "fill-extrusion-color": ["coalesce", ["get", "render_wall_color"], SCENE_THEME.buildingMid],
          "fill-extrusion-height": getBuildingHeightExpression(),
          "fill-extrusion-base": getBuildingBaseExpression(),
          "fill-extrusion-opacity": 0.98,
          "fill-extrusion-vertical-gradient": true,
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildingFacadeBands,
        type: "fill-extrusion",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.18,
        filter: ["==", ["get", "render_has_band"], 1],
        paint: {
          "fill-extrusion-color": ["coalesce", ["get", "render_band_color"], ["get", "render_wall_color"]],
          "fill-extrusion-height": ["get", "render_band_height"],
          "fill-extrusion-base": ["get", "render_band_base"],
          "fill-extrusion-opacity": 0.22,
          "fill-extrusion-vertical-gradient": false,
        },
      },
      labelAnchorId,
    );

    map.addLayer(
      {
        id: LAYER_IDS.buildingRoofCaps,
        type: "fill-extrusion",
        source: MAP_SOURCE_IDS.campusBuildings,
        minzoom: 14.15,
        paint: {
          "fill-extrusion-color": ["coalesce", ["get", "render_roof_color"], SCENE_THEME.buildingTop],
          "fill-extrusion-height": getBuildingHeightExpression(),
          "fill-extrusion-base": ["coalesce", ["get", "render_roof_base"], getBuildingBaseExpression()],
          "fill-extrusion-opacity": 0.95,
          "fill-extrusion-vertical-gradient": false,
        },
      },
      labelAnchorId,
    );

    syncDirectionalSunShadows();
  }

  function addCityContextBuildingLayers(buildingReference, labelAnchorId) {
    if (!map.getLayer(LAYER_IDS.buildingContextFootprints)) {
      map.addLayer(
        {
          id: LAYER_IDS.buildingContextFootprints,
          type: "fill",
          source: MAP_SOURCE_IDS.contextBuildings,
          minzoom: 13.6,
          paint: {
            "fill-color": ["coalesce", ["get", "render_context_wall_color"], "#d7d8d1"],
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.6,
              0.16,
              16,
              0.24,
              18,
              0.3,
            ],
            "fill-outline-color": ["coalesce", ["get", "render_outline_color"], "rgba(120, 126, 118, 0.34)"],
          },
        },
        labelAnchorId,
      );
    }

    if (!map.getLayer(LAYER_IDS.buildingContextOutline)) {
      map.addLayer(
        {
          id: LAYER_IDS.buildingContextOutline,
          type: "line",
          source: MAP_SOURCE_IDS.contextBuildings,
          minzoom: 13.6,
          paint: {
            "line-color": ["coalesce", ["get", "render_outline_color"], "rgba(112, 120, 112, 0.42)"],
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.6,
              0.3,
              16,
              0.62,
              18,
              0.92,
            ],
            "line-opacity": 0.48,
          },
        },
        labelAnchorId,
      );
    }

    if (!map.getLayer(LAYER_IDS.buildingsContext3d)) {
      map.addLayer(
        {
          id: LAYER_IDS.buildingsContext3d,
          type: "fill-extrusion",
          source: MAP_SOURCE_IDS.contextBuildings,
          minzoom: 13.9,
          paint: {
            "fill-extrusion-color": ["coalesce", ["get", "render_context_wall_color"], "#cbc8bd"],
            "fill-extrusion-height": ["*", getBuildingHeightExpression(), 0.34],
            "fill-extrusion-base": ["*", getBuildingBaseExpression(), 0.34],
            "fill-extrusion-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.9,
              0.16,
              16,
              0.24,
              18,
              0.32,
            ],
            "fill-extrusion-vertical-gradient": true,
          },
        },
        labelAnchorId,
      );
    }

    if (!map.getLayer(LAYER_IDS.buildingContextRoofCaps)) {
      map.addLayer(
        {
          id: LAYER_IDS.buildingContextRoofCaps,
          type: "fill-extrusion",
          source: MAP_SOURCE_IDS.contextBuildings,
          minzoom: 13.95,
          paint: {
            "fill-extrusion-color": ["coalesce", ["get", "render_context_roof_color"], "#d9d5ca"],
            "fill-extrusion-height": ["*", getBuildingHeightExpression(), 0.34],
            "fill-extrusion-base": [
              "*",
              ["coalesce", ["get", "render_roof_base"], getBuildingBaseExpression()],
              0.34,
            ],
            "fill-extrusion-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13.95,
              0.18,
              16,
              0.24,
              18,
              0.3,
            ],
            "fill-extrusion-vertical-gradient": false,
          },
        },
        labelAnchorId,
      );
    }
  }

  function ensureBuildingTwinSources(buildingReference) {
    if (!map.getSource(MAP_SOURCE_IDS.campusBuildings)) {
      map.addSource(MAP_SOURCE_IDS.campusBuildings, {
        type: "geojson",
        data: EMPTY_FEATURE_COLLECTION,
      });
    }

    if (!map.getSource(MAP_SOURCE_IDS.contextBuildings)) {
      map.addSource(MAP_SOURCE_IDS.contextBuildings, {
        type: "geojson",
        data: EMPTY_FEATURE_COLLECTION,
      });
    }

    refreshBuildingTwinSources(buildingReference);
  }

  function refreshBuildingTwinSources(buildingReference = getBuildingReference()) {
    const campusSource = map.getSource(MAP_SOURCE_IDS.campusBuildings);
    const contextSource = map.getSource(MAP_SOURCE_IDS.contextBuildings);
    const contextBounds = getCampusSoftFocusBounds();

    if (!buildingReference || !campusSource || !contextSource || !contextBounds) {
      return;
    }

    const normalizedFeatures = dedupeFeaturesByGeometry(
      querySourceFeaturesSafe(buildingReference)
        .map(normalizePolygonFeature)
        .filter(Boolean)
        .filter(
          (feature) =>
            geometryIntersectsCampus(feature.geometry) ||
            geometryIntersectsBoundsObject(feature.geometry, contextBounds),
        ),
    ).map(prepareBuildingRenderFeature);
    const campusFeatures = [];
    const contextFeatures = [];

    normalizedFeatures.forEach((feature) => {
      if (geometryIntersectsCampus(feature.geometry)) {
        campusFeatures.push(feature);
        return;
      }

      if (geometryIntersectsBoundsObject(feature.geometry, contextBounds)) {
        contextFeatures.push(feature);
      }
    });

    campusSource.setData({
      type: "FeatureCollection",
      features: campusFeatures,
    });
    contextSource.setData({
      type: "FeatureCollection",
      features: contextFeatures,
    });
  }

  function prepareBuildingRenderFeature(feature) {
    const properties = JSON.parse(JSON.stringify(feature.properties ?? {}));
    const baseHeight = clampNumber(resolveBuildingBaseHeightMeters(properties), 0, 160);
    const resolvedHeight = Math.max(resolveBuildingHeightMeters(properties), baseHeight + 2.8);
    const heightSpan = resolvedHeight - baseHeight;
    const footprintArea = estimateGeometryAreaSquareMeters(feature.geometry);
    const buildingPalette = getBuildingSizePalette(footprintArea, heightSpan);
    const footprintScale = clampNumber(
      (Math.sqrt(Math.max(footprintArea, 64)) - 8) / 54,
      0,
      1,
    );
    const heightScale = clampNumber((heightSpan - 8) / 64, 0, 1);
    const featureSeed = firstNonEmpty(
      properties.id,
      properties["@id"],
      properties.osm_id,
      properties.name,
      properties.ref,
      getGeometryFingerprint(feature.geometry),
    );
    const wallBaseColor = mixHexColors(
      getBuildingHeightPaletteColor(resolvedHeight),
      buildingPalette.wall,
      interpolateNumber(0.46, 0.74, footprintScale),
    );
    const wallColor = adjustHexColor(wallBaseColor, {
      hueShiftDegrees: interpolateNumber(-6, 7, seededUnitValue(`${featureSeed}-wall-hue`)),
      saturationDelta: interpolateNumber(-0.06, 0.05, seededUnitValue(`${featureSeed}-wall-sat`)),
      lightnessDelta: interpolateNumber(-0.06, 0.075, seededUnitValue(`${featureSeed}-wall-light`)),
    });
    const roofAccent =
      BUILDING_ROOF_PALETTE[
        Math.min(
          BUILDING_ROOF_PALETTE.length - 1,
          Math.floor(seededUnitValue(`${featureSeed}-roof-palette`) * BUILDING_ROOF_PALETTE.length),
        )
      ];
    const roofColor = adjustHexColor(
      mixHexColors(
        mixHexColors(
          wallColor,
          buildingPalette.roof,
          interpolateNumber(0.42, 0.62, footprintScale),
        ),
        roofAccent,
        interpolateNumber(0.18, 0.34, seededUnitValue(`${featureSeed}-roof-strength`)),
      ),
      {
        saturationDelta: interpolateNumber(-0.04, 0.07, seededUnitValue(`${featureSeed}-roof-sat`)),
        lightnessDelta: interpolateNumber(-0.05, 0.06, seededUnitValue(`${featureSeed}-roof-light`)),
      },
    );
    const bandTint =
      seededUnitValue(`${featureSeed}-band-tone`) > 0.52
        ? buildingPalette.bandLight
        : buildingPalette.bandDark;
    const bandColor = adjustHexColor(
      mixHexColors(
        wallColor,
        bandTint,
        interpolateNumber(0.22, 0.36, seededUnitValue(`${featureSeed}-band-strength`)),
      ),
      {
        lightnessDelta: interpolateNumber(-0.03, 0.05, seededUnitValue(`${featureSeed}-band-light`)),
      },
    );
    const aoColor = mixHexColors(
      wallColor,
      buildingPalette.ao,
      interpolateNumber(0.44, 0.66, seededUnitValue(`${featureSeed}-ao-strength`)),
    );
    const footprintColor = adjustHexColor(mixHexColors(buildingPalette.footprint, wallColor, 0.22), {
      lightnessDelta: interpolateNumber(-0.03, 0.025, seededUnitValue(`${featureSeed}-footprint-light`)),
    });
    const outlineColor = adjustHexColor(mixHexColors(buildingPalette.outline, wallColor, 0.2), {
      lightnessDelta: interpolateNumber(-0.025, 0.02, seededUnitValue(`${featureSeed}-outline-light`)),
    });
    const baseAoColor = mixHexColors(aoColor, SCENE_THEME.buildingBaseOcclusion, 0.34);
    const plinthThickness = Math.min(Math.max(heightSpan * 0.12, 0.95), 2.6);
    const roofThickness = Math.min(Math.max(heightSpan * 0.085, 0.7), 1.9);
    const plinthHeight = Math.min(resolvedHeight - 0.35, baseHeight + plinthThickness);
    const roofBase = Math.max(baseHeight + plinthThickness + 0.95, resolvedHeight - roofThickness);
    const bandThickness = Math.min(Math.max(heightSpan * 0.05, 0.42), 1.05);
    const bandMin = baseHeight + plinthThickness + 0.85;
    const bandMax = roofBase - bandThickness - 0.45;
    const hasBand = bandMax > bandMin;
    const bandBase = hasBand
      ? clampNumber(
          baseHeight +
            heightSpan * interpolateNumber(0.34, 0.7, seededUnitValue(`${featureSeed}-band-base`)),
          bandMin,
          bandMax,
        )
      : baseHeight;
    const bandHeight = hasBand ? Math.min(roofBase - 0.2, bandBase + bandThickness) : baseHeight;
    const shadowStrength = clampNumber(
      0.18 +
        heightScale * 0.44 +
        footprintScale * 0.22 +
        seededUnitValue(`${featureSeed}-shadow`) * 0.16,
      0,
      1,
    );

    return {
      ...feature,
      properties: {
        ...properties,
        render_height_resolved: roundNumber(resolvedHeight, 2),
        render_base_resolved: roundNumber(baseHeight, 2),
        render_plinth_height: roundNumber(plinthHeight, 2),
        render_roof_base: roundNumber(roofBase, 2),
        render_band_base: roundNumber(bandBase, 2),
        render_band_height: roundNumber(bandHeight, 2),
        render_has_band: hasBand ? 1 : 0,
        render_wall_color: wallColor,
        render_band_color: bandColor,
        render_roof_color: roofColor,
        render_ao_color: aoColor,
        render_base_ao_color: baseAoColor,
        render_footprint_color: footprintColor,
        render_outline_color: outlineColor,
        render_context_wall_color: mixHexColors(wallColor, "#d9d7cf", 0.6),
        render_context_roof_color: mixHexColors(roofColor, "#d8d4ca", 0.62),
        render_ao_opacity: roundNumber(
          interpolateNumber(0.24, 0.38, heightScale * 0.72 + footprintScale * 0.28),
          3,
        ),
        render_base_ao_opacity: roundNumber(
          interpolateNumber(0.14, 0.28, shadowStrength * 0.7 + footprintScale * 0.3),
          3,
        ),
        render_band_opacity: roundNumber(
          interpolateNumber(0.16, 0.28, seededUnitValue(`${featureSeed}-band-opacity`)),
          3,
        ),
        render_roof_opacity: roundNumber(
          interpolateNumber(0.92, 0.98, seededUnitValue(`${featureSeed}-roof-opacity`)),
          3,
        ),
        render_shadow_far_opacity: roundNumber(
          interpolateNumber(0.022, 0.062, shadowStrength),
          3,
        ),
        render_shadow_mid_opacity: roundNumber(
          interpolateNumber(0.038, 0.096, shadowStrength),
          3,
        ),
        render_shadow_near_opacity: roundNumber(
          interpolateNumber(0.056, 0.138, shadowStrength),
          3,
        ),
        render_shadow_contact_opacity: roundNumber(
          interpolateNumber(0.07, 0.17, shadowStrength),
          3,
        ),
      },
    };
  }

  function resolveBuildingHeightMeters(properties) {
    const explicitHeight = firstFiniteNumber(properties?.render_height, properties?.height);

    if (Number.isFinite(explicitHeight) && explicitHeight > 0) {
      return explicitHeight;
    }

    const buildingLevels = firstFiniteNumber(properties?.["building:levels"]);

    if (Number.isFinite(buildingLevels) && buildingLevels > 0) {
      return buildingLevels * LEVEL_HEIGHT_METERS;
    }

    return DEFAULT_BUILDING_HEIGHT_METERS;
  }

  function resolveBuildingBaseHeightMeters(properties) {
    const explicitBaseHeight = firstFiniteNumber(properties?.render_min_height, properties?.min_height);

    if (Number.isFinite(explicitBaseHeight) && explicitBaseHeight >= 0) {
      return explicitBaseHeight;
    }

    const minimumLevel = firstFiniteNumber(properties?.min_level);

    if (Number.isFinite(minimumLevel) && minimumLevel > 0) {
      return minimumLevel * LEVEL_HEIGHT_METERS;
    }

    return 0;
  }

  function getBuildingHeightPaletteColor(heightMeters) {
    if (heightMeters <= 18) {
      return mixHexColors(
        SCENE_THEME.buildingTop,
        SCENE_THEME.buildingMid,
        clampNumber(heightMeters / 18, 0, 1),
      );
    }

    if (heightMeters <= 48) {
      return mixHexColors(
        SCENE_THEME.buildingMid,
        SCENE_THEME.buildingTall,
        clampNumber((heightMeters - 18) / 30, 0, 1),
      );
    }

    return mixHexColors(
      SCENE_THEME.buildingTall,
      "#657887",
      clampNumber((heightMeters - 48) / 42, 0, 1),
    );
  }

  function getBuildingSizePalette(footprintArea, heightSpan) {
    const footprintWeight = clampNumber(
      (Math.sqrt(Math.max(footprintArea, 80)) - 9) / 62,
      0,
      1,
    );
    const heightWeight = clampNumber((heightSpan - 8) / 54, 0, 1);
    const massIndex = footprintWeight * 0.68 + heightWeight * 0.32;

    if (massIndex < 0.24) {
      return BUILDING_SIZE_PALETTES.compact;
    }

    if (massIndex < 0.48) {
      return BUILDING_SIZE_PALETTES.midrise;
    }

    if (massIndex < 0.72) {
      return BUILDING_SIZE_PALETTES.campus;
    }

    return BUILDING_SIZE_PALETTES.large;
  }

  function getBuildingHeightExpression() {
    return [
      "coalesce",
      ["get", "render_height_resolved"],
      ["get", "render_height"],
      ["get", "height"],
      ["*", ["to-number", ["get", "building:levels"], 0], LEVEL_HEIGHT_METERS],
      DEFAULT_BUILDING_HEIGHT_METERS,
    ];
  }

  function getBuildingBaseExpression() {
    return [
      "coalesce",
      ["get", "render_base_resolved"],
      ["get", "render_min_height"],
      ["get", "min_height"],
      ["*", ["to-number", ["get", "min_level"], 0], LEVEL_HEIGHT_METERS],
      0,
    ];
  }

  function getBuildingReference() {
    return getSourceReference("building");
  }

  function getTreePlacementSourceReferences() {
    const seen = new Set();

    return ["park", "landuse", "landcover"]
      .map((sourceLayer) => getSourceReference(sourceLayer))
      .filter(Boolean)
      .filter((reference) => {
        const key = `${reference.source}:${reference.sourceLayer}`;

        if (seen.has(key)) {
          return false;
        }

        seen.add(key);
        return true;
      });
  }

  function getSourceReference(sourceLayerName) {
    const sourceLayer = String(sourceLayerName ?? "").toLowerCase();
    const style = map.getStyle();
    const referenceLayer = style.layers.find(
      (layer) =>
        layer.source &&
        String(layer["source-layer"] ?? "").toLowerCase() === sourceLayer,
    );

    if (referenceLayer) {
      return {
        source: referenceLayer.source,
        sourceLayer: referenceLayer["source-layer"],
      };
    }

    if (style.sources.openmaptiles) {
      return {
        source: "openmaptiles",
        sourceLayer: sourceLayerName,
      };
    }

    console.warn(`A fonte vetorial ${sourceLayerName} nao foi encontrada no estilo base.`);
    return null;
  }

  function getGroundOverlayAnchorId() {
    if (map.getLayer(LAYER_IDS.walkways)) {
      return LAYER_IDS.walkways;
    }

    if (map.getLayer(LAYER_IDS.buildings3d)) {
      return LAYER_IDS.buildings3d;
    }

    return getLabelAnchorLayerId();
  }

  function getLabelAnchorLayerId() {
    return map
      .getStyle()
      .layers.find(
        (layer) => layer.type === "symbol" && layer.layout && layer.layout["text-field"],
      )?.id;
  }

  async function loadSeedReports() {
    try {
      const response = await fetch(REPORTS_SEED_URL, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Falha ao carregar reports.seed.geojson (${response.status})`);
      }

      const featureCollection = await response.json();
      const features = Array.isArray(featureCollection.features)
        ? featureCollection.features.map(normalizeMarkingFeature).filter(Boolean)
        : [];

      if (!features.length) {
        return;
      }

      state.markings = features.sort(sortMarkingsByDateDesc);
      state.nextId =
        Math.max(
          0,
          ...state.markings.map((feature) => Number(feature.properties.id) || 0),
        ) + 1;

      syncMarkingsSource();
      renderCategoryFilters();
      renderCategoryLegend();
      renderMarkingsList();
      applyVisualizationMode();
    } catch (error) {
      console.warn("Nao foi possivel carregar os dados iniciais de ocorrencias.", error);
    }
  }

  function normalizeMarkingFeature(feature) {
    if (!feature || feature.geometry?.type !== "Point") {
      return null;
    }

    const category = resolveCategory(
      feature.properties?.categoryId ?? feature.properties?.category ?? feature.properties?.categoryLabel,
    );

    if (!category) {
      return null;
    }

    const coordinates = feature.geometry.coordinates ?? [];
    const lng = Number(coordinates[0]);
    const lat = Number(coordinates[1]);

    if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
      return null;
    }

    if (!isPointInCampusArea([lng, lat])) {
      return null;
    }

    return {
      type: "Feature",
      properties: {
        id: String(feature.properties?.id ?? cryptoRandomId()),
        title: String(
          feature.properties?.title ?? `Ocorrencia de ${category.label}`,
        ).trim(),
        categoryId: category.id,
        categoryLabel: category.label,
        color: category.color,
        description: String(feature.properties?.description ?? "")
          .trim()
          .slice(0, MAX_DESCRIPTION_LENGTH),
        locationName: String(feature.properties?.locationName ?? "").trim(),
        status: normalizeStatus(feature.properties?.status),
        severity: normalizeSeverity(feature.properties?.severity),
        reportedAt: normalizeDate(feature.properties?.reportedAt ?? feature.properties?.createdAt),
      },
      geometry: {
        type: "Point",
        coordinates: [lng, lat],
      },
    };
  }

  function resolveCategory(rawValue) {
    const normalizedId = slugify(rawValue);

    if (categoryById.has(normalizedId)) {
      return categoryById.get(normalizedId);
    }

    if (categoryByLabel.has(normalizedId)) {
      return categoryByLabel.get(normalizedId);
    }

    return null;
  }

  function buildDraftMarking() {
    const category = categoryById.get(categorySelect.value);

    if (!category) {
      return null;
    }

    return {
      category,
      description: descriptionInput.value.trim().slice(0, MAX_DESCRIPTION_LENGTH),
    };
  }

  function enablePlacementMode() {
    state.isPlacementMode = true;
    updatePlacementUi();
    syncCursor("crosshair");
  }

  function disablePlacementMode() {
    state.isPlacementMode = false;
    updatePlacementUi();
    syncCursor("");
  }

  function updatePlacementUi() {
    pinToggleButton.classList.toggle("is-placing", state.isPlacementMode);
    pinToggleButton.textContent = state.isPlacementMode
      ? "Cancelar pinagem"
      : "Adicionar ocorrencia no mapa";

    modeStatus.textContent = state.isPlacementMode
      ? "Clique em uma area do campus para posicionar a ocorrencia."
      : "Pronto para registrar uma ocorrencia. A descricao e opcional.";
  }

  function updateDescriptionCounter() {
    descriptionCounter.textContent = `${descriptionInput.value.length}/${MAX_DESCRIPTION_LENGTH}`;
  }

  function resetDraft() {
    descriptionInput.value = "";
    updateDescriptionCounter();
  }

  function renderMarkingsList() {
    const visibleMarkings = getVisibleMarkingsForList();
    pinCount.textContent = String(visibleMarkings.length);
    pinList.innerHTML = "";

    if (!visibleMarkings.length) {
      const emptyState = document.createElement("li");
      emptyState.className = "empty-state";
      emptyState.textContent =
        state.activeCategoryFilter === ALL_CATEGORIES_FILTER
          ? "Nenhuma ocorrencia visivel no momento. Use o modo de ocorrencias ou registre um novo ponto no mapa."
          : "Nenhuma ocorrencia encontrada para a categoria filtrada.";
      pinList.appendChild(emptyState);
      return;
    }

    visibleMarkings.forEach((feature) => {
      const item = document.createElement("li");
      item.className = "pin-item";

      const header = document.createElement("div");
      header.className = "pin-header";

      const badge = document.createElement("div");
      badge.className = "pin-badge";
      badge.innerHTML = `
        <span class="legend-swatch" style="background:${feature.properties.color}"></span>
        ${escapeHtml(feature.properties.categoryLabel)}
      `;

      const status = document.createElement("span");
      status.className = `status-pill status-pill--${getStatusTone(
        feature.properties.status,
        feature.properties.severity,
      )}`;
      status.textContent = feature.properties.status;

      const title = document.createElement("p");
      title.className = "pin-title";
      title.textContent = feature.properties.title;

      const description = document.createElement("p");
      description.className = feature.properties.description
        ? "pin-description"
        : "pin-empty-description";
      description.textContent = feature.properties.description || "Sem descricao adicional.";

      const meta = document.createElement("p");
      meta.className = "pin-meta";
      meta.textContent = buildMarkingMeta(feature.properties, feature.geometry.coordinates);

      const actions = document.createElement("div");
      actions.className = "pin-actions";

      const focusButton = document.createElement("button");
      focusButton.className = "list-action";
      focusButton.type = "button";
      focusButton.textContent = "Focar";
      focusButton.addEventListener("click", () => {
        focusOnMarkings([feature], 760);
        showPopupForMarking(feature);
      });

      const removeButton = document.createElement("button");
      removeButton.className = "list-action list-action-danger";
      removeButton.type = "button";
      removeButton.textContent = "Remover";
      removeButton.addEventListener("click", () => {
        removeMarking(feature.properties.id);
      });

      header.append(badge, status);
      actions.append(focusButton, removeButton);
      item.append(header, title, description, meta, actions);
      pinList.appendChild(item);
    });
  }

  function updateMarkingsListVisibility() {
    pinList.hidden = state.isListCollapsed;
    markingsPanel.classList.toggle("is-collapsed", state.isListCollapsed);
    togglePinListButton.textContent = state.isListCollapsed ? "Mostrar" : "Esconder";
    togglePinListButton.setAttribute("aria-expanded", String(!state.isListCollapsed));
  }

  function removeMarking(markingId) {
    state.markings = state.markings.filter(
      (feature) => feature.properties.id !== String(markingId),
    );
    syncMarkingsSource();
    renderCategoryFilters();
    renderCategoryLegend();
    renderMarkingsList();
    applyVisualizationMode();
  }

  function syncMarkingsSource() {
    const source = map.getSource(MAP_SOURCE_IDS.markings);

    if (!source) {
      return;
    }

    source.setData(buildMarkingsFeatureCollection());
  }

  function buildMarkingsFeatureCollection() {
    return {
      type: "FeatureCollection",
      features: state.markings,
    };
  }

  function showPopupForMarking(feature) {
    openPopup(
      feature.geometry.coordinates,
      buildMarkingPopupHtml(feature.properties, feature.geometry.coordinates),
      "is-occurrence-popup",
    );
  }

  function buildMarkingPopupHtml(properties, coordinates) {
    const descriptionMarkup = properties.description
      ? `<p class="popup-copy">${escapeHtml(properties.description)}</p>`
      : `<p class="popup-copy popup-copy--muted">Sem descricao adicional.</p>`;

    return `
      <div class="monitor-popup">
        <div class="popup-topline">
          <span class="pin-badge">
            <span class="legend-swatch" style="background:${properties.color}"></span>
            ${escapeHtml(properties.categoryLabel)}
          </span>
          <span class="status-pill status-pill--${getStatusTone(
            properties.status,
            properties.severity,
          )}">
            ${escapeHtml(properties.status)}
          </span>
        </div>
        <h3 class="popup-title">${escapeHtml(properties.title)}</h3>
        ${descriptionMarkup}
        <p class="popup-meta">${escapeHtml(buildMarkingMeta(properties, coordinates))}</p>
      </div>
    `;
  }

  function selectBuilding(feature) {
    const normalizedFeature = normalizePolygonFeature(feature);

    if (!normalizedFeature) {
      return;
    }

    const fingerprint = getGeometryFingerprint(normalizedFeature.geometry);
    clearHoveredBuilding();
    state.selectedBuildingFingerprint = fingerprint;
    syncInteractiveBuildingSource(MAP_SOURCE_IDS.buildingSelection, normalizedFeature);
    focusOnGeometry(normalizedFeature.geometry, 940);
    openPopup(
      getGeometryCenter(normalizedFeature.geometry),
      buildBuildingPopupHtml(normalizedFeature),
      "is-building-popup",
    );
  }

  function clearSelectedBuilding() {
    state.selectedBuildingFingerprint = null;
    syncInteractiveBuildingSource(MAP_SOURCE_IDS.buildingSelection, null);
  }

  function setHoveredBuilding(feature) {
    const normalizedFeature = normalizePolygonFeature(feature);

    if (!normalizedFeature) {
      return;
    }

    const fingerprint = getGeometryFingerprint(normalizedFeature.geometry);

    if (fingerprint === state.selectedBuildingFingerprint) {
      clearHoveredBuilding();
      return;
    }

    if (fingerprint === state.hoveredBuildingFingerprint) {
      return;
    }

    state.hoveredBuildingFingerprint = fingerprint;
    syncInteractiveBuildingSource(MAP_SOURCE_IDS.buildingHover, normalizedFeature);
  }

  function clearHoveredBuilding() {
    if (!state.hoveredBuildingFingerprint) {
      return;
    }

    state.hoveredBuildingFingerprint = null;
    syncInteractiveBuildingSource(MAP_SOURCE_IDS.buildingHover, null);
  }

  function syncInteractiveBuildingSource(sourceId, feature) {
    const source = map.getSource(sourceId);

    if (!source) {
      return;
    }

    source.setData(
      feature
        ? {
            type: "FeatureCollection",
            features: [feature],
          }
        : EMPTY_FEATURE_COLLECTION,
    );
  }

  function buildBuildingPopupHtml(feature) {
    const metadata = deriveBuildingMetadata(feature);

    return `
      <div class="monitor-popup">
        <p class="popup-eyebrow">Ativo espacial</p>
        <h3 class="popup-title">${escapeHtml(metadata.name)}</h3>
        <div class="popup-grid">
          <div class="popup-stat">
            <span>Tipo</span>
            <strong>${escapeHtml(metadata.type)}</strong>
          </div>
          <div class="popup-stat">
            <span>Status</span>
            <strong class="status-pill status-pill--${metadata.statusTone}">
              ${escapeHtml(metadata.statusLabel)}
            </strong>
          </div>
        </div>
        <p class="popup-copy">${escapeHtml(metadata.summary)}</p>
      </div>
    `;
  }

  function deriveBuildingMetadata(feature) {
    const relatedMarkings = getRelatedMarkingsForGeometry(feature.geometry);
    const highestPriorityMarking = relatedMarkings[0] ?? null;
    const properties = feature.properties ?? {};
    const name = resolveBuildingName(properties, highestPriorityMarking);
    const type = resolveBuildingType(properties);

    if (!highestPriorityMarking) {
      return {
        name,
        type,
        statusLabel: "Operacao estavel",
        statusTone: "ok",
        summary: "Nenhuma ocorrencia registrada nas proximidades deste volume monitorado.",
      };
    }

    const hasCriticalOccurrence = relatedMarkings.some((marking) => {
      const severity = String(marking.properties.severity ?? "").toLowerCase();
      const status = String(marking.properties.status ?? "").toLowerCase();
      return severity === "alta" || status === "aberto" || status === "novo";
    });

    if (hasCriticalOccurrence) {
      return {
        name,
        type,
        statusLabel: "Atencao prioritaria",
        statusTone: "alert",
        summary: `${relatedMarkings.length} ocorrencia(s) relacionada(s). Destaque atual: ${highestPriorityMarking.properties.title}.`,
      };
    }

    return {
      name,
      type,
      statusLabel: "Monitoramento ativo",
      statusTone: "watch",
      summary: `${relatedMarkings.length} ocorrencia(s) proxima(s) registradas. Ultimo destaque: ${highestPriorityMarking.properties.title}.`,
    };
  }

  function getRelatedMarkingsForGeometry(geometry) {
    const geometryBounds = getGeometryBounds(geometry);

    if (!geometryBounds) {
      return [];
    }

    const center = getGeometryCenter(geometry);
    const paddedBounds = expandBounds(geometryBounds, 0.00018, 0.00018);

    // A heuristica prioriza pontos dentro da geometria e, quando nao houver,
    // aceita ocorrencias muito proximas ao centro para manter o card util na demo.
    return state.markings
      .filter((marking) => {
        const point = marking.geometry.coordinates;

        if (!point || !isPointWithinBounds(point, paddedBounds)) {
          return false;
        }

        return (
          pointInGeometry(point, geometry) ||
          haversineDistanceMeters(point, center) <= 70
        );
      })
      .sort(sortMarkingsByPriority);
  }

  function getMarkingFeatureAtPoint(point) {
    const feature = map
      .queryRenderedFeatures(point, {
        layers: [LAYER_IDS.markings],
      })
      .find((candidate) => candidate?.geometry?.type === "Point");

    return normalizeMarkingFeature(feature);
  }

  function getBuildingFeatureAtPoint(point) {
    const feature = map
      .queryRenderedFeatures(point, {
        layers: BUILDING_INTERACTIVE_LAYER_IDS.filter((layerId) => map.getLayer(layerId)),
      })
      .find((candidate) =>
        ["Polygon", "MultiPolygon"].includes(candidate?.geometry?.type),
      );

    return normalizePolygonFeature(feature);
  }

  function openPopup(lngLat, html, className) {
    closeActivePopup();

    activePopup = new maplibregl.Popup({
      offset: 18,
      closeButton: false,
      maxWidth: "320px",
      className,
    })
      .setLngLat(lngLat)
      .setHTML(html)
      .addTo(map);

    activePopup.on("close", () => {
      if (activePopup) {
        activePopup = null;
      }
    });
  }

  function closeActivePopup() {
    if (!activePopup) {
      return;
    }

    activePopup.remove();
    activePopup = null;
  }

  function normalizePolygonFeature(feature) {
    if (
      !feature ||
      !["Polygon", "MultiPolygon"].includes(feature.geometry?.type)
    ) {
      return null;
    }

    return {
      type: "Feature",
      properties: JSON.parse(JSON.stringify(feature.properties ?? {})),
      geometry: JSON.parse(JSON.stringify(feature.geometry)),
    };
  }

  function getFilteredMarkings() {
    if (state.activeCategoryFilter === ALL_CATEGORIES_FILTER) {
      return state.markings;
    }

    return state.markings.filter(
      (feature) => feature.properties.categoryId === state.activeCategoryFilter,
    );
  }

  function getVisibleMarkingsForList() {
    if (state.visualizationMode === "base") {
      return [];
    }

    return getFilteredMarkings();
  }

  function getCategoryCounts() {
    const counts = new Map();

    CATEGORIES.forEach((category) => {
      counts.set(category.id, 0);
    });

    state.markings.forEach((feature) => {
      const categoryId = feature.properties.categoryId;
      counts.set(categoryId, (counts.get(categoryId) ?? 0) + 1);
    });

    return counts;
  }

  function buildCategoryColorMatchExpression(alpha = 1) {
    return CATEGORIES.flatMap((category) => [
      category.id,
      alpha === 1 ? category.color : hexToRgba(category.color, alpha),
    ]);
  }

  function buildCategoryHeatmapColorExpression(color) {
    return [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      hexToRgba(color, 0),
      0.26,
      hexToRgba(color, 0.14),
      0.5,
      hexToRgba(color, 0.28),
      0.74,
      hexToRgba(color, 0.44),
      1,
      hexToRgba(color, 0.66),
    ];
  }

  function getCategoryDensityLayerId(categoryId) {
    return `campus-markings-density-${categoryId}`;
  }

  function buildMarkingMeta(properties, coordinates) {
    const locationLabel = properties.locationName || formatCoordinates(coordinates);
    return `${locationLabel} | ${properties.reportedAt} | Prioridade ${properties.severity}`;
  }

  function resolveBuildingName(properties, relatedMarking) {
    const directName = firstNonEmpty(
      properties.name,
      properties["name:pt"],
      properties["name:latin"],
      properties.ref,
    );

    if (directName) {
      return directName;
    }

    if (relatedMarking?.properties?.locationName) {
      return relatedMarking.properties.locationName;
    }

    return "Edificacao monitorada";
  }

  function resolveBuildingType(properties) {
    const rawType = firstNonEmpty(
      properties.building,
      properties.class,
      properties.amenity,
      properties.landuse,
    );

    const typeMap = {
      university: "Edificacao academica",
      college: "Edificacao academica",
      school: "Edificacao educacional",
      office: "Edificacao administrativa",
      public: "Equipamento publico",
      service: "Infraestrutura de apoio",
      hospital: "Equipamento de saude",
      residential: "Residencia universitaria",
      dormitory: "Residencia universitaria",
      commercial: "Edificacao de uso misto",
      industrial: "Infraestrutura tecnica",
      parking: "Estrutura de apoio",
      sports_centre: "Equipamento esportivo",
      stadium: "Equipamento esportivo",
    };

    return typeMap[slugify(rawType)] ?? "Edificacao do campus";
  }

  function getStatusTone(status, severity) {
    const normalizedStatus = String(status ?? "").toLowerCase();
    const normalizedSeverity = String(severity ?? "").toLowerCase();

    if (normalizedSeverity === "alta" || normalizedStatus === "aberto" || normalizedStatus === "novo") {
      return "alert";
    }

    if (normalizedStatus.includes("analise") || normalizedStatus === "planejado") {
      return "watch";
    }

    return "ok";
  }

  function sortMarkingsByDateDesc(a, b) {
    return String(b.properties.reportedAt).localeCompare(String(a.properties.reportedAt));
  }

  function sortMarkingsByPriority(a, b) {
    return getMarkingPriorityScore(b) - getMarkingPriorityScore(a);
  }

  function getMarkingPriorityScore(feature) {
    const severityWeights = {
      alta: 3,
      media: 2,
      baixa: 1,
    };
    const statusWeights = {
      aberto: 3,
      novo: 3,
      "em analise": 2,
      planejado: 1,
      registrado: 1,
    };

    const severity = slugify(feature.properties.severity);
    const status = slugify(feature.properties.status).replace(/-/g, " ");
    const severityScore = severityWeights[severity] ?? 0;
    const statusScore = statusWeights[status] ?? 0;
    const recencyScore = Number(String(feature.properties.reportedAt).replaceAll("-", "")) || 0;

    return severityScore * 100000 + statusScore * 10000 + recencyScore;
  }

  function queryCampusSourceFeatures(reference) {
    return querySourceFeaturesSafe(reference).filter((feature) =>
      geometryIntersectsCampus(feature.geometry),
    );
  }

  function querySourceFeaturesInBounds(reference, bounds) {
    return querySourceFeaturesSafe(reference).filter((feature) =>
      geometryIntersectsBoundsObject(feature.geometry, bounds),
    );
  }

  function querySourceFeaturesSafe(reference) {
    try {
      return map.querySourceFeatures(reference.source, {
        sourceLayer: reference.sourceLayer,
      });
    } catch (error) {
      console.warn("Nao foi possivel consultar features da fonte vetorial.", error);
      return [];
    }
  }

  function isLikelyTreePoint(properties) {
    const tokens = [
      properties?.class,
      properties?.subclass,
      properties?.natural,
      properties?.kind,
      properties?.category,
    ].map(slugify);

    return tokens.includes("tree");
  }

  function isLikelyVegetationPolygon(properties) {
    const landuse = slugify(properties?.landuse);
    const leisure = slugify(properties?.leisure);
    const classToken = slugify(properties?.class);
    const subclassToken = slugify(properties?.subclass);

    return (
      ["grass", "park"].includes(landuse) ||
      leisure === "park" ||
      ["grass", "park"].includes(classToken) ||
      ["grass", "park"].includes(subclassToken)
    );
  }

  function dedupeFeaturesByGeometry(features) {
    const seen = new Set();

    return features.filter((feature) => {
      const fingerprint = getGeometryFingerprint(feature.geometry);

      if (seen.has(fingerprint)) {
        return false;
      }

      seen.add(fingerprint);
      return true;
    });
  }

  function getTreePlacementVegetationFeatures() {
    return dedupeFeaturesByGeometry(
      getTreePlacementSourceReferences().flatMap((reference) =>
        queryCampusSourceFeatures(reference)
          .map(normalizePolygonFeature)
          .filter(Boolean)
          .filter((feature) => isLikelyVegetationPolygon(feature.properties)),
      ),
    );
  }

  function sampleTreePointsFromGeometry(geometry, geometrySeed) {
    const bounds = getGeometryBounds(geometry);

    if (!bounds) {
      return [];
    }

    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const center = getGeometryCenter(geometry);
    const widthMeters = haversineDistanceMeters(
      [southWest.lng, southWest.lat],
      [northEast.lng, southWest.lat],
    );
    const heightMeters = haversineDistanceMeters(
      [southWest.lng, southWest.lat],
      [southWest.lng, northEast.lat],
    );
    const geometryArea = estimateGeometryAreaSquareMeters(geometry);

    if (
      geometryArea < TREE_MODEL_CONFIG.minVegetationAreaSquareMeters ||
      widthMeters < TREE_MODEL_CONFIG.minPointSpacingMeters ||
      heightMeters < TREE_MODEL_CONFIG.minPointSpacingMeters
    ) {
      return [];
    }

    const densityMix = seededUnitValue(`${geometrySeed}-density`);
    const densityFactor = interpolateNumber(
      TREE_MODEL_CONFIG.minDensityFactor,
      TREE_MODEL_CONFIG.maxDensityFactor,
      densityMix,
    );
    const spacingMeters = interpolateNumber(
      TREE_MODEL_CONFIG.maxSampleSpacingMeters,
      TREE_MODEL_CONFIG.minSampleSpacingMeters,
      densityMix,
    );
    const targetCount = Math.min(
      TREE_MODEL_CONFIG.maxPointsPerVegetationFeature,
      Math.max(
        1,
        Math.round((geometryArea / TREE_MODEL_CONFIG.areaPerTreeSquareMeters) * densityFactor),
      ),
    );
    const latStep = metersToLatDegrees(spacingMeters);
    const lngStep = metersToLngDegrees(spacingMeters, center[1]);
    const latOffsetFactor = interpolateNumber(
      0.18,
      0.82,
      seededUnitValue(`${geometrySeed}-lat-offset`),
    );
    const lngOffsetFactor = interpolateNumber(
      0.18,
      0.82,
      seededUnitValue(`${geometrySeed}-lng-offset`),
    );
    const sampledPoints = [];

    for (
      let lat = southWest.lat + latStep * latOffsetFactor;
      lat <= northEast.lat;
      lat += latStep
    ) {
      for (
        let lng = southWest.lng + lngStep * lngOffsetFactor;
        lng <= northEast.lng;
        lng += lngStep
      ) {
        const jitterSeed = `${geometrySeed}:${lng.toFixed(6)}:${lat.toFixed(6)}`;
        const candidate = [
          lng + (seededUnitValue(`${jitterSeed}-lng`) - 0.5) * lngStep * 0.72,
          lat + (seededUnitValue(`${jitterSeed}-lat`) - 0.5) * latStep * 0.72,
        ];

        if (!isPointInCampusArea(candidate) || !pointInGeometry(candidate, geometry)) {
          continue;
        }

        sampledPoints.push({
          coordinates: candidate,
          seed: jitterSeed,
          rank: seededUnitValue(`${jitterSeed}-rank`),
        });
      }
    }

    if (!sampledPoints.length && isPointInCampusArea(center) && pointInGeometry(center, geometry)) {
      sampledPoints.push({
        coordinates: center,
        seed: `center:${geometrySeed}:${center[0].toFixed(6)}:${center[1].toFixed(6)}`,
        rank: seededUnitValue(`${geometrySeed}-center-rank`),
      });
    }

    return sampledPoints
      .sort((a, b) => a.rank - b.rank)
      .slice(0, targetCount)
      .map(({ coordinates, seed }) => ({
        coordinates,
        seed,
      }));
  }

  function appendUniqueTreePoint(
    collection,
    seenSet,
    treePoint,
    minSpacingMeters = TREE_MODEL_CONFIG.minPointSpacingMeters,
  ) {
    const coordinates = (treePoint.coordinates ?? []).map(Number);

    if (
      coordinates.length !== 2 ||
      !coordinates.every(Number.isFinite) ||
      !isPointInCampusArea(coordinates)
    ) {
      return false;
    }

    const key = getPointSeed(coordinates);

    if (seenSet?.has(key)) {
      return false;
    }

    if (
      collection.some(
        (existingPoint) =>
          haversineDistanceMeters(existingPoint.coordinates, coordinates) < minSpacingMeters,
      )
    ) {
      return false;
    }

    if (seenSet) {
      seenSet.add(key);
    }

    collection.push({
      coordinates,
      seed: treePoint.seed ?? key,
    });

    return true;
  }

  function isPointInsideVegetationAreas(point, vegetationFeatures) {
    if (!vegetationFeatures.length) {
      return false;
    }

    return vegetationFeatures.some((feature) => pointInGeometry(point, feature.geometry));
  }

  function geometryIntersectsCampus(geometry) {
    const campusGeometry = getCampusBoundaryGeometry();
    const campusBounds = getCampusBoundaryBounds();

    if (!geometry || !campusGeometry || !campusBounds) {
      return false;
    }

    const geometryBounds = getGeometryBounds(geometry);

    if (!geometryBounds || !boundsOverlap(campusBounds, geometryBounds)) {
      return false;
    }

    if (geometry.type === "Point") {
      return isPointInCampusArea(geometry.coordinates);
    }

    const geometryPoints = flattenGeometryCoordinates(geometry);

    if (geometryPoints.some((point) => isPointInCampusArea(point))) {
      return true;
    }

    if (
      ["Polygon", "MultiPolygon"].includes(geometry.type) &&
      flattenGeometryCoordinates(campusGeometry).some((point) => pointInGeometry(point, geometry))
    ) {
      return true;
    }

    return geometriesHaveSegmentIntersection(geometry, campusGeometry);
  }

  function isPointInCampusArea(point) {
    const campusGeometry = getCampusBoundaryGeometry();

    if (!campusGeometry) {
      return false;
    }

    return pointInGeometry(point, campusGeometry);
  }

  function boundsOverlap(a, b) {
    const aSouthWest = a.getSouthWest();
    const aNorthEast = a.getNorthEast();
    const bSouthWest = b.getSouthWest();
    const bNorthEast = b.getNorthEast();

    return !(
      aNorthEast.lng < bSouthWest.lng ||
      aSouthWest.lng > bNorthEast.lng ||
      aNorthEast.lat < bSouthWest.lat ||
      aSouthWest.lat > bNorthEast.lat
    );
  }

  function geometriesHaveSegmentIntersection(a, b) {
    const aSegments = getGeometrySegments(a);
    const bSegments = getGeometrySegments(b);

    return aSegments.some(([aStart, aEnd]) =>
      bSegments.some(([bStart, bEnd]) => segmentsIntersect(aStart, aEnd, bStart, bEnd)),
    );
  }

  function getGeometrySegments(geometry) {
    if (!geometry) {
      return [];
    }

    if (geometry.type === "LineString") {
      return getRingSegments(geometry.coordinates);
    }

    if (geometry.type === "MultiLineString") {
      return geometry.coordinates.flatMap((line) => getRingSegments(line));
    }

    if (geometry.type === "Polygon") {
      return geometry.coordinates.flatMap((ring) => getRingSegments(ring));
    }

    if (geometry.type === "MultiPolygon") {
      return geometry.coordinates.flatMap((polygon) =>
        polygon.flatMap((ring) => getRingSegments(ring)),
      );
    }

    return [];
  }

  function getRingSegments(coordinates) {
    const segments = [];

    for (let index = 1; index < coordinates.length; index += 1) {
      segments.push([coordinates[index - 1], coordinates[index]]);
    }

    return segments;
  }

  function segmentsIntersect(a, b, c, d) {
    const orientation1 = segmentOrientation(a, b, c);
    const orientation2 = segmentOrientation(a, b, d);
    const orientation3 = segmentOrientation(c, d, a);
    const orientation4 = segmentOrientation(c, d, b);

    if (
      orientation1 !== orientation2 &&
      orientation3 !== orientation4
    ) {
      return true;
    }

    return (
      (orientation1 === 0 && pointOnSegment(c, a, b)) ||
      (orientation2 === 0 && pointOnSegment(d, a, b)) ||
      (orientation3 === 0 && pointOnSegment(a, c, d)) ||
      (orientation4 === 0 && pointOnSegment(b, c, d))
    );
  }

  function segmentOrientation(a, b, c) {
    const value =
      (b[1] - a[1]) * (c[0] - b[0]) -
      (b[0] - a[0]) * (c[1] - b[1]);

    if (Math.abs(value) <= Number.EPSILON) {
      return 0;
    }

    return value > 0 ? 1 : 2;
  }

  function pointOnSegment(point, start, end) {
    return (
      point[0] <= Math.max(start[0], end[0]) + Number.EPSILON &&
      point[0] >= Math.min(start[0], end[0]) - Number.EPSILON &&
      point[1] <= Math.max(start[1], end[1]) + Number.EPSILON &&
      point[1] >= Math.min(start[1], end[1]) - Number.EPSILON
    );
  }

  function estimateGeometryAreaSquareMeters(geometry) {
    if (!geometry) {
      return 0;
    }

    if (geometry.type === "Polygon") {
      return estimatePolygonAreaSquareMeters(geometry.coordinates);
    }

    if (geometry.type === "MultiPolygon") {
      return geometry.coordinates.reduce(
        (total, polygon) => total + estimatePolygonAreaSquareMeters(polygon),
        0,
      );
    }

    return 0;
  }

  function estimatePolygonAreaSquareMeters(polygon) {
    if (!Array.isArray(polygon) || !polygon.length) {
      return 0;
    }

    const referenceLat =
      polygon[0].reduce((total, coordinate) => total + Number(coordinate?.[1] ?? 0), 0) /
      Math.max(polygon[0].length, 1);

    return polygon.reduce((total, ring, index) => {
      const ringArea = estimateRingAreaSquareMeters(ring, referenceLat);
      return total + (index === 0 ? ringArea : -ringArea);
    }, 0);
  }

  function estimateRingAreaSquareMeters(ring, referenceLat) {
    if (!Array.isArray(ring) || ring.length < 3) {
      return 0;
    }

    let shoelaceArea = 0;

    for (let index = 0; index < ring.length; index += 1) {
      const current = projectCoordinateToMeters(ring[index], referenceLat);
      const next = projectCoordinateToMeters(
        ring[(index + 1) % ring.length],
        referenceLat,
      );

      shoelaceArea += current[0] * next[1] - next[0] * current[1];
    }

    return Math.abs(shoelaceArea) / 2;
  }

  function projectCoordinateToMeters(coordinate, referenceLat) {
    const earthRadius = 6371000;
    const lng = (Number(coordinate?.[0] ?? 0) * Math.PI) / 180;
    const lat = (Number(coordinate?.[1] ?? 0) * Math.PI) / 180;
    const referenceLatRadians = (referenceLat * Math.PI) / 180;

    return [
      lng * earthRadius * Math.cos(referenceLatRadians),
      lat * earthRadius,
    ];
  }

  function buildCirclePolygon(center, radiusMeters, sides) {
    const [lng, lat] = center;
    const coordinates = [];

    for (let index = 0; index < sides; index += 1) {
      const angle = (Math.PI * 2 * index) / sides;
      const offsetLng = metersToLngDegrees(Math.cos(angle) * radiusMeters, lat);
      const offsetLat = metersToLatDegrees(Math.sin(angle) * radiusMeters);
      coordinates.push([lng + offsetLng, lat + offsetLat]);
    }

    coordinates.push(coordinates[0]);

    return {
      type: "Polygon",
      coordinates: [coordinates],
    };
  }

  function buildOrganicCanopyPolygon(center, radiusMeters, sides, seed) {
    const [lng, lat] = center;
    const coordinates = [];
    const rotation = Math.PI * 2 * seededUnitValue(`${seed}-rotation`);
    const radiusX =
      radiusMeters *
      interpolateNumber(0.82, 1.24, seededUnitValue(`${seed}-stretch-x`));
    const radiusY =
      radiusMeters *
      interpolateNumber(0.8, 1.18, seededUnitValue(`${seed}-stretch-y`));

    for (let index = 0; index < sides; index += 1) {
      const angle = rotation + (Math.PI * 2 * index) / sides;
      const wobble = interpolateNumber(
        1 - TREE_MODEL_CONFIG.canopyWobbleFactor,
        1 + TREE_MODEL_CONFIG.canopyWobbleFactor,
        seededUnitValue(`${seed}-vertex-${index}`),
      );
      const offsetLng = metersToLngDegrees(Math.cos(angle) * radiusX * wobble, lat);
      const offsetLat = metersToLatDegrees(Math.sin(angle) * radiusY * wobble);
      coordinates.push([lng + offsetLng, lat + offsetLat]);
    }

    coordinates.push(coordinates[0]);

    return {
      type: "Polygon",
      coordinates: [coordinates],
    };
  }

  function metersToLatDegrees(meters) {
    return meters / 111320;
  }

  function metersToLngDegrees(meters, latitude) {
    const latitudeFactor = Math.cos((latitude * Math.PI) / 180);
    return meters / (111320 * Math.max(Math.abs(latitudeFactor), 0.2));
  }

  function interpolateNumber(min, max, t) {
    return min + (max - min) * t;
  }

  function seededUnitValue(seed) {
    let hash = 2166136261;

    for (const character of String(seed)) {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }

    return ((hash >>> 0) % 10000) / 9999;
  }

  function getPointSeed(point) {
    return `${Number(point[0]).toFixed(5)}:${Number(point[1]).toFixed(5)}`;
  }

  function getGeometryBounds(geometry) {
    const points = flattenGeometryCoordinates(geometry);

    if (!points.length) {
      return null;
    }

    const bounds = new maplibregl.LngLatBounds(points[0], points[0]);
    points.slice(1).forEach((point) => bounds.extend(point));
    return bounds;
  }

  function getGeometryCenter(geometry) {
    const bounds = getGeometryBounds(geometry);
    return bounds ? bounds.getCenter().toArray() : DEFAULT_MAP_CENTER.slice();
  }

  function flattenGeometryCoordinates(geometry) {
    if (!geometry) {
      return [];
    }

    if (geometry.type === "Point") {
      return [geometry.coordinates];
    }

    if (geometry.type === "MultiPoint") {
      return geometry.coordinates;
    }

    if (geometry.type === "LineString") {
      return geometry.coordinates;
    }

    if (geometry.type === "MultiLineString") {
      return geometry.coordinates.flat();
    }

    if (geometry.type === "Polygon") {
      return geometry.coordinates.flat();
    }

    if (geometry.type === "MultiPolygon") {
      return geometry.coordinates.flat(2);
    }

    return [];
  }

  function pointInGeometry(point, geometry) {
    if (geometry.type === "Polygon") {
      return pointInPolygon(point, geometry.coordinates);
    }

    if (geometry.type === "MultiPolygon") {
      return geometry.coordinates.some((polygon) => pointInPolygon(point, polygon));
    }

    return false;
  }

  function pointInPolygon(point, polygon) {
    const outerRing = polygon[0];

    if (pointOnRing(point, outerRing)) {
      return true;
    }

    if (!rayCastPointInRing(point, outerRing)) {
      return false;
    }

    return !polygon.slice(1).some(
      (ring) => pointOnRing(point, ring) || rayCastPointInRing(point, ring),
    );
  }

  function rayCastPointInRing(point, ring) {
    let inside = false;
    const [x, y] = point;

    for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
      const [xi, yi] = ring[index];
      const [xj, yj] = ring[previous];
      const intersects =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / ((yj - yi) || Number.EPSILON) + xi;

      if (intersects) {
        inside = !inside;
      }
    }

    return inside;
  }

  function pointOnRing(point, ring) {
    for (let index = 1; index < ring.length; index += 1) {
      if (segmentOrientation(ring[index - 1], ring[index], point) === 0) {
        if (pointOnSegment(point, ring[index - 1], ring[index])) {
          return true;
        }
      }
    }

    return false;
  }

  function expandBounds(bounds, lngPadding, latPadding) {
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    return {
      west: southWest.lng - lngPadding,
      south: southWest.lat - latPadding,
      east: northEast.lng + lngPadding,
      north: northEast.lat + latPadding,
    };
  }

  function expandLngLatBoundsByMeters(bounds, paddingMeters) {
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const centerLatitude = (southWest.lat + northEast.lat) / 2;
    const latPadding = metersToLatDegrees(paddingMeters);
    const lngPadding = metersToLngDegrees(paddingMeters, centerLatitude);

    return {
      west: southWest.lng - lngPadding,
      south: southWest.lat - latPadding,
      east: northEast.lng + lngPadding,
      north: northEast.lat + latPadding,
    };
  }

  function isPointWithinBounds(point, bounds) {
    const [lng, lat] = point;
    return lng >= bounds.west && lng <= bounds.east && lat >= bounds.south && lat <= bounds.north;
  }

  function geometryIntersectsBoundsObject(geometry, bounds) {
    if (!geometry || !bounds) {
      return false;
    }

    const geometryBounds = getGeometryBounds(geometry);

    if (!geometryBounds) {
      return false;
    }

    const boundsAsLngLat = new maplibregl.LngLatBounds(
      [bounds.west, bounds.south],
      [bounds.east, bounds.north],
    );

    if (!boundsOverlap(boundsAsLngLat, geometryBounds)) {
      return false;
    }

    return flattenGeometryCoordinates(geometry).some((point) => isPointWithinBounds(point, bounds));
  }

  function clampNumber(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function roundNumber(value, digits = 0) {
    const factor = 10 ** digits;
    return Math.round(value * factor) / factor;
  }

  function firstFiniteNumber(...values) {
    for (const value of values) {
      const parsed = Number.parseFloat(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return null;
  }

  function haversineDistanceMeters(a, b) {
    const toRadians = (value) => (value * Math.PI) / 180;
    const earthRadius = 6371000;
    const deltaLat = toRadians(b[1] - a[1]);
    const deltaLng = toRadians(b[0] - a[0]);
    const lat1 = toRadians(a[1]);
    const lat2 = toRadians(b[1]);
    const sinLat = Math.sin(deltaLat / 2);
    const sinLng = Math.sin(deltaLng / 2);

    const haversine =
      sinLat * sinLat +
      Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;

    return 2 * earthRadius * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  }

  function getGeometryFingerprint(geometry) {
    return JSON.stringify(geometry.coordinates).slice(0, 320);
  }

  function formatCoordinates(coordinates) {
    const [lng, lat] = coordinates;
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }

  function firstNonEmpty(...values) {
    return values.find((value) => String(value ?? "").trim()) ?? "";
  }

  function cryptoRandomId() {
    return `r${Math.random().toString(36).slice(2, 10)}`;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );
  }

  function mixHexColors(fromHex, toHex, t) {
    const mix = clampNumber(t, 0, 1);
    const from = hexToRgb(fromHex);
    const to = hexToRgb(toHex);

    return rgbToHex({
      red: from.red + (to.red - from.red) * mix,
      green: from.green + (to.green - from.green) * mix,
      blue: from.blue + (to.blue - from.blue) * mix,
    });
  }

  function adjustHexColor(
    hex,
    {
      hueShiftDegrees = 0,
      saturationDelta = 0,
      lightnessDelta = 0,
    } = {},
  ) {
    const { red, green, blue } = hexToRgb(hex);
    const { hue, saturation, lightness } = rgbToHsl(red, green, blue);
    const adjustedHue = (hue + hueShiftDegrees / 360 + 1) % 1;
    const adjustedSaturation = clampNumber(saturation + saturationDelta, 0, 1);
    const adjustedLightness = clampNumber(lightness + lightnessDelta, 0, 1);

    return rgbToHex(hslToRgb(adjustedHue, adjustedSaturation, adjustedLightness));
  }

  function hexToRgb(hex) {
    const sanitized = String(hex ?? "").replace("#", "");
    const value =
      sanitized.length === 3
        ? sanitized
            .split("")
            .map((character) => character + character)
            .join("")
        : sanitized.padEnd(6, "0").slice(0, 6);

    return {
      red: Number.parseInt(value.slice(0, 2), 16),
      green: Number.parseInt(value.slice(2, 4), 16),
      blue: Number.parseInt(value.slice(4, 6), 16),
    };
  }

  function rgbToHex({ red, green, blue }) {
    return `#${[red, green, blue]
      .map((channel) => clampNumber(Math.round(channel), 0, 255).toString(16).padStart(2, "0"))
      .join("")}`;
  }

  function rgbToHsl(red, green, blue) {
    const normalizedRed = red / 255;
    const normalizedGreen = green / 255;
    const normalizedBlue = blue / 255;
    const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
    const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
    const lightness = (max + min) / 2;
    const delta = max - min;

    if (!delta) {
      return {
        hue: 0,
        saturation: 0,
        lightness,
      };
    }

    const saturation =
      lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    let hue;

    switch (max) {
      case normalizedRed:
        hue = (normalizedGreen - normalizedBlue) / delta + (normalizedGreen < normalizedBlue ? 6 : 0);
        break;
      case normalizedGreen:
        hue = (normalizedBlue - normalizedRed) / delta + 2;
        break;
      default:
        hue = (normalizedRed - normalizedGreen) / delta + 4;
        break;
    }

    return {
      hue: hue / 6,
      saturation,
      lightness,
    };
  }

  function hslToRgb(hue, saturation, lightness) {
    if (!saturation) {
      const channel = lightness * 255;

      return {
        red: channel,
        green: channel,
        blue: channel,
      };
    }

    const hueToChannel = (p, q, t) => {
      let wrappedT = t;

      if (wrappedT < 0) {
        wrappedT += 1;
      }

      if (wrappedT > 1) {
        wrappedT -= 1;
      }

      if (wrappedT < 1 / 6) {
        return p + (q - p) * 6 * wrappedT;
      }

      if (wrappedT < 1 / 2) {
        return q;
      }

      if (wrappedT < 2 / 3) {
        return p + (q - p) * (2 / 3 - wrappedT) * 6;
      }

      return p;
    };

    const q =
      lightness < 0.5
        ? lightness * (1 + saturation)
        : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;

    return {
      red: hueToChannel(p, q, hue + 1 / 3) * 255,
      green: hueToChannel(p, q, hue) * 255,
      blue: hueToChannel(p, q, hue - 1 / 3) * 255,
    };
  }

  function hexToRgba(hex, alpha) {
    const { red, green, blue } = hexToRgb(hex);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
})();
