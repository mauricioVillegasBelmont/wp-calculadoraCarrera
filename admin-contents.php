<?php

class CalcContents
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
    // $default = $this->get_default_values();
    register_setting(
      'calculadora_contents_group',
      'calculadora_contents',
      array(
        'type' => 'array',
        'sanitize_callback' => array($this, 'sanitize_configuration'),
        'default' => array()
      )
    );
    add_settings_section(
      'calculadora_contents_section',
      'Configuración de Contenidos',
      array($this, 'render_section_description'),
      'calc-itam-contents'
    );
  }
  public function render_section_description()
  {
    echo '<p>Configura los contenidos y sus secciones.</p>';
  }

  public function render_contents_panel()
  {
    $config = get_option('calculadora_contents', $this->get_default_values());
    // $config = $this->get_default_values();
    list("costos" => $costos, "contents" => $contents) = $config;
    list(
      "HeaderContents" => $HeaderContents,
      "SelectComponentContents" => $SelectComponentContents,
      "CarreraInfoContents" => $CarreraInfoContents,
      "ResumenCostosContents" => $ResumenCostosContents,
      "DesgloseCarreraContents" => $DesgloseCarreraContents,
      "ChartContents" => $ChartContents,
      "ImportantInfoContents" => $ImportantInfoContents,
      "PrintInfoContents" => $PrintInfoContents,
    ) = $contents;
?>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
    <div class="container">
      <form method="post" action="options.php">
        <?php
        settings_fields('calculadora_contents_group');
        do_settings_sections('calc-itam-contents');
        ?>

        <fieldset class="mb-3 pb-3">
          <legend>Costos</legend>
          <div class="form-group">
            <label for="costoCredito">Costo Credito:</label>
            <div class="input-group">
              <div class="input-group-text">$</div>
              <input type="number" class="form-control" id="costoCredito" name="calculadora_contents[costos][CostoCredito]" step="100" value="<?php echo $costos['CostoCredito']; ?>" required />
              <div class="input-group-text">MXN</div>
            </div>
          </div>
          <div class="form-group">
            <label for="cuotaNuevoIngreso">Cuota Nuevo Ingreso:</label>
            <div class="input-group">
              <div class="input-group-text">$</div>
              <input type="number" class="form-control" id="cuotaNuevoIngreso" name="calculadora_contents[costos][CuotaNuevoIngreso]" step="100" value="<?php echo $costos['CuotaNuevoIngreso']; ?>" required />
              <div class="input-group-text">MXN</div>
            </div>

          </div>
        </fieldset>

        <!-- Header Contents Section -->
        <hr>
        <fieldset class="mb-3 pb-3">
          <legend>Header Contents</legend>
          <div class="form-group">
            <label for="headerA">Title:</label>
            <input type="text" class="form-control" id="headerA" name="calculadora_contents[contents][HeaderContents][title]"
              value="<?php echo $HeaderContents['title']; ?>" required />
          </div>
        </fieldset>

        <!-- Select Component Contents Section -->
        <hr>
        <fieldset class="mb-3 pb-3">
          <legend>Select Component Contents</legend>
          <div class="form-group">
            <label for="selectA">Titulo:</label>
            <input type="text" class="form-control" id="selectA" name="calculadora_contents[contents][SelectComponentContents][title]" value="<?php echo $SelectComponentContents['title']; ?>" required />
          </div>
        </fieldset>

        <!-- Carrera Info Contents Section -->
        <hr>
        <fieldset class="mb-3 pb-3">
          <legend>Carrera Info Contents</legend>
          <div class="form-group">
            <label for="carreraA">Duracion Label:</label>
            <input type="text" class="form-control" id="carreraA" name="calculadora_contents[contents][CarreraInfoContents][durationLabel]" value="<?php echo $CarreraInfoContents['durationLabel']; ?>" required />
          </div>
          <div class="form-group">
            <label for="carreraB">Creditos Lable:</label>
            <input type="text" class="form-control" id="carreraB" name="calculadora_contents[contents][CarreraInfoContents][creditsLabel]" value="<?php echo $CarreraInfoContents['creditsLabel']; ?>" required />
          </div>
        </fieldset>

        <!-- Resumen Costos Contents Section -->
        <hr>
        <fieldset class="mb-3 pb-3">
          <legend>Resumen Costos Contents</legend>
          <div class="form-group">
            <label for="resumenA">Title:</label>
            <input type="text" class="form-control" id="resumenA" name="calculadora_contents[contents][ResumenCostosContents][title]" value="<?php echo $ResumenCostosContents['title']; ?>" required />
          </div>
          <div class="form-group">
            <label for="resumenB">Cuota Inscripción Label:</label>
            <input type="text" class="form-control" id="resumenB" name="calculadora_contents[contents][ResumenCostosContents][inscriptionCuoteLabel]" value="<?php echo $ResumenCostosContents['inscriptionCuoteLabel']; ?>" required />
          </div>
          <div class="form-group">
            <label for="resumenC">Inversión Total Label:</label>
            <input type="text" class="form-control" id="resumenC" name="calculadora_contents[contents][ResumenCostosContents][totalInvestLabel]" value="<?php echo $ResumenCostosContents['totalInvestLabel']; ?>" required />
          </div>
        </fieldset>

        <!-- Desglose Carrera Contents Section -->
        <hr>
        <fieldset class="mb-3 pb-3">
          <legend>Desglose Carrera Contents</legend>
          <div class="form-group">
            <label for="desgloseA">Title:</label>
            <input type="text" class="form-control" id="desgloseA" name="calculadora_contents[contents][DesgloseCarreraContents][title]" value="<?php echo $DesgloseCarreraContents['title']; ?>" required />
          </div>
          <div class="form-group">
            <label for="desgloseB">Cuota Inscripcion Label:</label>
            <input type="text" class="form-control" id="desgloseB" name="calculadora_contents[contents][DesgloseCarreraContents][inscriptionCuoteLabel]" value="<?php echo $DesgloseCarreraContents['inscriptionCuoteLabel']; ?>" required />
          </div>
        </fieldset>
        <!-- Chart Contents Section -->
        <hr>
        <fieldset class="mb-3 pb-3">
          <legend>Chart Contents</legend>
          <div class="form-group">
            <label for="desgloseA">Titulo:</label>
            <input type="text" class="form-control" id="desgloseA" name="calculadora_contents[contents][ChartContents][title]" value="<?php echo $ChartContents['title']; ?>" required />
          </div>
        </fieldset>

        <!-- Important Info Contents Section -->
        <hr>
        <fieldset class="mb-3 pb-3">
          <legend>Información importante Contents</legend>
          <div class="form-group">
            <label for="importantA">Titulo:</label>
            <input type="text" class="form-control" id="importantA" name="calculadora_contents[contents][ImportantInfoContents][title]" value="<?php echo $ImportantInfoContents['title']; ?>" required />
          </div>
          <div class="form-group">
            <label for="importantA">Titulo CTA:</label>
            <input type="text" class="form-control" id="importantA" name="calculadora_contents[contents][ImportantInfoContents][ctaTitle]" value="<?php echo $ImportantInfoContents['ctaTitle']; ?>" required />
          </div>
          <div class="form-group">
            <label for="importantA">Texto CTA:</label>
            <input type="text" class="form-control" id="importantA" name="calculadora_contents[contents][ImportantInfoContents][ctaText]" value="<?php echo $ImportantInfoContents['ctaText']; ?>">
          </div>
          <div class="form-group">
            <label for="importantA">CTA Button:</label>
            <input type="text" class="form-control" id="importantA" name="calculadora_contents[contents][ImportantInfoContents][cta]" value="<?php echo $ImportantInfoContents['cta']; ?>" required />
          </div>
          <label for="" class="form-label mt-3 mb-1">Lista</label>
          <div id="infoListData" class="pt-1 pb-3"></div>
          <button id="addInfoItem" class="btn btn-primary mt-2" type="button">
            <span class="dashicons dashicons-plus-alt"></span> Añadir Lista
          </button>
        </fieldset>
        <!-- Print Contents Section -->
        <hr>
        <fieldset class="mb-3 pb-3">
          <legend>Print Banner Contents</legend>
          <div class="form-group">
            <label for="importantA">Titulo CTA:</label>
            <input type="text" class="form-control" id="importantA" name="calculadora_contents[contents][PrintInfoContents][title]" value="<?php echo $PrintInfoContents['title']; ?>" required />
          </div>
          <div class="form-group">
            <label for="importantB">CTA Button:</label>
            <input type="text" class="form-control" id="importantB" name="calculadora_contents[contents][PrintInfoContents][cta]" value="<?php echo $PrintInfoContents['cta']; ?>" required />
          </div>
          <div class="form-group">
            <label for="importantC">Tel. Conmutador:</label>
            <input type="text" class="form-control" id="importantC" name="calculadora_contents[contents][PrintInfoContents][conmutador]" value="<?php echo $PrintInfoContents['conmutador']; ?>" />
          </div>
          <div class="form-group">
            <label for="importantD">Tel. Interior:</label>
            <input type="text" class="form-control" id="importantD" name="calculadora_contents[contents][PrintInfoContents][interior]" value="<?php echo $PrintInfoContents['interior']; ?>" />
          </div>
          <div class="form-group">
            <label for="importantE">Tel. EEUU:</label>
            <input type="text" class="form-control" id="importantE" name="calculadora_contents[contents][PrintInfoContents][eeuu]" value="<?php echo $PrintInfoContents['eeuu']; ?>" />
          </div>
          <div class="form-group">
            <label for="importantF">Tel. Mundo:</label>
            <input type="text" class="form-control" id="importantF" name="calculadora_contents[contents][PrintInfoContents][mundo]" value="<?php echo $PrintInfoContents['mundo']; ?>" />
          </div>

        </fieldset>
        <?php submit_button(); ?>
      </form>
    </div>

    <script>
      console.log(<?php echo json_encode($config); ?>)
      var listConfig = <?php echo json_encode($ImportantInfoContents['list']); ?> || [];
      document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('infoListData');

        // Función para añadir items
        function addItem(value = '', isRemovable = true) {
          const newItem = document.createElement('div');
          newItem.className = 'input-group mb-2';

          newItem.innerHTML = `
        <span class="input-group-text">item:</span>
        <input type="text" class="form-control" name="calculadora_contents[contents][ImportantInfoContents][list][]" value="${value}" required>
        ${isRemovable ? 
          '<button class="btn btn-danger" type="button"><span class="dashicons dashicons-no-alt"></span> remover</button>' : 
          '<button class="btn btn-secondary" type="button" disabled><span class="dashicons dashicons-lock"></span> fijo</button>'}
      `;

          container.appendChild(newItem);

          // Solo añade evento si es removable
          if (isRemovable) {
            newItem.querySelector('.btn-danger').addEventListener('click', function() {
              container.removeChild(newItem);
            });
          }
        }

        // Botón para añadir nuevos items
        document.getElementById('addInfoItem').addEventListener('click', function() {
          addItem('', true); // Nuevos items son siempre removibles
        });

        // Cargar configuración inicial
        if (listConfig.length > 0) {
          // Si hay valores en la configuración, cargarlos todos
          listConfig.forEach((value, index) => {
            addItem(value, index !== 0); // El primer item no es removable
          });
        } else {
          // Si no hay configuración, añadir un item por defecto (no removable)
          addItem('', false);
        }
      });
    </script>
