class Login
{
    static valida(form)
    {
        var strErro = ""; 

        if (form.email  == undefined || form.email.value  == "") {
            strErro = strErro + "Você não preencheu o login</br>";
        }

        if (form.password == undefined || form.password.value == "") {
            strErro = strErro + "Você não preencheu a senha";
        }

        if(strErro !== "") {
            document.getElementById("mensagem").innerHTML = "<br /><b>"+strErro+"</b>";  
            return false;
        }
    }

    static formToJSON(form) 
    {
        var email  = '';
        var password = '';

        if (form.email != undefined) {
            email = form.email.value;
        }

        if (form.password != undefined) {
            password = form.password.value;
        }

        return JSON.stringify({
            "email": email,
            "password": password
        });
    }

    static entrar(form)
    {
        if (Login.valida(form) == false) {
            return false;
        }
        
        document.getElementById("mensagem").innerHTML = "<br /><b>Aguarde...</b>";
        var mensagem = "";
        
        var xhr = Util.createXHR();

        if (mensagem == "" && xhr != undefined && 'withCredentials' in xhr) {
            xhr.open("POST",Util.url_base_api()+"auth", true);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                 //Verificar pelo estado "4" de pronto.
                if (xhr.readyState == 4) {
                    //Pegar dados da resposta json
                    
                    var json = "";

                    if (xhr.status !== 429) {
                        json = JSON.parse(xhr.responseText);
                    }

                    if (xhr.status == 200) {
                        Util.createCookie('token', json.token, '10', 'minutos');
                        window.location = "http://localhost/client-laravel-api/adm/paginas/home.htm";
                    } else if (xhr.status == 422) {
                        var strErrosValidate = "";

                        if (json.validate_error.email !== undefined) {
                            strErrosValidate += json.validate_error.email[0];
                        }

                        if (json.validate_error.password !== undefined) {
                            strErrosValidate += json.validate_error.password[0];
                        }

                        if (strErrosValidate !== '') {
                            document.getElementById("mensagem").innerHTML = "<br /><b>"+strErrosValidate+"</b>";    
                        } else {
                            document.getElementById("mensagem").innerHTML = "<br /><b>Algum erro desconhecido ocorreu.</b>";
                        }
                    } else if (xhr.status == 500) {
                        if (json.error !== undefined && json.error === 'token_invalid') {
                            document.getElementById("mensagem").innerHTML = "<br /><b>Token inválido. Faça o login novamente.</b>";
                        } else {
                            document.getElementById("mensagem").innerHTML = "<br /><b>Algum erro desconhecido ocorreu.</b>";
                        }
                    } else if (xhr.status == 401) {
                        if (json.error !== undefined && json.error === 'invalid_credentials') {
                            document.getElementById("mensagem").innerHTML = "<br /><b>Senha ou usuário inválidos.</b>";
                        } else if (json.error !== undefined && json.error === 'email_not_confirmed') {
                            document.getElementById("mensagem").innerHTML = "<br /><b>É necessário confirmar seu e-mail antes de acessar o sistema.</b>";
                        } else {
                            document.getElementById("mensagem").innerHTML = "<br /><b>Algum erro desconhecido ocorreu.</b>";
                        }
                    } else if (xhr.status == 429) {
                        document.getElementById("mensagem").innerHTML = "<br /><b>você foi bloqueado por 3 minutos por que voce fez muitas requisições ao sistema, aguarde.</b>";
                    } else {
                        document.getElementById("mensagem").innerHTML = "<br /><b>Algum erro desconhecido ocorreu.</b>";
                    }
                }
            }

            var jwtoken = '';
            jwtoken = Util.getCookie('token');

           //xhr.withCredentials = true;
            //xhr.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
            xhr.send(Login.formToJSON(form));
        } else {
            document.getElementById("mensagem").innerHTML = mensagem;
        } 
    }
}
