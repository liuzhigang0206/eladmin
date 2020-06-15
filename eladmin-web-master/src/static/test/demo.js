$("#main").append("<div class=\"demo\" style=\"width: 400px;\">\n" + 
		"		<span id=\"demo-setting\"><i\n" + 
		"			class=\"fa fa-cogs fa-spin txt-color-blueDark\"></i></span>\n" + 
		"		<form>\n" + 
		"			<legend class=\"no-padding margin-bottom-10\">面板</legend>\n" + 
		"			<section>\n" + 
		"				<div class=\"tab-content\" style='height:500px' >\n" + 
		"					<div class=\"tab-pane active\" id=\"hr1\">\n" + 
		"						<ul class=\"nav nav-tabs\">\n" + 
		"							<li class=\"active\"><a data-toggle=\"tab\" href=\"#AA\">常规</a></li>\n" + 
		"							<li><a data-toggle=\"tab\" href=\"#BB\">公式</a></li>\n" + 
		"							<li><a data-toggle=\"tab\" href=\"#CC\">导入导出</a></li>\n" + 
		"						</ul>\n" + 
		"						<div class=\"tabbable tabs-below\">\n" + 
		"							<div class=\"tab-content padding-10\">\n" + 
		"								<div class=\"tab-pane active\" id=\"AA\">\n" + 
		"									<div class=\"option-row\">\n" + 
		"										<div class=\"inputContainer\">\n" + 
		"											<p>点击按钮提交修改数据</p>\n" + 
		"											<input class=\"btn btn-primary\" type=\"button\" id=\"commitData\"\n" + 
		"												onclick=\"Yszx.commit(this)\" value=\"提交\" class=\"button\">\n" + 
		"										</div>\n" + 
		"									</div>\n" + 
		"\n" + 
		"									<div class=\"inputContainer\">\n" + 
		"										<div class=\"row\">\n" + 
		"											<div class=\"col-md-12\">\n" + 
		"												<p>（支持'jpg', 'png','txt','doc','docx','xls','xlsx'格式文件）</p>\n" + 
		"												<input type=\"file\" multiple id=\"ssi-upload\" />\n" + 
		"											</div>\n" + 
		"										</div>\n" + 
		"									</div>\n" + 
		"\n" + 
		"									<div class=\"inputContainer\">\n" + 
		"										<input class=\"btn btn-primary\" type=\"button\" id=\"undo\"\n" + 
		"											value=\"撤销\" class=\"button\"> <input\n" + 
		"											class=\"btn btn-primary\" type=\"button\" id=\"redo\" value=\"重做\"\n" + 
		"											class=\"button\">\n" + 
		"									</div>\n" + 
		"								</div>\n" + 
		"								<div class=\"tab-pane\" id=\"BB\">\n" + 
		"									<div class=\"option-row\">\n" + 
		"										<p>公式类型:formulaType</p>\n" + 
		"										<select id=\"formulaType\">\n" + 
		"											<option value=\"0\">计算</option>\n" + 
		"											<option value=\"1\">审核</option>\n" + 
		"											<option value=\"2\">收舍</option>\n" + 
		"											<option value=\"3\">期间取数</option>\n" + 
		"											<option value=\"4\">指标形的计算</option>\n" + 
		"											<option value=\"5\">指标形的审核</option>\n" + 
		"											<option value=\"6\">指标形的收舍</option>\n" + 
		"											<option value=\"9\">单元格的登统公式</option>\n" + 
		"											<option value=\"10\">指标形的登统公式</option>\n" + 
		"											<option value=\"102\">&DUnit()</option>\n" + 
		"											<option value=\"103\">&RPDate()</option>\n" + 
		"										</select>\n" + 
		"										<p>公式内容:formula</p>\n" + 
		"										<input value=\"导出PDF\" id=\"formula\">\n" + 
		"										<p>公式注释:formulaDescription</p>\n" + 
		"										<input value=\"导出PDF\" id=\"formulaDescription\">\n" + 
		"										<p>公式作用范围:scope</p>\n" + 
		"										<input value=\"导出PDF\" id=\"scope\">\n" + 
		"									</div>\n" + 
		"\n" + 
		"								</div>\n" + 
		"								<div class=\"tab-pane\" id=\"CC\">\n" + 
		"									<div class=\"option-row\">\n" + 
		"										<div class=\"inputContainer\">\n" + 
		"											导入:</br>\n" + 
		"											</br> <input type=\"file\" id=\"fileDemo\" class=\"input\"> </br> <input\n" + 
		"												class=\"btn btn-primary\" type=\"button\" id=\"loadExcel\"\n" + 
		"												value=\"导入\" class=\"button\">\n" + 
		"										</div>\n" + 
		"										<div class=\"inputContainer\">\n" + 
		"											导出文件命名: </br>\n" + 
		"											</br> <input id=\"exportFileName\" value=\"export.xlsx\" class=\"input\">\n" + 
		"											</br>\n" + 
		"											</br> <input class=\"btn btn-primary\" type=\"button\" id=\"saveExcel\"\n" + 
		"												value=\"导出\" class=\"button\">\n" + 
		"										</div>\n" + 
		"										<div class=\"inputContainer\">\n" + 
		"											<label>密码: <input type=\"password\" id=\"password\">\n" + 
		"											</label>\n" + 
		"										</div>\n" + 
		"									</div>\n" + 
		"									<div class=\"option-row\">\n" + 
		"										<div class=\"inputContainer\">\n" + 
		"											<p>点击导出PDF</p>\n" + 
		"											<input class=\"btn btn-primary\" type=\"button\" value=\"导出PDF\"\n" + 
		"												id=\"savePDF\">\n" + 
		"										</div>\n" + 
		"										<div class=\"inputContainer\">\n" + 
		"											<p>点击打印</p>\n" + 
		"											<input class=\"btn btn-primary\" type=\"button\" value=\"打印\"\n" + 
		"												id=\"btnPrint\">\n" + 
		"										</div>\n" + 
		"									</div>\n" + 
		"								</div>\n" + 
		"							</div>\n" + 
		"						</div>\n" + 
		"					</div>\n" + 
		"				</div>\n" + 
		"			</section>\n" + 
		"		</form>\n" + 
		"	</div>");
