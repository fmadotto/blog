$(document).ready(function() {
  var $inputText = $("#inputText"),
    $outputHash = $("#outputHash");

  $inputText.keyup(function() {
    $outputHash.val(CryptoJS.SHA256($inputText.val()).toString());

    if ($outputHash.val() === CryptoJS.SHA256("Hello, world!").toString()) {
      $outputHash.css("border-color","#5cb85c");
      $outputHash.css("background-color","rgba(92,184,92,0.2)");
    } else if ($outputHash.val() === "8d2de0e5adc70f24ca39da628d785f8a6f987e8e46078f222ad66b57e88d6397") {
      $outputHash.css("border-color","#d9534f");
      $outputHash.css("background-color","rgba(217,83,79,0.2)");
    } else {
      $outputHash.css("border-color","rgba(0,0,0,.15)");
      $outputHash.css("background-color","transparent");
    }

  });
});