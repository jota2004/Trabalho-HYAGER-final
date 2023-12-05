const cadForm = document.getElementById("upload-arquivo");

if (cadForm) {

    cadForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        //Pega o arquivo do formulário
        var arquivo = document.getElementById('arquivo').files[0];

        //Verificando a compatibilidade do arquivo
        if (arquivo['type'] != 'application/pdf') {

            //Mensagem de erro
            document.getElementById("msg").innerHTML = "<p style='color: #f00;'>Erro: Necessário enviar arquivo PDF!</p>";

            //Limpar o campo arquivo
            document.getElementById('arquivo').value = '';
        } 
        
        else {
            //Criando um objeto
            var dadosForm = new FormData();

            //Colocando as informações no objeto
            dadosForm.append("arquivo", arquivo);

            //Manda os dados para o arquivo PHP
            const dados = await fetch("envio.php", {
                method: "POST",
                body: dadosForm
            });

            //Ler os dados enviados do arquivo PHP
            const resposta = await dados.json();

            if (resposta['status']) {

                //Mensagem de sucesso
                document.getElementById('msg').innerHTML = resposta['msg'];

                document.getElementById('arquivo').value = '';

            } else {
                //Mensagem de erro
                document.getElementById('msg').innerHTML = resposta['msg'];
            }

        }
    });
}