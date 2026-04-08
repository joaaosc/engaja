export function createReportFormModal({
  categories,
  maxDescriptionLength = 120,
  onClose = () => {},
  onSubmit = async () => {},
} = {}) {
  const container = document.createElement("div");
  container.className = "report-form-modal";
  container.hidden = true;
  container.innerHTML = `
    <div class="report-form-modal__backdrop" data-close-modal></div>
    <div
      class="report-form-modal__dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-form-modal-title"
    >
      <form class="report-form-card">
        <div class="report-form-card__header">
          <div class="report-form-card__title-group">
            <p class="eyebrow">Novo report</p>
            <h2 id="report-form-modal-title">Formulario de report</h2>
          </div>
          <button
            class="ghost-button report-form-card__close"
            type="button"
            data-close-modal
            aria-label="Fechar formulario"
          >
            Fechar
          </button>
        </div>

        <p class="report-form-card__intro">
          O ponto foi capturado no mapa. Ao enviar, o report sera persistido pela API ou salvo
          localmente neste navegador se ela estiver indisponivel.
        </p>

        <div class="report-form-grid">
          <label class="field">
            <span>Titulo</span>
            <input
              id="report-title-input"
              name="title"
              type="text"
              maxlength="80"
              placeholder="Ex.: Poste apagado perto do CT"
            />
          </label>

          <label class="field">
            <span>Categoria</span>
            <select id="report-category-select" name="category"></select>
          </label>

          <label class="field report-form-grid__full">
            <div class="field-label-row">
              <span>Descricao</span>
              <small>Opcional</small>
            </div>
            <textarea
              id="report-description-textarea"
              name="description"
              rows="4"
              maxlength="${maxDescriptionLength}"
              placeholder="Descreva rapidamente o problema observado."
            ></textarea>
          </label>

          <label class="field">
            <span>Latitude</span>
            <input id="report-latitude-input" name="latitude" type="text" readonly />
          </label>

          <label class="field">
            <span>Longitude</span>
            <input id="report-longitude-input" name="longitude" type="text" readonly />
          </label>
        </div>

        <div class="report-form-card__footer">
          <p class="report-form-card__note" data-report-form-feedback>
            Preencha os dados e envie para criar um novo report.
          </p>
          <div class="report-form-card__actions">
            <button class="ghost-button" type="button" data-close-modal>
              Cancelar
            </button>
            <button class="primary-button" type="submit" data-report-form-submit>
              Salvar report
            </button>
          </div>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(container);

  const categorySelect = container.querySelector("#report-category-select");
  const titleInput = container.querySelector("#report-title-input");
  const descriptionTextarea = container.querySelector("#report-description-textarea");
  const latitudeInput = container.querySelector("#report-latitude-input");
  const longitudeInput = container.querySelector("#report-longitude-input");
  const feedbackElement = container.querySelector("[data-report-form-feedback]");
  const submitButton = container.querySelector("[data-report-form-submit]");
  const form = container.querySelector("form");

  let lastFocusedElement = null;
  let isSubmitting = false;

  renderCategoryOptions();

  container.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", () => close("dismissed"));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    clearFeedback();
    setSubmitting(true);

    try {
      await onSubmit({
        title: titleInput.value.trim(),
        categoryId: categorySelect.value,
        description: descriptionTextarea.value.trim(),
        latitude: Number(latitudeInput.value),
        longitude: Number(longitudeInput.value),
      });

      close("submitted");
    } catch (error) {
      setFeedback(error?.message ?? "Falha ao enviar o report.", true);
    } finally {
      setSubmitting(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !container.hidden) {
      close("dismissed");
    }
  });

  return {
    close,
    open,
  };

  function open(draft) {
    lastFocusedElement = document.activeElement;
    titleInput.value = "";
    descriptionTextarea.value = draft.description ?? "";
    categorySelect.value = draft.categoryId ?? categories[0]?.id ?? "";
    latitudeInput.value = formatCoordinate(draft.latitude);
    longitudeInput.value = formatCoordinate(draft.longitude);
    clearFeedback();
    setSubmitting(false);

    container.hidden = false;
    document.body.classList.add("has-report-form-modal");
    titleInput.focus();
  }

  function close(reason = "dismissed") {
    if (container.hidden) {
      return;
    }

    container.hidden = true;
    document.body.classList.remove("has-report-form-modal");
    onClose(reason);

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  }

  function clearFeedback() {
    feedbackElement.textContent = "Preencha os dados e envie para criar um novo report.";
    feedbackElement.classList.remove("report-form-card__note--error");
  }

  function renderCategoryOptions() {
    categorySelect.innerHTML = categories
      .map(
        (category) =>
          `<option value="${category.id}">${category.label}</option>`,
      )
      .join("");
  }

  function setFeedback(message, isError = false) {
    feedbackElement.textContent = message;
    feedbackElement.classList.toggle("report-form-card__note--error", isError);
  }

  function setSubmitting(nextValue) {
    isSubmitting = nextValue;
    submitButton.disabled = nextValue;
    submitButton.textContent = nextValue ? "Salvando..." : "Salvar report";
  }
}

function formatCoordinate(value) {
  return Number(value).toFixed(6);
}
