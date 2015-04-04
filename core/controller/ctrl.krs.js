
define([

], function(){
    function Ctrkrs($scope,serviceAjax,growl,localStorageService){
        //set level
        $scope.data = {};
        $scope.level = localStorageService.get('user');
        var user = localStorageService.get('user');
        $scope.mhs = {};
        $scope.siswa ={};
        
        $scope.tampil = function(){
                   
                var id =$scope.level[0]['mhsid'];
                
                    serviceAjax.getDataFromServer('jadwal','krs',+id).then(function(data){
                        if (data) {
                        
                            $scope.data = data;
                           
                        } else {

                        }
                });
                
            
          
            
        };
        
        if($scope.level === null){
            
        }else{
            $scope.tampil();
        }
        
        $scope.modalJadwal = function(){
           
           if($scope.mhs['semester'] !== undefined){
               $scope.mhs.kls_mhs= $scope.level[0]['kls_mhs'];
                $scope.mhs.prodi=$scope.level[0]['prodi'];
                
               serviceAjax.posDataToServer('jadwal','getby',$scope.mhs).then(function(data){
                        $scope.krs = data;
                           
                            $scope.modaloption = 'show';
 
                        
                }); 
           }else{
                growl.addErrorMessage("Semester harus di isi",{ttl: 2000});
           }
           
               
            
        };
        $scope.closeModal = function(){
            $scope.modaloption = 'hide';
            //$scope.data = '';
        };
        
        $scope.daftar = function (id_jadwal){
            $scope.siswa.id_jadwal= id_jadwal;
            $scope.siswa.mhsid=$scope.level[0]['mhsid'];
            serviceAjax.posDataToServer('jadwal','daftar',$scope.siswa).then(function(data){
                
                   
                  
                   growl.addSuccessMessage('Data Berhasil Di Simpan!',{ttl: 2000}); 
                   $scope.tampil();
            });
            
        };
        
         
        
        $scope.save = function(data,action){
            if(action == 'Tambah') $scope.simpan(data); else $scope.edit(data);
        };
        /*simpan*/
        $scope.simpan = function(data){
            serviceAjax.posDataToServer('jadwal','insert',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('Data Berhasil Di Simpan!',{ttl: 2000});
                }
            });
        };
        $scope.delete = function(id){
            serviceAjax.getDataFromServer('jadwal','delete',+id).then(function(data){
                if(data.length > 0){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('Data Berhasil Di Delete!',{ttl: 2000});
                }
            });
        };
        $scope.edit = function(data){
            serviceAjax.posDataToServer('jadwal','update',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('Data Berhasil Di Edit!',{ttl: 2000});
                }
            });
        }
    }
    // set to global
    window.Ctrkrs = Ctrkrs;

    return Ctrkrs;
});