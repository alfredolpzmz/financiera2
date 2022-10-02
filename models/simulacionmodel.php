<?php
    class SimulacionModel extends Model{

        public function __construct(){
            parent::__construct();
        }

        public function get(){
            $datos = [];
            try{
                $query = $this->db->connect()->query("SELECT `numeroDeCouta`, `montoCapital`, `montoInteres`, `saldoInsolutoCredito` FROM `prestamos`");
                while ($fila = $query->fetch(PDO::FETCH_OBJ)) {
                    array_push($datos, $fila);
                }
                return $datos;
            }catch(PDOException $e){
                return [];
            }
        }

        public function insert($datos){
            try{
                $query = $this->db->connect()->prepare(
                    'INSERT INTO prestamos(numeroDeCouta, montoCapital, montoInteres, saldoInsolutoCredito)
                    VALUES(:numeroDeCouta, :montoCapital, :montoInteres, :saldoInsolutoCredito)');
                    foreach($datos as $dato)
                    {
                        foreach($dato as $value)
                        {
                            $query->execute(['numeroDeCouta' => $value['numeroDeCouta'], 'montoCapital' => $value['montoCapital'], 'montoInteres' => $value['montoInteres'], 'saldoInsolutoCredito' => $value['saldoInsolutoCredito']]);
                            //echo $item .":". $value['numeroDeCouta'] ."  ". $item .":". $value['montoCapital'] ."  ". $item .":". $value['montoInteres'] ."  ". $item .":". $value['saldoInsolutoCredito'];
                        }
                    }
                return true;
            }catch(PDOException $e){
                echo $e->getMessage();
                //echo "Ya existe esa matrícula";
                return false;
            }
            
        }

        public function update($item){
            
        }

        public function delete($id){
            
        }
    }
?>
