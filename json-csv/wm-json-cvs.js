/**
 * A plugin to export excel from jsonData
 *
 * @author guoqing07@meituan.com
 * @date 2015-02-04
 */
(function($) {
    
    $.WmCommon.downloadCvs = function(option) {
        var defaults = {
            data : []

        },
        opts = $.extend(true, defaults, option),
        a = document.createElement("a"),
        downloadSupported = a.download != undefined,
        tableStr,
        uri,
        ctx,
        template,
        base64,
        format;

        if(!downloadSupported) {
            alert("您的浏览器不支持下载！请更换浏览器！")
        }
        else{
            tableStr = this.getTable(opts.data, opts.config);
            console.log(tableStr)
            uri = 'data:application/vnd.ms-excel;base64,';
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
            base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) };
            format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };
            ctx = {
                worksheet: name || 'Worksheet',
                table: tableStr
            };
            a.href   = uri + base64(format(template, ctx));
            a.target = '_blank';
            a.download = (opts.title ? opts.title.replace(/ /g, '-').toLowerCase() : 'chart') + '.xls';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }

        //console.log(opts);


    };
    $.WmCommon.getTable = function(data, config) {
        var len = data.length,
            tableStr = "<table><tr>",
            i,j,k;
        for(i in config){
            tableStr += "<th>" + config[i] + "</th>";
        }
        tableStr += "</tr>";
        for(i = 0; i < len; i++){ 

            tableStr += "<tr>"
            for(j in data[i]){
                for(k in config) {
                    if(j == k)
                      tableStr += "<td>" + data[i][j] + "</td>"
                }
               
            }
             tableStr += "</tr>"
        }
        tableStr += "</tabel>";
        return tableStr;
    };


   

})(jQuery)
