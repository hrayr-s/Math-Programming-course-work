/* 
   * Ծրագրի հեղինակներ Հրայր Ստեփանյան և Վաչե Գրիգորյան
   * կազմվել է 01.05.2016թ.
   * Բոլոր իրավունքները պաշտպանված են

   * Program Authors are Hrayr Stepanyan and Vache Grigoryan
   * Created in 01.05.2016
   * All Rights Reserved
 */

 jQuery(document).ready(function($) {
 jQuery('input').on("change paste keyup", function() {

        var empty = false;
        jQuery('input').each(function() {
            if (jQuery(this).val().length == 0) {
                empty = true;
            }
        });

        if (empty) {
            jQuery('button#qaylaraj').attr('disabled', 'disabled');
        } else {
            jQuery('button#qaylaraj').attr('disabled', false);
        }
    });
});

//Գլոբալ Փոփոխականների արտահայտում

var matrix=[],stugum = [], stgij=[];
var qayl=0;
var D=0;
var n,N,min,index,intmp,stg,stgi,htk,Q;
var ha=0;

//Աղյուսակի սկզբնական Տեսք տվող ֆունկցիա

function iNachili() {
    n=parseInt(jQuery("#qanak").val());
    N=n+4;
     jQuery("body").append(' <table id="matric'+D+'"><thead><tr class="header"><td>Բազիս</td><td data-row="1">Z</td><td data-row="2">X<small>m</small></td><td data-row="3">X<small>n</small></td></tr></thead><tbody></tbody></table></div>');
    for(var i=1;i<=n;i++){
        jQuery("#matric"+D+" .header").append("<td data-row='"+(i+3)+"'>S<small>"+i+"</small></td>");
    }
    jQuery("#matric"+D+" .header").append("<td>Լուծում</td>");
    jQuery("#matric"+D+">tbody").append('<tr data-row="0"><td>Z</td></tr>');
    for(var j=1;j<=N;j++){
            jQuery('#matric'+D+'>tbody>tr[data-row="0"]').append("<td data-cell='"+j+"'><input type='text' /></td>");
    }
    for(var i=1;i<=n;i++){
        jQuery("#matric"+D+">tbody").append("<tr data-row='"+i+"'></tr>");
        jQuery('#matric'+D+'>tbody>tr[data-row="'+i+'"]').append("<td data-cell='"+0+"'>S<small>"+i+"</small></td>");
        for(var j=1;j<=N;j++){
            jQuery("#matric"+D+">tbody>tr[data-row='"+i+"']").append("<td data-cell='"+j+"'><input type='text' /></td>");
        }
    }
}

//Աղյուսակից տվյալների փոփոխականին վերգրման ֆունկցիա
 
function setBazis() {
    for(var i=0;i<=n;i++){
        matrix[i]=[];
        for(var j=1;j<=N;j++){
            matrix[i][j]=(jQuery("#matric"+D+">tbody>tr[data-row='"+i+"']>td[data-cell='"+j+"']>input").val());
            if(matrix[i][j].indexOf("/")==-1)
                matrix[i][j]+="/1";
        }
    }
   

}

//Փոփոխականից աղյուսակին արտածման ֆունկցիա

function getBazis() {
	jQuery("#matric"+D+">tbody>tr[data-row='"+stgij[D][0]+"']>td>input").css("background-color", "yellow");
	jQuery("#matric"+D+">tbody>tr>td[data-cell='"+stgij[D][1]+"']>input").css("background-color", "yellow");
	D++;
	iNachili();

	for (var i = 0; i < D; i++) {
		jQuery("#matric"+D+">tbody>tr[data-row='"+stgij[i][0]+"']>td[data-cell='0']").html(jQuery(".header>td[data-row='"+stgij[i][1]+"']").html()+"");
	}
	for(var i=0;i<=n;i++){
        for(var j=1;j<=N;j++){
            if(typeof matrix[i][j] == "string"){
                if(matrix[i][j].indexOf("/1")!=-1)
                    matrix[i][j]=matrix[i][j].substring(0,matrix[i][j].indexOf("/1"));
                jQuery("#matric"+D+">tbody>tr[data-row='"+i+"']>td[data-cell='"+j+"']>input").val(matrix[i][j]+"");
            }else
                jQuery("#matric"+D+">tbody>tr[data-row='"+i+"']>td[data-cell='"+j+"']>input").val(matrix[i][j]+"");
        }
    }
    ha=1;
    setBazis();
         for (var i = 1; i <= N; i++)
    {   
        	if (kotorak(matrix[0][i])<0)
        {
     		qayl=1;
        	break;
        }else{
        	qayl=2;
        }
    }

}

