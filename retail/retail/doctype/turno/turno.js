// Copyright (c) 2017, C0D1G0 B1NAR10 and contributors
// For license information, please see license.txt

frappe.ui.form.on('Turno', {
	onload: function(frm) {
			frappe.call({
					method: "frappe.client.get_value",
					args: {
						doctype: "Dolares",
						fieldname: "valor"
					},
					callback: function(r, rt) {
						if(r.message) {
							console.log(r.message);
							localStorage.setItem('tipo_de_cambio', r.message.valor);
							cur_frm.set_value('tipo_de_cambio', r.message.valor);
							// me.wrapper.find(".dolares").text(r.message.exchange_rate);
						}
					}
				})



	},
	onload_post_render: function(frm) {

	},
	iniciar_venta: function(frm) {
		cur_frm.set_value("creado_por",frappe.user.full_name());
		cur_frm.set_df_property("dinero_apertura", "read_only", cur_frm.doc.__islocal ? 0 : 1);
		cur_frm.set_df_property("vendedor_principal", "read_only", cur_frm.doc.__islocal ? 0 : 1);
		cur_frm.set_df_property("caja", "read_only", cur_frm.doc.__islocal ? 0 : 1);
		cur_frm.set_value('status', "Abierto");
		localStorage.status = "Abierto";
		localStorage.caja = "Abierto";
		cur_frm.save();
		frappe.set_route('pov');
		// frappe.new_doc("Sales Invoice");

	},
	cerrar_turno: function(frm) {
		cur_frm.set_value('status', "Terminado");
		localStorage.status = "Cerrado";
		cur_frm.set_df_property("efectivo_conteo", "read_only", cur_frm.doc.__islocal ? 0 : 1);
		cur_frm.set_df_property("electronico_conteo", "read_only", cur_frm.doc.__islocal ? 0 : 1);
		cur_frm.set_df_property("cierre", "read_only", cur_frm.doc.__islocal ? 0 : 1);
		cur_frm.save();
	},
	efectivo_conteo: function(frm) {
		cur_frm.set_value('diferencia_efectivo',cur_frm.doc.efectivo_conteo  - cur_frm.doc.efectivo_esperado);
		cur_frm.set_value('total_dinero', cur_frm.doc.electronico_conteo + cur_frm.doc.efectivo_conteo);
		cur_frm.set_value('diferencia_total', cur_frm.doc.total_dinero - cur_frm.doc.total_ingreso_registrado);
	},
	electronico_conteo: function(frm) {
		cur_frm.set_value('diferencia_electronico',cur_frm.doc.electronico_conteo - cur_frm.doc.dinero_electronico_esperado);
		cur_frm.set_value('total_dinero', cur_frm.doc.electronico_conteo + cur_frm.doc.efectivo_conteo);
		cur_frm.set_value('diferencia_total',cur_frm.doc.total_dinero - cur_frm.doc.total_ingreso_registrado);
	},
	cierre: function(frm) {
		// cur_frm.save();
		frappe.call({
			method: "retail.retail.doctype.turno.turno.totales_cierre",
			args: {
				caja: cur_frm.doc.caja,
				apertura: cur_frm.doc.apertura,
				cierre: cur_frm.doc.cierre
			},
			callback: function(r) {
				console.log(r.message);
				if(r.message[2]) {
					cur_frm.set_value('total_ingreso_registrado', r.message[0].total);
					cur_frm.set_value('efectivo_esperado', r.message[1].total);
					cur_frm.set_value('dinero_electronico_esperado', r.message[2].total);
				} else {
					cur_frm.set_value('total_ingreso_registrado', r.message[0].total);
					cur_frm.set_value('efectivo_esperado', r.message[0].total);
					cur_frm.set_value('dinero_electronico_esperado', 0.00001);

				}
			}
		})
	},
	refresh: function(frm) {


		// $("label:contains('Dinero en Caja')").append('<button data-video-id="UjPB_k43Zu8"  class="js-modal-btn ayudachico"><i class="far fa-question-circle"></i></button>')

		// $("label:contains('Vendedor Principal')").append('<button data-video-id="W4z7w8o4FOg"  class="js-modal-btn ayudachico"><i class="far fa-question-circle"></i></button>')
		// $('.page-actions').prepend('<button data-video-id="Rstr_zhNmKI"  class="btn-xs js-modal-btn ayudagrande "><i class="far fa-question-circle"></i>  Ayuda</button>');
		// $(".js-modal-btn").modalVideo();

		cur_frm.set_query("vendedor_principal", function() {
        	return {
				"filters": { "vendedor": 1 }
        	};
		});

	},
	validate: function(frm) {

		// localStorage.status = cur_frm.doc.status;
		localStorage.caja = cur_frm.doc.caja;
		localStorage.vendedor_principal = cur_frm.doc.vendedor_principal;

	}
	// vendedor_principal: function(frm) {
	// 	frappe.call({
	// 		method: "frappe.client.get",
	// 		args: {
	// 			doctype: "Employee",
	// 			filters: {
	// 			"vendedor": 1
	// 			}
	// 		},
	// 		callback: function (data) {
	// 			if(!data.message) {
	// 					alert('No hay vendedores dados de alta');
	// 				}
	// 			}
	// 	})

	// },
});
