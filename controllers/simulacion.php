<?php
    class Simulacion extends Controller{

        function __construct(){
            parent::__construct();
            //echo "<p>Nuevo controlador Main</p>";
        }
    
        function verSimulacion(){
            //$items = [];
            $items = $this->model->get();
            
            echo json_encode($items);
        }
    
        function registrarSimulacion(){
            if (isset($_POST["montoPrestamo"]))
                $montoPrestamo=$_POST["montoPrestamo"];
                //$montoPrestamo=12000;
                
            if (isset($_POST["tasaInteres"]))
                $tasaInteres=$_POST["tasaInteres"];
                //$tasaInteres=18;
                    
            if (isset($_POST["plazoMeses"]))
                $plazoMeses=$_POST["plazoMeses"];
                //$plazoMeses=24;

            $montoCapital= $montoPrestamo / $plazoMeses;

            $data= array();
            $dt = array();
            for ($i=1; $i <= $plazoMeses; $i++){
                $numeroDeCouta = $i;
                $montoInteres = ($montoPrestamo * ($tasaInteres/100) /360) * 30;
                $montoPrestamo = $montoPrestamo-$montoCapital;
                $dt = array('numeroDeCouta' => $numeroDeCouta,
                            'montoCapital' => $montoCapital,
                            'montoInteres' => $montoInteres,
                            'saldoInsolutoCredito' => $montoPrestamo);
                array_push($data, array($dt));
            }
            
            $mensage = "";
            
            if($this->model->insert($data)){
                $mensage = array('success' => true, 'message' => '');
            }else{
                $mensage = array('success' => false, 'message' => '');
            }
           
            echo json_encode($mensage);
        }
    
        function actualizarSimulacion(){
            
        }
    
        function eliminarSimulacion($param = null){
            $id = $param[0];
    
            if($this->model->delete($id)){
                $mensage = "";
            }else{
                
                $mensage = "";
            }
            
            echo json_encode($mensage);
        }
    }
?>