<?php
  }
  public function get_default_values()
  {
    $costos = array(
      'CostoCredito' => 4100,
      'CuotaNuevoIngreso' => 21000,
    );

    $contents = array(
      'HeaderContents' => array(
        'title' => "Calculadora de Inversión para mi Carrera",
      ),
      'SelectComponentContents' => array(
        'title' => "Selecciona tu carrera",
      ),
      'CarreraInfoContents' => array(
        'durationLabel' => "Duración",
        'creditsLabel' => "Total créditos",
      ),
      'ResumenCostosContents' => array(
        'title' => "Resumen de Costos",
        'inscriptionCuoteLabel' => "Cuota única de inscripción",
        'totalInvestLabel' => "Inversión total*",
      ),
      'DesgloseCarreraContents' => array(
        'title' => "Desglose por Semestre",
        'inscriptionCuoteLabel' => "Cuota de Inscripción",
      ),
      'ChartContents' => array(
        'title' => "Gráfica de Inversión por Semestre"
      ),
      'ImportantInfoContents' => array(
        'title' => "*Información importante",
        'ctaTitle' => "¿Necesitas más información?",
        'ctaText' => "Estamos aquí para ayudarte.",
        'cta' => "CONTÁCTANOS",
        'list' => array(
          "La inversión estimada es aproximada y puede estar sujeta a cambios.",
          "La cuota de inscripción de $21,000 se paga una sola vez al comenzar la carrera.",
          "El monto vigente por crédito es de $4,100 (año 2025).",
        ),
      ),
      'PrintInfoContents' => array(
        'title' => "¿Te gustaría descargar esta información?",
        'cta' => "DESCARGAR PDF",
        'conmutador' => "56 28 4000",
        'interior' => "01 800 000 ITAM",
        'eeuu' => "011 52 55 56 28 4000",
        'mundo' => "00 52 55 56 28 4000",
      )
    );
    $output = array(
      'costos' => $costos,
      'contents' => $contents,
    );
    return $output;
  }
  public function sanitize_configuration($input)
  {
    $output = array();
    foreach ($input as $category => $group) {
      $output[$category] = $this->sanitize_array($group);
    }
    return $output;
  }
  private function sanitize_array($list)
  {
    $sanitizedList = array();
    foreach ($list as $key => $value) {
      if (is_int($value)) {
        $sanitizedList[$key] = intval($value);
      } elseif (is_numeric($value)) {
        // Primero verificamos si es un decimal que comienza con 0.
        if (preg_match('/^0\.\d+$/', $value)) {
          $sanitizedList[$key] = floatval($value);
        }
        // Luego verificamos si es un número que comienza con 0 (pero no decimal)
        elseif (preg_match('/^0\d*$/', $value)) {
          $sanitizedList[$key] = sanitize_text_field($value);
        }
        // Para otros números numéricos
        else {
          $sanitizedList[$key] = is_float($value + 0) ? floatval($value) : intval($value);
        }
      } elseif (is_string($value)) {
        $sanitizedList[$key] = sanitize_text_field($value);
      } elseif (is_array($value)) {
        $sanitizedList[$key] = $this->sanitize_array($value);
      }
    }
    return $sanitizedList;
  }
  private static function is_phone_or_decimal($value): bool
  {
    return preg_match('/^0\d*$/', $value) || preg_match('/^0\.\d+$/', $value);
  }
}
