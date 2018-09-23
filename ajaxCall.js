 $(document).ready(function () {
        $('#btnSubmit').click(function () {
            $.ajax({
                type: "POST",
                url: "/Home/LoginValidate",
                // data: { drpVal1: drpVal },
                success: function (response) {

                },
                failure: function (response) {
                },
                error: function (response) {
                }
            });
        });
    });
