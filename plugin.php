<?php
/*
Plugin Name: Calculadora Cosotos Licenciaturas ITAM
Description: [calculadora_itam] Display custom data about bachelor's degree prices
Version: 2.0
Domain Path: /
*/

class CalcITAM
{
  public $shortcode_name = 'calculadora_itam';
  public $plugin_dir;
  public $plugin_url;
  public $calculadora_carreras;
  public $calculadora_contents;
  public static $plugin_version = '2.0';
  public function __construct()
  {
    $this->plugin_dir = plugin_dir_path(__FILE__);
    $this->plugin_url = plugin_dir_url(__FILE__);

    include_once $this->plugin_dir . '/admin-carreras.php';
    include_once $this->plugin_dir . '/admin-contents.php';
    $this->calculadora_contents = new CalcContents(
      self::$plugin_version,
      $this->plugin_url,
    );
    $this->calculadora_carreras = new CalcCarreras(
      self::$plugin_version,
      $this->plugin_url,
    );
    
    add_shortcode($this->shortcode_name, array($this, 'calculadoraCosotosLicenciaturasITAM'));
    add_action('admin_menu', array($this, 'add_admin_panel'));
  }


  public function calculadoraCosotosLicenciaturasITAM()
  {
    $default_contents = $this->calculadora_contents->get_default_values();

    wp_enqueue_script(
      'calc_ITAM_script',
      "{$this->plugin_url}dist/bundle.js",
      array('wp-element'),
      self::$plugin_version,
      array(
        'strategy'  => 'defer',
      )
    );
    wp_localize_script('calc_ITAM_script', 'calc_ITAM_vars', [
      'ajaxUrl' => admin_url('admin-ajax.php'),
      'nonce' => wp_create_nonce('calc_ITAM_nonce'), // Único nonce
      'panels' => [
        'carreras' => [
          'opciones' => get_option('carreras_config', []),
          'mensaje' => __('Guardado con éxito', 'textdomain'),
        ],
        'contents' => [
          'opciones' => get_option('calculadora_contents', $default_contents),
          'mensaje' => __('Guardado con éxito', 'textdomain'),
        ],
      ],
    ]);

    $template = '<div id="calculadoraApp" class="app"></div>';
    return $template;
  }
  public function add_admin_panel()
  {
    add_menu_page(
      'CalcITAM',
      'Calculadora ITAM',
      'manage_options',
      'calc-itam-contents',
      array($this->calculadora_contents, 'render_contents_panel'),
      'dashicons-editor-table'
    );

    add_submenu_page(
      'calc-itam-contents',
      'Editar Contenidos',
      'Editar Contenidos',
      'manage_options',
      'calc-itam-contents',
      array($this->calculadora_contents, 'render_contents_panel')
    );

    // Submenú: Añadir Carreras
    add_submenu_page(
      'calc-itam-contents',
      'Añadir Carreras',
      'Añadir Carreras',
      'manage_options',
      'calc-itam-carreras',
      array($this->calculadora_carreras, 'render_carreras_panel')
    );
  }

}
new CalcITAM();
