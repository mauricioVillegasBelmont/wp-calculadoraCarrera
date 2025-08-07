<?php

class CalcCarreras
{
  public $version;
  public $plugin_url;
  public function __construct($version, $plugin_url)
  {
    $this->version = $version;
    $this->plugin_url = $plugin_url;
    add_action('admin_init', array($this, 'register_settings'));
  }

  public function register_settings()
  {
    register_setting(
      'carreras_config_group',
      'carreras_config',
      array(
        'type' => 'array',
        'sanitize_callback' => array($this, 'sanitize_configuration'),
        'default' => array()
      )
    );
    add_settings_section(
      'carreras_config_section',
      'Configuración de Carreras',
      array($this, 'render_section_description'),
      'calc-itam-carreras'
    );
  }
  public function render_section_description()
  {
    echo '<p>Configura las carreras y sus desgloses.</p>';
  }

  public function rendes_styles()
  {
  ?>
    <style>
      .semester_setup tr:not(:last-of-type) .remove_semester {
        display: none !important;
      }
    </style>
  <?php
  }
  public function render_container()
  {
  ?>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
    <div class="container">
      <form method="post" action="options.php">
        <?php
        settings_fields('carreras_config_group');
        do_settings_sections('calc-itam-carreras');
        ?>
        <table id="config-table" class="form-table">
          <tbody>
          </tbody>
        </table>
        <button type="button" class="btn btn-primary d-block me-auto" id="add-config">Agregar Nueva Config</button>
        <?php submit_button(); ?>
      </form>
    </div>
  <?php
  }

  public function render_carreras_panel()
  {
    $this->rendes_styles();
    $this->render_container();


    $configuracion = $this->get_plugin_configuration();
  ?>
    <script>
      var registro = <?php echo json_encode($configuracion); ?> || [];
      var index = <?php echo count($configuracion); ?> || 0;

      document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('add-config').addEventListener('click', addCarrera);
        registro.forEach((item, index) => addCarrera(item));
      });

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
                    <button data-index="${index}" onclick="removeRow(this)" class="btn btn-danger d-block ms-auto" type="button">
                        <span class="dashicons dashicons-no-alt"></span> remove
                    </button>
                </tr>
                <tr>
                    <td colspan="2">
                        <label for="carreras_config_${index}_carrera" >Carrera:</label>
                        <input id="carreras_config_${index}_carrera" type="text" class="form-control" name="carreras_config[${index}][carrera]" 
                        value="${carrera}"
                        placeholder="Carrera" style="width: 100%" required />
                    </td>
                    <td colspan="2">
                        <label for="carreras_config_${index}_description">Descripción:</label>
                        <input id="carreras_config_${index}_description" type="text" class="form-control" name="carreras_config[${index}][description]" 
                        value="${description}"
                        placeholder="Descripción" style="width: 100%" required />
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: baseline;">
                        <p id="semstre_count__${index}" class="mb-2">Semestres totales: <span class="badge text-bg-primary">0</span></p>
                        <p id="creditos_count__${index}" class="mb-2">Semestres totales: <span class="badge text-bg-primary">0</span></p>
                        
                    </td>
                    <td colspan="3">
                        <p>Créditos por semestre:</p>
                        <table class="semestres__${index} semester_setup" style="width: 100%">
                            <tbody class="table-body"></tbody>
                            <tfoot>
                              <tr>
                                <th colspan="1">
                                  <button type="button" class="btn btn-primary d-block me-auto"" onclick="addSemester(${index})"><span class="dashicons dashicons-plus-alt2"></span> añadir semestre</button>
                                </th>
                                <th colspan="2">
                                </th>
                              </tr>
                            </tfoot>
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
        const hash = Math.random().toString(36).substring(7);
        newRow.innerHTML = `
      <td colspan="3">
        <div style="display:flex; align-items:center;">
          <label for="carreras_config_${idx}_desglose__${hash}" style="display: inline-block; margin-right: .75rem;">S${count} - Creditos:</label>
          <input id="carreras_config_${idx}_desglose__${hash}" type="number" name="carreras_config[${idx}][desglose][]" value="${value}" min="1" style="flex-grow: 1; display:inline-block;" oninput="updateStats(${idx})" />
          <button type="button" class="btn btn-danger d-block ms-auto remove_semester" data-index="${idx}" onclick="removeSemester(this)"><span class="dashicons dashicons-no-alt"></span> remover</button>
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
        document.getElementById(`semstre_count__${idx}`).innerHTML = `Semestres totales: <span class="badge text-bg-primary">${semestres.length}</span>`;
        document.getElementById(`creditos_count__${idx}`).innerHTML = `Creditos totales: <span class="badge text-bg-primary">${suma}</span>`;
      }
    </script>
  <?php
  }


  public function get_plugin_configuration()
  {
    $config = get_option('carreras_config', []);
    foreach ($config as &$item) {
      if (isset($item['desglose']) && is_array($item['desglose'])) {
        $item['desglose'] = array_map('intval', $item['desglose']);
      }
    }
    return $config;
  }

  public function sanitize_configuration($input)
  {
    // $errors = new WP_Error();
    // if (!is_array($input)) {
    //   return $output;
    // }
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
}
