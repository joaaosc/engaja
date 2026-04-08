export function createReportClickFlow({
  buildDraftMarking,
  closeActivePopup,
  disablePlacementMode,
  isPointInCampusArea,
  reportFormModal,
  setModeStatus,
  syncCursor,
}) {
  return {
    handleMapPlacementClick,
  };

  function handleMapPlacementClick(event) {
    const draftMarking = buildDraftMarking();

    if (!draftMarking) {
      disablePlacementMode();
      setModeStatus("Selecione uma categoria antes de capturar o ponto do report.");
      return;
    }

    const coordinates = [event.lngLat.lng, event.lngLat.lat];

    if (!isPointInCampusArea(coordinates)) {
      setModeStatus(
        "Fora do limite oficial da Cidade Universitaria. Escolha um ponto dentro do contorno.",
      );
      syncCursor("not-allowed");
      return;
    }

    closeActivePopup();
    disablePlacementMode();

    reportFormModal.open({
      categoryId: draftMarking.category.id,
      description: draftMarking.description,
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    });

    setModeStatus("Coordenadas capturadas. O formulario do report foi aberto.");
  }
}
