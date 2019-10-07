function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

// validate phone number
var setTotalNumberOfWordCounter = "10";
function displayWordCounter() {
    var textValue = document.getElementsByName("phone")[0].value;
    textValue = textValue.replace(/ /g, '');
    var gettextLength = textValue.length;

    if (gettextLength == setTotalNumberOfWordCounter) {
        textValue = textValue.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
        document.getElementsByName("phone")[0].value = textValue;
    }

    if (gettextLength > setTotalNumberOfWordCounter) {
        textValue = textValue.replace(/ /g, '');
        textValue = textValue.substring(0, setTotalNumberOfWordCounter);
        textValue = textValue.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
        document.getElementsByName("phone")[0].value = textValue;
        return false;
    }
}

// format price
$('#priceId').keyup(function () {
    var a = $(this).val();
    document.getElementById('priceId').style.borderColor = "#ccc";
    document.getElementById('priceId').style.backgroundColor = "#f1f1f1";
    var temp = a.replace(/,/g, '');
    var curren = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    document.getElementById("priceId").value = curren;
});

$('#nameId').keyup(function () {
    document.getElementById('nameId').style.borderColor = "#ccc";
    document.getElementById('nameId').style.backgroundColor = "#f1f1f1";
});

$('#phonenumberId').keyup(function () {
    document.getElementById('phonenumberId').style.borderColor = "#ccc";
    document.getElementById('phonenumberId').style.backgroundColor = "#f1f1f1";
});

// format phone number
// $('#phonenumberId').keyup(function () {
//     var a = $(this).val();
//     var temp = a.replace(/ /g, '');
//     console.log(a + "  " + temp);
//     if(temp.length==10){
//         var result = temp.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
//         document.getElementById("phonenumberId").value = result;
//     }
// });

// file
$(document).ready(function () {
    $('input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        document.getElementById('Label1').innerHTML = fileName;
        document.getElementById('Label1').style.borderColor = "#ccc";
        document.getElementById('Label1').style.backgroundColor = "#f1f1f1";
    });
});
//check empty file
$('#upload').bind("click", function () {
    var imgVal = $('#imageUpload').val();
    var nameVal = $('#nameId').val();
    var priceVal = $('#priceId').val();
    var phoneNumberVal = $('#phonenumberId').val();
    var check = true;

    if (imgVal == '') {
        document.getElementById('Label1').style.borderColor = "#ff5c33";
        document.getElementById('Label1').style.backgroundColor = "#ffd6cc";
        document.getElementById('Label1').innerHTML = "Bạn chưa chọn ảnh";
        check = false;
    }

    if(nameVal == ''){
        document.getElementById('nameId').style.backgroundColor = "#ffd6cc";
        check = false;
    }

    if(priceVal == ''){
        document.getElementById('priceId').style.backgroundColor = "#ffd6cc";
        check = false;
    }

    if(phoneNumberVal == ''){
        document.getElementById('phonenumberId').style.backgroundColor = "#ffd6cc";
        check = false;
    }

    return check;
})

//Block copy paste
window.onload = function() {
    const inputPrice = document.getElementById('priceId');
        inputPrice.onpaste = function(e) {
        e.preventDefault();
    }
    const inputPhone = document.getElementById('phonenumberId');
        inputPhone.onpaste = function(e) {
        e.preventDefault();
    }
}