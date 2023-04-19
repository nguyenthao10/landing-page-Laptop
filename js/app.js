(function (comdy, $) {
    var settings = {};
    comdy.app = comdy.app || {};

    comdy.app.init = function (options) {
        comdy.app.setOptions(options);
		$('[data-lightbox="inline"]').magnificPopup({
			type: 'inline',
			mainClass: 'mfp-no-margins mfp-fade',
			closeBtnInside: false,
			fixedContentPos: true
		});
    };

    comdy.app.setOptions = function (options) {
        settings = $.extend(settings, options);
    };

    comdy.app.subscribe = function (formId) {
        var errorMessage = '';
        if ($(formId + " #Email").val() === '') {
            errorMessage += "Bạn chưa nhập Email";
        }

        if (errorMessage === '') {
            $.ajax({
                type: 'POST',
                url: '/api/comdy/' + $('#token').val() + '/subscribe',
                data: JSON.stringify({ "Email": $(formId + " #Email").val() }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    if (response.success) {
                        new PNotify({
                            text: "Đăng ký nhận tin tức về sự kiện thành công.",
                            type: "success",
                            buttons: {
                                sticker: false,
                                closer: false
                            }
                        });
                        $(formId + " #Email").val('');

                        var magnificPopup = $.magnificPopup.instance;
                        // save instance in magnificPopup variable
                        magnificPopup.close();
                    } else {
                        new PNotify({
                            text: response.message,
                            type: "error",
                            buttons: {
                                sticker: false,
                                closer: false
                            }
                        });
                    }
                }
            });
        } else {
            new PNotify({
                text: errorMessage,
                type: "error",
                buttons: {
                    sticker: false,
                    closer: false
                }
            });
        }
    };

    comdy.app.order = function () {
        var errorMessage = '';
        if ($("#modal-order #FullName").val() === '') {
            errorMessage += "Chưa nhập Họ Tên";
        }
        if ($("#modal-order #PhoneNumber").val() === '') {
            if (errorMessage !== '') {
                errorMessage += "<br/>Chưa nhập Điện thoại";
            }
            else {
                errorMessage += "Chưa nhập Điện thoại";
            }
        }
        if ($("#modal-order #Email").val() === '') {
            if (errorMessage !== '') {
                errorMessage += "<br/>Chưa nhập Email";
            }
            else {
                errorMessage += "Chưa nhập Email";
            }
        }

        if (errorMessage === '') {
            var quantity = $("#modal-order-form #Quantity").val();
            var data = {
                "FullName": $("#modal-order-form #FullName").val(),
                "Email": $("#modal-order-form #Email").val(),
                "PhoneNumber": $("#modal-order-form #PhoneNumber").val(),
                "OrderDetail": "Mặt nạ sủi bọt thải độc tố SU:M 37 - Số lượng: " + quantity + " hộp",
                "TotalAmount": parseInt(quantity) * 490000
            };
            $.ajax({
                type: 'POST',
                url: '/api/comdy/' + $('#token').val() + '/order',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json',
                success: function (response) {
                    if (response.success) {
                        new PNotify({
                            text: "Đặt mua thành công.",
                            type: "success",
                            buttons: {
                                sticker: false,
                                closer: false
                            }
                        });
                        $("#modal-order-form #FullName").val('');
                        $("#modal-order-form #PhoneNumber").val('');
                        $("#modal-order-form #Email").val('');

                        var magnificPopup = $.magnificPopup.instance;
                        // save instance in magnificPopup variable
                        magnificPopup.close();
                    } else {
                        new PNotify({
                            text: response.message,
                            type: "error",
                            buttons: {
                                sticker: false,
                                closer: false
                            }
                        });
                    }
                }
            });
        } else {
            new PNotify({
                text: errorMessage,
                type: "error",
                buttons: {
                    sticker: false,
                    closer: false
                }
            });
        }
    };
}(window.comdy = window.comdy || {}, jQuery));

$(function(){
    comdy.app.init({});
});