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
    var temp = a.replace(/,/g, '');
    var curren = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    document.getElementById("priceId").value = curren;
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
$(document).ready(function(){
    $('input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;
        document.getElementById('Label1').innerHTML = fileName;
    });
});