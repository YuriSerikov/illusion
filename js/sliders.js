document.getElementById('color1').addEventListener('change', colorBoxChanged);
document.getElementById('color1').addEventListener('input', colorBoxChanged);
document.getElementById('redSlider').addEventListener('change', redSliderChanged);
document.getElementById('greenSlider').addEventListener('change', greenSliderChanged);
document.getElementById('blueSlider').addEventListener('change', blueSliderChanged);

function redSliderChanged() {
    const redSliderValue = $('#redSlider').val();
    const colorBox = $('#color1');
    const oldColor = colorBox.val();
    //console.log('вызов при изменеии Слайдера: ');
    //console.log(oldColor);
    let redHex = String(Number(redSliderValue).toString(16));
    //console.log(redHex, redHex.length);
    if (redHex.length === 1) {
        redHex = '0' + redHex;
    } else if (redHex.length === 0) {
        redHex = '00';
    }
    let color = '#' + redHex + oldColor.substring(3);
    //console.log('новое значение цвета: #'+ redHex + oldColor.substring(3));
    colorBox.val(color);
    colorBox.css('background-color', color);
    $.farbtastic('#colorpicker1').setColor(color);
    $('#rLabel').text(redSliderValue);
}

function greenSliderChanged() {
    const greenSliderValue = $('#greenSlider').val();
    const colorBox = $('#color1');
    const oldColor = colorBox.val();
    //console.log('вызов при изменеии Слайдера GREEN: ');
    //console.log(oldColor);
    let greenHex = String(Number(greenSliderValue).toString(16));
    //console.log(redHex, redHex.length);
    if (greenHex.length === 1) {
        greenHex = '0' + greenHex;
    } else if (greenHex.length === 0) {
        greenHex = '00';
    }
    let color = oldColor.substring(0, 3) + greenHex + oldColor.substring(5);
    //console.log('новое значение цвета: '+ oldColor.substring(0,3) + greenHex + oldColor.substring(5));
    colorBox.val(color);
    colorBox.css('background-color', color);
    $.farbtastic('#colorpicker1').setColor(color);
    $('#gLabel').text(greenSliderValue);
}

function blueSliderChanged() {
    const blueSliderValue = $('#blueSlider').val();
    const colorBox = $('#color1');
    const oldColor = colorBox.val();
    //console.log('вызов при изменеии Слайдера BLUE: ');
    //console.log(oldColor);
    let blurHex = String(Number(blueSliderValue).toString(16));
    //console.log(redHex, redHex.length);
    if (blurHex.length === 1) {
        blurHex = '0' + blurHex;
    } else if (blurHex.length === 0) {
        blurHex = '00';
    }
    let color = oldColor.substring(0,5) + blurHex;
    //console.log('новое значение цвета: '+ oldColor.substring(0,5) + blurHex);
    colorBox.val(color);
    colorBox.css('background-color',color);
    $.farbtastic('#colorpicker1').setColor(color);
    $('#bLabel').text(blueSliderValue);
}
function colorBoxChanged() {
    //console.log("вызов при изменеии")
    let redSl = $('#redSlider');
    let valueColorBox = redSl.val();

    redSl.val(hex2rgb(valueColorBox).r);
    $('#greenSlider').val(hex2rgb(valueColorBox).g);
    $('#blueSlider').val(hex2rgb(valueColorBox).b);

}

function hex2rgb(c) {
    const bigint = parseInt(c.split('#')[1], 16);
    return hex2rgb ? {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    } : null;
}