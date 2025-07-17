<?php
/*
Plugin Name: Calculadora Cosotos Licenciaturas ITAM
Description: [calculadora_itam] Display custom data about bachelor's degree prices
Version: 1.1
Author: Pymeweb
Author URI: https://pymeweb.mx/
Text Domain: retreat-booking-guru-connect
Domain Path: /
*/

class CalcITAM
{
  public $shortcode_name = 'calculadora_itam';
  public $plugin_dir;
  public $plugin_url;
  public static $plugin_version = '0.1.0';
  public function __construct()
  {

    $this->plugin_dir = plugin_dir_path(__FILE__);
    $this->plugin_url = plugin_dir_url(__FILE__);
    
    add_shortcode($this->shortcode_name, array($this, 'calculadoraCosotosLicenciaturasITAM'));
    add_action('admin_menu', array($this, 'add_config_panel'));
  }


  public function calculadoraCosotosLicenciaturasITAM()
  {
    $data = json_encode(
      get_option('carreras_config', [])
    );
    
    wp_enqueue_script(
      'calc_ITAM_script',
      "{$this->plugin_url}dist/bundle.js",
      array('wp-element'),
      self::$plugin_version,
      array(
        'strategy'  => 'defer',
      )
    );
    wp_localize_script('calc_ITAM_script', 'calc_ITAM_data', [
      'ajaxUrl' => admin_url('admin-ajax.php'),
      'nonce' => wp_create_nonce('calc_ITAM_data_nonce'),
      'opciones' => get_option('carreras_config', []),
      'mensaje' => __('Guardado con éxito', 'textdomain'),
    ]);
    $template = '
    <div id="calculadoraApp" class="app"></div>
    ';
    return $template;
  }
  public function add_config_panel()
  {
    include $this->plugin_dir . '/admin-main.php';
    add_menu_page(
      'CalcITAM',
      'Calculadora ITAM',
      'manage_options',
      'calc-itam',
      array($this, 'CalcITAM_render_panel'),
      'dashicons-editor-table'
    );
  }
  public function CalcITAM_render_panel()
  {
    CalcITAM_render_panel();
  }
}
new CalcITAM();