//Կոտորակը իրական թիվ դարձնող ֆունկցիա

function kotorak(mutq) {
    
    var si=mutq.indexOf("/"),
            a=0,b=0;
    a=parseInt(mutq.substring(0,si));
    b=parseInt(mutq.substring(si+1));
    return a/b;
}
//Գծային ծրագրավորման խնդրի լուծման ալգորիթմի ֆունկցիա

function checkData() {
	
	//Առաջնորդող սյան փնտրման ցիկլ

    min=kotorak(matrix[0][1]);
    for (var i = 2; i <= N; i++)
    {   
        	if (min > kotorak(matrix[0][i]))
        {
            min = kotorak(matrix[0][i]);
            index = i;
        }

    }
    
    //Առաջնորդող տողի փնտրման ցիկլ

    Q = 0;
    for (var i = 0; i <= n; i++)
    {
        if (kotorak(matrix[i][N]) > 0 && kotorak(matrix[i][index])>0)
        {
            if(typeof stugum[Q] == 'undefined') stugum[Q] = [];
            stugum[Q][0]=kotorak(matrix[i][N])/kotorak(matrix[i][index]);
            stugum[Q][1] = i;
            Q++;
        }
    }
    stg = stugum[0][0];
    stgi = parseInt(stugum[0][1]);
    for (var i = 1; i < Q ; i++)
    {
        if (stg > stugum[i][0])
        {
            stg = stugum[i][0];
            stgi = stugum[i][1];
        }
    }
    stgij[D] = [];
    stgij[D][0]=stgi;
    stgij[D][1]=index;
    htk = matrix[stgi][index];   //Առաջնորդող էլեմենտ

    //Առաջնորդող տողի էլեմենտների առաջնորդող էլեմենտի վրա բաժանման ցիկլ

    for (var i = 1; i <= N; i++)
    {
            matrix[stgi][i] = calculateOUR(matrix[stgi][i],htk,"/").toString();
            if(typeof matrix[stgi][i] != "string" || matrix[stgi][i].indexOf("/")==-1)
                matrix[stgi][i]+="/1";
    }
    //Երկրորդ տեսակի հաշվարկային գործընթացի ցիկլ
    for (var i = 0; i <= n; i++)
    {
        if (i != stgi)
        {
            intmp = matrix[i][index];
            var df="";
            var sf = "";
            var kll="";
            for (var j = 1; j <= N; j++)
            {
                sf = matrix[stgi][j]; 
                df = matrix[i][j];
                if(sf!=0 && sf!="0/1" && intmp!=0 && intmp!="0/1")
                    kll=calculateOUR(intmp,sf,"*").toString();
                else
                    kll=0;
                    if(typeof kll != "string" || kll.indexOf("/")==-1)
                        kll+="/1";
                    matrix[i][j]=calculateOUR(df,kll,"-").toString();
                
            }
        }
    }
}

//Ֆունկցիաների կառավարման ֆունկցիա

function qaylaraj(){
    switch(qayl){
        case 0:
            iNachili();
            qayl++;
            break;
        case 1:
            if(ha==0)
            {
            	setBazis();
            }
            checkData();
            getBazis();
			if(qayl==2)
             jQuery('#matric'+D+'>tbody>tr[data-row="0"]>td>input').css("background-color", "#3ADF00");
         break;
    }
}


