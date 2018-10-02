<script>

    $(document).ready(function () {
        $("#btnSubmit").click(function () {
            var name = $("#txtUserName").val();
            var password = $("#txtPassword").val();
            if (name == '' || password == '') {
                alert("enter user name and password");
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "/Home/LoginValidate",
                    data: { userName: name, password: password },
                    success: function (response) {
                        if (response.id > 0) {
                            alert("valid login");
                            window.location.href = '/Registration/Registration';
                        }
                        else {
                            alert("invalid login");
                        }

                    },
                    failure: function (response) {
                    },
                    error: function (response) {
                    }
                });
            }
        });
    });
</script>
