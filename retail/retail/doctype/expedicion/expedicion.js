// Copyright (c) 2018, POSIX and contributors
// For license information, please see license.txt
frappe.ui.form.on("Expedicion Item", "item_code", function(frm, cdt, cdn) {
	row = locals[cdt][cdn];

	frappe.call({
		method: "frappe.client.get",
		args: {
			doctype: "Item",
			filters: {
			"item_code": row.item_code
			}
		},
		error: function (data) {

			$('.modal-dialog').hide();
			alert('Por favor selecciona un articulo.');
			frappe.hide_msgprint(instant);

		},
		callback: function (data) {
			x = data.message;
			console.log(x);
			frappe.model.set_value(cdt, cdn, "rate", x.standard_rate);

			}
		})

});


frappe.ui.form.on('Expedicion', {
	refresh: function(frm) {
		$('.btn[data-fieldname=pagar]').addClass('btn-success');

	},
	pagar: function(frm) {
					frappe.route_options = {
						"customer": frm.doc.cliente,
						"expedicion": frm.doc.name
					};
					frappe.new_doc("Sales Invoice");
	}
});
