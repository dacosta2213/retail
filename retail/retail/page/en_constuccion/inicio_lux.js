frappe.pages['inicio-lux'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Inicio',
		single_column: true
	});

	$(frappe.render_template("inicio_lux")).appendTo(page.main);


}