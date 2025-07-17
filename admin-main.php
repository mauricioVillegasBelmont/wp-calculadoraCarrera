<?php
// File: my-plugin/admin-panel.php

add_action('admin_init', function () {
  register_setting('carreras_config_group', 'carreras_config', [
    'type' => 'array',
    'sanitize_callback' => 'mi_plugin_sanitizar_configuracion',
    'default' => []
  ]);
});


function CalcITAM_render_panel()
{
  $configuracion = obtener_configuracion_plugin();
?>
  <style>
    .semester_setup tr:not(:last-of-type) .remove_semester {
      display: none;
    }
  </style>
  <div class="wrap">
    <h2>Configuración del Plugin</h2>
    <form method="post" action="options.php">
      <?php
      settings_fields('carreras_config_group'); // Esto es crucial
      do_settings_sections('carreras-config'); // Asegúrate de usar el mismo slug que en add_menu_page
      ?>
      <table id="config-table" class="form-table">
        <tbody>
        </tbody>
      </table>
      <button type="button" id="add-config">Agregar Nueva Config</button>
      <?php submit_button(); ?>
    </form>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const registro = <?php echo json_encode($configuracion); ?>;
      registro.forEach((item, index) => addCarrera(item));
    });

    let index = <?php echo count($configuracion); ?>;

    document.getElementById('add-config').addEventListener('click', addCarrera);

    function addCarrera(values = {}) {
      const {
        carrera = '', description = '', desglose = []
      } = values;
      const table = document.getElementById('config-table').querySelector('tbody');
      const row = document.createElement('tr');
      row.id = `carrera_${index}`;
      row.innerHTML = `
        <td id="carrera_${index}">
            <table class="widefat">
                <tr colspan="4">
                    <button data-index="${index}" onclick="removeRow(this)" style="margin-left:auto; display:block;" type="button">
                        <span class="dashicons dashicons-no-alt"></span> remove
                    </button>
                </tr>
                <tr>
                    <td colspan="2">
                        <p>Carrera:</p>
                        <input type="text" name="carreras_config[${index}][carrera]" 
                        value="${carrera}"
                        placeholder="Carrera" style="width: 100%" required />
                    </td>
                    <td colspan="2">
                        <p>Descripción:</p>
                        <input type="text" name="carreras_config[${index}][description]" 
                        value="${description}"
                        placeholder="Descripción" style="width: 100%" required />
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: baseline;">
                        <p id="semstre_count__${index}" style="margin-bottom:.5rem;">Semestres totales: 1</p>
                        <p id="creditos_count__${index}" style="margin-bottom:.5rem;">Creditos totales: 0</p>
                        <button type="button"  onclick="addSemester(${index})"><span class="dashicons dashicons-plus-alt2"></span> añadir semestre</button>
                    </td>
                    <td colspan="3">
                        <p>Créditos por semestre:</p>
                        <table class="semestres__${index} semester_setup" style="width: 100%">
                            <tbody class="table-body"></tbody>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
      `;
      table.appendChild(row);
      if (desglose.length > 0) {
        desglose.forEach((value) => {
          addSemester(index, value)
        });
      } else {
        addSemester(index)
      }
      updateStats(index);
      index++;
    }

    function removeRow(button) {
      const rowId = `carrera_${button.dataset.index}`;
      const row = document.getElementById(rowId);
      if (row) row.remove();
    }

    function addSemester(idx, value = 0) {
      const semestresTable = document.querySelector(`.semestres__${idx} .table-body`);
      const count = semestresTable.querySelectorAll('tr').length + 1;
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
            <td colspan="3">
              <div style="display:flex; align-items:center;">
                <span style="display: inline-block; margin-right: .75rem;">S${count} - Creditos:</span>
                <input type="number" name="carreras_config[${idx}][desglose][]" value="${value}" min="1" style="flex-grow: 1; display:inline-block;" oninput="updateStats(${idx})" />
                <button type="button" class="remove_semester" data-index="${idx}" onclick="removeSemester(this)"><span class="dashicons dashicons-no-alt"></span> remover</button>
              </div>
            </td>
            `;
      semestresTable.appendChild(newRow);
      updateStats(idx);
    }

    function removeSemester(button) {
      // const row = button.closest('tr');
      const table = button.closest('table');
      const table_rows = table.querySelectorAll('tr');
      if (table_rows.length > 1) {
        table_rows[table_rows.length - 1].remove();
        const idx = button.dataset.index;
        updateStats(idx);
      } else {
        alert("Debe haber al menos un semestre.");
      }
    }

    function updateStats(idx) {
      const semestres = document.querySelectorAll(`.semestres__${idx} input[type='number']`);
      let suma = 0;
      semestres.forEach(el => suma += parseInt(el.value || 0));
      document.getElementById(`semstre_count__${idx}`).textContent = `Semestres totales: ${semestres.length}`;
      document.getElementById(`creditos_count__${idx}`).textContent = `Creditos totales: ${suma}`;
    }
  </script>
<?php
}

function obtener_configuracion_plugin()
{
  $config = get_option('carreras_config', []);
  foreach ($config as &$item) {
    if (isset($item['desglose']) && is_array($item['desglose'])) {
      $item['desglose'] = array_map('intval', $item['desglose']);
    }
  }
  return $config;
}
function mi_plugin_sanitizar_configuracion($input)
{
  $output = [];

  foreach ($input as $item) {
    $carrera = sanitize_text_field($item['carrera'] ?? '');
    $description = sanitize_text_field($item['description'] ?? '');
    $desglose = array_map('intval', $item['desglose'] ?? []);

    $output[] = [
      'carrera' => $carrera,
      'description' => $description,
      'desglose' => $desglose,
    ];
  }

  return $output;
}