//var smartbgimage = "<h6 class='margin-top-10 semi-bold'>Background</h6><img src='img/pattern/graphy-xs.png' data-htmlbg-url='img/pattern/graphy.png' width='22' height='22' class='margin-right-5 bordered cursor-pointer'><img src='img/pattern/tileable_wood_texture-xs.png' width='22' height='22' data-htmlbg-url='img/pattern/tileable_wood_texture.png' class='margin-right-5 bordered cursor-pointer'><img src='img/pattern/sneaker_mesh_fabric-xs.png' width='22' height='22' data-htmlbg-url='img/pattern/sneaker_mesh_fabric.png' class='margin-right-5 bordered cursor-pointer'><img src='img/pattern/nistri-xs.png' data-htmlbg-url='img/pattern/nistri.png' width='22' height='22' class='margin-right-5 bordered cursor-pointer'><img src='img/pattern/paper-xs.png' data-htmlbg-url='img/pattern/paper.png' width='22' height='22' class='bordered cursor-pointer'>";
var smartbgimage = "";
$("#smart-bgimages").fadeOut();
$("#demo-setting").click(function() {
	$(".demo").toggleClass("activate")
});
$('input[type="checkbox"]#smart-fixed-header').click(function() {
	$(this).is(":checked") ? $.root_.addClass("fixed-header") : ($('input[type="checkbox"]#smart-fixed-ribbon').prop("checked", !1), $('input[type="checkbox"]#smart-fixed-navigation').prop("checked", !1), $.root_.removeClass("fixed-header"), $.root_.removeClass("fixed-navigation"), $.root_.removeClass("fixed-ribbon"))
});
$('input[type="checkbox"]#smart-fixed-navigation').click(function() {
	$(this).is(":checked") ? ($('input[type="checkbox"]#smart-fixed-header').prop("checked", !0), $.root_.addClass("fixed-header"), $.root_.addClass("fixed-navigation"), $('input[type="checkbox"]#smart-fixed-container').prop("checked", !1), $.root_.removeClass("container")) : ($('input[type="checkbox"]#smart-fixed-ribbon').prop("checked", !1), $.root_.removeClass("fixed-navigation"), $.root_.removeClass("fixed-ribbon"))
});
$('input[type="checkbox"]#smart-fixed-ribbon').click(function() {
	$(this).is(":checked") ? ($('input[type="checkbox"]#smart-fixed-header').prop("checked", !0), $('input[type="checkbox"]#smart-fixed-navigation').prop("checked", !0), $('input[type="checkbox"]#smart-fixed-ribbon').prop("checked", !0), $.root_.addClass("fixed-header"), $.root_.addClass("fixed-navigation"), $.root_.addClass("fixed-ribbon"), $('input[type="checkbox"]#smart-fixed-container').prop("checked", !1), $.root_.removeClass("container")) : $.root_.removeClass("fixed-ribbon")
});
$('input[type="checkbox"]#smart-fixed-footer').click(function() {
	$(this).is(":checked") ? $.root_.addClass("fixed-page-footer") : $.root_.removeClass("fixed-page-footer")
});
$('input[type="checkbox"]#smart-rtl').click(function() {
	$(this).is(":checked") ? $.root_.addClass("smart-rtl") : $.root_.removeClass("smart-rtl")
});
$("#smart-topmenu").on("change",
function(a) {
	$(this).prop("checked") ? (localStorage.setItem("sm-setmenu", "top"), location.reload()) : (localStorage.setItem("sm-setmenu", "left"), location.reload())
});
"top" == localStorage.getItem("sm-setmenu") ? $("#smart-topmenu").prop("checked", !0) : $("#smart-topmenu").prop("checked", !1),
$('input[type="checkbox"]#colorblind-friendly').click(function() {
	$(this).is(":checked") ? $.root_.addClass("colorblind-friendly") : $.root_.removeClass("colorblind-friendly")
});
$('input[type="checkbox"]#smart-fixed-container').click(function() {
	$(this).is(":checked") ? ($.root_.addClass("container"), $('input[type="checkbox"]#smart-fixed-ribbon').prop("checked", !1), $.root_.removeClass("fixed-ribbon"), $('input[type="checkbox"]#smart-fixed-navigation').prop("checked", !1), $.root_.removeClass("fixed-navigation"), smartbgimage ? ($("#smart-bgimages").append(smartbgimage).fadeIn(1e3), $("#smart-bgimages img").bind("click",
	function() {
		var a = $(this),
		b = $("html");
		bgurl = a.data("htmlbg-url"),
		b.css("background-image", "url(" + bgurl + ")")
	}), smartbgimage = null) : $("#smart-bgimages").fadeIn(1e3)) : ($.root_.removeClass("container"), $("#smart-bgimages").fadeOut())
});

$("#reset-smart-widget").bind("click",function() {
	return $("#refresh").click();
});

$("#smart-styles > a").on("click",function() {
	var a = $(this);
	b = $("#logo img");
	$.root_.removeClassPrefix("smart-style").addClass(a.attr("id"));
	$("html").removeClassPrefix("smart-style").addClass(a.attr("id"));
	b.attr("src", a.data("skinlogo"));
	$("#smart-styles > a #skin-checked").remove();
	a.prepend("<i class='fa fa-check fa-fw' id='skin-checked'></i>");
});