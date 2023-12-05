<?php

//Receber o arquivo do formulário
$arquivo = $_FILES['arquivo'];

//Validar extensão do arquivo
if($arquivo['type'] == 'application/pdf'){

    //Criar nome para o arquivo PDF
    $renomear_arquivo = md5(time()) . '.pdf';

    //Caminho para o upload
    $caminho_upload = "upload/";

    //Realizar upload do arquivo
    if(move_uploaded_file($arquivo['tmp_name'], $caminho_upload . $renomear_arquivo)){
        
        //Criando a mensagem de sucesso
        $retorno = ['status' => true, 'msg' => "<p style='color: green;'>Upload realizado com sucesso!</p>"];

    }
    
    else{

        //Criando a mensagem de erro
        $retorno = ['status' => false, 'msg' => "<p style='color: #f00;'>Erro: Upload não realizado com sucesso!</p>"];
        
    }

}

echo json_encode($retorno);