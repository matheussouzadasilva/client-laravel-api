class confirmarEmail
{
    static formToJSON(emailtk) 
    {
        return JSON.stringify({
            "email_token": emailtk
        });
    }

    static callbackEnvia(xhr,op='cad')
    {
        //Verificar pelo estado "4" de pronto.
        if (xhr.readyState === 4) {
            //Pegar dados da resposta json
            var json = JSON.parse(xhr.responseText);
            
            //document.getElementById("divMsgAjax").hidden = true;
            
            if (xhr.status === 200 || xhr.status === 201) {
                //document.getElementById("divErro").hidden = true;
                
                if( op === 'cad') {
                    document.getElementById("texto").innerHTML = "E-mail confirmado para criação de usuário. Agora você pode se logar.";
                } else {
                    document.getElementById("texto").innerHTML = "E-mail confirmado e alterado com sucesso. Agora você pode logar com novo e-mail.";
                }
                //document.getElementById("divSucesso").hidden = false;
                
                document.getElementById("emailtk").value = "";
            } else if (xhr.status === 422) {
                
                if (json.error !== undefined) {
                    document.getElementById("texto").innerHTML = ""+json.error+"";    
                } else {
                    document.getElementById("texto").innerHTML = "Algum erro desconhecido ocorreu.";
                }
                
                //document.getElementById("divErro").hidden = false;
            } else {
                Util.errosXHR(xhr.status,json);
            }
        }
    }
    
    static alteracaoEmail(emailtk) 
    {
        var mensagem = "";
        
        var xhr = Util.createXHR();

        if(mensagem === "" && xhr !== undefined) {
            //document.getElementById("divMsgAjax").hidden = false;
            xhr.open("PUT",Util.url_base_api()+"confaltemail",true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                confirmarEmail.callbackEnvia(xhr,'alt');
            };

            xhr.send(confirmarEmail.formToJSON(emailtk));
        } else {
            document.getElementById("texto").innerHTML = mensagem;
            document.getElementById("divErro").hidden = false;
        } 
    }
    
    static criacaoUsuario(emailtk) 
    {
        var mensagem = "";
        
        var xhr = Util.createXHR();

        if(mensagem === "" && xhr !== undefined) {
            //document.getElementById("divMsgAjax").hidden = false;
            xhr.open("PUT",Util.url_base_api()+"confcademail",true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                confirmarEmail.callbackEnvia(xhr,'cad');
            };

            xhr.send(confirmarEmail.formToJSON(emailtk));
        } else {
            document.getElementById("texto").innerHTML = mensagem;
            document.getElementById("divErro").hidden = false;
        } 
    }
     
}
