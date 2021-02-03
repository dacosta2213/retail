frappe.pages['en-construccion'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'En Construccion',
		single_column: true
	});

	$(frappe.render_template("en_construccion")).appendTo(page.main);


frappe.templates["en_construccion"] = '<div><h1 class="text-center">Seccion en Desarrollo</h1>'
+'<div><img class="message-page-image" src=robot width="20%"></div>'
+'<h2>Seguimos trabajando para traerte esta nueva funcionalidad lo mas pronto posible</h2>'
+'<h2>Estamos seguros que esta funcionalidad te servira mucho.</h2>'
+'</div>';


}

