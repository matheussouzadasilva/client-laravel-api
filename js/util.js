"use strict";

class Util
{
    static url_base_api()
    {
        //return "http://localhost/laravel-api/public/api/v1/";//url usando apache
        //return "http://localhost:8000/api/v2/flamengo/";//url usando octane
        
        return "http://localhost:8888/api/v2/gremio/";//url usando octane
    }
    
    static url_base_front()
    { 
        //return "http://192.168.1.100/client-laravel-api";
        
        return "http://localhost/client-laravel-api";
    }
    
    static createCookie(nome, valor, tempo, opcao = 'dias') 
    {
        var expires;
        
        if (tempo) {
            var date = new Date();

            if (opcao == 'dias') {
                date.setTime(date.getTime() + (tempo * 24 * 60 * 60 * 1000));
            } else if (opcao == 'horas') {
                date.setTime(date.getTime() + (tempo * 60 * 60 * 1000));
            } else if (opcao == 'minutos') {
                date.setTime(date.getTime() + (tempo * 60 * 1000));
            }

            //var offset = '+3';  // e.g. if the timeZone is -3
            //var MyDateWithOffset = new Date( date.toGMTString() + offset );
            //os cookies trabalhao com timeZone/GMT 0, nao adianta converter, mas o cookie fica ativo corretamente por X dias
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        
        document.cookie = nome + "=" + valor + expires + "; path=/";
    }

    static getCookie(c_name) 
    {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }


    static queryString() 
    {
        location.queryString = {};
        location.search.substr(1).split("&").forEach(function (pair) {
            if (pair === "") return;
            var parts = pair.split("=");
            location.queryString[parts[0]] = parts[1] &&
                decodeURIComponent(parts[1].replace(/\+/g, " "));
        });
    }
    
    static createXHR()
    {
        var xhr = false;

        try {
            xhr = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (othermicrosoft) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    xhr = false;
                }
            }
        }

        if (!xhr) {
            alert("Error initializing XMLHttpRequest!");
        } else {
            return xhr;
        }
    }

    static logado()
    {
        var mensagem = "";
        
        var xhr = Util.createXHR();

        if (xhr != undefined) {
            xhr.open("GET",Util.url_base_api()+"logado", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                 //Verificar pelo estado "4" de pronto.
                if (xhr.readyState == 4) {
                    if (xhr.status != 200) {
                        window.location = "http://localhost/client-laravel-api/adm/formularios/form.login.htm"; 
                    } else if (xhr.status == 429) {
                        document.getElementById("mensagem").innerHTML = "<br /><b>você foi bloqueado por 3 minutos por que voce fez muitas requisições ao sistema, aguarde.</b>";
                    } else {
                        Util.createCookie('token', Util.getCookie('token'), '10', 'minutos');
                    }
                }
            }

            var jwtoken = '';
            jwtoken = Util.getCookie('token');

            if (jwtoken != '') {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
                xhr.send();
            } else {
                window.location = "http://localhost/client-laravel-api/adm/formularios/form.login.htm";
            }
        } else {
            window.location = "http://localhost/client-laravel-api/adm/formularios/form.login.htm";
        }
    }

    static logout()
    {
        var mensagem = "";
        
        var xhr = Util.createXHR();

        if (xhr != undefined) {
            xhr.open("GET",Util.url_base_api()+"logout", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function() {
                 //Verificar pelo estado "4" de pronto.
                if (xhr.readyState == 4) {
                    Util.createCookie('token', '', -1);
                    window.location = "http://localhost/client-laravel-api/site/paginas/home.htm";
                }
            }

            var jwtoken = '';
            jwtoken = Util.getCookie('token');

            if (jwtoken != '') {
                xhr.setRequestHeader('Authorization', 'Bearer ' + jwtoken);
                xhr.send();
            }

            window.location = "http://localhost/client-laravel-api/site/paginas/home.htm";
        } else {
            Util.createCookie('token', '', -1);
            window.location = "http://localhost/client-laravel-api/site/paginas/home.htm";
        }
    }

    static alterbgmenu(op) 
    {
        document.getElementById("menuprincipal").classList.remove('bg-primary', 'bg-success', 'bg-warning', 'bg-info', 'bg-danger', 'bg-dark');

        if (op == 1) {
            document.getElementById("menuprincipal").classList.add('bg-primary');
        } else if (op == 2) {
            document.getElementById("menuprincipal").classList.add('bg-success');
        } else if (op == 3) {
            document.getElementById("menuprincipal").classList.add('bg-warning');
        } else if (op == 4) {
            document.getElementById("menuprincipal").classList.add('bg-info');
        } else if (op == 5) {
            document.getElementById("menuprincipal").classList.add('bg-danger');
        } else {
            document.getElementById("menuprincipal").classList.add('bg-dark');
        }
    }

    static goBack(location = null) 
    {   
        if (location === null) {
            window.history.back();
        } else {
            window.location.href = location;
        }
    }
}
